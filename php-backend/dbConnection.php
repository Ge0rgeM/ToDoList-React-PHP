<?php
$dsn = "mysql:host=localhost;";
$dbusername = "root";
$dbpassword = "";
$dbname = "todo_list";

$pdo = new PDO($dsn, $dbusername, $dbpassword);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare("CREATE DATABASE IF NOT EXISTS $dbname");
$stmt->execute();

$pdo->exec("USE $dbname");

$stmt = $pdo->prepare("CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        pwd VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIME
    )");
$stmt->execute();

$stmt = $pdo->prepare("CREATE TABLE IF NOT EXISTS user_tasks (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usernname VARCHAR(30) NOT NULL,
    tasks_text TEXT NOT NULL,
    tasks_status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIME,
    users_id INT(11) ,
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE SET NULL
)");
$stmt->execute();