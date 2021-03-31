chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'buttonClicked') {
        chrome.tabs.create({
            active: true,
            url:  'options.html'
          }, null);
   }
  });

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      if (changeInfo.url) {
        chrome.tabs.sendMessage( tabId, {
          message: 'newURL',
          url: changeInfo.url
        })
      }
    }
  );