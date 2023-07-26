<?php
// Koneksi ke database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tebak_angka";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Koneksi database gagal: " . $conn->connect_error);
}

// Mendapatkan nilai yang dikirim melalui AJAX
$name = $_POST['name'];
$time = $_POST['time'];

// Memeriksa apakah skor pemain sudah ada dalam database
$sql = "SELECT time FROM scoreboard WHERE name = '$name'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $previousTime = $row['time'];

    if ($time < $previousTime) {
        $response = array('update' => true, 'allowChangeName' => false);
    } else {
        $response = array('update' => false, 'allowChangeName' => true);
    }
} else {
    $response = array('update' => true, 'allowChangeName' => false);
}

echo json_encode($response);

$conn->close();
?>
