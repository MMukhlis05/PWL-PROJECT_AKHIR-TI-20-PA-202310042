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

// Menyimpan data skor ke dalam tabel scoreboard
$sql = "INSERT INTO scoreboard (name, time) VALUES ('$name', '$time')";
if ($conn->query($sql) === TRUE) {
    echo "Data saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
