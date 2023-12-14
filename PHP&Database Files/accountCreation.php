<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db');
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

function generateID($newID, $db) {
    $unique = false;
    
    while ($unique === false) {
        $newID = rand(1000000, 9999999);

        $checkID = $db->query("SELECT * FROM Accounts WHERE IDNumber = $newID");
        $results = [];

        while ($number = $checkID->fetchObject()) {
            $fetchedDetails[]=$number;
        }

        if (empty($fetchedDetails)) {
            $unique = true;
            return $newID;
        }
    }
}

$newID = "";
$newID = generateID($newID, $db);

$idNum = $newID;
if (isset($_POST['nhsNum'])) {
    $nhsNum = $_POST['nhsNum'];
}
if (isset($_POST['forename'])) {
    $forename = $_POST['forename'];
}
if (isset($_POST['surname'])) {
    $surname = $_POST['surname'];
}
if (isset($_POST['DOB'])) {
    $DOB = $_POST['DOB'];
}
if (isset($_POST['postCode'])) {
    $postCode = $_POST['postCode'];
}
if (isset($_POST['gender'])) {
    $gender = $_POST['gender'];
}
if (isset($_POST['address1'])) {
    $address1 = $_POST['address1'];
}
if (isset($_POST['address2'])) {
    $address2 = $_POST['address2'];
}
if (isset($_POST['city'])) {
    $city = $_POST['city'];
}
if (isset($_POST['email'])) {
    $email = $_POST['email'];
}
if (isset($_POST['mobileNum'])) {
    $mobileNo = $_POST['mobileNum'];
}
if (isset($_POST['landlineNum'])) {
    $landlineNo = $_POST['landlineNum'];
}
if (isset($_POST['emergencyName'])) {
    $emergencyContact = $_POST['emergencyName'];
}
if (isset($_POST['emergencyNo'])) {
    $emergencyNum = $_POST['emergencyNo'];
}
if (isset($_POST['accountType'])) {
    $accountType = $_POST['accountType'];
}
if (isset($_POST['password'])) {
    $password = $_POST['password'];
    $hashPassword = password_hash($password, PASSWORD_DEFAULT);
}

$query = $db->prepare("INSERT INTO Accounts (IDNumber, NHSNumber, Forename, Surname, DateOfBirth, GenderCode, 
AddressLine1, AddressLine2, City, PostCode, Email, MobileNumber, LandlineNumber, EmergencyContact, 
EmergencyNumber, AccountType, Password) VALUES (:idNum, :nhsNum, :forename, :surname, :DOB, :gender,
:address1, :address2, :city, :postcode, :email, :mobileNo, :landlineNo, :emergencyContact, :emergencyNo, :accountType, :hashPassword)");

$query -> bindParam(':idNum', $idNum);
$query -> bindParam(':nhsNum', $nhsNum);
$query -> bindParam(':forename', $forename);
$query -> bindParam(':surname', $surname);
$query -> bindParam(':DOB', $DOB);
$query -> bindParam(':gender', $gender);
$query -> bindParam(':address1', $address1);
$query -> bindParam(':address2', $address2);
$query -> bindParam(':city', $city);
$query -> bindParam(':postcode', $postCode);
$query -> bindParam(':email', $email);
$query -> bindParam(':mobileNo', $mobileNo);
$query -> bindParam(':landlineNo', $landlineNo);
$query -> bindParam(':emergencyContact', $emergencyContact);
$query -> bindParam(':emergencyNo', $emergencyNum);
$query -> bindParam(':accountType', $accountType);
$query -> bindParam(':hashPassword', $hashPassword);

$query -> execute();

if ($query->rowCount() > 0) {
        echo "Row updated successfully";
    } else {
        echo "Error updating row.";
    }
?>