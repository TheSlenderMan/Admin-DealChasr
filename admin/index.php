<?php
session_start();
if(isset($_COOKIE['DSUID'])){
    $_SESSION['userID'] = $_COOKIE['DSUID'];
    header("location: http://admin.dealchasr.co.uk/admin/main.php");
} else {
    header("location: http://admin.dealchasr.co.uk/index.php");
}