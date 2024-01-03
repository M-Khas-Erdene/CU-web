

document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.getElementById('serviceCarousel');
    const numImages = 5;
    const numRepeats = 4; 
  
    for (let i = 0; i < numRepeats; i++) {
      for (let j = 1; j <= numImages; j++) {
        const img = document.createElement('img');
        img.src = `assets/svg/service${j}.svg`;
        img.alt = `service${j}`;
        carouselContainer.appendChild(img);
      }
    }
  
    carouselContainer.classList.add('carousel'); 

  });


