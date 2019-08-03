<?php
#连接数据库
$con = mysqli_connect("127.0.0.1", "root", "", "project_mogu");
# 查询获取表中的所有内容
$sql = "SELECT * FROM panic";
// 查询表中的数据(按照某个字段排序)
$result = mysqli_query($con, $sql);

// 把数组中的数组转换为数组
echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC), true);
