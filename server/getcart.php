<?php
/* 连接数据库 */
$con=mysqli_connect("127.0.0.1","root","","project_mogu");
  /* 查询表 */
  $sql="SELECT * FROM cart";
  $result=mysqli_query($con,$sql);
  $data=mysqli_fetch_all($result,MYSQLI_ASSOC);
  echo json_encode($data,true);
// /* 插入数据库，分两种情况：1.第一次插入；2.数据库中已有当前数据 */
// $sql = "SELECT * FROM  cart WHERE shopid = '$shopid'";
// $result = mysqli_query($con,$sql);
// $row = mysqli_num_rows($result);
// /* 第一次插入 */
// if($row == 0)
// { 
//    $insetSql = "INSERT INTO `cart` (`cartid`, `shopid`, `src`, `title`, `sale`, `org`, `total`, `num`, `isActive`) VALUES (NULL, '$shopid', '$src', '$title', '$sale', '$org', '$sale', '$num', 1)";
//    mysqli_query($con,$insetSql);
// }elseif($row == 1){
//     /* 002-购物车中已经存在该商品  更新数据 */
//     $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
//     $num = $num + 1;
//     $total = $sale * $num;
 
//     /* 更新 */
//     $updateSql = "UPDATE cart SET num='$num',total='$total' WHERE shopid=' $shopid'";
//     mysqli_query($con, $updateSql);
//  }

// $sql="INSERT INTO `cart` (`cartid`, `shopid`, `src`, `title`, `sale`, `org`, `total`, `num`, `isActive`) VALUES (NULL, '$shopid', '$src', '$title', '$sale', '$org', '$sale', '$num', 1)";
// mysqli_query($con,$sql);
?>