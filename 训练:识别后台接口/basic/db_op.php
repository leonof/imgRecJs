<?php
/**
 * 内置数据库操作方法.
 *
 * Created by PhpStorm.
 * User: Leon
 * Date: 2017/12/17
 * Time: 13:47
 */
header("Content-Type:text/html;charset=utf-8");
date_default_timezone_set('Asia/Shanghai');
error_reporting(E_ALL^E_NOTICE^E_WARNING);

$ET = 60*15;//验证码有效期

global $pdo;
try{
    $pdo = new PDO("mysql:host=xxx;dbname=xxx","leon","***");
}
catch (PDOException $e){
    echo "数据库连接失败.";
    exit;
}
function execSql($SQL_SEN){
    if(strstr($SQL_SEN,"SELECT")<3||strstr($SQL_SEN,"select")<3){
        return $GLOBALS["pdo"]->query($SQL_SEN);
    }
    return $GLOBALS["pdo"] -> exec($SQL_SEN);
}
//$dbServer = 'localhost';
//$dbUser = 'root';
//$dbPass = '648835300';
//$dbName = 'SYXH';
//
//$conn = @mysqli_connect($dbServer,$dbUser,$dbPass,$dbName);
//
//function execSql($SQL_SEN){
//    if(strstr($SQL_SEN,"SELECT")<3||strstr($SQL_SEN,"select")<3){
//
//    }
//
//}
?>