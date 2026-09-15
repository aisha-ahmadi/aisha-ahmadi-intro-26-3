/*
document.addEventListener("DOMContentLoaded", () => {
  const url = `https://api.thecatapi.com/v1/images/search?limit=20`;
  const api_key = "live_N7ckGel1dswiU96OlKsxJRXJEL4EzCiimYUuZDQg8StIHztA44fXEOcmkD9689sy"; // Make sure this is your real key

  fetch(url, {
    headers: {
      'x-api-key': api_key
    }
  })
  .then((response) => response.json())
  .then((data) => {
    data.map(function(imageData) {
      let image = document.createElement('img');
      image.src = imageData.url;
          
      let gridCell = document.createElement('div');
      gridCell.classList.add('col', 'col-lg'); // Standard way to add multiple classes
      gridCell.appendChild(image);
        
      document.getElementById('grid').appendChild(gridCell);
    });
  })
  .catch(function(error) {
     console.error(error);
  });
});
*/
// --- FUNCTIONALITY: API Configuration ---
const BASE_URL = 'https://api.thecatapi.com/v1';
const api_key = "live_N7ckGel1dswiU96OlKsxJRXJEL4EzCiimYUuZDQg8StIHztA44fXEOcmkD9689sy";

// Selection of HTML Nodes
const gridContainer = document.getElementById('content-grid');
const photosBtn = document.getElementById('view-photos');
const breedsBtn = document.getElementById('view-breeds');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

// First GET Request
function getCatPhotos() {
  showLoading();
  
  // Appends the endpoint and your 20-image limit perfectly
  //fetch(`${BASE_URL}/images/search?limit=20`)
    fetch(`${BASE_URL}/images/search?limit=20`, {
    headers: {
      'x-api-key': api_key
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to retrieve photos');
      return response.json();
    })
    .then(data => {
      gridContainer.innerHTML = ''; // Clear loading message
      
      data.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'col-lg';
        card.innerHTML = `
          <img src="${cat.url}" alt="Cute Cat Snapshot">
          <div class="cat-info">
            
          </div>
        `;
        gridContainer.appendChild(card);
      });
    })
    .catch(error => handleRenderError(error));
}

// Second GET Request
function getCatBreeds() {
  showLoading();
  
  // Separate endpoint requesting ONLY breed information
  //fetch(`${BASE_URL}/breeds?limit=20`)
  //fetch(`${BASE_URL}/images/search?limit=10&has_breeds=1`)
   fetch(`${BASE_URL}/images/search?limit=20&has_breeds=1`, {
    headers: {
      'x-api-key': api_key
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to retrieve breeds');
      return response.json();
    })
    .then(data => {
      gridContainer.innerHTML = ''; // Clear loading message
      
      data.forEach(cat => {
  // Extract the breed information nested inside the image data
     const breedInfo = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

  // Set up safe fallbacks so undefined variables don't crash your script
     const breedName = breedInfo ? breedInfo.name : "Unknown Breed";
     const breedTemp = breedInfo ? breedInfo.temperament : "Sweet & playful";
     const breedDesc = breedInfo ? breedInfo.description : "No description available.";

        const card = document.createElement('div');
        card.className = 'col-lg';
        card.innerHTML = `
          <img src="${cat.url}" alt="${breedName}">
          <div class="cat-info">
          <p class="cat-title">${breedName}</p>
          <p class="cat-desc"><strong>Temperament:</strong> ${breedTemp}</p>
          <p class="cat-desc" style="margin-top: 8px;">${breedDesc}</p>
          </div>
        `;
        gridContainer.appendChild(card);
      });
    })
    .catch(error => handleRenderError(error));
}

function showLoading() {
  gridContainer.innerHTML = '<div class="status-msg">Fetching items from the API...</div>';
}

function handleRenderError(error) {
  console.error("API error details:", error);
  gridContainer.innerHTML = `<div class="status-msg" style="color: #e60023;">Oops! Something went wrong while grabbing the data. Please try again.</div>`;
}


photosBtn.addEventListener('click', () => {
  if (photosBtn.classList.contains('active')) return;
  

  photosBtn.classList.add('active');
  breedsBtn.classList.remove('active');
  pageTitle.textContent = "Our Feline Friends";
  pageSubtitle.textContent = "A Pinterest-style view of our favorite felines.";
  

  getCatPhotos();
});

breedsBtn.addEventListener('click', () => {
  if (breedsBtn.classList.contains('active')) return;
  

  breedsBtn.classList.add('active');
  photosBtn.classList.remove('active');
  pageTitle.textContent = "Breed Directory";
  pageSubtitle.textContent = "Detailed profiles of various cat breeds.";
  
  getCatBreeds();
});


window.addEventListener('DOMContentLoaded', getCatPhotos);
