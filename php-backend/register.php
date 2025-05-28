<?php

require_once "headers.php";
require_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$repeatPassword = $data['repeatPassword'] ?? '';

if(!isset($username,
          $email, 
          $password, 
          $repeatPassword)) {
    echo json_encode(['error' => 'Missing required fields']);
    http_response_code(400);
    exit();
}

// Sanitization
if(!preg_match('/^[a-zA-Z0-9]+$/', $username)){
    echo json_encode(['error' => 'Username can only contain letters and numbers']);
    http_response_code(400);
    exit();
}else if(strlen($username) < 6){
    echo json_encode(['error' => "Username must be at least 6 characters long. Given: $username"]);
    http_response_code(400);
    exit();
}

if(!preg_match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/", $email)){
    echo json_encode(["error"=> "Invalid email format."]);
    http_response_code(400);
    exit();
}
// Sanitize email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

if(strlen($password) < 8) {
    echo json_encode(["error"=> "Password must be at least 8 characters long."]);
    http_response_code(400);
    exit();
}else if ($password !== $repeatPassword) {
    echo json_encode(["error"=> "Passwords do not match."]);
    http_response_code(400);
    exit();
}
//Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

#check if the user is already registered
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

echo json_encode(['success' => 'User registered successfully']);