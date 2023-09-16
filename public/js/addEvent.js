$(document).ready(function () {
    // Add an event listener to the "Add Event" button
    $('#addEventBtn').click(function () {
        // Get the form data
        var eventImage = $('#EventImage')[0].files[0];
        var eventDate = $('#eventDate').val();
        var eventTime = $('#eventTime').val();
        var eventName = $('#Title').val();
        var eventDescription = $('#Descript').val();

        // Create a FormData object to send binary data (eventImage)
        var formData = new FormData();
        formData.append('EventImage', eventImage);
        formData.append('Schedule', eventDate + ' ' + eventTime);
        formData.append('Title', eventName);
        formData.append('Descript', eventDescription);
        formData.append('token', Cookies.get('access_token'));

        // Send an AJAX POST request
        $.ajax({
            url: '/eventhandler/api', // Replace with your server endpoint
            method: 'POST',
            data: formData,
            contentType: false, // Important: Don't set content type
            processData: false, // Important: Don't process data
            success: function (data) {
                window.location.href='/';
            },
            error: function (xhr, textStatus, errorThrown) {
                // Handle error response from the server
                console.error('Error:', xhr.status, textStatus, errorThrown);
                // You can display an error message or handle it as needed
            }
        });
    });
});