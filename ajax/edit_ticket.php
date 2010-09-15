<?Php
/**
 * Ticket edit script.  Very simple just returns the ticket info, and responses if needed
 * @author Joseph Harry
 * @version 1.0
 * @started September 14, 2010
 */
include_once("../small_header.php");
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);
$_GET = $db->Clean($_GET,true);


if(isset($_GET["debug"])){
  echo "<pre>";
  print_r($_GET);
  echo "</pre>";
  die();
}

if(isset($_GET["edit"]) && $_GET["edit"]==1){
  switch($_GET["item"]){
   case "ticketPriority":
    
    
   break;
      
    
   default:break;
  }
  
}




?>