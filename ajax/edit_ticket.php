<?Php
/**
 * Ticket edit script.  Very simple just returns the ticket info, and responses if needed
 * @author Joseph Harry
 * @version 1.0
 * @started September 14, 2010
 */
include("../small_header.php");
include("../smarty.inc.php");
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);
$_GET = $db->Clean($_GET,true);

$sql = "UPDATE tickets.tickets SET ";
$setArray = array();
if(isset($_GET["edit"]) && $_GET["edit"]==1){
  foreach($_GET as $key => $val){
    switch($key){
     case "ticketPriority":
       $setArray[] = " priority=".$val;
     break;
     case "ticketCategory":
       $setArray[] = " category_id=".$val;
     break;
     case "ticketLocation":
       $setArray[] = " location=".$val;
     break;
     case "ticketProject":
       $setArray[] = " project_id=".$val;
     break;
     case "ticketBody":
       $setArray[] = " description='".$val."'";
     break;      
     default:break;
    }  
  }
}
$sql .= join(",",$setArray);
$sql .= " WHERE id=".$_GET["ticketId"]. " LIMIT 1;";
if(isset($_GET["debug"])){
  echo "<pre>";
  print_r($_GET);
  echo "</pre>";
  echo $sql;
  die();
}
$db->Query($sql);
if(count($db->Error)==2){
  $response["error"] = $db->Error;
}else{
  $response["message"] = "Ticket Updated Successfully";
  $response["modifiedTicket"] = $_GET["ticketId"];
  $response["modifiedTicketBody"] = nl2br(Tcode($_GET["ticketBody"]));
  addReply($_GET["ticketId"], $usr->User_id, "Ticket Modified", "This ticket was modified on ".date("D M j, Y G:i:s "). " by [user=".$usr->User_id."]");
}
echo json_encode($response);
?>