class MidiVisualisation {
  processMidi = (midiFile) => {
    console.log('process', midiFile)
    var fileReader = new FileReader();
    fileReader.readAsDataURL(midiFile);
    fileReader.addEventListener("load", ()=>{
        let fileData = fileReader.result;
        console.log('data', fileData)
        var midi = MidiParser.parse(fileData);
        console.log('midi', midi)
    })
  }
}
