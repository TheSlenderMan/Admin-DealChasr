<?php 
require('PaypalIPN.php');
include '../../../api.almanacmedia.co.uk/classes/email/email.php';

$email = new email();
$ipn = new PaypalIPN();
// Use the sandbox endpoint during testing.
$ipn->useSandbox();
$verified = $ipn->verifyIPN();
if ($verified) {
    $email = new email($uEmail);
	$email->setSubject("New voucher redeemed!");
	$email->setBody("IPN SENT");
	$email->executeMail();
}
// Reply with an empty 200 response to indicate to paypal the IPN was received correctly.
header("HTTP/1.1 200 OK");