<?php
/* 连接数据库 */
$con=mysqli_connect("127.0.0.1","root","","project_mogu");
$query = "set names utf8";
/* 拿到JSON文件 */
$json=file_get_contents("./wall/wallData0.json");
/* JSON文件转PHP */
$data = json_decode($json,true);
print_r($data);
/* 拿到php数据进行循环插入到数据库中 */
for($i=0;$i<count($data);$i++){
    $src=$data[$i]["src"];
    $title=$data[$i]["title"];
    $sale=$data[$i]["sale"];
    $org=$data[$i]["org"];
    $sql="INSERT INTO `wallshop0` (`shopid`, `src`, `title`, `sale`, `org`) VALUES (NULL, '$src', '$title', '$sale', '$org')";
    mysqli_query($con,$sql);
}
?>