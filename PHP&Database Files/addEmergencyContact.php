<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db');
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$nhsNum = $_POST['nhsNum'];
$emergencyContact = $_POST['emergencyName'];
$emergencyNum = $_POST['emergencyNo'];

$query = $db->prepare("UPDATE TempData SET \"EmergencyContact\"=:emergencyName, \"EmergencyNumber\"=:emergencyNo WHERE NHS=:nhsNum");

$query -> bindParam(':nhsNum', $nhsNum);
$query -> bindParam(':emergencyName', $emergencyContact);
$query -> bindParam(':emergencyNo', $emergencyNum);

$query -> execute();

if ($query->rowCount() > 0) {
        echo "Row updated successfully";
    } else {
        echo "Error updating row.";
    }
?>