<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 2017/4/3
 * Time: 上午11:21
 */
include_once("basic/db_op.php");
include_once("basic/data.php");
include_once("basic/string.php");
$username = $_POST["username"];
$password=$_POST["password"];
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

function check($str,$uid)
{
    $str = str_split($str,1);
    $length = count($str);
    $tempNum = 0;
    $tempSimmiar = 0;
    $query = "SELECT * FROM ding_data where UID='$uid'";
    $sth = execSql($query);
    while ($RES = $sth->fetch()) {
        $thisSimmiar = 0;
        $thisFeature = str_split($RES["chardata"],1);
        $thisNum = $RES["realchar"];
        for($i=0;$i<$length;$i++){
            if($thisFeature[$i]==$str[$i]){
                $thisSimmiar ++;
            }
        }
        if($thisSimmiar>$tempSimmiar){
            $tempSimmiar = $thisSimmiar;
            $tempNum = $thisNum;
        }
    }
    return $tempNum;
}
?>
<?php
echo "".check($n1,$ID)."".check($n2,$ID)."".check($n3,$ID)."".check($n4,$ID)."";
?>
