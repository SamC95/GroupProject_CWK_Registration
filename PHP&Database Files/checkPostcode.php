<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:vaccines.db'); 
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$postcode = $_POST['postcode'];

$query = $db->prepare("SELECT * FROM patients WHERE Postcode = :postcode");
$query -> bindParam(':postcode', $postcode);

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