document.getElementById("cart-info").addEventListener("click", function() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("show-cart");
  //console.log(cart);
});
(function() {
  let imageList = [];
  let counter = 0;
  const images = document.querySelectorAll(".store-img");
  const container = document.querySelector(".lightbox-container");
  const item = document.querySelector(".lightbox-item");
  const closeIcon = document.querySelector(".lightbox-close");
  const btnLeft = document.querySelector(".btnLeft");
  const btnRight = document.querySelector(".btnRight");
  images.forEach(function(img){
    imageList.push(img.src);
  });
  //console.log(imageList);
  images.forEach(function(img){
    img.addEventListener('click', function(event){
      container.classList.add('show');
      let src = event.target.src;
      //console.log(src);
      counter = imageList.indexOf(src);
      //console.log(counter);
      item.style.backgroundImage = `url(${src})`;
    });
  });
  closeIcon.addEventListener('click', function(){
    container.classList.remove('show');
  });
  btnLeft.addEventListener('click', function(){
    counter--;
    if(counter < 0){
      counter = imageList.length - 1;
    }
    //console.log(counter);
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });
  btnRight.addEventListener('click', function(){
    counter++;
    if(counter === imageList.length){
      counter = 0;
    }
    //console.log(counter);
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });
})();
(function(){
  const filterBtn = document.querySelectorAll('.filter-btn');
  filterBtn.forEach(function(btn){
      btn.addEventListener('click', function(event){
          event.preventDefault();
          const value = event.target.dataset.filter;
          const items = document.querySelectorAll('.store-item');
          //console.log(value);
          items.forEach(function(item){
              if(value === 'all'){
                  item.style.display = 'block';
              }
              else{
                  if(item.classList.contains(value)){
                      item.style.display = 'block';
                  }
                  else{
                      item.style.display = "none";
                  }
              }
          });
      });
  });
})();

(function(){
  const search = document.getElementById('search-item');
  search.addEventListener('keyup', function(){
      let value = search.value.toLowerCase().trim();
      const items = document.querySelectorAll('.store-item');
      items.forEach(function(item){
          let type = item.dataset.item;
          let length = value.length;
          let match = type.slice(0, length);
          if(value === match){
              item.style.display = 'block';
          }
          else{
              item.style.display = 'none';
          }
      });
  });
})();

(function(){
  const addToCart = document.querySelectorAll('.store-item-icon');
  const cart = document.getElementById('cart');
  addToCart.forEach(function(item){
      item.addEventListener('click', function(event){
        //console.log(event.target);
        if(event.target.parentElement.classList.contains('store-item-icon')){
          const fullPath = event.target.parentElement.previousElementSibling.src;
        const pos = fullPath.indexOf('img') + 3;
        const partPath = fullPath.slice(pos);
        //console.log(partPath);
        const item = {};
        item.img = `img-cart${partPath}`;
        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        item.name = name;
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
        //console.log(finalPrice);
        //console.log(name);
        //console.log(item);
        const div = document.createElement('div');
        div.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
          div.innerHTML = `
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">

            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
            <span>$</span>
            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
          </div>
          <a href="#" id='cart-item-remove' class="cart-item-remove">
            <i class="fas fa-trash"></i>
          </a>
        `;
          cart.insertBefore(div, document.querySelector('.cart-total-container'));
          alert('item added to the cart');
          showTotal();
        }
      });
  });

  function showTotal(){
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(function(item){
      total.push(parseFloat(item.textContent));
      //console.log(total);
      const totalPrice = total.reduce(function(acc, curr){
        acc += curr;
        return acc;
      },0);
      //console.log(totalPrice);
      document.getElementById('cart-total').textContent = totalPrice.toFixed(2);
      document.querySelector('.item-count').textContent = total.length;
      document.querySelector('.item-total').textContent = totalPrice.toFixed(2);
    });
  }
})();