document.addEventListener('DOMContentLoaded', function () {

    var onOffButton = document.getElementById('onOffButton');
    var higlightText = document.getElementById('highlightText');

    setInterval(function () {
        if (higlightText.classList.contains('highlight')) {
            higlightText.classList.remove("highlight");
            return;
        }
        higlightText.classList.add("highlight");
    }, 1500);

    if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['onOffStatus'], function (result) {
            onOffButton.checked = result.onOffStatus;
        });
    }
    onOffButton.addEventListener('click', function () {
        chrome.storage.local.set({onOffStatus: onOffButton.checked});
    });
});


