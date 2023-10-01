const apiKey = 'G3eVnhwuDrFoNRrSIs6RCS1MjNpv29rmGiG7eQamvsI'

// Get references to HTML elements
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('.input-icon');
const imageContainer = document.querySelector('.image-container');
const ulElement = document.querySelector('.image-container');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error-message');

// Unsplash API endpoint with search keyword and access key
const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=YOUR_SEARCH_KEYWORD&client_id=${apiKey}`;

// Function to fetch images based on user input
const fetchImages = async () => {
 // Clear the previous images or error message
 imageContainer.innerHTML = '';
 errorMessage.style.display = 'none';
 const query = searchInput.value.trim();

 if (query === '') {
  alert('Please enter a search term.');
  return;
 }
 // Show the loader while fetching
 loader.style.display = 'block';

 try {
  // Update the API URL with the user's query
  const apiUrl = unsplashApiUrl.replace('YOUR_SEARCH_KEYWORD', query);

  // Use Fetch API to make the GET request
  const response = await fetch(apiUrl);

  if (!response.ok) {
   throw new Error('Network response was not ok');
  }

  const images = await response.json();
  // Check if no images were found
  if (images.results.length === 0) {
   // Display an error message for no results
   errorMessage.textContent = 'No images found for the given search term.';
   errorMessage.style.display = 'block';
  } else {
   // Display the images if they are found
   setTimeout(() => {
    displayImages(images.results);
   }, 4000);
  }
 } catch (error) {
  // Display an error message
  errorMessage.textContent = 'Error fetching images: ' + error.message;
  errorMessage.style.display = 'block';
 } finally {
  // Hide the loader when done fetching
  loader.style.display = 'none';
 }
};

// Function to display fetched images
const displayImages = (images) => {

 images.forEach((image) => {
  // Create an <li> element for each image
  const liElement = document.createElement('li');
  liElement.classList.add('image-item'); // Optional: Add a CSS class to style each item

  // Create an <img> element for the image
  const imgElement = document.createElement('img');
  imgElement.src = image.urls.small;
  imgElement.alt = image.alt_description;

  // Append the <img> element to the <li> element
  liElement.appendChild(imgElement);

  // Append the <li> element to the <ul> element
  ulElement.appendChild(liElement);
 });

 // Append the <ul> element to the image container
 imageContainer.appendChild(ulElement);
};

// Event listener for the search button
searchButton.addEventListener('click', fetchImages);

// Event listener for pressing Enter in the input field
searchInput.addEventListener('keypress', (e) => {
 if (e.key === 'Enter') {
  fetchImages();
 }
});
