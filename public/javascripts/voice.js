
function voiceRecognition() {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (e) {
        var textarea = document.getElementById('results');
        console.log(e);
        for (var i = e.resultIndex; i < e.results.length; ++i) {
            if (e.results[i].isFinal) {
                textarea.value += e.results[i][0].transcript;
            }
        }
    };

    // start listening
    recognition.start();
}
