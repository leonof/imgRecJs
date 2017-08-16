<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 2017/4/3
 * Time: 上午10:55
 */
include_once("basic/db_op.php");
include_once("basic/data.php");
include_once("basic/string.php");

$username = $_POST["username"];
$password=$_POST["password"];
$nums = str_split($_POST["nums"],1);
$n1 = $_POST["n1"];
$n2 = $_POST["n2"];
$n3 = $_POST["n3"];
$n4 = $_POST["n4"];
$ID = -1;
$query = "SELECT ID FROM ding_user WHERE username='$username' and password='$password'";
$sth = execSql($query);
if($RES = $sth->fetch()){
    $ID = $RES["ID"];
}
if($ID<0){
    exit("Not authorized.");
}

function learn($str,$num,$uid){
    $query = "SELECT ID FROM ding_data WHERE UID='$uid' and chardata='$str'";
    $sth = execSql($query);
    if($RES = $sth->fetch()){
        echo $num.'exist.';
        return false;
    }
    else{
        $query = "insert into ding_data (UID,realchar,chardata) values ('$uid','$num','$str')";
        if(execSql($query)){
            echo $num.'learned.';
        }

    }
}
?>
<?php
learn($n1,$nums[0],$ID);
learn($n2,$nums[1],$ID);
learn($n3,$nums[2],$ID);
learn($n4,$nums[3],$ID);
?>
