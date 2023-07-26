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
    // Hapus data pemain dengan nama yang sama sebelumnya
    $deleteSql = "DELETE FROM scoreboard WHERE name = '$name'";
    $conn->query($deleteSql);
}

// Memperbarui skor dalam tabel scoreboard
$insertSql = "INSERT INTO scoreboard (name, time) VALUES ('$name', '$time')";
if ($conn->query($insertSql) === TRUE) {
    echo "Skor berhasil diperbarui";
} else {
    echo "Error: " . $insertSql . "<br>" . $conn->error;
}

$conn->close();
?>
