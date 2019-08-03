<?php
header("Content-Type: text/html; charset=UTF-8"); //中文转码
#连接数据库
$con = mysqli_connect("127.0.0.1", "root", "", "project_mogu");
#读取JSON文件的内容
$json = file_get_contents("panicData.json");
#把JSON数据转换为数组
$data = json_decode($json, true);
#写入到数据库中
for ($i = 0; $i < count($data); $i++) {
    $src = $data[$i]["src"];
    $title = $data[$i]["title"];
    $original_price = $data[$i]["original_price"];
    $sale_price = $data[$i]["sale_price"];
    $sql = "INSERT INTO `project_mogu`.`panic` (`pid`, `src`, `title`, `original_price`, `sale_price`) VALUES ('$i', '$src', ' $title', '$original_price', ' $sale_price')";
    mysqli_query($con, $sql);
    mysql_query("set names 'utf8' ");
    mysql_query("set character_set_client=utf8");
    mysql_query("set character_set_results=utf8");
    // echo $sql;
}
