/* jslint browser: true */
/* global $, TweenMax */

// hide all screens(mains) and sections
$("main, section").hide();


// SPLASH SCREEN //////////////////////////////////////////////
$("#splash").show();

// animate on the splash screen
gsap.from("#splash", {duration: 0.5, delay: 0.25, opacity: 0});

// animate the header down from the top of the screen
gsap.from("#splash header", {duration: 0.5, delay: 0.5, y: -90});

// animate the logo onto the screen
gsap.from("#splash img", {duration: 0.5, delay: 1, scale: 0, ease: "easeInOut"})

// hide splash screen after "loading" is finished. onComplete execute the loadLanding() function
gsap.to("#splash", {duration: 0.5, delay: 3, opacity: 0, onComplete: loadLanding});

// LANDING SCREEN ///////////////////////////////////////////
function loadLanding(){
    
    //hide an reset all screens/sections opacity 
    $("main, section").hide().css({opacity: 1});

    //display landing screen
    $("#landing").show();

    // animate on the landing  screen
    gsap.from("#landing", {duration: 0.5, delay: 0.25, opacity: 0});

    // animate the header down from the top of the screen
    gsap.from("#landing header", {duration: 0.5, delay: 0.25, y: -90})

    // animate each resturant logo onto the screen
    gsap.from("#logo1", {duration: 0.5, delay: 1, x: -375, ease: "back"});
    gsap.from("#logo2", {duration: 0.5, delay: 1.25, x: 375, ease: "back"})
    gsap.from("#logo3", {duration: 0.5, delay: 1.5, x: -375, ease: "back"});
}

//----------------------------------------------------------------------
//---------------NEW-MOVED OUT OF THE loadLanding() Function------------
//----------------------------------------------------------------------
// Functions to execute when the user Clicks on a resturant logo     
$("#logo1").click(function(){

    // animate the landing screen off, onComplete execute loadRest() function using the onCompleteParams
    gsap.to("#landing", {duration: 0.5, 
                         opacity: 0, 
                         onComplete: loadRest,
                         onCompleteParams: ["#rest1", "#ffcb33"]});
});

$("#logo2").click(function(){

    // animate the landing screen off, onComplete execute loadRest() function using the onCompleteParams
    gsap.to("#landing", {duration: 0.5, 
                         opacity: 0, 
                         onComplete: loadRest,
                         onCompleteParams: ["#rest2", "#ffcb33"]});
});

$("#logo3").click(function(){

    // animate the landing screen off, onComplete execute loadRest() function using the onCompleteParams
    gsap.to("#landing", {duration: 0.5, 
                         opacity: 0, 
                         onComplete: loadRest,
                         onCompleteParams: ["#rest3", "#ffcb33"]});
});
//----------------------------------------------------------------------
//----------------------------------------------------------------------


// RESTAURANT SCREENS ///////////////////////////////////////////

// function that loads a specific resturant based off the restID provided. 
// Also uses the highlightColour to modify the submenu background colour
function loadRest(restID, highlightColour){

    // hide the landing screen
    $("#landing").hide();

    // load the chosen rest
    $(restID).show();

    // animate header / footer
    //        #rest1 header - MAKE SURE you have a space
    gsap.from(restID + " header", {duration: 0.5, delay: 0.25, y: -90});
    gsap.from(restID + " footer", {duration: 0.5, delay: 0.25, y: 90});

    // show the .home section
    //        #rest1 .home - MAKE SURE you have a space
    $(restID + " .home").show();

    // loop through all .reveal elements and animate
    //        #rest1 .home .reveal - MAKE SURE you have a space
    gsap.from(restID + " .home .reveal",{duration: 0.5,
                                        delay: 0.25,
                                        opacity: 0,
                                        y: -20,
                                        ease:"elastic",
                                        stagger: 0.25});

    // remove activeIcon class from all icons
    $(".icons").removeClass("activeIcon");
    $(".icons").css("background", "initial");

    // add the highlight color to the home icon
    $(".homeIcon").addClass("activeIcon")
    $(".homeIcon").css("background", highlightColour);

    // SUB NAV
    $(restID + " .homeIcon").click(function(){
        // if the icon ISNT highlighted
        if(!$(this).hasClass("activeIcon")){
            
            // if not highlighted, highlight it!
            // remove activeIcon from all icons
            $(".icons").removeClass("activeIcon");
            $(".icons").css("background", "initial");

            //set homeIcon to activeIcon
            $(".homeIcon").addClass("activeIcon")
            $(".homeIcon").css("background", highlightColour);

            //load the home section
            loadSection(restID + " section", restID + " .home");
        }
    });//END - home click

    $(restID + " .specialsIcon").click(function(){
        // if the icon ISNT highlighted
        if(!$(this).hasClass("activeIcon")){
            
            // if not highlighted, highlight it!
            // remove activeIcon from all icons
            $(".icons").removeClass("activeIcon");
            $(".icons").css("background", "initial");

            //set homeIcon to activeIcon
            $(".specialsIcon").addClass("activeIcon")
            $(".specialsIcon").css("background", highlightColour);

            //load the specials section
            loadSection(restID + " section", restID + " .specials");
        }
    });//END - home specials

    $(restID + " .reservationsIcon").click(function(){
        // if the icon ISNT highlighted
        if(!$(this).hasClass("activeIcon")){
            
            // if not highlighted, highlight it!
            // remove activeIcon from all icons
            $(".icons").removeClass("activeIcon");
            $(".icons").css("background", "initial");

            //set homeIcon to activeIcon
            $(".reservationsIcon").addClass("activeIcon")
            $(".reservationsIcon").css("background", highlightColour);

            //load the reservations section
            loadSection(restID + " section", restID + " .reservations");
        }
    });//END - home reservations


}// -- END loadRest();

// LOAD SECTION FUNCTION ///////////////////////////////////////////
// Animates from the prevSection to the nextSection. 
// These are provided when the function is called when the 
// user chooses an option in the subnavigation
function loadSection(prevSection, nextSection){

    // animate away prevSection
    gsap.to(prevSection, {duration: 0.5, 
                        opacity: 0,
                        onComplete: showNextSection});

    function showNextSection(){
        $(prevSection).hide().css({opacity: 1});
        $(nextSection).show().scrollTop(0);
    }

    // loop through all .reveal elements and animate
    //        .home .reveal - MAKE SURE you have a space
    gsap.from(nextSection + " .reveal",{duration: 0.5,
                                    delay: 0.25,
                                    opacity: 0,
                                    y: -20,
                                    ease:"elastic",
                                    stagger: 0.25});
}

// RESERVATION SUBMIT BUTTON ///////////////////////////////////////////
$("#btnSubmit").click(function(event){
    //prevents the default processing of the form
    event.preventDefault();
    //tell user the reservation was booked
    alert("Reservation Made!")
});

// HAMBURGER MENU ///////////////////////////////////////////
$(".hamburger").click(function(){

    // check if hamburger is closed!
    if($(this).attr("data-click-state") == 0){

        // display the menu screen
        $("#menu").show();

        // set hamburger data to active
        $(this).attr("data-click-state", 1);

        // change to the animate gif
        $(this).attr("src", "img/hamburger2close.gif");

        // animate current rest over to reveal menu
        gsap.to(".rest", {duration:  0.5, x: 315, ease: "Sine.easeOut"});
    
    }else{ // if it is open...!

         // set hamburger data to not active
         $(this).attr("data-click-state", 0);

         // change to the animate gif
        $(this).attr("src", "img/close2hamburger.gif");

        // animate current rest back to hide menu
        gsap.to(".rest", {duration:  0.5, x: 0, ease: "Sine.easeOut",
                         onComplete: function(){
                             $("#menu").hide();
                         }});

    }

});

// MAIN MENU LINKS ///////////////////////////////////////////

// select new rest
$("#btnNewRest").click(function(){

    // close hamburger and set data to 0
    $(".hamburger").attr("data-click-state", 0);
    $(".hamburger").attr("src", "img/close2hamburger.gif");

    // animate current rest back to hide menu
    gsap.to(".rest", {duration:  0.5, x: 0, ease: "Sine.easeOut",
                    onComplete: function(){
                        $("#menu").hide();
                        
                        gsap.to(".rest", {duration: 0.5, 
                                          opacity: 0,
                                          onComplete: loadLanding});


                    }
    });
});

$("#btnContact").click(function(){
    alert("Call Us: (905) 123-1234");
});

$("#btnAbout").click(function(){
    alert("We are Us!");
});
