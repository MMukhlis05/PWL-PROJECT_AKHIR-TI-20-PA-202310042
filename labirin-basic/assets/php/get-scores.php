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

// Mendapatkan data skor dari tabel scoreboard
$sql = "SELECT * FROM scoreboard ORDER BY time ASC";
$result = $conn->query($sql);

$scores = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $scores[] = array(
            'name' => $row['name'],
            'time' => $row['time']
        );
    }
}

// Mengirim data skor sebagai respons JSON
echo json_encode($scores);

$conn->close();
?>
