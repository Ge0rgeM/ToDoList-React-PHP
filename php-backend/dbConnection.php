<?php
$dsn = "mysql:host=localhost;"; // change with your credentials
$dbusername = "root"; // change with your credentials
$dbpassword = ""; // change with your credentials

$dbname = "todo_list"; // DO NOT CHANGE THIS

$pdo = new PDO($dsn, $dbusername, $dbpassword); // to connect with your username and password
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare("CREATE DATABASE IF NOT EXISTS $dbname"); // Creates database if it does not exist yet.
$stmt->execute();

$pdo->exec("USE $dbname"); // To select Databse

// Creates users' table if it does not exist yet.
$stmt = $pdo->prepare("CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        pwd VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIME
    )");
$stmt->execute();

// Creates users' tasks table if it does not exist yet.
$stmt = $pdo->prepare("CREATE TABLE IF NOT EXISTS user_tasks (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    tasks_text TEXT NOT NULL,
    tasks_status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIME,
    users_id INT(11) ,
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE SET NULL
)");
$stmt->execute();