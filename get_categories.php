<?Php
/**
 * This script will get all of the categories and return them in a json string.
 * @author Joseph Harry
 * @version 1.0
 * @started September 14, 2010
 */
include_once("../small_header.php");
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);
$_GET = $db->Clean($_GET);

$cate = $db->Query("SELECT id,name FROM tickets.category WHERE display=1;",false,"assoc");

echo json_encode(array("categories"=>$cate));
?>