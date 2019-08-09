<?php
/* 连接数据库 */
$con=mysqli_connect("127.0.0.1","root","","project_mogu");
/* 需要插入的数据 */
$src=$_REQUEST["src"];
$shopid=$_REQUEST["shopid"];
$title=$_REQUEST["title"];
$org=$_REQUEST["org"];
$sale=$_REQUEST["sale"];
$num=$_REQUEST["num"];
$total=$sale*$num;
// echo $src.$shopid.$title.$org.$sale.$num;
/* 将信息插入到数据库中 */
$sql="INSERT INTO `cart` (`cartid`, `shopid`, `src`, `title`, `sale`, `org`, `total`, `num`, `isActive`) VALUES (NULL, '$shopid', '$src', '$title', '$sale', '$org', '$total', '$num', 1)";
mysqli_query($con,$sql);
?>