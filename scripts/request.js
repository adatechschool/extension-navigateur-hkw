const url = 'https://api.openai.com/v1/chat/completions';
const requestedFormat = '{"questions": [{"question0": "question0", "choices0": [ "choice0", "choice1", "choice2"], "answer0": "answer0"}], "summary": "summary"}'

function formatRequestBody(str) {
  const requestBody = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant"
      },
      {
        role: "user",
        content: `à partir de cet article: \n ${str} \n donne-moi un QCM de 3 questions en précisant la bonne réponse ; et résume moi l'article. ta réponse doit être un seul et unique objet JSON, et NE PAS ÊTRE EMBALÉE de marqueurs JSON markdown. le tout au format: ` + requestedFormat
      }
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  return requestBody
}


async function getAIResponse(textFromDom) {
  const formattedRequestBody = formatRequestBody(textFromDom)
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(formattedRequestBody)
        });
        const data = await response.json();
        return data.choices[0].message.content
    } catch (error) {
        console.error('Error:', error);
    }
}



// async function fetchGemini() {
//   ///////////////////////////// WATCHOUT
//   const apiKey = '';

//   // Données du prompt
//   const promptData = {
//       prompt: {
//           text: "Quels sont les points forts du dernier iPhone ?"
//       }
//   };

//   // Effectuer la requête POST à l'API
//   fetch(`${apiUrl}?key=${apiKey}`, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(promptData),
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Erreur lors de la requête à Google Gemini');
//       }
//       return response.json();
//   })
//   .then(data => {
//       console.log('Réponse de Google Gemini:', data);
//   })
//   .catch(error => {
//       console.error('Erreur:', error);
//   });

// }