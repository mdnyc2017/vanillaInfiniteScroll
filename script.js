const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Consts for Unsplash API
const apiKey = '';
let photoCount = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${photoCount}`;

// Check if all images were loaded:
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        photoCount = 30;
    }
}

// setAttribute helper func
function setAttributes(elem, attributes){
    for(const key in attributes){
        elem.setAttribute(key, attributes[key]);
    }
};

// Create Elements for Photos and Links, then add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{

        // create anchor element to link to photo on Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create image element for Photos
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event listener to check when each image is finished loading
        img.addEventListener('load', imageLoaded)

        // nest <img> as child inside of <a> and append to imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Fetch Photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
    }
}

// Check to see if scrolling near bottom of the page to load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


// On Load:
getPhotos();
