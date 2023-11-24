chrome.storage.local.get(['onOffStatus'], function (result) {
    if (result.onOffStatus) {
        activateScript();
    }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    var onOffStatus = changes.onOffStatus
    if (onOffStatus && onOffStatus.newValue) {
        activateScript();
        return;
    }
    deactivateScript();
});

function injectTheScript(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, {
            file: 'event_script.js'
        });
    }
}

function activateScript() {
    chrome.windows.getAll(null, function (windows) {
        for (var j = 0; j < windows.length; ++j) {
            chrome.tabs.getAllInWindow(windows[j].id, function (tabs) {
                for (var i = 0; i < tabs.length; ++i) {
                    if (tabs[i].url.indexOf("chrome://") != 0) {
                        chrome.tabs.executeScript(tabs[i].id, {file: 'event_script.js'});
                    }
                }
            });
        }
    });
    chrome.tabs.onUpdated.addListener(injectTheScript);
}

function deactivateScript() {
    chrome.windows.getAll(null, function (windows) {
        for (var j = 0; j < windows.length; ++j) {
            chrome.tabs.getAllInWindow(windows[j].id, function (tabs) {
                for (var i = 0; i < tabs.length; ++i) {
                    if (tabs[i].url.indexOf("chrome://") != 0) {
                        chrome.tabs.executeScript(tabs[i].id, {file: 'remove_script.js'});
                    }
                }
            });
        }
    });
    chrome.tabs.onUpdated.removeListener(injectTheScript);
}
