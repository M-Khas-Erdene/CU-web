const productQuantities = {};
function updateCounter(action, moreValue) {
  const countElement = document.querySelector(`[data-count="${moreValue}"]`);
  
  if (countElement) {
    let count = parseInt(countElement.textContent);

    if (action === 'increment') {
      count++;
    } else if (action === 'decrement' && count > 1) {
      count--;
    }
    countElement.textContent = count;

    // Update the global variable with the latest count
    productQuantities[moreValue] = count;
  }
}
function setCounter(productId){
    const countElement = document.querySelector(`[data-count="${productId}"]`);

    if(productId){
        let count=parseInt(countElement.textContent);
        count=1;
        countElement.textContent=count;
    }
}
let currentSlide = 0;
const slides = [
  "assets/png/frontImage1.png",
  "assets/png/frontImage2.png",
  "assets/png/frontImage3.png",
];

function showSlide() {
  const slideshowImage = document.getElementById("slideshow");
  slideshowImage.style.opacity = 0; 
  setTimeout(() => {
    slideshowImage.src = slides[currentSlide];
    slideshowImage.style.opacity = 1; 
  }, 500); 
}

function plusSlides(n) {
  currentSlide += n;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
}
