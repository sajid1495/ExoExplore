const exoplanets = [
    {
        image: 'exoplanet1.jpg',
        description: 'Exoplanet 1: A gas giant orbiting a distant star, with a thick atmosphere of hydrogen and helium.'
    },
    {
        image: 'exoplanet2.jpg',
        description: 'Exoplanet 2: A rocky planet similar to Earth, located in the habitable zone of its star.'
    },
    {
        image: 'exoplanet3.jpg',
        description: 'Exoplanet 3: A water world with oceans covering the entire surface, potentially harboring life.'
    }
];

let currentExoplanetIndex = 0;

function startApp() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('exoplanet-section').style.display = 'block';

    document.getElementById('mode-title').textContent = 'Exoplanet Exploration';
    loadNewExoplanet();
}

function loadNewExoplanet() {
    const exoplanet = exoplanets[currentExoplanetIndex];
    document.getElementById('exoplanet-image').src = exoplanet.image;
    document.getElementById('exoplanet-description').textContent = exoplanet.description;
    
    currentExoplanetIndex = (currentExoplanetIndex + 1) % exoplanets.length;
}

function homepage() {
    document.getElementById("exoplanet-section").style.display = "none";

    document.getElementById("menu").style.display = "block";
}

