// Initialize an empty array for exoplanet data
let exoplanetData = [];
let currentIndex = 0;

// Fetch data from the data.txt file
fetch('data.txt')
    .then(response => response.json())  // Parse the file content as JSON
    .then(data => {
        exoplanetData = data;  // Store the data in the exoplanetData array
        displayPlanetData(currentIndex);
        currentIndex++;
    });

// Function to display the current planet data
function displayPlanetData(index) {
    const planet = exoplanetData[index];
    const planetDataDiv = document.getElementById('planetData');

    // Check if there is data to display
    if (planet) {
        planetDataDiv.innerHTML = `
            <p><strong>Planet Name:</strong> ${planet.pl_name}</p>
            <p><strong>Mass (in Earth masses):</strong> ${planet.pl_masse ?? 'Unknown'}</p>
            <p><strong>Discovery Year:</strong> ${planet.disc_year}</p>
            <p><strong>Discovery Telescope:</strong> ${planet.disc_telescope}</p>
            <p><strong>Orbital Period (days):</strong> ${planet.pl_orbper}</p>
            <p><strong>Density (g/cm³):</strong> ${planet.pl_dens ?? 'Unknown'}</p>
        `;
    } else {
        planetDataDiv.innerHTML = `<p>No more planets to display.</p>`;
    }
}

// Add event listener to button
document.getElementById('nextButton').addEventListener('click', function() {
    if (currentIndex < exoplanetData.length) {
        displayPlanetData(currentIndex);
        currentIndex++;
    } else {
        displayPlanetData(currentIndex);
    }
});

let currentExoplanetIndex = 0;

function startApp() {
    displayPlanetData();
}

function homepage() {
    window.location.href = 'index.html';
}

function speakPlanetData() {
    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
        // Get the text content from the div with id 'planetData'
        let textToRead = document.getElementById('planetData').innerText;

        // Check if there is any content to read
        if (textToRead.trim() === '') {
            alert("No data available to read.");
            return;
        }

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

var typed = new Typed(".text", {
    strings: ["ExoExplore"],
    typeSpeed: 100,
    backSpeed: 10,
    backDelay: 100,
    loop: true,
});
  