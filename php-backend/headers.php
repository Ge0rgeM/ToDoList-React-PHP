<?php
// Handle preflight OPTIONS request early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Allow requests from the frontend origin
    header("Access-Control-Allow-Origin: http://localhost:5173");
    // Allow cookies and credentials
    header("Access-Control-Allow-Credentials: true");
    // Allow specific headers from the client
    header("Access-Control-Allow-Headers: Content-Type");
    // Allow specific HTTP methods
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    // Respond with HTTP 200 OK for preflight
    http_response_code(200);
    exit();
}

// Main CORS headers for all other requests
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow frontend origin
header("Access-Control-Allow-Credentials: true"); // Allow credentials
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow methods
header("Content-Type: application/json"); // Set response content type to JSON
