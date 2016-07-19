chrome.runtime.onInstalled.addListener(() => chrome.runtime.openOptionsPage());

function openFromHistory() {

  chrome.history.search({text: '/portal/simples/ExecucaoDireta.', maxResults: 1}, (result) => {
    if(result)
      chrome.tabs.create({'url': result[0].url});
  });
}

chrome.browserAction.onClicked.addListener(openFromHistory);

// Google Analytics
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-80988174-1']);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if(request.action == 'querysubmit') {
    _gaq.push(['_trackEvent', 'queries', 'querysubmit', 'Consultas enviadas']);
  }

  if(request.action == 'optionview') {
    _gaq.push(['_trackPageview', 'option.html']);
  }

  if(request.action == 'openFromHistory') {
    openFromHistory();
  }

});

