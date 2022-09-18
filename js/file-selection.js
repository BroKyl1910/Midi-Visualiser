let selectedFile = null;

$(document).ready(function () {
    setupCustomFileInput();
});

$('.submit').on('click', ()=>{
    // if(!selectedFile) return
    $('.selection-screen').hide();
    $('.visualisation-screen').show();

    AudioVisualisation();
})

function setupCustomFileInput() {
    let inputs = $('.file-input');
    Array.prototype.forEach.call(inputs, function (input) {
        input.addEventListener('change', function (e) {
            if (this.files.length == 1) {
                $('.file-input-label.waiting').hide();
                $('.file-input-label.selected').show();
                selectedFile = this.files[0];
                let urlObj = URL.createObjectURL(selectedFile);
                $('#audio-source')[0].src = urlObj;
            } else {
                $('.file-input-label.waiting').show();
                $('.file-input-label.selected').hide();
            }
        });
    });
}