<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 16/7/9
 * Time: 下午1:07
 */
?>
<?php
function addString($string,$add){
    return $string.$add;
}

function removeString($string,$remove){
    $string = str_replace($remove,"",$string);
    return $string;
}

function haveString($string,$have){
    return !(strpos($string, $have)===false);
}
?>
