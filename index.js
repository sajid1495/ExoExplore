const exoplanets = [
    {
        image: 'images/toi-6255-b.png',
        planet: 'TOI-6255 b',
        description: `A potentially rocky world, larger than Earth.`,
        link: 'https://science.nasa.gov/exoplanet-catalog/toi-6255-b/'
    },
    {
        image: 'images/hd-135694-b.png',
        planet: 'HD 135694 b',
        description: `A Neptune-like giant planet.`,
        link: 'https://science.nasa.gov/exoplanet-catalog/hd-135694-b/'
    },
    {
        image: 'images/gj-238-b.png',
        planet: 'GJ 238 b',
        description: `A rocky world outside our solar system.`,
        link: 'https://science.nasa.gov/exoplanet-catalog/gj-238-b/'
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
    document.getElementById('exoplanet-name').textContent = exoplanet.planet;
    document.getElementById('exoplanet-description').textContent = exoplanet.description;
    document.querySelector('a').setAttribute('href',exoplanet.link);
    
    currentExoplanetIndex = (currentExoplanetIndex + 1) % exoplanets.length;
}

function homepage() {
    document.getElementById("exoplanet-section").style.display = "none";

    document.getElementById("menu").style.display = "block";
}

