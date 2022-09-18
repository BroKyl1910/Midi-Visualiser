// initialise all nodes
function AudioVisualisation() {
  let audioCtx = new AudioContext()
  let audioElement = document.getElementById('audio-source');
  audioElement.play();
  let analyser = audioCtx.createAnalyser()
  analyser.fftSize = 2048
  let source = audioCtx.createMediaElementSource(audioElement)
  let canvas = document.getElementById('audio-visual')
  let ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const draw = (data) => {
    data = [...data] // convert from unsigned array to normal array
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let space = canvas.width / data.length
    data.forEach((value, i) => {
      ctx.beginPath()
      ctx.moveTo(space * i, canvas.height) //x,y
      ctx.lineTo(space * i, canvas.height - value) //x,y
      ctx.stroke()
    })
  }

  const visualisationLoop = () => {
    // has to recursively call itself
    requestAnimationFrame(visualisationLoop)

    analyser.getByteFrequencyData(data) // array passed by reference
    // console.log(data);
    draw(data)
  }

  // connect sound source to analyser node and default speaker output
  source.connect(analyser)
  source.connect(audioCtx.destination)

  // create array to store audio frequency data
  let data = new Uint8Array(analyser.frequencyBinCount)
  requestAnimationFrame(visualisationLoop) // call to start animation loop
}
