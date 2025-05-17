<?php
session_start();
require_once "headers.php";

$response = [];

if (isset($_SESSION['username'])) {
    $response = ['loggedIn' => true, 'username' => $_SESSION['username']];
    error_log("Session is active for user: " . $_SESSION['username']);
} else {
    error_log("Session not set or expired");
    $response = ['loggedIn' => false];
}

echo json_encode($response);
