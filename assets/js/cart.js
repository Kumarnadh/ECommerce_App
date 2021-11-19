// Cart Details

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, imgSrc, width, count) {
      this.name = name;
      this.price = price;
      this.count = count;
      this.imgSrc = imgSrc;
      this.width = width;
    }
    
    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCartDetails', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCartDetails'));
    }
    if (localStorage.getItem("shoppingCartDetails") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, imgSrc, width, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, imgSrc, width, count);
      cart.push(item);
      saveCart();
    }

    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();

//   cart Add details
counter_disp_cartEl = document.getElementById("counter_disp_cart");
counter_disp_cart_1El = document.getElementById("counter_disp_cart_1");
icon_cart_darkEl = document.getElementById("icon_cart_dark");
icon_cart_lightEl = document.getElementById("icon_cart_light");

$('.add_cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var imgSrc = $(this).data('image');
    var width = $(this).data('width');
    shoppingCart.addItemToCart(name, price, imgSrc, width,1);
    displayCart();
  });

  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<br><div class='d-flex justify-content-between'>"
        + `<p><a href="shop-product-right.html"><img class='img_width' alt="E-Commerce" src="${cartArray[i].imgSrc}" /></a></p><br>`
        + `<p class="shopping-cart-title w-50"><a href="shop-product-right.html">${cartArray[i].name}
        </a>
        </p>`
        + "<div class='shopping-cart-delete d-flex justify-content-end'>"
        + "<a href='#'><button class='delete-item button_cart' data-name=" + JSON.stringify(cartArray[i].name) + "><i class='fi-rs-cross-small'></i></a></button>"
        + "</div>"
        + "</div>"
        + "<div>"
        + `<p class='d-flex justify-content-center text-justify'>
        <span class='text-black'> ${cartArray[i].count} &nbsp; × &nbsp;</span>
        <span class='text-black'>$</span><span class='text-black'>${cartArray[i].price}</span>
        </p>`
        + "</div><br>";
    }
    $('.model_card_none').html(output);
    $('.home').html(shoppingCart.totalCount());
    $('.cart_dd_total').html(shoppingCart.totalCart());
    if(shoppingCart.totalCount() == 0){
      counter_disp_cartEl.classList.add("d-none");
    } else if(shoppingCart.totalCount() > 0){
      counter_disp_cartEl.classList.remove("d-none");
    }

    if(shoppingCart.totalCount() == 0){
      counter_disp_cart_1El.classList.add("d-none");
    } else if(shoppingCart.totalCount() > 0){
      counter_disp_cart_1El.classList.remove("d-none");
    }

    if (shoppingCart.totalCount() > 0){
      icon_cart_darkEl.classList.remove("d-none");
      icon_cart_lightEl.classList.add("d-none");
    }

    if (shoppingCart.totalCount() === 0){
      icon_cart_darkEl.classList.add("d-none");
      icon_cart_lightEl.classList.remove("d-none");
    }
  }

  // Delete item button
  
  $('.model_card_none').on("click", ".delete-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.model_card_none').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.model_card_none').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.model_card_none').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();

  // WishList Functionality

  icon_wishList_darkEl = document.getElementById("icon_wishList_dark");
  icon_wishList_whiteEl = document.getElementById("icon_wishList_white");

  if (shoppingWishList.totalCount() > 0){
    icon_wishList_darkEl.classList.remove("d-none");
    icon_wishList_whiteEl.classList.add("d-none");
  }