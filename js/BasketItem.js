
import Product from './Product.js';

class BasketItem extends Product {

    constructor(name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, pID,type){
        super(name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, pID,type);
    }
    generateBasketItems(){
    const countElement = document.querySelector(`[data-count="${this.pID}"]`);
    const count = countElement ? parseInt(countElement.textContent) : 0;
    return `<div class="basketItem">
        <div class="itemDetails">
            <img src="assets/png/${this.image}" alt="${this.name}">
            <article >
                <h3>${this.name}</h3>
                <p><span data-count="basketCount">${count}</span> x <span class="nogoon">${this.Price}</span></p>
            </article>
        </div>
        <div class="removeItem">&times;</div>
    </div>`;
    }
}
export default BasketItem;
