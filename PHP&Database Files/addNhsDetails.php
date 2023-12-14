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
$postCode = $_POST['postCode'];
$gender = $_POST['gender'];

$query = $db->prepare("INSERT INTO TempData (NHS, Forename, Surname, \"DateOfBirth\", \"PostCode\", \"GenderCode\") VALUES (:nhsNum, :forename, :surname, :DOB, :postCode, :gender)");
$query -> bindParam(':nhsNum', $nhsNum);
$query -> bindParam(':forename', $forename);
$query -> bindParam(':surname', $surname);
$query -> bindParam(':DOB', $DOB);
$query -> bindParam(':postCode', $postCode);
$query -> bindParam(':gender', $gender);

$query -> execute();

if ($query->rowCount() > 0) {
	echo json_encode("Data Inserted");
}
else {
	echo json_encode("Error Inserting Data");
}
?>