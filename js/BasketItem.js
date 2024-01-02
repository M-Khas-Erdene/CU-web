
import Product from './Product.js';

class BasketItem extends Product {

    constructor(name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, pID,type,count){
        super(name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, pID,type);
        this.count=count;
    }
    
    generateBasketItems(){
    return `<div class="basketItem">
        <div class="itemDetails">
            <img src="assets/png/${this.image}" alt="${this.name}">
            <article >
                <h3>${this.name}</h3>
                <p><span data-count="basketCount">${this.count}</span> x <span class="nogoon">${this.Price}</span></p>
            </article>
        </div>
        <div class="removeItem" data-productID="${this.pID}">&times;</div>
    </div>`;
    }
}
export default BasketItem;
