const questions = [
    {
        question: "Which is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Mercury", "Earth"],
        correctAnswer: 1
    },
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ''; 

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerHTML = `
            <input type="radio" name="option" value="${index}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        const currentQuestion = questions[currentQuestionIndex];

        if (answerIndex === currentQuestion.correctAnswer) {
            alert("Correct!");
        } else {
            alert("Incorrect. The correct answer was " + currentQuestion.options[currentQuestion.correctAnswer]);
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            alert("Quiz Completed!");
            showHomepageButton();
        }
    } else {
        alert("Please select an option.");
    }
}

function showHomepageButton() {
    const quizSection = document.getElementById("quiz-section");

    document.getElementById("submit-button").style.display = "none";

    const homeButton = document.createElement("button");
    homeButton.textContent = "Go to Homepage";
    homeButton.onclick = function () {
        window.location.href = 'index.html';
    };

    quizSection.appendChild(homeButton);
}

window.onload = loadQuestion;
