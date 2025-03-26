$(document).ready(function () {
    $('.increment-btn').click(function (e) { 
        e.preventDefault();

        var inc_value = $(this).closest('.product_data').find('.qty-input').val();
        var value = parseInt(inc_value,10);
        value = isNaN(value)?0: value;1
        if(value < 10){
            value ++;
            $(this).closest('.product_data').find('.qty-input').val(value);
        }
        
    });

    $('.decrement-btn').click(function (e) { 
        e.preventDefault();

        var inc_value = $(this).closest('.product_data').find('.qty-input').val();
        var value = parseInt(inc_value,10);
        value = isNaN(value)?0: value;
        if(value > 1 ){
            value --;
            $(this).closest('.product_data').find('.qty-input').val(value);
        }
        
    });

    $('.addToCartBtn').click(function (e) { 
        e.preventDefault();
        
        var product_id = $(this).closest('.product_data').find('.prod_id').val();
        var product_qty = $(this).closest('.product_data').find('.qty-input').val();
        var token =$('input[name=csrfmiddlewaretoken]').val();
        
        $.ajax({
            type:"POST",
            url: "/add-to-cart",
            data: {
                'product_id': product_id,
                'product_qty': product_qty,
                csrfmiddlewaretoken: token


            },
            success: function (response) {
                console.log(response)
                alertify.success(response.status)
            }
        });
    });


    $('.addToWishlist').click(function (e) { 
        e.preventDefault();
        var product_id = $(this).closest('.product_data').find('.prod_id').val();
        var token =$('input[name=csrfmiddlewaretoken]').val();

        $.ajax({
            type: "POST",
            url: "/add-to-wishlist",
            data: {
                'product_id': product_id,
                csrfmiddlewaretoken: token
            },
            success: function (response) {
                alertify.success(response.status)
            }
        });
    });



    $('.changeQuantity').click(function (e) { 
        e.preventDefault();
        
        var product_id = $(this).closest('.product_data').find('.prod_id').val();
        var product_qty = $(this).closest('.product_data').find('.qty-input').val();
        var token =$('input[name=csrfmiddlewaretoken]').val();
        
        $.ajax({
            type:"POST",
            url: "/update-cart",
            data: {
                'product_id': product_id,
                'product_qty': product_qty,
                csrfmiddlewaretoken: token


            },
            success: function (response) {
                console.log(response)
                // alertify.success(response.status)
            }
        });
    });
    
    $(document).on('click', '.delete-cart-item', function (e) {
        e.preventDefault();

        var product_id = $(this).closest('.product_data').find('.prod_id').val();
        var token =$('input[name=csrfmiddlewaretoken]').val();

        $.ajax({
            type: "POST",
            url: "delete-cart-item",
            data: {
                'product_id': product_id,
                csrfmiddlewaretoken: token

            },
            success: function (response) {
                alertify.success(response.status)
                $('.cartdata').load(location.href + " .cartdata");
                }  
        });
    });

    $(document).on('click', '.delete-wishlist-item', function (e) {

        e.preventDefault();
        var product_id = $(this).closest('.product_data').find('.prod_id').val();
        var token =$('input[name=csrfmiddlewaretoken]').val();
        
        $.ajax({
            type: "POST",
            url: "/delete-wishlist-item",
            data: {
                'product_id': product_id,
                csrfmiddlewaretoken: token
    
            },
            success: function (response) {
                alertify.success(response.status)
                $('.wishdata').load(location.href + " .wishdata");
                }  

            });
    });
    
});


