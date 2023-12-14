<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db');
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$nhsNum = $_POST['nhsNum'];
$forename = $_POST['forename'];
$surname = $_POST['surname'];
$DOB = $_POST['DOB'];
$postcode = $_POST['postcode'];
$gender = $_POST['gender'];

$query = $db->prepare("UPDATE TempData SET NHS=:nhsNum, Forename=:forename, Surname=:surname, DateOfBirth=:DOB, GenderCode=:gender WHERE PostCode=:postcode");
$query -> bindParam(':nhsNum', $nhsNum);
$query -> bindParam(':forename', $forename);
$query -> bindParam(':surname', $surname);
$query -> bindParam(':DOB', $DOB);
$query -> bindParam(':postcode', $postcode);
$query -> bindParam(':gender', $gender);

$query -> execute();

if ($query->rowCount() > 0) {
	echo json_encode("Data Inserted");
}
else {
	echo json_encode("Error Inserting Data");
}
?>