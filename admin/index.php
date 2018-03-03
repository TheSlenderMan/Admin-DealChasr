<?php
session_start();
if(isset($_GET['userID'])){
    $_SESSION['userID'] = $_GET['userID'];
    header("location: http://admin.dealchasr.co.uk/admin/main.php");
} else {
    header("location: http://admin.dealchasr.co.uk/index.php");
}