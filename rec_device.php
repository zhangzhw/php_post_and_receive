<?php 

if ($_SERVER['REQUEST_METHOD']=='POST')
{
	$post_data = file_get_contents('php://input');
	$data = json_decode($post_data, true);
	echo $data["type"];
}


?>