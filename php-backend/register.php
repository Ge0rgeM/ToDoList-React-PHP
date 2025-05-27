<?php

require_once "headers.php";
require_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"), true);

if(!isset($data['username'],
          $data['email'],
          $data['password'],
          $data['repeatPassword'])) {
    echo json_encode(['error' => 'Missing required fields']);
    http_response_code(400);
    exit();
}

echo json_encode(['success' => 'User registered successfully']);
#Check if the user is already registered
#sanitize the input