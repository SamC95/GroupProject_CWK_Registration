<?php
header('Access-Control-Allow-Origin: *');

try {
	$db = new PDO('sqlite:GPDatabase.db'); 
}
catch (PDOException $error) {
	echo 'Connection failed: ' . $error->getMessage();
}

$query = $db->exec("DELETE FROM TempData");

if ($query === false) {
  $error = $db->errorInfo();
  echo 'Query failed: ' . $error[2];
  exit();
}

?>