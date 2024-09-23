if (localStorage.apiKey) {
    keyInput.value =  localStorage.getItem('apiKey')
}


document.addEventListener('DOMContentLoaded', () => {
    keyButton.addEventListener('click', () => {
      apiKey = keyInput.value
      localStorage.setItem('apiKey', apiKey)
      keyInput.style.display = 'none'
      keyButton.style.display = 'none'
      summaryButton.classList.remove('hidden')
    })
    
    try {
        btn.addEventListener('click', () => {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: () => checkArticle(document)},
                    (results) => {
                        if (results[0].result) {
                            fetchAPI()
                            showLoader()
                        } else {
                            alert('No article found on this page...')
                        }
                    }
                )
            })
        })
    } catch (error) {
        console.log(error)
    }
})





async function fetchAPI() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: {tabId: tabs[0].id},
                function: () => extractContents(document)
            },
            async (results) => {  
                try {
                    const aiResponse = await getAIResponse(results[0].result);
                    aiResponseJSON = JSON.parse(aiResponse);
                    createSummary(aiResponseJSON);
                    getTabUrl()
                } catch (error) {
                    console.error('Error fetching AI response:', error);
                } finally {
                    hideLoader(); 
                }
            }
        );
    });
}
