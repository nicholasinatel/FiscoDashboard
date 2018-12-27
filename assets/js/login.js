var user_entry = "";
var password_entry = "";

$(function () {
    $("#login-btn").click(function () {

        user_entry = $('#user-input').val();
        password_entry = $('#password-input').val();
        console.log("user_entry" + user_entry);

        var Url = 'http://200.98.145.91:5000/dashboard/api/v1.0/login';
        var data_json = {
            "user": "teste",
            "password": "teste"
        }
        data_json.user = user_entry;
        data_json.password = password_entry;
        data_json = JSON.stringify(data_json);
        console.log("data para login" + data_json);

        $.ajax({
            url: Url,
            method: "POST",
            data: data_json,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            // Response Job
            success: function (result, status, xhr) {
                console.log("result:" + JSON.stringify(result));
                console.log("name comopanhy: " + result.name_company)
                //open dashboard.html
                if (result.cod_return == 0){
                    globalVar = result.name_company;
                    console.log("globalVar inside login.js" + globalVar);
                    window.open("dashboard.html", "_self");
                }
                else if (result.cod_return == 1) {
                    alert("Usuario ou senha incorretos");
                }
            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });
});

jQuery(document).ready(function () {
    console.log("jQuery document.ready");
    // logLoad();
});

/*==================================================================
[ Validate ]*/
// var input = $('.validate-input .input100');

// $('.validate-form').on('submit',function(){
//     var check = true;

//     for(var i=0; i<input.length; i++) {
//         if(validate(input[i]) == false){
//             showValidate(input[i]);
//             check=false;
//         }
//     }

//     return check;
// });


// $('.validate-form .input100').each(function(){
//     $(this).focus(function(){
//        hideValidate(this);
//     });
// });

// function validate (input) {
//     if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//         if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//             return false;
//         }
//     }
//     else {
//         if($(input).val().trim() == ''){
//             return false;
//         }
//     }
// }

// function showValidate(input) {
//     var thisAlert = $(input).parent();

//     $(thisAlert).addClass('alert-validate');
// }

// function hideValidate(input) {
//     var thisAlert = $(input).parent();

//     $(thisAlert).removeClass('alert-validate');
// }
