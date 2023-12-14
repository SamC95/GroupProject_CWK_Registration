<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db'); 
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$idNum = $_POST['idNum'];

$query = $db->prepare("DELETE FROM Accounts WHERE IDNumber = :idNum");
$query -> bindParam(':idNum', $idNum);
$query->execute();

return $query->rowCount();
?>