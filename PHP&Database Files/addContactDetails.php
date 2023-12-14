<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db');
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$nhsNum = $_POST['nhsNum'];
$email = $_POST['emailAddress'];
$mobileNum = $_POST['mobileNo'];
$landlineNum = $_POST['landlineNo'];

$query = $db->prepare("UPDATE TempData SET \"Email\"=:emailAddress, \"MobileNumber\"=:mobileNo, \"LandlineNumber\"=:landlineNo WHERE NHS=:nhsNum");

$query -> bindParam(':nhsNum', $nhsNum);
$query -> bindParam(':emailAddress', $email);
$query -> bindParam(':mobileNo', $mobileNum);
$query -> bindParam(':landlineNo', $landlineNum);

$query -> execute();

if ($query->rowCount() > 0) {
        echo "Row updated successfully";
    } else {
        echo "Error updating row.";
    }
?>