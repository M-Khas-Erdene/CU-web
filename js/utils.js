

//undsen tom zurguudig guilgj harah code



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

  // end duusn

  //


export {openPopup,ClosePopup,findProductByMore,isPriceInRange}; 