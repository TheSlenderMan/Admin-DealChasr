$(document).ready(function(){
    $(document).on("click", "#send-notification", function(){
        sendNotification();
    });
});

function sendNotification(){
    var title   = $("#nTitle").val();
    var message = $("#nMessage").val();
    var topic   = $("#nTopic").val();
    var error   = $(".error-text");
    var success   = $(".success-text");
    var button  = $("#send-notification");

    if(title == ""){
        error.html("YOU MUST SUPPLY A NOTIFICATION TITLE");
    } else if(message == ""){
        error.html("YOU MUST SUPPLY A NOTIFICATION MESSAGE");
    } else if(topic == ""){
        error.html("YOU MUST SUPPLY AN FCM TOPIC (news)");
    } else {
        button.html("SENDING...");
        $.ajax({
            url: "http://api.almanacmedia.co.uk/notifications/send",
            type: "POST",
            dataType: "JSON",
            data: {
                "nTitle": title,
                "nMessage": message,
                "nTopic": topic
            },
            headers: {
                "Authorization": "DS1k1Il68_uPPoD"
            },
            success: function(json){
                if(json.sent != undefined || json.sent != 'undefined'){
                    button.html("SEND NOTIFICATION");
                    success.html("NOTIFICATION SENT");
                    title.val("");
                    message.val("");
                    topic.val("");
                } else {
                    error.html(json.message);
                }
            },
            error: function(e){
                error.html(e.message);
            }
        });
    }
}