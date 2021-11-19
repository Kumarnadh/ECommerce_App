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

  function displayWishlist() {
    $('.wish_list').html(shoppingWishList.totalCount());
    if (shoppingWishList.totalCount() > 0){
      icon_wishList_darkEl.classList.remove("d-none");
      icon_wishList_whiteEl.classList.add("d-none");
    }
  }

  displayWishlist();