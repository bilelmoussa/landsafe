
//add background-color to navigation-bar after scroll
//add scroll-under navigation to detect scrolling
  let nav = document.getElementsByClassName("fixed-top");
  let underScrollBar = document.getElementById("underScrollBar");
  window.addEventListener("scroll", function (event) {
    let scroll_down = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(scroll_down > 1){
      nav[0].classList.add("changebg");
      underScrollBar.classList.add("detect_scroll");
      let scroll_true_h = document.documentElement.scrollHeight - this.window.innerHeight;
      let scroll_pos = (scroll_down/scroll_true_h)*100;
      $(".detect_scroll").css("width", scroll_pos+"%");
    }else{
      nav[0].classList.remove("changebg");
      underScrollBar.classList.remove("detect_scroll");
    }
});


//toggle menu side bar
$('[data-toggle="offcanvas"]').on('click', function () {
    $('#accordion').toggleClass('open')
});


//change hambruger-icon onclcik to arrow and disable scrolling on side menu-nav-bar
$('.hamb_menu').click (function(){
    $(this).toggleClass('open');
    $("body").toggleClass("disable_overf");
});


//change  side-menu-link-background-color-onclick
let header = document.getElementById("accordion");
let btns = header.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(e) {
    let current = document.getElementsByClassName("activate");
    if (current.length > 0) { 
      current[0].className = current[0].className.replace(" activate", "");
    }
    this.className += " activate";
    if(event.target.getAttribute("aria-expanded") == "true"|| event.srcElement.getAttribute("aria-expanded") == "true"){
      event.target.classList.remove("activate")
    }
   
  });
}

//slick carousel library
$('#slick_me').slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    pauseOnFocus: false,
    fade: true,
  });


//scroll down function
$(".arrow_d").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.getAttribute("name");
      let  scroll =  $(hash).offset().top - 90; 
      $('html, body').animate({
        scrollTop: scroll
      }, 800, function(){
         window.location.hash = scroll;
      });
      
    } 
  });
  

//animation for about us section onscroll

//animation for text
$(window).scroll(function() {
  let oTop = $('.text_in_box').offset().top - window.innerHeight + 200;
  if($(window).scrollTop() > oTop){
    $(".text_in_box").each(function(){
      $(this).children().each(function(){
        $(this).addClass("animation_1");
      });
    })
  }
})

//animation for img
$(window).scroll(function() {
  let oTop = $('.img_in_box').offset().top - window.innerHeight + 200;
  if($(window).scrollTop() > oTop){
    $(".img_in_box").addClass("animation_1");
  }
})



//animation number count onscroll
let animation_nmber_1 = 0;
$(window).scroll(function() {
  let oTop = $('#nmb_count').offset().top - window.innerHeight;
  if (animation_nmber_1 == 0 && $(window).scrollTop() > oTop) {
    $('.count_nmb').each(function() {
      $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });   
    });
    animation_nmber_1 = 1;
  }
});
 

//animation services titles 
$(window).scroll(function() {
    let oTop = $('.service_title').offset().top - window.innerHeight;
    this.console.log($('.service_title').offset().top - window.innerHeight)
    this.console.log($(window).scrollTop());
    if($(window).scrollTop() > oTop){
      $(".service_title").each(function(){
        $(this).addClass("animation_2")
      })
  
    }
})

//social medai animation 
$(window).scroll(function() {
    $('.moving_bg').each(function(){
      let oTop = $(this).offset().top - window.innerHeight + 200;
      console.log(oTop);
      if($(window).scrollTop() > oTop){
        $('.moving_img').addClass("animation_3");
        $('.centent_social').addClass("animation_3");
      }
    })
})


//add phone flags dropdown
let input = document.querySelector("#phone");
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function(success, failure) {
    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      let countryCode = (resp && resp.country) ? resp.country : "";
      success(countryCode);
    });
  },
});


