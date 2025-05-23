<?php
session_start();
require_once "headers.php";

try {
    require_once "dbConnection.php";
    
    $data = json_decode(file_get_contents("php://input"), true);
    error_log("Incoming login data: " . print_r($data, true));
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    error_log("Incoming user data: " . print_r($user, true));

    if ($user && $password === $user['pwd']) {
        $_SESSION['username'] = $user['username'];
        error_log("User logged in: " . $user['username']);
        echo json_encode(['status' => 'success', 'message' => 'Logged in']);
    } else {
        // FULL SESSION CLEANUP
        $_SESSION = [];
        session_unset();
        session_destroy();

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
