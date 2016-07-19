document.addEventListener('DOMContentLoaded', ()  => {

  chrome.runtime.sendMessage({action: 'optionview'});
  document.querySelector('#btnOpenFromHistory').addEventListener('click', () => chrome.runtime.sendMessage({action: 'openFromHistory'}));

});
