<?php
/* INSERT INTO `userList` (`username`, `password`, `phone`) VALUES ('zs', '1314', '13502525477'); */
//连接服务器
$cont=mysqli_connect("127.0.0.1","root","","project_mogu");
/* 接收前端提交的内容 */
$username=$_REQUEST["username"];
$phone=$_REQUEST["userphone"];
$password=$_REQUEST["password"];

$sql="INSERT INTO `userList` (`username`, `password`, `phone`) VALUES ('$username', '$phone', '$password')";
/* 如果满足条件，保存当前提交的数据 */
$result=mysqli_query($cont,$sql);
//返回JSON数据给客户端，检查用户名和手机号是否已被使用，如果已被使用，返回错误信息
$data=array("status"=>"","msg"=>"","data"=>"");
if($result){
$data["status"]="success";
$data["msg"]="恭喜你注册成功";
}else{
    $data["status"]="error";
    $data["msg"]="抱歉，用户名或手机号已被注册！";
}
echo json_encode($data,true);
?>