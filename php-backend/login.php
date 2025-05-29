<?php
session_start(); // Start the session to manage user authentication
require_once "headers.php"; // Include headers for CORS

try {
    require_once "dbConnection.php"; // Include database connection

    // Get JSON input and decode it
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // Prepare and execute SQL statement to fetch user by username
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    $passwordHash = $user['pwd'] ?? '';
    // Verify user exists and password is correct
    if ($user && password_verify($password, $passwordHash)) {
        // Set session variables for authenticated user
        $_SESSION['username'] = $user['username'];

        // Fetch and store user id in session
        $userId = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $userId->execute([$username]);
        $_SESSION['user_id'] = $userId->fetch()['id'];

        // Fetch and store user password hash in session
        $userPwd = $pdo->prepare("SELECT pwd FROM users WHERE username = ?");
        $userPwd->execute([$username]);
        $_SESSION['pwd'] = $userPwd->fetch()['pwd'];

        // Fetch and store user email in session
        $userEmail = $pdo->prepare("SELECT email FROM users WHERE username = ?");
        $userEmail->execute([$username]);
        $_SESSION['email'] = $userEmail->fetch()['email'];

        // Respond with success
        echo json_encode(['status' => 'success', 'message' => 'Logged in']);
    } else {
        // FULL SESSION CLEANUP on failed login
        $_SESSION = [];
        session_unset();
        session_destroy();

        // Remove session cookie if set
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        // Respond with error and 401 Unauthorized
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    }

} catch (PDOException $e) {
    // Handle database errors
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
