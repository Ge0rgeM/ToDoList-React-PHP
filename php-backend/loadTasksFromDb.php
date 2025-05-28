<?php
session_start();

require_once "headers.php";
require_once "dbConnection.php";


try {
    $stmt = $pdo->prepare("SELECT * FROM user_tasks WHERE users_id = :users_id");
    $stmt->execute(['users_id' => $_SESSION['user_id']]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "data" => ["tasks" => $tasks, "username" => $_SESSION["username"]]]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Failed to load tasks"]);
}