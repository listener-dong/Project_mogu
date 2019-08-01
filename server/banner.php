<?php
$json=file_get_contents("bannerData.json");
$data=json_decode($json,true);
echo json_encode($data);
?>