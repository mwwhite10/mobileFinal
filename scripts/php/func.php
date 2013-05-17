 <?php
if(isset($_POST["func"]))
{

require_once 'dbInfo.php';

	switch($_POST["func"] ) 
	{
		case "nav":

		getContent($_POST["navName"]);

		break;
	}
}

function getContent($navName)
{
	global $mysqliLink;

	$linkName = $mysqliLink->real_escape_string($navName);

	$result = $mysqliLink->query("SELECT * FROM site_content WHERE nav_name = '$linkName'");

	if($row = $result->fetch_object()){
	echo( $row->content);
	}else{
	echo( 'false');
	}

	$result->close();
	closeConnection($mysqliLink);
}

function closeConnection($link)
{
	$link->close();
}

?>