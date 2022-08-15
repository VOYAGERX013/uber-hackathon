chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, { method: 'getSelection' }, response => {
        
    });
});