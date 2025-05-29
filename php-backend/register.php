<?php

require_once "headers.php"; // Include headers for CORS, content-type, etc.
require_once "dbConnection.php"; // Include database connection

// Get JSON input and decode it into an associative array
$data = json_decode(file_get_contents("php://input"), true);

// Extract user input or set to empty string if not provided
$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$repeatPassword = $data['repeatPassword'] ?? '';

// Check if all required fields are set
if(!isset($username,
          $email, 
          $password, 
          $repeatPassword)) {
    echo json_encode(['error' => 'Missing required fields']);
    http_response_code(400);
    exit();
}

// Validate username: only letters and numbers allowed
if(!preg_match('/^[a-zA-Z0-9]+$/', $username)){
    echo json_encode(['error' => 'Username can only contain letters and numbers']);
    http_response_code(400);
    exit();
}
// Validate username length
else if(strlen($username) < 6){
    echo json_encode(['error' => "Username must be at least 6 characters long. Given: $username"]);
    http_response_code(400);
    exit();
}

// Validate email format
if(!preg_match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/", $email)){
    echo json_encode(["error"=> "Invalid email format."]);
    http_response_code(400);
    exit();
}
// Sanitize email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// Validate password length
if(strlen($password) < 8) {
    echo json_encode(["error"=> "Password must be at least 8 characters long."]);
    http_response_code(400);
    exit();
}
// Check if passwords match
else if ($password !== $repeatPassword) {
    echo json_encode(["error"=> "Passwords do not match."]);
    http_response_code(400);
    exit();
}
// Hash the password for secure storage
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the username already exists in the database
$existingId = $pdo->prepare("SELECT id FROM users WHERE username = :username");
$existingId->execute(['username' => $username]);
if($existingId->fetch()){
    http_response_code(409);
    echo json_encode(['error' => 'Username already exists']);
    exit();
}

// Insert the new user into the database
$insertUser = $pdo->prepare("INSERT INTO users (username, email, pwd) VALUES (:username, :email, :pwd)");
$insertUser->execute([
    'username' => $username,
    'email' => $email,
    'pwd' => $hashedPassword
]);

// Return success response
echo json_encode(['success' => 'User registered successfully']);