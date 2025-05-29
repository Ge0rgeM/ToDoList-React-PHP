<?php
session_start(); // Start the session to access session variables

require_once "headers.php"; // Include headers for CORS
require_once "dbConnection.php"; // Include database connection

try {
    // Prepare SQL statement to select all tasks for the logged-in user
    $stmt = $pdo->prepare("SELECT * FROM user_tasks WHERE users_id = :users_id");
    // Execute the statement with the user's ID from the session
    $stmt->execute(['users_id' => $_SESSION['user_id']]);
    // Fetch all tasks as an associative array
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Return tasks and username as JSON response
    echo json_encode([
        "status" => "success",
        "data" => [
            "tasks" => $tasks,
            "username" => $_SESSION["username"]
        ]
    ]);
} catch (PDOException $e) {
    // Return error message as JSON if something goes wrong
    echo json_encode([
        "status" => "error",
        "message" => "Failed to load tasks"
    ]);
}