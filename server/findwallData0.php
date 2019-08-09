<?php
    /* 连接数据库 */
    $con=mysqli_connect("127.0.0.1","root","","project_mogu");
    $shopid=$_REQUEST["shopid"];
    /* 查询表 */
    $sql = "SELECT * FROM  wallshop0 WHERE shopid = '$shopid'";
    $result=mysqli_query($con,$sql);
    $data=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);
?>