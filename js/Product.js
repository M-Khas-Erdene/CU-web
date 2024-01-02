

class Product {
  constructor(name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, pID,type) {
    this.discount = discount || null;
    this.name = name;
    this.description = description;
    this.discount = discount;
    this.Price = Price || null;
    this.discountingPrice = discountingPrice;
    this.image = image;
    this.manufacturer = manufacturer;
    this.weight = weight;
    this.expiration = expiration;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.storage = storage;
    this.pID = pID;
    this.type = type||null;
  }

  generateHTML() {
    let html = `
          <article class="product" >
          `;
            
            if (this.discount != "") {
                html += `<span>${this.discount}</span>`;
              }
            html += `
            <div >
              <img src="assets/png/${this.image}" alt="${this.name}">
              <h3>${this.name}</h3>
            </div>
            <p>${this.description}</p>
            
            `;
      
        if (this.discountingPrice != "") {
          html += `<p class="discount">${this.discountingPrice}</p>`;
        }
      
        html += `
            <strong>${this.Price}</strong>
              <button class="popup-button" id="${this.pID}">Үзэх</button>
          </article>
        `
        ;
        html +=`
        <div class="productGet" data-id="${this.pID}">
        <div class="productExit">
            <span class="close-popup">&times;</span>
        </div>
        <figure>`
        if(this.discountingPrice != ""){
          html+=`<figcaption><span>${this.discount}</span></figcaption>`;
        }html+=`
        
        <img src="assets/png/${this.image}" alt="">
         
        </figure>
        <article class="productDescription">
          <h2>${this.name}</h2>
            <div class="productPrice">
                <h2 class="discountingPrice">${this.discountingPrice}</h2>
                <h2 class="normalPrice">${this.Price}</h2>
            </div>
            <div class="productDetails">
                <p>Үйлдвэрлэгч:${this.manufacturer}</p>
                <p>Жин:${this.weight}</p>
                <p>Дуусах хугацаа:${this.expiration}</p>
                <p>Орц:${this.ingredients}</p>
                <p>Хэргэлэх Заавар${this.instructions}</p>
                <p>Хадгалах горим:${this.storage}</p>
            </div>
            <div class="buttons">
                <div class="b-productAdd"> 
                <button class="b" data-element="${this.pID}">Сагслах</button>
                <div class="productAdd">
                    <button onclick="updateCounter('increment',${this.pID})">+</button>
                    <p data-count="${this.pID}">1</p>
                    <button onclick="updateCounter('decrement',${this.pID})">-</button>
                </div>
                </div>
            </div>
        </article>
       
    </div>`
        return html 
  }
}
export default Product;
