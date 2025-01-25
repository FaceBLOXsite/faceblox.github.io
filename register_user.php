<?php
// Database connection
$host = "localhost";
$dbname = "faceblox";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = htmlspecialchars($_POST["username"]);
    $email = htmlspecialchars($_POST["email"]);
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT);

    try {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        $stmt->execute();
        echo "Registration successful! <a href='login.html'>Login here</a>";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo "This email is already registered. Please use a different email.";
        } else {
            echo "Error: " . $e->getMessage();
        }
    }
}
?>
