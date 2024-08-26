let score = 0
let level = 1

let Score = document.getElementById("score")
Score.textContent += score

let Level = document.getElementById('level')
Level.textContent += level

const questions = [
    {
        question: "What is an exoplanet?",
        options: ["A planet within our solar system", "A planet that orbits a star outside our solar system", "A dwarf planet within the Kuiper Belt", "A moon of a gas giant planet"],
        correctAnswer: 1
    },
    {
        question: "Which of the following exoplanet types is most similar to Earth in terms of size and composition?",
        options: ["Hot Jupiter", "Super-Earth", "Gas giant", "Ice giant"],
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
            score += 10
            Score.innerText = "Total Score:" + score
        } else {
            alert("Incorrect. The correct answer was " + currentQuestion.options[currentQuestion.correctAnswer]);
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            alert("Quiz Completed!");
            level += 1
            Level.innerText = "Level:" + level
            document.getElementById('quiz-section').innerHTML = `
            <div id="congratulations">
                <span class="balloon">🎈</span>
                    Congratulations!
                <span class="balloon">🎈</span>
            </div>
            <h2>You are one level up.</h2>
            <a href="index.html"><button>Homepage</button></a>
            `
        }
    } else {
        alert("Please select an option.");
    }
}

function homepage() {
    document.getElementById("exoplanet-section").style.display = "none";

    document.getElementById("menu").style.display = "block";
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
