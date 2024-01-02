

//undsen tom zurguudig guilgj harah code

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

//end duusna
function isPriceInRange(productPrice, selectedPriceRange) {
  if (selectedPriceRange === '') {
    return true; // If "All Prices" is selected, don't filter by price
  }
  const [min, max] = selectedPriceRange.split('-').map(Number);
  return productPrice >= min && productPrice <= max;
}




  // baraagaa sagsand hiihin tuld tuld ali baraag neej bgag damjuulah object butsaadg function
  function findProductByMore(pidValue, data) {
    return data.find(product => product.pID === pidValue);
  }
 //end duusna
 
  
 function openPopup(productId){
  const popup=document.querySelector(`.productGet[data-id="${productId}"]`);
  if(popup){
      popup.classList.add('active');
      backdrop.classList.add('show');
  }
 }


// Neegdsen buteegdehuunii medeellig haahad ashiglagdh code
function ClosePopup(){
    const activePopup=document.querySelector(`.productGet.active`);
if(activePopup){
    activePopup.classList.remove('active');
    backdrop.classList.remove('show');
}
}
//end duusna

// sagsni neegdj haagdahd herglh code 
const openBtn=document.getElementById('openBasketBtn');
const basket=document.getElementById('sideBasket');
const closeBtn=document.getElementById('btnClose');
const backdrop=document.querySelector('.backDrop');

openBtn.addEventListener('click',openBasket);
closeBtn.addEventListener('click',closeBasket);

function openBasket(){
    basket.classList.add('open');
    backdrop.classList.add('show');
}

function closeBasket(){
    basket.classList.remove('open');
    backdrop.classList.remove('show');
}


// end duusn

// ymar2 uilchilge uzulj buug haruulah repeater
document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.getElementById('serviceCarousel');
    const numImages = 5;
    const numRepeats = 4; // Number of times to repeat the images
  
    for (let i = 0; i < numRepeats; i++) {
      for (let j = 1; j <= numImages; j++) {
        const img = document.createElement('img');
        img.src = `assets/svg/service${j}.svg`;
        img.alt = `service${j}`;
        carouselContainer.appendChild(img);
      }
    }
  
    carouselContainer.classList.add('carousel'); // Add the carousel class
  
    // Optionally, you can add your carousel initialization logic here
  });
  // end duusn

  //


export {openPopup,ClosePopup,findProductByMore,isPriceInRange,plusSlides}; 