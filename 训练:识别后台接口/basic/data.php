<?php
/**
 * 提供数据操作通用函数.
 *
 * Created by PhpStorm.
 * User: Leon
 * Date: 16/12/17
 * Time: 下午9:40
 */
function getRandChar($length){
    $str = null;
    $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    $max = strlen($strPol)-1;

    for($i=0;$i<$length;$i++){
        $str.=$strPol[rand(0,$max)];//rand($min,$max)生成介于min和max两个数之间的一个随机整数
    }

    return $str;
}

function data($str){
    if($_POST[$str]){
        return $_POST[$str];
    }
    else if($_GET[$str]){
        return $_GET[$str];
    }
    else{
        return '';
    }
}
?>
