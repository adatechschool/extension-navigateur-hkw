chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
});




const contextMenuItem = {
    "id": "summarize",
    "title": "Summarize",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);


chrome.contextMenus.onClicked.addListener((clickData) =>{
    if (clickData.menuItemId == "summarize" && clickData.selectionText) {
        const selectedText = clickData.selectionText
        summarizedText = selectedText
        summarizedFetchAPI(summarizedText)
    }
})



async function summarizedFetchAPI() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: () => extractContents(document)},
        async (results) => {                 
            const aiResponse = await getAIResponse(summarizedText)
            aiResponseJSON = JSON.parse(aiResponse);
            createSummary(aiResponseJSON)
        }
      );
    });
}
