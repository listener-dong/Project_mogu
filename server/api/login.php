<?php
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

/* 连接数据库并查询 */
$cont = mysqli_connect("127.0.0.1", "root", "", "project_mogu");

/* 查询前端输入的用户名 */
$sql = "SELECT * FROM  userList WHERE username = '$username'";
$result = mysqli_query($cont, $sql);
$data = array("status" => "", "msg" => "", "data" => "");
if (mysqli_num_rows($result) == "0") {
    $data["status"] = "error";
    $data["msg"] = "登录失败：用户名不存在！";
} else {
    /* 检查密码是否正确 */
    if (mysqli_fetch_array($result)["password"] != $password) {
        $data["status"] = "error";
        $data["msg"] = "登录失败：密码不正确！";
    } else {
        $data["status"] = "success";
        $data["msg"] = "登录成功！";
    }
}
echo json_encode($data, true);
