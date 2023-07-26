// Inisialisasi variabel
var randomNumber;
var startTime;
var intervalId;

// Memulai permainan dan mengacak angka
function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    startTime = new Date().getTime();
    intervalId = setInterval(updateTimer, 10);
}

// Memperbarui tampilan timer
function updateTimer() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
    var milliseconds = elapsedTime % 1000;
    $("#timer").text(
        ("0" + minutes).slice(-2) +
        ":" +
        ("0" + seconds).slice(-2) +
        ":" +
        ("00" + milliseconds).slice(-3)
    );
}

// Menghentikan permainan dan menampilkan hasil tebakan
function stopGame() {
    clearInterval(intervalId);
    $("#gameContainer").hide();
    $("#formContainer").show();
    var elapsedTime = new Date().getTime() - startTime;
    $("#time").val(elapsedTime);
    body.removeEventListener("keydown", movimentacao);
}

// Mendapatkan data skor dari server menggunakan AJAX
function getScores() {
    $.ajax({
        url: "assets/php/get-scores.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            var scores = response;

            $("#scoreList").empty(); // Kosongkan daftar sebelum menambahkan data baru
            scores.forEach(function(score) {
                var listScores =
                    "<tr>" + "<td>" + score.name + "<td>" + formatTime(score.time);
                $("#scoreList").append(listScores);
            });
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        },
    });
}

// Mengubah waktu menjadi format menit:detik:milisekon
function formatTime(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = Math.floor((time % 60000) / 1000);
    var milliseconds = time % 1000;
    return (
        ("0" + minutes).slice(-2) +
        ":" +
        ("0" + seconds).slice(-2) +
        ":" +
        ("00" + milliseconds).slice(-3)
    );
}

// Memulai permainan saat halaman dimuat
$(document).ready(function() {
    startGame();
    getScores();

    // Menghandle tebakan
    $("#guessButton").click(function() {
        var guess = parseInt($("#guessInput").val());

        if (guess === randomNumber) {
            stopGame();
            $("#resultMessage").text(
                "Selamat! Anda menebak angka dengan benar."
            );
        } else if (guess < randomNumber) {
            $("#resultMessage").text("Tebakan Anda terlalu rendah. Coba lagi.");
        } else {
            $("#resultMessage").text("Tebakan Anda terlalu tinggi. Coba lagi.");
        }

        $("#guessInput").val("");
    });
});

// Memeriksa skor saat submit form
function checkScore() {
    var name = $("#name").val();
    var time = $("#time").val();

    $.ajax({
        url: "assets/php/check-score.php",
        type: "POST",
        data: {
            name: name,
            time: time,
        },
        success: function(response) {
            var result = JSON.parse(response);

            if (result.update) {
                var confirmMessage =
                    "Skor Anda lebih baik dari sebelumnya. Apakah Anda ingin memperbarui skor?";
                if (confirm(confirmMessage)) {
                    updateScore(name, time);
                }
            } else if (result.allowChangeName) {
                var changeNameMessage =
                    "Nama ini sudah terdaftar dengan skor yang lebih baik. Apakah Anda ingin mengganti nama?";
                if (confirm(changeNameMessage)) {
                    $("#name").val("");
                }
            } else {
                alert("Skor Anda tidak lebih baik dari yang ada.");
            }

            getScores();
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        },
    });
}

// Memperbarui skor dalam database
function updateScore(name, time) {
    $.ajax({
        url: "assets/php/update-score.php",
        type: "POST",
        data: {
            name: name,
            time: time,
        },
        success: function(response) {
            console.log(response);
            alert("Skor berhasil diperbarui");
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        },
    });
}

// Menghandle submit form
$("#scoreForm").submit(function(e) {
    e.preventDefault();
    checkScore();
});