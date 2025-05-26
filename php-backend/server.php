<?php
// server.php
session_start();

require_once "headers.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle JSON POST data
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

try{
    require_once "dbConnection.php";
    
    $user = [
        "user_id" => $_SESSION["user_id"],
        "username" => $_SESSION["username"],
        "pwd" => $_SESSION["pwd"],
        "email" => $_SESSION["email"]
    ];

    $deleteStmt = $pdo->prepare("DELETE FROM user_tasks WHERE users_id = :users_id");
    $deleteStmt->execute(['users_id' => $user["user_id"]]);
    
    foreach($data as $ind => $obj){
        $taskStatus = $obj["isDone"]? "completed" : "pending";
        $stmt = $pdo->prepare("INSERT INTO user_tasks (username, tasks_text, tasks_status, users_id) VALUES (:username, :tasks_text, :tasks_status, :users_id)");
        $stmt->bindParam(':username', $user["username"]);
        $stmt->bindParam(':tasks_text', $obj["taskTxt"]);
        $stmt->bindParam(':tasks_status', $taskStatus);
        $stmt->bindParam(':users_id', $user["user_id"]);
        $stmt->execute();
    }
    error_log("Connection was successful: ");
    echo json_encode(["status" => "success", "message" => "Database connected", "data" => $data]);
}catch(PDOException $e){
    error_log("Connection failed: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}



// Save the tasks to a file (or database)
file_put_contents("tasks.json", json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
