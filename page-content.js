document.addEventListener('keyup', function(keyboardEvent) {
    var TRIGGER_KEY = 88;// "Shift + x" for example
    if(keyboardEvent.shiftKey && keyboardEvent.keyCode === TRIGGER_KEY){
        chrome.runtime.sendMessage(null, {});
    }
});
