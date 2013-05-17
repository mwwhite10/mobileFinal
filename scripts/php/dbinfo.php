<?php
	define('DB_NAME', 'mobile_class'); 
	define('DB_USER', 'mbuser'); 
	define('DB_PASSWORD', 'mbuser');
	define('DB_HOST', 'localhost'); 

	$server = DB_HOST;
	$user = DB_USER;
	$password = DB_PASSWORD;
	$db_name = DB_NAME;

	$mysqliLink = new mysqli($server, $user, $password, $db_name);

	if(!$mysqliLink) {
		die('could not connect: '. $mysqliLink->error);
	}

?>