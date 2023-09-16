$(document).ready(function () {

    // set the screen 
    $('#frmImg').css('height', $('.bannerContainer').css('height'));
    $('#frmImg').css('width', '100%');

    $('.event-image').css('height', '150px');

    $('#videoFrame').css('width', $('#frmImg').css('width'));
    $('#videoFrame').css('height', (window.innerWidth * (9 / 16)) + 'px');

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

    // Use a delegated event handler to handle clicks on dynamically generated buttons
    $('.owl-carousel').on('click', '.gotoReg', function () {
        var price = $(this).data("price");
        var eventName = $(this).data("event");
        registerEvent(price, eventName);
    });


    $.ajax({
        url: '/eventhandler/api', // Update with your actual API endpoint
        method: 'get',
        success: function (data) {
            // Check if data is available and is an array
            if (Array.isArray(data)) {
                $('.owl-carousel').empty();
                data.forEach(function (event) {
                    var eventCard = $('<div>').addClass('item event-card');
                    var eventImage = $('<img>').attr('src', 'data:image/gif;base64,' + event.EventImage).addClass('event-image');
                    var eventTitle = $('<div>').addClass('event-title').text(event.Title);
                    var eventDate = $('<div>').addClass('event-date').text('Date: ' + event.Schedule);
                    var eventDescription = $('<div>').addClass('event-description').text(event.Descript);
                    var registerButton = $('<button>')
                        .attr('data-price', event.Price)
                        .attr('data-event', event.Title)
                        .addClass('event-button gotoReg')
                        .text('Register Now');

                    // Append the elements to the event card
                    eventCard.append(eventImage, eventTitle, eventDate, eventDescription, registerButton);

                    // Append the event card to the carousel
                    $('.owl-carousel').append(eventCard);
                });
            }
        }
    });

});

function registerEvent(Price, Event) {
    $('.form-container').css('visibility', 'visible');
    $('#fees').attr('value', Price);
    $('#EventName').attr('value', Event);
    document.documentElement.scrollTop = 0;
}


function AddAcc() {

    $.ajax({
        url: '/userhandler/api',
        data: {
            Phonenumber: $('#phoneNumber').val(),
            eventId: $('#EventName').val()
        },
        method: 'post',
        success: function (data, status, xhr) {   // success callback function
            $("#RegBtn").attr("disabled", true);
            $("#RegBtn").html('Registered successfully');
        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback 
            $('p').append('Error: ' + errorMessage);
        }
    })
}
