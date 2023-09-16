$(document).ready(function () {
    // Make an AJAX GET request to retrieve user data
    $.ajax({
        url: '/userhandler/api',
        method: 'get',
        data: {
            token: Cookies.get('access_token')
        },
        success: function (data) {
            var total_amt = 0;
            data.forEach(function (user) {
                var row = '<tr>' +
                    '<td>' + user.Username + '</td>' +
                    '<td>' + user.Phonenumber + '</td>' +
                    '<td>' + user.event + '</td>' +
                    '<td>' + user.PaidAmt + '</td>' +
                    '</tr>';
                total_amt += user.PaidAmt;
                $('#userTableBody').append(row);
            });
            $('#Tot').html('Amount collected : ' + total_amt);
        },
        error: function (xhr, textStatus, errorThrown) {
            window.location.href = '/admin/login';
        }
    });

    $('#showEventsBtn').click(() => {
        fetchEvents();
    });

    $('#showUsersBtn').click(() => {
        fetchUsers();
    });

});

// data:image/gif;base64,

function fetchEvents() {
    $.ajax({
        url: '/eventhandler/api', // Update with your API endpoint for event data
        method: 'get',
        success: function (data) {
            // Clear existing table rows
            $('#userTableBody').empty();
            $('#title').html('Event Management');
            $('#thead').empty();
            $('#thead').append(`<tr>
                    <th>Title</th>
                    <th>CoverImage</th>
                    <th>Scheduled On</th>
                    <th>Description</th>
                </tr>`)
            // Add event data to the table
            data.forEach(function (event) {
                var row = '<tr>' +
                    '<td>' + event.Title + '</td>' +
                    '<td><img src="data:image/gif;base64,' + event.EventImage + '" height=\'100px\'/></td>' +
                    '<td>' + event.Schedule + '</td>' +
                    '<td>' + event.Descript + '</td>' +
                    '</tr>';
                $('#userTableBody').append(row);
            });

            // $('#Tot').html('Amount collected : ' + total_amt);
        },
        error: function (err) {
            window.location.href = '/admin/login';
        }
    });
}

function fetchUsers() {
    $.ajax({
        url: '/userhandler/api',
        method: 'get',
        data: {
            token: Cookies.get('access_token')
        },
        success: function (data) {
            $('#userTableBody').empty();
            $('#title').html('User Management');
            $('#thead').empty();
            $('#thead').append(
                `<tr>
                <th>Title</th>
                <th>CoverImage</th>
                <th>Scheduled On</th>
                <th>Description</th>
            </tr>`)
            var total_amt = 0;
            data.forEach(function (user) {
                var row = '<tr>' +
                    '<td>' + user.Username + '</td>' +
                    '<td>' + user.Phonenumber + '</td>' +
                    '<td>' + user.event + '</td>' +
                    '<td>' + user.PaidAmt + '</td>' +
                    '</tr>';
                total_amt += user.PaidAmt;
                $('#userTableBody').append(row);
            });
            $('#Tot').html('Amount collected : ' + total_amt);
        }
    });
}