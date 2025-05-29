<?php
session_start(); // Start the session

require_once "headers.php"; // Include headers for CORS

// Unset all session variables
session_unset();

// Destroy the session
session_destroy();

// Set HTTP response code to 200 (OK)
http_response_code(200);

// Return a JSON response indicating successful logout
echo json_encode(["message" => "Logged out successfully"]);