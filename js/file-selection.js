$(document).ready(function () {
    setupCustomFileInput();
});

function setupCustomFileInput() {
    var inputs = document.querySelectorAll('.file-input');
    Array.prototype.forEach.call(inputs, function (input) {
        input.addEventListener('change', function (e) {
            console.log("Files", this.files);
            if (this.files.length == 1) {
                $('.file-input-label.waiting').hide();
                $('.file-input-label.selected').show();
            } else {
                $('.file-input-label.waiting').show();
                $('.file-input-label.selected').hide();
            }
        });
    });
}