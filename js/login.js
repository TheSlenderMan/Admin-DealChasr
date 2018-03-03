$(document).ready(function(){
    $(document).on("focus", "#email", function(){
        var email = $(this);
        if(email.val() == "EMAIL"){
            email.css("color", "#111111");
            email.val("");
        }
    });
    $(document).on("blur", "#email", function(){
        var email = $(this);
        if(email.val() == ""){
            email.css("color", "#9d9d9d");
            email.val("EMAIL");
        }
    });
    $(document).on("focus", "#password", function(){
        var email = $(this);
        if(email.val() == "PASSWORD"){
            email.css("color", "#111111");
            email.val("");
        }
    });
    $(document).on("blur", "#password", function(){
        var email = $(this);
        if(email.val() == ""){
            email.css("color", "#9d9d9d");
            email.val("PASSWORD");
        }
    });

    $(document).on("click", "#login", function(){
        $.ajax({
            url: "http://api.almanacmedia.co.uk/users/login",
            type: "POST",
            dataType: "JSON",
            headers: {
                "Authorization": "DS1k1Il68_uPPoD"
            },
            data: {
                "email": $("#email").val(),
                "password": $("#password").val(),
                "type": "admin"
            },
            success: function(json){
				if(json.loggedIn == 1){
                    window.location.href = "http://admin.dealchasr.co.uk/admin/index.php?userID=" + json.userID;
                } else {
                    console.log(json.message);
                    $(".error-text").html(json.message);
                }
            }, error: function(e){
                console.log(json.message);
                $(".error-text").html(json.message);
            }
        });
    });
});