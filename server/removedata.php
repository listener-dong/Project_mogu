<?php
$shopid=$_REQUEST["shopid"];
/* 连接 */
$con=mysqli_connect("127.0.0.1","root","","project_mogu");
$sql = "DELETE FROM cart  WHERE shopid='$shopid'";
mysqli_query($con, $sql);
?>