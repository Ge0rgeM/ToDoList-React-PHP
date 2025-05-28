<?php
session_start();
require_once "headers.php";

$response = [];

if (isset($_SESSION['username'])) {
    $response = ['loggedIn' => true, 'username' => $_SESSION['username']];
} else {
    $response = ['loggedIn' => false];
}

echo json_encode($response);
