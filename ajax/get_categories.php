<?Php
/**
 * Ticket display script.  Very simple just returns the ticket info, and responses if needed
 * @author Joseph Harry
 * @version 1.0
 * @copyright March 16, 2009
 */
include_once("../small_header.php");
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);
$_GET = $db->Clean($_GET);

$cate = $db->Query("SELECT id,name FROM tickets.category;",false,"assoc");

echo json_encode(array("categories"=>$cate));
?>