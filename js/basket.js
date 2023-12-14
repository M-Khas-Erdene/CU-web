// basket.js

document.addEventListener('DOMContentLoaded', function () {
    const openBasketBtn = document.getElementById('openBasketBtn');
    const sideBasket = document.getElementById('sideBasket');
    const btnClose = document.getElementById('btnClose');
    const backDrop = document.querySelector('.backDrop');

    openBasketBtn.addEventListener('click', function () {
        sideBasket.classList.add('active');
        backDrop.classList.add('show');
    });

    btnClose.addEventListener('click', function () {
        sideBasket.classList.remove('active');
        backDrop.classList.remove('show');
    });

    backDrop.addEventListener('click', function () {
        sideBasket.classList.remove('active');
        backDrop.classList.remove('show');
    });

    function updateTotalPrice() {
        const totalPriceElement = document.getElementById('totalPrice');
        const totalAmount = calculateTotalPrice(); 
        totalPriceElement.innerText = totalAmount.toFixed(2) + "₮";
    }

    function calculateTotalPrice() {
        const basketItems = document.querySelectorAll('.basketItem');
        let totalAmount = 0;

        basketItems.forEach(item => {
            const quantity = parseInt(item.querySelector('span').innerText);
            const unitPrice = parseFloat(item.querySelector('.nogoon').innerText.replace('₮', ''));
            totalAmount += quantity * unitPrice;
        });

        return totalAmount;
    }
    updateTotalPrice();
});
