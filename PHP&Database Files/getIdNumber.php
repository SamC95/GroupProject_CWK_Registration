<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db'); 
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$nhsNum = $_POST['nhsNum'];

$query = $db->prepare("SELECT * FROM Accounts WHERE NHSNumber = :nhsNum");
$query -> bindParam(':nhsNum', $nhsNum);
$query->execute();

$fetchedDetails = [];

while ($number = $query->fetchObject()) {
	$fetchedDetails[]=$number;
}

if (empty($fetchedDetails)) {
	echo json_encode("No value found");
}
else {
	echo json_encode($fetchedDetails);
}
?>