const req = {
    "questions": [
        {
            "question0": "Quel est le rôle du fichier manifest.json dans une extension Chrome ?",
            "choices0": [
                "Il contient les styles CSS de l'extension",
                "Il définit les métadonnées et permissions de l'extension",
                "Il stocke les données des utilisateurs"
            ],
            "answer0": "Il définit les métadonnées et permissions de l'extension"
        },
        {
            "question1": "Que fait la fonction chrome.scripting.executeScript() dans le fichier background.js ?",
            "choices1": [
                "Elle injecte un script dans l'onglet actif",
                "Elle change l'URL de l'onglet actif",
                "Elle envoie un message au serveur"
            ],
            "answer1": "Elle injecte un script dans l'onglet actif"
        },
        {
            "question2": "Quel est l'objectif de l'événement 'click' écouté dans popup.js ?",
            "choices2": [
                "Il ouvre une nouvelle fenêtre",
                "Il envoie un message pour injecter un script de contenu",
                "Il change la couleur du bouton"
            ],
            "answer2": "Il envoie un message pour injecter un script de contenu"
        }
    ],
    "summary": "L’article décrit un guide étape par étape sur la création et la gestion d'une extension Google Chrome pour autofill des formulaires. L'auteur explique la structure du fichier manifest.json, la configuration des scripts de contenu et le rôle des différents scripts popup.js, background.js et main.js. Utilisant ces scripts, l'extension injecte du JavaScript dans les pages web lorsque l'utilisateur clique sur un bouton spécifique de l’extension. Des permissions et des actions spécifiques sont définies pour assurer le bon fonctionnement et la compatibilité de l'extension.",
    "url": "https://medium.com/@aryanpandit1718/solving-the-chrome-extension-button-click-challenge-a-simple-guide-20696836511f",
    "score": "Score: 2/3"
}

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
                    console.log(aiResponseJSON);
                    
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
