<?php
$isActive=$_REQUEST["isActive"];
/* 连接数据库 */
$con=mysqli_connect("127.0.0.1","root","","project_mogu");
/* 更新 */
$updateSql="UPDATE `cart` SET `isActive`=$isActive WHERE `shopid`";
mysqli_query($con, $updateSql);
echo $isActive;
?>