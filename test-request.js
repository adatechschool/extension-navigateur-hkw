const apiKey = 'mysecretkey'; // Remplacez par votre clé API OpenAI

const url = 'https://api.openai.com/v1/chat/completions';
const requestedFormat = "{'questions': [{'question1': 'question1', 'choices1': [ 'choice1', 'choice2', 'choice3'], 'answer1': 'answer1'}]}"
const requestBody = {
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant"
    },
    {
      role: "user",
      content: "En fonction de cet article:\n```\nLa règle @keyframes permet aux auteurs de définir les étapes qui composent la séquence d'une animation CSS. Cela permet de contrôler une animation plus finement que ce qu'on pourrait obtenir avec les transitions.\nIl est possible de manipuler la règle @keyframes via JavaScript et le CSSOM, notamment avec l'interface CSSKeyframesRule.\nAfin d'utiliser ces règles, on créera une règle @keyframes avec un nom pour chaque étape et on utilisera ce nom avec la propriété animation-name afin qu'une animation corresponde à la liste des étapes qui la composent. Chaque règle @keyframes contient une liste de sélecteurs d'étapes dont chacun contient le pourcentage d'avancement de l'animation auquel il correspond ainsi que les informations de styles qui correspondent à cette étape..\nLes étapes peuvent être listées dans n'importe quel ordre. Elles seront enchaînées dans l'ordre indiqué par le pourcentage d'avancement.\n```\nDonne-moi un QCM de 3 questions en précisant la bonne réponse au format JSON. Format attendu: " + requestedFormat
    }
  ],
  temperature: 1,
  max_tokens: 500,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
};

async function getAIResponse() {
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        console.log(data.choices[0].message.content); // Affiche la réponse de l'assistant
        return data.choices[0].message.content
    } catch (error) {
        console.error('Error:', error);
    }
}
    
