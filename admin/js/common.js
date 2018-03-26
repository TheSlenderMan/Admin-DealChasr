$(document).ready(function(){
    $(document).on("click", "#send-notification", function(){
        sendNotification();
    });
	
	$(document).on("click", "#search-customers", function(){
        searchCustomer();
    });
	
	$(document).on("blur", ".invoice-note", function(){
		if($(this).val() != ""){
			var id = $(this).attr("id");
			var val = $(this).val();
			addNote(id, val);
		}
	});
	
	$(document).on("click", ".unpaid-invoice-cancel", function(){
			var id = $(this).attr("id");
			cancelInvoice(id);
	});
	
	$(document).on("click", ".unpaid-invoice-mark", function(){
			var id = $(this).attr("id");
			markAsPaid(id);
	});
	
	$(document).on("click", "#deactivate", function(){
		if(confirm("Are you sure you want to deactivate this account?")){
			var id = $(this).attr("data");
			changeAccountStatus("DEACTIVATE", id, $(this));
		}
	});
	
	$(document).on("click", "#activate", function(){
		if(confirm("Are you sure you want to activate this account?")){
			var id = $(this).attr("data");
			changeAccountStatus("ACTIVATE", id, $(this));
		}
	});
	
	getDueInvoices();
});

function changeAccountStatus(state, id, btn){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
	btn.html("CLOSING ACCOUNT");
	$.ajax({
		url: "http://api.almanacmedia.co.uk/venues/status",
		type: "POST",
		dataType: "JSON",
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
		},
		data: {
			"state": state,
			"id": id
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, 2, function(){changeAccountStatus(state, id, btn);});
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
			} else {
				if(json.changed == 1){
					if(state == "DEACTIVATE"){
						btn.html("ACTIVATE ACCOUNT");
						btn.attr("id", "activate");
						$(".state").html("0");
					} else {
						btn.html("DEACTIVATE ACCOUNT");
						btn.attr("id", "deactivate");
						$(".state").html("1");
					}
				} else {
					console.log(e);
				}
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}

function searchCustomer(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
    var customerString   = $("#customerEmail").val();

    var error   = $(".error-text-customer");
    var success   = $(".success-text-customer");
    var button  = $("#search-customers");
	var cont = $("#customer-details");
	
	cont.html("");

	success.html("");
	error.html("");
	
    if(customerString == ""){
        error.html("NO CUSTOMER ID OR EMAIL SUPPLIED");
    } else {
        button.html("SEARCHING...");
        $.ajax({
            url: "http://api.almanacmedia.co.uk/venues/search",
            type: "GET",
            dataType: "JSON",
            data: {
                "search": customerString,
            },
            headers: {
                "Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": uuid,
				"DSUtoken" : utoken
            },
            success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, 2, searchCustomer);
				} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
					window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
				} else {
					if(json.data != undefined || json.data != 'undefined'){
						button.html("SEARCH");
						if(json.data.results != null && json.data.results != undefined && json.data.results != 'undefined' && json.data.results.length != 0){
							
							var customer = json.data.results;
							var HTML = "";
							
							$("#customerEmail").val("");
							
							venueID = customer['id'];
							venueName = customer['vName'];
							venueWebsite = customer['vWebsite'];
							venueOpen = customer['vOpenHours'];
							venueEmail = customer['vEmail'];
							venueContact = customer['vContact'];
							venueAddress = customer['vAddressOne'] + ', ' + customer['vAddressTwo'] + ', ' + customer['vCityTown'] +
							', ' + customer['vCounty'] + ', ' + customer['vCountry'] + ', ' + customer['vPostCode'];
							venueTier = customer['tier_string'];
							venueDescription = customer['vDescription'];
							venueActive = customer['active'];
							
							HTML += "<div id='customer-left' ><br /><br />";
							HTML += "ACTIVE: <span class='state' >" + venueActive + "</span><br /><br /><br />";
							HTML += "VENUE NAME: " + venueName + "<br /><br />";
							HTML += "VENUE WEBSITE: " + venueWebsite + "<br /><br />";
							HTML += "VENUE OPEN HOURS: " + venueOpen + "<br /><br />";
							HTML += "VENUE EMAIL: " + venueEmail + "<br /><br />";
							HTML += "VENUE CONTACT: " + venueContact + "<br /><br /><br />";
							HTML += "VENUE ADDRESS: " + venueAddress + "<br /><br /><br /><br />";
							HTML += "VENUE DESCRIPTION: " + venueDescription + "<br /><br /><br /><br />";
							HTML += "TIER: " + venueTier + "<br /><br /><br /><br />";
							if(venueActive == 1){
								HTML += "<div class='ds-btn-2' id='deactivate' data='" + venueID + "' >DEACTIVATE ACCOUNT</div><br /><br />";
							} else {
								HTML += "<div class='ds-btn-2' id='activate' data='" + venueID + "' >ACTIVATE ACCOUNT</div><br /><br />";
							}
							HTML += "</div>";
							
							HTML += "<div id='customer-right' ><label>ACTIVE VOUCHERS</label>";
							$.each(customer['vouchers'], function(k, v){
								HTML += "<br /><br /><div class='customer-voucher' >" + 
								"<span style='font-size:14px;color:red;' >ID: " + v.id + " | </span>" + 
								"<span style='font-size:14px;' >" + v.voucherName + " </span>" + 
								"<span style='font-size:14px;' >" + v.dealName + " | </span>" +
								"<span style='font-size:14px;color:green;' >REDEMPTIONS: " + v.redemptionCount + " </span>";
								HTML += "</div>";
							});
							
							HTML += "</div>";
							HTML += "<div style='clear:both;' ></div>";
							
							cont.html(HTML);
						} else {
							success.html("NO MATCHING RECORDS FOUND");
						}
						customerString = "";
					} else {
						error.html(json.message);
					}
				}
            },
            error: function(e){
                error.html(e.message);
            }
        });
    }
}

function sendNotification(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
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
                "nMessage": message
            },
            headers: {
                "Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": uuid,
				"DSUtoken" : utoken
            },
            success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, 2, sendNotification);
				} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
					window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
				} else {
					if(json.sent != undefined || json.sent != 'undefined'){
						button.html("SEND NOTIFICATION");
						success.html("NOTIFICATION SENT");
						title.val("");
						message.val("");
						topic.val("");
					} else {
						error.html(json.message);
					}
				}
            },
            error: function(e){
                error.html(e.message);
            }
        });
    }
}

function getDueInvoices(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
	$.ajax({
		url: 'http://api.almanacmedia.co.uk/invoices/due',
		type: 'GET',
		dataType: 'JSON',
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, 2, getDueInvoices);
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
			} else {
				var invoices = $("#invoices-container");
				invoices.html("<h1>DUE INVOICES</h1>");
				if(json.data != undefined && json.data != 'undefined'){
					
					$.each(json.data.invoices, function(i,o){
						invoices.append("" +
						"<div class='unpaid-invoice' id='" + o.id + "' >" + 
						"<div class='unpaid-invoice-id' >" + o.id + "</div>" + 
						"<div class='unpaid-invoice-title' >" + o.vName + "</div>" + 
						"<div class='unpaid-invoice-email' >" + o.vEmail + "</div>" + 
						"<div class='unpaid-invoice-amount' >£" + o.amount + "</div>" + 
						"<div class='unpaid-invoice-note' ><textarea max-length='100' class='invoice-note' id='" + o.id + "' style='width:90%;height:90%;' >" + o.note + "</textarea></div>" + 
						"<div class='unpaid-invoice-cancel' id='" + o.id + "' >&#10006;</div>" +
						"<div class='unpaid-invoice-mark' id='" + o.id + "' >&#10004;</div>" +
						"</div>");
					});

				} else {
					console.log(json.message);
				}
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}

function addNote(id, note){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
	$.ajax({
		url: 'http://api.almanacmedia.co.uk/invoices/note',
		type: 'POST',
		dataType: 'JSON',
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
		},
		data: {
			"id": id,
			"note": note
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, 2, function(){addNote(id, note);});
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
			} else {
				var invoices = $("#invoices-container");
				if(json.data != undefined && json.data != 'undefined'){
					getDueInvoices();
				} else {
					console.log(json.message);
				}
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}

function cancelInvoice(id){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
	$.ajax({
		url: 'http://api.almanacmedia.co.uk/invoices/cancel',
		type: 'POST',
		dataType: 'JSON',
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
		},
		data: {
			"id": id
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, 2, function(){cancelInvoice(id);});
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
			} else {
				var invoices = $("#invoices-container");
				if(json.data != undefined && json.data != 'undefined'){
					getDueInvoices();
				} else {
					console.log(json.message);
				}
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}

function markAsPaid(id){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
	$.ajax({
		url: 'http://api.almanacmedia.co.uk/invoices/paid',
		type: 'POST',
		dataType: 'JSON',
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
		},
		data: {
			"id": id
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, 2, function(){markAsPaid(id);});
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
			} else {
				var invoices = $("#invoices-container");
				if(json.data != undefined && json.data != 'undefined'){
					getDueInvoices();
				} else {
					console.log(json.message);
				}
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}