const getSelectedText = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    console.log("in getselectedtext: " + text)
}


document.getElementById("summary-button").addEventListener("click", function(clickData) {
    // console.log('coucou')
    // getAIResponse();
    getSelectedText()
    const selectedText = clickData.selectionText  
    

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

document.addEventListener("selectionchange", () => {
    getSelectedText();
})
