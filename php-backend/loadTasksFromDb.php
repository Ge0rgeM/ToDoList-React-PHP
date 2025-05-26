<?php
session_start();

require_once "headers.php";
require_once "dbConnection.php";


try {
    $stmt = $pdo->prepare("SELECT * FROM user_tasks WHERE users_id = :users_id");
    error_log("Loading tasks for user ID: " . $_SESSION['user_id']);
    $stmt->execute(['users_id' => $_SESSION['user_id']]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    error_log("Tasks loaded: " . print_r($tasks, true));
    echo json_encode(["status" => "success", "data" => $tasks]);
} catch (PDOException $e) {
    error_log("Error loading tasks: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Failed to load tasks"]);
}