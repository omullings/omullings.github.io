$(document).ready(function($,window,document){
    'use strict';
    
    // Input field logic
    
    $( ".input" ).focus(function() {
        $( this ).closest(".field").addClass("focused");
    });
    
    $( ".input" ).blur(function() {
        $( this ).closest(".field").removeClass("focused");
    });
    
    $( ".input" ).on("input", function() {        
        if( this.value ){
            $( this ).closest(".field").addClass("has-value");
        } else {
            $( this ).closest(".field").removeClass("has-value");
        }
    });
    
    //Email validation logic
    $( ".js-email" ).on("input", function() {
        var email = $( ".js-email" ).val();
        var numericReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        
        // Remove message
        $(this).siblings('.messages').html('');

        //does value match PPSN format regex
        if( numericReg.test(email) ) {

            //check if user has account
            if( email == 'jane.doe@gmail.com' ){

                // hide registration
                $( ".registration-section" ).hide();

                // show login
                $( ".login-section" ).show();

                // communicate result
                $(this).siblings(".messages").html('<span class="message">We\'ve found your account, please login </span>');

                return;

            //if user doesn't have account
            } else {

                // hide login
                $( ".login-section" ).hide();

                // show registration
                $( ".registration-section" ).show();

                // communicate result
                $(this).siblings(".messages").html('<span class="message">We can\'t seem to find an account, so we\'ll need a few additional details this time.</span>');

                return;
            }

        //if doesn't match PPSN format regex  
        } else {

            $(this).siblings(".messages").html('<span class="error message">Please enter a valid email address </span>');
        }

    });
    
    // ppsn validation logic
    $( ".js-ppsn" ).on("input", function() {
        var ppsn = $( ".js-ppsn" ).val();
        var numericReg = /[0-9]{7}[A-Z]{1,2}/;
        
        //is value less than 8 characters
        if( ppsn.length >= 8 ) {
            
            // Remove message
            $(this).siblings('.messages').html('');
            
            //does value match PPSN format regex
            if( !numericReg.test(ppsn) ) {

                $(this).siblings(".messages").html('<span class="error message">Please enter a valid PPSN number </span>');
            }

        //if less than 8 characters   
        } else {

            $(this).siblings('.messages').html('<span class="error message">PPS Numbers have at least 8 charactors </span>');
        }

    });
    
    //Login fields validation
    $( ".input.required.login" ).on("input", function() {
        
        var loginFields = $( ".input.required.login" ) ;
        
        // Add error classes
        $( loginFields ).each(function() {
            if ( $(this).val() === '' ) {
                $( this ).closest(".field").addClass("is-required");
            } else {
                $( this ).closest(".field").removeClass("is-required");
            }
        });
        
        // Show buttons when there are no errors on mobile
        var empty = $( ".input.required.login" ).filter(function() {
            return this.value === "";
        });
        
        if ( empty.length == 0 ) {
            $( 'footer.footer' ).show();
        }

    });
    
    //Registration fields    
    $( ".input.required.register" ).on("input", function() {
        
        // Get all required fields
        var regFields = $( ".input.required.register" ) ;
        
        // Add error classes
        $( regFields ).each(function() {
            if ( $(this).val() === '' ) {
                $( this ).closest(".field").addClass("is-required");
            } else {
                $( this ).closest(".field").removeClass("is-required");
            }
        });
        
        // Show buttons when there are no errors on mobile
        var empty = $( ".input.required.register" ).filter(function() {
            return this.value === "";
        });
        
        if ( empty.length == 0 ) {
            $( 'footer.footer' ).show();
        }
    });
    
    //Submit form
    $( "form" ).submit(function( event ) {
        
        //check if registration fields empty
        var emptyReg = $( ".input.required.register" ).filter(function() {
            return this.value === "";
        });
        
        emptyReg.first().focus();
        
        if ( emptyReg.length == 0 ) {
            return;
        }
        
        //check if login fields empty
        var emptyLogin = $( ".input.required.login" ).filter(function() {
            return this.value === "";
        });
        
        emptyLogin.first().focus();
        
        if ( emptyLogin.length == 0 ) {
            return;
        }
        
        event.preventDefault();
    });
    
    //Toggle password
    $('.toggle_show_password').click(function(){
        
        event.preventDefault();
        
        if( $( this ).prev().is(':password') ){
            $( this ).prev().attr('type', 'text');
        } else {
            if ( $( this ).prev().is(':text') ){
                $( this ).prev().attr('type', 'password');
            }
        }
        
    });
    
    //Optional section logic
    $( '.js-optional-add' ).click( function(){
        $( this ).closest( '.js-optional-section' ).addClass( 'open' );
    });
    
    
    //List builder logic
    $( '.js-add-list-item' ).click( function(){
        
        if( $( '.js-list-builder' ).hasClass( 'open' ) ){
            $( this ).siblings( '.answer' ).clone().prependTo( ".js-list-builder" );
        }
        
        $( this ).closest( '.js-list-builder' ).addClass( 'open' );
        
    });

    
    //Remove section
    $( '.js-remove-item' ).click( function(){
        $( this ).closest( '.js-list-builder' ).removeClass( 'open' );
    });

    $( '.js-optional-remove' ).click( function(){
        $( this ).closest( '.js-optional-section' ).removeClass( 'open' );
    });
    
    //Checkbox optional sections
    $( '.optional-section-trigger' ).click( function(){
        if( $( this ).is(':checked') ){
            $( this ).siblings( '.field-optional-section' ).addClass( 'open' );
        } else  {
            $( this ).siblings( '.field-optional-section' ).removeClass( 'open' );
        }
    });
    
    //Edit in place
    $( '.financial-item-display' ).click( function(){
        $( this ).siblings( '.financial-item-edit' ).show();
        $( this ).hide();
    });

    $( '.financial-item-edit-close' ).click(function(){
        $('.financial-item-edit').hide();
        $('.financial-item-display').show();
    });

    
    //Get event description
    $( ".js-gp-search" ).on("input", function() {
        
        var gpSearch = $('.js-gp-search').val();
        
        $.ajax({
            dataType: "jsonp",
            url: 'https://uat.sspcrs.ie/portal/free-gp-care-web/pub/reg/doctorTextSearch?term='+gpSearch ,
            type: 'GET',
            crossDomain: true,
            //beforeSend: setHeader,
            success: function(data) {
                
                console.log(data);
            /*
              if(data) {
                  var body = data.description.html;
                  $('.body-content').append(body);

                  var title = '';
                  title += '<header>';
                  title += '<h6>'+data.name.text+'</h6>';
                  title += '</header>';

                  $('.body-content').prepend(title);
              } else {
                  $('.body-content').append("<p>No tickets available</p>");
              }
              */
            }
          });
    });

    
});