<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db');
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$nhsNum = $_POST['nhsNum'];
$accountType = $_POST['accountType'];

$query = $db->prepare("UPDATE TempData SET \"AccountType\"=:accountType WHERE NHS=:nhsNum");

$query -> bindParam(':nhsNum', $nhsNum);
$query -> bindParam(':accountType', $accountType);

if ($query -> execute()) {
    echo "Success!";
}
else {
    print_r($query->errorInfo());
    echo "Database Error";
}
?>