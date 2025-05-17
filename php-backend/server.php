<?php
// server.php
session_start();
// Allow requests from any origin (for development only)
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
        "username" => "",
        "pwd" => "",
        "email" => "Sample@gmail.com"
    ];
    $checkStmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $checkStmt->execute(['username' => $user["username"]]);

    if($checkStmt->rowCount() === 0){
        $stmt = $pdo->prepare("INSERT INTO users (username, pwd, email) VALUES (:username, :pwd, :email)");
        $stmt->bindParam(':username', $user["username"]);
        $stmt->bindParam(':pwd', $user["pwd"]);
        $stmt->bindParam(':email', $user["email"]);
        $stmt->execute();
    }

    $activeUserStmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $activeUserStmt->execute(['username' => $user["username"]]);

    $activeUser = $activeUserStmt->fetchall(PDO::FETCH_ASSOC)[0]["id"];
    
    $deleteStmt = $pdo->prepare("DELETE FROM user_tasks WHERE users_id = :users_id");
    $deleteStmt->execute(['users_id' => $activeUser]);
    
    foreach($data as $ind => $obj){
        error_log(print_r($ind, true));
        error_log(print_r($obj, true));
        foreach($obj as $key => $value){
            error_log(print_r($value, true));
        }
        $taskStatus = $obj["isDone"]? "completed" : "pending";
        $stmt = $pdo->prepare("INSERT INTO user_tasks (usernname, tasks_text, tasks_status, users_id) VALUES (:usernname, :tasks_text, :tasks_status, :users_id)");
        $stmt->bindParam(':usernname', $user["username"]);
        $stmt->bindParam(':tasks_text', $obj["taskTxt"]);
        $stmt->bindParam(':tasks_status', $taskStatus);
        $stmt->bindParam(':users_id', $activeUser);
        $stmt->execute();
    }
    // echo json_encode(["status" => "success", "message" => "Database connection successful"]);
    // error_log(print_r($data, true));
    error_log("Connection was successful: ");
    echo json_encode(["status" => "success", "message" => "Database connected", "data" => $data]);
}catch(PDOException $e){
    error_log("Connection failed: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}



// Save the tasks to a file (or database)
file_put_contents("tasks.json", json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
