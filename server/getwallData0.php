<?php
    /* 连接数据库 */
    $con=mysqli_connect("127.0.0.1","root","","project_mogu");
    /* 查询表 */
    $sql="SELECT * FROM wallshop0";
    $result=mysqli_query($con,$sql);
    $data=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);
?>