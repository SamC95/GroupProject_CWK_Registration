<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db'); 
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$idNum = $_POST['idNum'];
$password = $_POST['password'];

$query = $db->prepare("SELECT Password FROM Accounts WHERE IDNumber = :idNum");
$query -> bindParam(':idNum', $idNum);
$query->execute();

$result = $query->fetch(PDO::FETCH_ASSOC);
$hash = $result['Password'];

if (password_verify($password, $hash)) {
    echo json_encode('Valid');
}
else {
    echo json_encode('Invalid');
}
?>