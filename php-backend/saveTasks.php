<?php
// Start the session to access user session variables
session_start();

// Include headers for CORS
require_once "headers.php";

// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Decode incoming JSON POST data
$data = json_decode(file_get_contents("php://input"), true);

try {
    // Include database connection
    require_once "dbConnection.php";
    
    // Retrieve user information from session
    $user = [
        "user_id" => $_SESSION["user_id"],
        "username" => $_SESSION["username"],
        "pwd" => $_SESSION["pwd"],
        "email" => $_SESSION["email"]
    ];

    // Delete all tasks for the current user before inserting new ones
    $deleteStmt = $pdo->prepare("DELETE FROM user_tasks WHERE users_id = :users_id");
    $deleteStmt->execute(['users_id' => $user["user_id"]]);
    
    // Insert each task from the received data
    foreach ($data as $ind => $obj) {
        // Set task status based on isDone property
        $taskStatus = $obj["isDone"] ? "completed" : "pending";
        $stmt = $pdo->prepare("INSERT INTO user_tasks (username, tasks_text, tasks_status, users_id) VALUES (:username, :tasks_text, :tasks_status, :users_id)");
        $stmt->bindParam(':username', $user["username"]);
        $stmt->bindParam(':tasks_text', $obj["taskTxt"]);
        $stmt->bindParam(':tasks_status', $taskStatus);
        $stmt->bindParam(':users_id', $user["user_id"]);
        $stmt->execute();
    }

    // Respond with success message and the data received
    echo json_encode(["status" => "success", "message" => "Database connected", "data" => $data]);
} catch (PDOException $e) {
    // Respond with error message if database connection fails
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}