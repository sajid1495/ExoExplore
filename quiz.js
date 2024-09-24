let exoplanets = [];
let level = 1;

let Level = document.getElementById('level')
Level.textContent += level

fetch('data.txt')
    .then(response => response.json())  // Parse the file content as JSON
    .then(data => {
        exoplanets = data;
        generateQuestion();  // Start the quiz only after data is fetched
    })
    .catch(error => {
        console.error('Error fetching the data:', error);  // Catch any errors
    });

// Variables to keep track of the quiz state
let currentQuestion = {};
let currentCorrectAnswer = "";
let score = 0;
let questionCount = 0;
const totalQuestions = 10; // Limit number of questions

// Function to generate a random question
function generateQuestion() {
    if (exoplanets.length === 0) {
        console.error("Exoplanets data not available yet.");
        return;
    }
    
    let plIndex = Math.floor(Math.random() * exoplanets.length);  // Use the correct length of the exoplanets array
    console.log(plIndex);
    const planet = exoplanets[plIndex];
    console.log(planet);
    
    if (!planet) {
        console.error("Invalid planet data.");
        return;
    }

    const questionType = Math.floor(Math.random() * 3); // Randomly select a question type
    const questionContainer = document.getElementById("question-title");
    const optionsContainer = document.getElementById("options-container");

    let question = "";
    let options = [];

    switch (questionType) {
        case 0:
            question = `What is the mass of the planet ${planet.pl_name}?`;
            currentCorrectAnswer = planet.pl_masse ? planet.pl_masse.toString() : "Unknown";
            options = generateOptions(currentCorrectAnswer, "mass");
            break;
        case 1:
            question = `In which year was the planet ${planet.pl_name} discovered?`;
            currentCorrectAnswer = planet.disc_year ? planet.disc_year.toString() : "Unknown";
            options = generateOptions(currentCorrectAnswer, "year");
            break;
        case 2:
            question = `What is the orbital period of the planet ${planet.pl_name}?`;
            currentCorrectAnswer = planet.pl_orbper ? planet.pl_orbper.toString() : "Unknown";
            options = generateOptions(currentCorrectAnswer, "orbital period");
            break;
    }

    // Display the question and options
    questionContainer.innerText = question;
    optionsContainer.innerHTML = options.map((option, index) => 
        `<label><input type="radio" name="option" value="${option}"> ${option}</label><br>`).join("");
}

// Function to generate options with one correct and three wrong ones
function generateOptions(correctAnswer, type) {
    let wrongAnswers = [];
    switch (type) {
        case "mass":
            wrongAnswers = [1.5, 2.0, 0.3]; // Example wrong masses
            break;
        case "year":
            wrongAnswers = [2015, 2020, 2018]; // Example wrong years
            break;
        case "orbital period":
            wrongAnswers = [15.0, 35.0, 50.0]; // Example wrong orbital periods
            break;
    }
    wrongAnswers.push(correctAnswer);
    return wrongAnswers.sort(() => Math.random() - 0.5); // Shuffle options
}

// Function to check the selected answer and display feedback
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }
    
    const answer = selectedOption.value;
    const feedback = answer === currentCorrectAnswer ? "Correct!" : "Wrong!";
    
    // Update score
    if (feedback === "Correct!") {
        score++;
    }
    
    alert(feedback);
    
    // Update score and move to the next question
    document.getElementById("score").innerText = `Total Score: ${score}`;
    questionCount++;
    
    if (questionCount < totalQuestions) {
        generateQuestion();
    } else {
        alert(`Quiz Finished! Your final score is: ${score}/${totalQuestions}`);
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
}

// No need to call generateQuestion() here since it's already handled after fetching data

function speakPageContent() {
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
        // Get all the text content from the page
        let textToRead = document.body.innerText;

        // Create a new SpeechSynthesisUtterance object
        let utterance = new SpeechSynthesisUtterance(textToRead);

        // Set language and other options if needed
        utterance.lang = 'en-US'; // Set language
        utterance.rate = 1;       // Speed of speech
        utterance.pitch = 1;      // Pitch of speech
        utterance.volume = 1;     // Volume of speech

        // Speak the text
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Your browser does not support text-to-speech.");
    }
}










// let score = 0
// let level = 1

// let Score = document.getElementById("score")
// Score.textContent += score

// let Level = document.getElementById('level')
// Level.textContent += level

// const questions = [
//     {
//         question: "What is an exoplanet?",
//         options: ["A planet within our solar system", "A planet that orbits a star outside our solar system", "A dwarf planet within the Kuiper Belt", "A moon of a gas giant planet"],
//         correctAnswer: 1
//     },
//     {
//         question: "Which of the following exoplanet types is most similar to Earth in terms of size and composition?",
//         options: ["Hot Jupiter", "Super-Earth", "Gas giant", "Ice giant"],
//         correctAnswer: 1
//     },
// ];


// let currentQuestionIndex = 0;

// function loadQuestion() {
//     const currentQuestion = questions[currentQuestionIndex];
//     document.getElementById("question-title").textContent = currentQuestion.question;

//     const optionsContainer = document.getElementById("options-container");
//     optionsContainer.innerHTML = ''; 

//     currentQuestion.options.forEach((option, index) => {
//         const optionElement = document.createElement("div");
//         optionElement.classList.add("option");
//         optionElement.innerHTML = `
//             <input type="radio" name="option" value="${index}" id="option${index}">
//             <label for="option${index}">${option}</label>
//         `;
//         optionsContainer.appendChild(optionElement);
//     });
// }

// function submitAnswer() {
//     const selectedOption = document.querySelector('input[name="option"]:checked');
//     if (selectedOption) {
//         const answerIndex = parseInt(selectedOption.value);
//         const currentQuestion = questions[currentQuestionIndex];

//         if (answerIndex === currentQuestion.correctAnswer) {
//             alert("Correct!");
//             score += 10
//             Score.innerText = "Total Score:" + score
//         } else {
//             alert("Incorrect. The correct answer was " + currentQuestion.options[currentQuestion.correctAnswer]);
//         }

//         currentQuestionIndex++;
//         if (currentQuestionIndex < questions.length) {
//             loadQuestion();
//         } else {
//             alert("Quiz Completed!");
//             level += 1
//             Level.innerText = "Level:" + level
//             document.getElementById('quiz-section').innerHTML = `
//             <div id="congratulations">
//                 <span class="balloon">🎈</span>
//                     Congratulations!
//                 <span class="balloon">🎈</span>
//             </div>
//             <h2>You are one level up.</h2>
//             <a href="index.html"><button>Homepage</button></a>
//             `
//         }
//     } else {
//         alert("Please select an option.");
//     }
// }

// function homepage() {
//     document.getElementById("exoplanet-section").style.display = "none";

//     document.getElementById("menu").style.display = "block";
// }


// function showHomepageButton() {
//     const quizSection = document.getElementById("quiz-section");

//     document.getElementById("submit-button").style.display = "none";

//     const homeButton = document.createElement("button");
//     homeButton.textContent = "Go to Homepage";
//     homeButton.onclick = function () {
//         window.location.href = 'index.html';
//     };

//     quizSection.appendChild(homeButton);
// }

// window.onload = loadQuestion;



