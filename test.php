<?php
$data = array (
		"type"=>"123",
);
	$url="http://192.168.1.103/gaotie/rec_device.php";
	$data=json_encode($data);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	
// 	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
	
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);//$data JSONÀàÐÍ×Ö·û´®
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
//	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($data)));
	
	$filecontent=curl_exec($ch);
	curl_close($ch);
	echo $filecontent;

?>