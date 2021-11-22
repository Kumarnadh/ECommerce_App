  // Cart Details

var shoppingWishList = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart1 = [];
    
    // Constructor
    function Item(name1, price1, imgSrc1, width1, count1) {
      this.name1 = name1;
      this.price1 = price1;
      this.count1 = count1;
      this.imgSrc1 = imgSrc1;
      this.width1 = width1;
    }
    
    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingWishlist', JSON.stringify(cart1));
    }
    
      // Load cart
    function loadCart() {
      cart1 = JSON.parse(localStorage.getItem('shoppingWishlist'));
    }

    if (localStorage.getItem("shoppingWishlist") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name1, price1, imgSrc1, width1, count1) {
      for(var item in cart1) {
        if(cart1[item].name1 === name1) {
          // cart1[item].count1 ++; **** Wish list have double click not applicable ****
          saveCart();
          return;
        }
      }
      var item = new Item(name1, price1, imgSrc1, width1, count1);
      cart1.push(item);
      saveCart();
    }

    obj.setCountForItem = function(name1, count1) {
      for(var i in cart1) {
        if (cart1[i].name1 === name1) {
          cart1[i].count1 = count1;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name1) {
        for(var item in cart1) {
          if(cart1[item].name1 === name1) {
            cart1[item].count1 --;
            if(cart1[item].count1 === 0) {
              cart1.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name1) {
      for(var item in cart1) {
        if(cart1[item].name1 === name1) {
          cart1.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart1 = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart1) {
        totalCount += cart1[item].count1;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart1) {
        totalCart += cart1[item].price1 * cart1[item].count1;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart1) {
        item = cart1[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price1 * item.count1).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();

//   cart Add details

$('.add_wishlist').click(function(event) {
    event.preventDefault();
    var name1 = $(this).data('name1');
    var price1 = Number($(this).data('price1'));
    var imgSrc1 = $(this).data('image1');
    var width1 = $(this).data('width1');
    shoppingWishList.addItemToCart(name1, price1, imgSrc1, width1,1);
    displayWishlist();
  });

  // Displaying Wishlist
  icon_wishList_darkEl = document.getElementById("icon_wishList_dark");
  icon_wishList_whiteEl = document.getElementById("icon_wishList_white");
  icon_cart_darkEl = document.getElementById("icon_cart_dark");
  icon_cart_lightEl = document.getElementById("icon_cart_light");

  function displayWishlist() {
    $('.wish_list').html(shoppingWishList.totalCount());
    if (shoppingWishList.totalCount() > 0){
      icon_wishList_darkEl.classList.remove("d-none");
      icon_wishList_whiteEl.classList.add("d-none");
    }
  }

  displayWishlist();

  // Adding Wishlist to local storage

  icon_wishList_darkEl = document.getElementById("icon_wishList_dark");
  icon_wishList_whiteEl = document.getElementById("icon_wishList_white");
  icon_cart_darkEl = document.getElementById("icon_cart_dark");
  icon_cart_lightEl = document.getElementById("icon_cart_light");
  let cartWishlist = localStorage.getItem("shoppingWishlist");
  displayWishlist(cartWishlist);
  function displayWishlist() {
    var cartArray = shoppingWishList.listCart();
    var output = "";
    for(var i in cartArray) {
    output += 
    "<tr class='pt-30'>"
      + "<td class='custome-checkbox pl-30'>"
      + "</td>"
      + `<td class='image product-thumbnail pt-40'><img src= ${cartArray[i].imgSrc1} alt='#' />`
      + "</td>"
      + "<td class='product-des product-name'>"
      + `<h6><a class='product-name mb-10' href='shop-product-right.html'>${cartArray[i].name1}</a></h6>`
      + "<div class='product-rate-cover'>"
      + "<div class='product-rate d-inline-block'>"
      + `<div class='product-rating' style='width: ${cartArray[i].width1}'></div>`
      + "</div>"
      + "<span class='font-small ml-5 text-muted'> (4.0)</span>"
      + "</div>"
      + "</td>"
      + "<td class='price' data-title='Price'>"
      + `<h3 class='text-brand'>$${cartArray[i].price1}</h3>`
      + "</td>"
      + "<td class='text-center detail-info' data-title='Stock'>"
      + "<span class='stock-status in-stock mb-0'> In Stock </span>"
      + "</td>"
      + "<td class='action text-center' data-title='Remove'>"
      + "<a data-name1=" + JSON.stringify(cartArray[i].name1) + " class='text-body delete-item'><i class='fi-rs-trash'></i></a>"
      + "</td>"
      + "</tr>"
      +  "</tr>";
    }
    $('.cart_wishlist').html(output);
    $('.wish_list').html(shoppingWishList.totalCount());
    $('.wishList_count').html(shoppingWishList.totalCount());
    
    if (shoppingWishList.totalCount() === 0){
      icon_wishList_darkEl.classList.add("d-none");
      icon_wishList_whiteEl.classList.remove("d-none");
    }

    if (shoppingWishList.totalCount() > 0){
      icon_wishList_darkEl.classList.remove("d-none");
      icon_wishList_whiteEl.classList.add("d-none");
    }
  }

  // Delete button
  $('.cart_wishlist').on("click", ".delete-item", function(event) {
    var name = $(this).data('name1');
    shoppingWishList.removeItemFromCartAll(name);
    displayWishlist();
  })

  displayWishlist();

// Old Details of cart
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
  $('.home_wishlist').html(shoppingCart.totalCount());
  $('.cart_dd_total').html(shoppingCart.totalCart());

if(shoppingCart.totalCount() == 0){
    counter_disp_cartEl.classList.add("d-none");
  } else if(shoppingCart.totalCount() > 0){
    counter_disp_cartEl.classList.remove("d-none");
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

displayCart();