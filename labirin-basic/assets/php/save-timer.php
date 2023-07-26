<?php
$servername = "localhost";
$username = "root"; // Ganti dengan username phpMyAdmin Anda
$password = ""; // Ganti dengan password phpMyAdmin Anda
$dbname = "form-test"; // Ganti dengan nama database yang ingin Anda gunakan

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi database gagal: " . $conn->connect_error);
}

// Mendapatkan data timer dari JavaScript (dalam milisekon)
$time = $_POST['time'];

// Menyimpan data timer ke database
$sql = "INSERT INTO user_table (time) VALUES ('$time')";

if ($conn->query($sql) === TRUE) {
    echo "Timer saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Menutup koneksi
$conn->close();
?>
