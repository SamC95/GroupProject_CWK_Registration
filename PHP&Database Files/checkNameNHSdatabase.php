<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:vaccines.db'); 
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$Forename = $_POST['firstName'];
$Surname = $_POST['surname'];

$query = $db->prepare("SELECT * FROM patients WHERE Forename = :firstName AND Surname = :surname");
$query -> bindParam(':firstName', $Forename);
$query -> bindParam(':surname', $Surname);

$query -> execute();

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