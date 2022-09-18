// initialise all nodes
function AudioVisualisation() {
  let audioCtx = new AudioContext()
  let audioElement = document.getElementById('audio-source')
  audioElement.play()
  let analyser = audioCtx.createAnalyser()
  analyser.fftSize = 2048
  // analyser.fftSize = 32
  let source = audioCtx.createMediaElementSource(audioElement)

  let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  let soundNodes = []

  document
    .getElementsByClassName('visualisation-screen')[0]
    .appendChild(app.view)

  // connect sound source to analyser node and default speaker output
  source.connect(analyser)
  source.connect(audioCtx.destination)
  let data = new Uint8Array(analyser.frequencyBinCount)

  const draw = () => {
    for (var i = app.stage.children.length - 1; i >= 0; i--) {	app.stage.removeChild(app.stage.children[i]);};
    // create array to store audio frequency data
    analyser.getByteFrequencyData(data) // array passed by reference
    let frequencyData = [...data] // convert from unsigned array to normal array
    
    // index = frequency, value = volume
    frequencyData.forEach((vol, freq) => {
      let node = new SoundNode(freq, vol, app.renderer);
      soundNodes.push(node);
    })

    var newSoundNodes = [];
    soundNodes.forEach((node) => {
      node.update();
      if(node.visible){
        app.stage.addChild(node.sprite);
        newSoundNodes.push(node);
      }
    });

    soundNodes = newSoundNodes;
  }

  app.ticker.add(draw)
}
