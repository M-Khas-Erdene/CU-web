
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    let currentIndex = 0;

    function showImage(index) {
        const totalImages = document.querySelectorAll(".carousel img").length;
        index = (index + totalImages) % totalImages;
        const translateValue = -index * 100 + "%"; /* Change from 10% to 100% for proper image translation */
        carousel.style.transform = "translateX(" + translateValue + ")";
        currentIndex = index;
    }

    // Function to handle next button click
    function nextImage() {
        showImage(currentIndex + 1);
    }

    // Function to handle previous button click
    function prevImage() {
        showImage(currentIndex - 1);
    }

    // Set up event listeners for next and previous buttons
    document.querySelector(".nex").addEventListener("click", nextImage);
    document.querySelector(".pre").addEventListener("click", prevImage);
});