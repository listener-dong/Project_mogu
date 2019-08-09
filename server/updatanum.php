<?php
$shopid=$_REQUEST["shopid"];
$num=$_REQUEST["num"];
$sale=$_REQUEST["sale"];
$total=$num*$sale;
/* 连接数据库 */
$con=mysqli_connect("127.0.0.1","root","","project_mogu");
/* 更新 */
$updateSql = "UPDATE cart SET num='$num',total='$total' WHERE shopid=' $shopid'";
mysqli_query($con, $updateSql);
echo $shopid.$num.$sale.$total;
?>