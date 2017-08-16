<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 2017/8/16
 * Time: 上午8:58
 */
include_once("basic/db_op.php");
include_once("basic/data.php");
include_once("basic/string.php");

$username = trim(data("username"));
$password=trim(data("password"));
if($username=='' or $password==''){
    exit("Username/password is blank!");
}

$query = "SELECT ID FROM ding_user WHERE username='$username'";
$sth = execSql($query);
if($RES = $sth->fetch()){
    exit("Username exist!");
}
else{
    $query = "insert into ding_user (username,password) values ('$username','$password')";
    if(execSql($query)){
        exit("Success:".$username.'/'.$password);
    }
    else{
        exit("Database error.");
    }
}
exit("Unknown error.");