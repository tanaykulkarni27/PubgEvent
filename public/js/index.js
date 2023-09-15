$(document).ready(function () {

    // set the screen 
    $('#frmImg').css('height', $('.bannerContainer').css('height'));
    $('#frmImg').css('width', '100%');

    $('.event-image').css('height', '150px');

    $('#videoFrame').css('width',(window.innerWidth - 15) + 'px');
    $('#videoFrame').css('height',(window.innerWidth * (9 / 16)) + 'px');

    $(window).on("resize", function () {
        $('#frmImg').css('height', $('.bannerContainer').css('height'));
    });

    $(".owl-carousel").owlCarousel({
        autoplay: true,
        slideSpeed: 500,
        items: 1,
        loop: false,
        nav: true,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
        margin: 0,
        dots: true,
        responsive: {
            800: {
                items: 2
            },
            1000: {
                items: 3
            }
        }

    });

    $('#gotoReg').click(()=>{
        var customValue = $('#gotoReg').data("custom-value"); 
        registerEvent(customValue);
    })

});

function registerEvent(Price){
    $('.form-container').css('visibility','visible');
    $('#fees').attr('value',Price);
    document.documentElement.scrollTop = 0;
}