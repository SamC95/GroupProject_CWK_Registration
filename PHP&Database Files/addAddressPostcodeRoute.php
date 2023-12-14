<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db');
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$postcode = $_POST['postcode'];

$query = $db->prepare("INSERT INTO TempData (\"AddressLine1\", \"AddressLine2\", \"City\", \"PostCode\") VALUES (:address1, :address2, :city, :postcode)");
$query -> bindParam(':address1', $address1);
$query -> bindParam(':address2', $address2);
$query -> bindParam(':city', $city);
$query -> bindParam(':postcode', $postcode);

$query -> execute();

if ($query->rowCount() > 0) {
	echo json_encode("Data Inserted");
}
else {
	echo json_encode("Error Inserting Data");
}
?>