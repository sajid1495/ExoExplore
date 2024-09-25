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

    let plName = planet.pl_name;
    let formattedName = plName.replace(/\s+/g, '-').toLowerCase();
    //console.log(formattedName); 
    let link = `https://science.nasa.gov/exoplanet-catalog/${formattedName}/`;

    // Check if there is data to display
    if (planet) {
        planetDataDiv.innerHTML = `
            <p><strong>Planet Name:</strong> ${planet.pl_name}</p>
            <p><strong>Mass (in Earth masses):</strong> ${planet.pl_masse ?? 'Unknown'}</p>
            <p><strong>Discovery Year:</strong> ${planet.disc_year}</p>
            <p><strong>Discovery Telescope:</strong> ${planet.disc_telescope}</p>
            <p><strong>Orbital Period (days):</strong> ${planet.pl_orbper}</p>
            <p><strong>Density (g/cm³):</strong> ${planet.pl_dens ?? 'Unknown'}</p>
            <a class="button" href="${link}" target="_blank">Explore More</a>
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
        // Stop any ongoing speech
        window.speechSynthesis.cancel();
        
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


// Function to show the developer info modal
function showDevInfo() {
    document.getElementById("devInfoModal").style.display = "block";
}

// Function to hide the developer info modal
function hideDevInfo() {
    document.getElementById("devInfoModal").style.display = "none";
}

// Hide the modal if the user clicks outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("devInfoModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
