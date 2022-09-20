// initialise all nodes
function AudioVisualisation() {
  let audioCtx = new AudioContext()
  let audioElement = document.getElementById('audio-source')
  audioElement.play()
  let analyser = audioCtx.createAnalyser()
  // analyser.fftSize = 2048
  analyser.fftSize = 32
  let source = audioCtx.createMediaElementSource(audioElement)

  let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000
  })

  let sceneContainer = new PIXI.Container();
  app.stage.addChild(sceneContainer)
  let soundNodes = []

  document
    .getElementsByClassName('visualisation-screen')[0]
    .appendChild(app.view)

  // connect sound source to analyser node and default speaker output
  source.connect(analyser)
  source.connect(audioCtx.destination)
  let data = new Uint8Array(analyser.frequencyBinCount)

  let frameInterval = 10;
  let elapsed = frameInterval;

  const update = (delta) => {
    for (var i = sceneContainer.children.length - 1; i >= 0; i--) {	sceneContainer.removeChild(sceneContainer.children[i]);};
    // create array to store audio frequency data
    analyser.getByteFrequencyData(data) // array passed by reference
    let frequencyData = [...data] // convert from unsigned array to normal array
    let sampleCount = 4;
    let sampleInterval = frequencyData.length / sampleCount;

    var freqSamples = [];
    let sum = 0;
    for (let i = 0; i < frequencyData.length; i++) {
      sum += frequencyData[i];
      if(i % sampleInterval == 0){
        freqSamples.push(sum/(sampleInterval * 1.0));
        sum = 0;
      }
    }

    elapsed += delta;
    if (elapsed >= frameInterval) {
      // index = frequency, value = volume
      freqSamples.forEach((vol, freq) => {
        let node = new SoundNode(freq, vol, app.renderer)
        soundNodes.push(node)
      })
      elapsed = 0;
      // frameInterval = Math.random() * 90;
    }

    var newSoundNodes = []
    soundNodes.forEach((node) => {
      node.update(delta)
      if (node.visible) {
        sceneContainer.addChild(node.getSprite());
        newSoundNodes.push(node)
      }
    })

    soundNodes = newSoundNodes
  }

  app.ticker.add(update)
}
