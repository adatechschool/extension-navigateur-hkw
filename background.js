chrome.action.onClicked.addListener((tab) => {
    console.log("1212")
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: getSelectedText
    }, (result) => {
        console.log("selected text: ", result[0].result)
    })
})

function getSelectedText() {
    console.log("couou")
    const selection = window.getSelection();
    const text = selection.toString();
    console.log(text)

    return text

}