function createSummary(response) {    
    const summarySection = document.getElementById('summary-section')
    summarySection.classList.remove('hidden')
    const summaryButton = document.getElementById("summary-button")
    summaryButton.style.display = "none";
    
    const summaryContentContainer = document.createElement('div')
    summaryContentContainer.classList.add('summary-content')

    const takeQuizButon = document.createElement('button')
    takeQuizButon.classList.add('quiz-button')

    summarySection.appendChild(summaryContentContainer)
    summarySection.appendChild(takeQuizButon)

    const formattedContent = response.summary.split('.').join('.\n')

    summaryContentContainer.innerText = formattedContent
    takeQuizButon.innerText = 'Take Quiz'

    takeQuizButon.addEventListener("click", () => {
          document.getElementById("quiz-section").classList.remove("hidden");
          document.querySelector(".quiz-button").classList.add("hidden");
          createQuiz(response);
      });
}



function createQuiz(response) {
  const quizItems = document.getElementById("quiz-items");
  document.getElementById('summary-section').classList.add('hidden')
  for (let i = 0; i < response.questions.length; i++) {
      let quizItem = createItem('div', 'quiz-item')
      let quizQuestion = createItem('p', 'quiz-question', 'innerText', response.questions[i][`question${i}`])

      quizItem.appendChild(quizQuestion);
  
      for (let j = 0; j < response.questions[i][`choices${i}`].length; j++){
          let quizRow = createItem('div', 'quiz-row')

          let radioButtonSelector = document.createElement("input");
          radioButtonSelector.setAttribute("type", "radio");
          radioButtonSelector.setAttribute("name", `choices${i}`);
          radioButtonSelector.setAttribute("id", `option${i}${j}`);
          quizRow.appendChild(radioButtonSelector);

          let quizChoice = document.createElement("label");
          quizChoice.setAttribute("for", `option${i}${j}`);
          quizChoice.classList.add('quiz-choice')
          quizChoice.innerText = response.questions[i][`choices${i}`][j];
          let checkIcon = createItem('p', 'check-icon', 'innerText', '')
          quizChoice.appendChild(checkIcon)
          quizRow.appendChild(quizChoice);
          



          quizItem.appendChild(quizRow);

      }
      quizItems.appendChild(quizItem);
      quizItems.scrollIntoView({behavior:'smooth', block:'start'});

  }

}
// ✔✘

function countScore(response) {

  let items = document.querySelectorAll(".quiz-item");
  let maxScore = items.length;
  let userScore = 0;

  for (let i = 0; i < items.length; i++) {
    let buttons = document.getElementsByName(`choices${i}`);
    for (let j = 0; j < buttons.length; j++) {
      let checkIcon = document.querySelector('.check-icon')
      checkIcon ? console.log('oui') : null;
      
      checkIcon.innerText = ''
      let quizChoice = document.querySelector(`label[for='${buttons[j].id}']`);
      if (buttons[j].checked) {
        let userAnswer = quizChoice.textContent;
        if (userAnswer !== response.questions[i][`answer${i}`]) {
          // false
          checkIcon.innerText = '✘'
        } else {
          // correct
          checkIcon.innerText = '✔'
          // quizChoice.style.border = "0px";
          userScore += 1;
        }
      }
    }
  }

  const score = `Score: ${userScore}/${maxScore}`;
  displayScore(score);
  return score;
}



function displayScore(score) {
  if (document.querySelector('.score')) {
    document.querySelector('.score').innerText = score
  } else {
    const scoreElement = createItem('h2', 'score', 'innerText', score)
    document.getElementById("quiz-section").appendChild(scoreElement)
    scoreElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("quiz-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.submitter.id === "submit-button") {
      countScore(aiResponseJSON); 
      storeElement(aiResponseJSON)
    }
  })
})