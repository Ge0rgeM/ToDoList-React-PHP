<?php
session_start();

require_once "headers.php";

session_unset();    // Unset all session variables
session_destroy();  // Destroy the session
http_response_code(200);
echo json_encode(["message" => "Logged out successfully"]);