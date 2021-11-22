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

  localStorage.setItem("length_of_cart", cart.length);
  

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
  var output3 = "";
    for(var i in cartArray) {
      output3 += 
      "<tr>"
        + "<td class='image product-thumbnail'>" + `<img class="img_cart" src="${cartArray[i].imgSrc}" alt="image">` + "</td>"
        + "<td class='font-style' style='font-size:17px;'>" + "<h6 class='text-heading'>" + cartArray[i].name + "</h6>" + "</td>"
        + "<td>" +"<h6 class='text-muted'>"+ "X" + "&nbsp;&nbsp;" + cartArray[i].count +"</h6>"+"</td>"
        + "<td style='text-align:center;'>" +"<h4 class='text-brand'>$"+ cartArray[i].total +"</h4>"+"</td>" 
        +  "</tr>";
    }
  $('.cart-item-checkout').html(output3);
  $('.model_card_none').html(output);
  $('.total_checkout').html(shoppingCart.totalCart());
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

// Item count input
$('.model_card_none').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

no_itemsEl = document.getElementById("no-items");
no_itemsEl.textContent = localStorage.getItem("length_of_cart");

// WishList Functionality

// icon_wishList_darkEl = document.getElementById("icon_wishList_dark");
// icon_wishList_whiteEl = document.getElementById("icon_wishList_white");

// if (shoppingWishList.totalCount() > 0){
//   icon_wishList_darkEl.classList.remove("d-none");
//   icon_wishList_whiteEl.classList.add("d-none");
// }

// *************************************************************************************************************************************//
// ********************************************************* Cart Functionality *******************************************************//
// ************************************************************************************************************************************//

let cartDetails = localStorage.getItem("shoppingCartDetails");
    displayCartDetails(cartDetails);
    function displayCartDetails() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += 
      "<tr class='pt-30'>"
        + "<td class='image product-thumbnail pt-40'>"
        + `<img src="${cartArray[i].imgSrc}" alt='#'>`
        + "</td>"
        + "<td class='product-des product-name'>"
        + `<h6 class="mb-5 ml-10 mr-10"><a class="product-name mb-10 text-heading" href="shop-product-right.html">${cartArray[i].name}</a></h6>`
        + "<div class='product-rate-cover ml-10'>"
        + "<div class='product-rate d-inline-block'>"
        + `<div class='product-rating' style="width:${cartArray[i].width}">
           </div>`
        + "</div>"
        + "<span class='font-small ml-5 text-muted'> (4.0)</span>"
        + "</div>"
        + "</td>"
        + "<td class='price' data-title='Price'>"
        + `<h4 class="text-body">$${cartArray[i].price} </h4>`
        + "</td>"
        + "<div class='detail-extralink mr-15'>"
        + "<div class='detail-qty border radius'>"
        + "<td><div class='d-flex justify-content-center'><button style='width:50px; margin:15px;' class='minus-item input-group-addon btn btn-primary' data-name=" +JSON.stringify(cartArray[i].name) + ">-</button>"
        + "<input type='number' class='item-count cart_quantity' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button style='width:50px; margin:15px;' class='plus-item btn btn-primary input-group-addon' data-name=" + JSON.stringify(cartArray[i].name) + ">+</button></div></td>"
        + "</div>"
        + "</div>"
        + "<td class='price' data-title='Price'>"
        + `<h4 class="text-brand ml-10">$${cartArray[i].total}</h4>`
        + "</td>"
        + "<td class='action text-center' data-title='Remove'>"
        + "<a data-name=" + JSON.stringify(cartArray[i].name) + " class='text-body delete-item'><i class='fi-rs-trash'></i></a>"
        + "</td>"
        + "</tr>";
    }
    var output2 = "";
    for(var i in cartArray) {
        output2 += "<br><div class='d-flex justify-content-between'>"
        + `<p><a href="shop-product-right.html"><img class='img_width' alt="Nest" src="${cartArray[i].imgSrc}" /></a></p><br>`
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
    $('.model_card_none').html(output2);
    $('.cart_dd_total').html(shoppingCart.totalCart());
    $('.cart-items').html(output);
    $('.sub_total').html(shoppingCart.totalCart());
    $('.total').html(shoppingCart.totalCart());
    $('.home').html(shoppingCart.totalCount());
    if(shoppingCart.totalCount() == 0){
      counter_disp_cartEl.classList.add("d-none");
    } else if(shoppingCart.totalCount() > 0){
      counter_disp_cartEl.classList.remove("d-none");
    }

    if (shoppingCart.totalCount() === 0){
      icon_cart_darkEl.classList.add("d-none");
      icon_cart_lightEl.classList.remove("d-none");
    }
  }

  $('.cart-items').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCartDetails();
  })
  
  
  // -1
  $('.cart-items').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCartDetails();
  })
  // +1
  $('.cart-items').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCartDetails();
  })

  // Item count input
  $('.cart-items').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
     shoppingCart.setCountForItem(name, count);
     displayCartDetails();
  });
  
  displayCartDetails();
//   Clear button
  clear_allEl = document.getElementById("clear_all");
  cart_details_modelEl = document.getElementById("cart_details_model");
  sub_totalEl = document.getElementById("sub_total");
  totalEl = document.getElementById("total");
  no_itemsEl = document.getElementById("no-items");
  clear_cart_itemsEl = document.getElementById("clear_cart_items");
  model_countEl = document.getElementById("model_count");

  clear_allEl.onclick = function(){
      localStorage.removeItem("shoppingCartDetails");
      cart_details_modelEl.classList.add("d-none");
      sub_totalEl.textContent = 0;
      totalEl.textContent = 0;
      no_itemsEl.textContent = 0;
      clear_cart_itemsEl.textContent = 0;
      model_countEl.textContent = 0;
      icon_cart_darkEl.classList.add("d-none");
      icon_cart_lightEl.classList.remove("d-none");
  }

  // Delete item button in model
  
  $('.model_card_none').on("click", ".delete-item", function(event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCartAll(name);
    displayCartDetails();
  });

  // WishList Functionality

  // icon_wishList_darkEl = document.getElementById("icon_wishList_dark");
  // icon_wishList_whiteEl = document.getElementById("icon_wishList_white");

  // if (shoppingWishList.totalCount() > 0){
  //   icon_wishList_darkEl.classList.remove("d-none");
  //   icon_wishList_whiteEl.classList.add("d-none");
  // }
  
  // *************************************************************************************************************************************//
  // ************************************************ End Cart Functionality ************************************************************//
  // ************************************************************************************************************************************//