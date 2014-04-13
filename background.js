console.log('This is background');

var triggerCapture = function() {
    chrome.tabs.captureVisibleTab(null, {format:'png'},function(imageURI){
        console.log('Could I get imageURI?', imageURI);
    });
};
chrome.browserAction.onClicked.addListener(function(tab) {
    triggerCapture();
});
chrome.runtime.onMessage.addListener(function(message, sender, responder){
    triggerCapture();
});

