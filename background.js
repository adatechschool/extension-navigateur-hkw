chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

// const getSelectedText = () => {
//     console.log("couou")
//     const selection = window.getSelection();
//     const text = selection.toString();
//     console.log(text)
// }
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.executeScript({
        target: {tabId: tab.id},
        func: getSelectedText
    })
})