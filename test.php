<?php
$data = array (
			"type"=>"123"
);
$data=json_encode($data);
//���Ե�ַ��url
$url="http://192.168.1.103/gaotie/rec_device.php";
	
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($data)));
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);//$data JSON�����ַ���
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
$filecontent=curl_exec($ch);
curl_close($ch);
echo $filecontent;

?>