$(document).ready(()=>{
    $("#adminLog").click(()=>{
        $.ajax({
            url:'/userhandler/api/admin',
            method:'post',
            data:{
                Phonenumber:$('#Phonenumber').val(),
                password:$('#password').val()
            },
            success:(data)=>{
                Cookies.set('access_token',data.token,{expires:1});
                window.location.href = '/admin/panel'
            },
            error:(err)=>{
            }
        })
    })
});