

class Product {
  constructor(name = 'Loading...', description = 'Loading...', Price = 'Loading...', image = 'placeholder.png', discount = null, discountingPrice = null, manufacturer = 'Loading...', weight = 'Loading...', expiration = 'Loading...', ingredients = 'Loading...', instructions = 'Loading...', storage = 'Loading...', pID = -1, type = null) {
    this.discount = discount;
    this.name = name;
    this.description = description;
    this.Price = Price;
    this.discountingPrice = discountingPrice;
    this.image = image;
    this.manufacturer = manufacturer;
    this.weight = weight;
    this.expiration = expiration;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.storage = storage;
    this.pID = pID;
    this.type = type;
  }

  generateHTML() {
    return `
      <article class="product">
        ${this.generateProductHTML()}
      </article>

      <div class="productGet" data-id="${this.pID}">
        ${this.generateProductDetailsHTML()}
      </div>
    `;
  }

  generateProductHTML() {
    return `
      <div>
        <img src="assets/png/${this.image}" alt="${this.name}">
        <h3>${this.name}</h3>
      </div>
      <p>${this.description}</p>
      ${this.discountingPrice ? `<p class="discount">${this.discountingPrice}</p>` : ''}
      <strong>${this.Price}</strong>
      <button class="popup-button" id="${this.pID}">Үзэх</button>
    `;
  }

  generateProductDetailsHTML() {
    return `
      <div class="productExit">
        <span class="close-popup">&times;</span>
      </div>
      <figure>
        ${this.discountingPrice ? `<figcaption><span>${this.discount}</span></figcaption>` : ''}
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
    `;
  }
}

export default Product;

