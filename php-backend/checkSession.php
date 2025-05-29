<?php
// Start the session to access session variables
session_start();

// Include headers for CORS
require_once "headers.php";

// Initialize response array
$response = [];

// Check if the user is logged in by verifying the 'username' session variable
if(isset($_SESSION['username'])) {
    // User is logged in, return username
    $response = ['loggedIn' => true, 'username' => $_SESSION['username']];
} else {
    // User is not logged in
    $response = ['loggedIn' => false];
}

// Return the response as JSON IMPORTANT
echo json_encode($response);
