// API key obtained from https://api.nasa.gov/
const apiKey = 'YOUR_API_KEY';

// Function to fetch data from the NASA API and display the current image of the day
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split('T')[0];
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayImage(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to fetch data from the NASA API and display the image of the selected date
function getImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayImage(data);
      saveSearch(date);
      addSearchToHistory(date);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to save a date to local storage
function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add the date to the search history list in the UI
function addSearchToHistory(date) {
  const searchHistory = document.getElementById('search-history');
  const listItem = document.createElement('li');
  listItem.textContent = date;
  listItem.addEventListener('click', () => {
    getImageOfTheDay(date);
  });
  searchHistory.appendChild(listItem);
}

// Function to display the image in the UI
function displayImage(data) {
  const imageContainer = document.getElementById('current-image-container');
  imageContainer.innerHTML = '';

  if (data.media_type === 'image') {
    const image = document.createElement('img');
    image.src = data.url;
    image.alt = data.title;
    imageContainer.appendChild(image);
  } else {
    const video = document.createElement('iframe');
    video.src = data.url;
    video.width = '640';
    video.height = '360';
    video.frameBorder = '0';
    video.allowFullscreen = true;
    imageContainer.appendChild(video);
  }
}

// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const searchDate = searchInput.value;
  getImageOfTheDay(searchDate);
});

// Run the getCurrentImageOfTheDay function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  getCurrentImageOfTheDay();
});
