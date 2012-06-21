<?Php
/**
 * Started December 9, 2011
 * Just a small header so I do not have to type the admin permissions a lot of times
 * 
 */
function checkAdminStatus(){
  $usr = unserialize($_SESSION["user"]);
  if(!in_array("ADMIN",$usr->getPermissions())){
    if(in_array("NO_ACCESS", $usr->getPermissions())){
      $response["error"] = "Permission Denied";
      $response["message"] = "You do not have permission to view this file";
      return json_encode($response);
      die("no access");
    }
  }  
}
