

document.getElementById("summary-button").addEventListener("click", function() {
    // console.log('coucou')
    // getAIResponse();
    document.getElementById("summary-section").classList.remove("hidden");
    document.getElementById("summary-button").classList.add("hidden");
});

document.getElementById("quiz-button").addEventListener("click", function() {
    document.getElementById("quiz-section").classList.remove("hidden");
    document.getElementById("quiz-button").classList.add("hidden");
});

document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Quiz submitted! ");
});

// document.addEventListener("selectionchange", () => {
//     // getSelectedText();
//     chrome.tabs.executeScript( {
//         code: "window.getSelection().toString();"
//     }, function(selection) {
//         console.log(selection)
//     })
// })

// const getSelectedText = () => {
//     console.log("couou")
//     const selection = window.getSelection();
//     const text = selection.toString();
//     console.log(text)
// }
