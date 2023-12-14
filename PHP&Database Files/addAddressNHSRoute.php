<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db');
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$nhsNum = $_POST['nhsNum'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];

$query = $db->prepare("UPDATE TempData SET \"AddressLine1\"=:address1, \"AddressLine2\"=:address2, City=:city WHERE NHS=:nhsNum");

$query -> bindParam(':nhsNum', $nhsNum);
$query -> bindParam(':address1', $address1);
$query -> bindParam(':address2', $address2);
$query -> bindParam(':city', $city);

$query -> execute();

if ($query->rowCount() > 0) {
        echo "Row updated successfully";
    } else {
        echo "Error updating row.";
    }
?>