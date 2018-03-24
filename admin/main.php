<?php
session_start();
if(isset($_SESSION['userID'])){
    $uid = $_SESSION['userID'];
} else {
    header("location: http://my.dealchasr.co.uk/");
}
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>DEALCHASR - ADMIN PORTAL</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
		<link rel='stylesheet' href='http://admin.dealchasr.co.uk/admin/css/common.css' />

		<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" ></script>
		<script src="http://admin.dealchasr.co.uk/admin/js/common.js" type="text/javascript" ></script>
	</head>
	<body>
		<div id="master-container" >
			<div id="tasks-container" >
				<div id="customer-container" class="task-style" >
					<h1>CUSTOMER SEARCH</h1>
					<span class="error-text-customer" ></span><br /><br />
					<label>CUSTOMER ID/EMAIL SEARCH</label>
					<input type="text" class="input-text-center" id="customerEmail" /><br /><br />
					<span class="success-text-customer" ></span><br /><br />
					<div class="ds-btn" id="search-customers" >SEARCH</div>
					<div id="customer-details" >
					
					</div>
					<br /><br />
				</div>
				<div id="invoices-container" class="task-style" >
					
				</div>
				<div id="notifications-container" class="task-style" >
					<h1>SEND APP NOTIFICATION</h1>
					<span class="error-text" ></span><br /><br />
					<label>NOTIFICATION TITLE</label>
					<input type="text" class="input-text-center" id="nTitle" /><br /><br />
					<label>NOTIFICATION MESSAGE</label>
					<input type="text" class="input-text-center" id="nMessage" /><br /><br />
					<span class="success-text" ></span><br /><br />
					<div class="ds-btn" id="send-notification" >SEND NOTIFICATION</div>
				</div>
			</div>
		</div>
	</body>
</html>