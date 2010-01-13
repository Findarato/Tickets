<?Php
/**
 * Used to quickly convert user ids to usernames
 * 
 * @return mixed the User information (Username, First and Last names)
 * @param int $user_id
 * @param string $userTable[optional]
 * @param string $userDatabase[optional]
 */
function id2Username($user_id,$userTable="hex_users",$userDatabase="lapcat" ){
	$db = db::getInstance();
	if($storedResults = $db->Get_results("users")){/*This query has already been run */
		$Userinfo = $storedResults[$user_id];
	}else{
		$db -> Query("SELECT id,username,firstname,lastname FROM $userDatabase.$userTable",true);
		$res = $db->Format("assoc_array");
		$formatedArray = array(); //Create the storage array
		foreach ($res as $r){
			$formatedArray[$r['id']]=array("username"=>$r['username'],"firstname"=>$r['firstname'],"lastname"=>$r['lastname']);
		}
		$db -> Store_results($formatedArray,"users");	
		$Userinfo = $formatedArray[$user_id];
	}
	return $Userinfo;
}

function aTcode($array,$id='description'){
	$a_fixed = $array;
	foreach($array as $k => $a){
		if(is_array($a)){
			foreach($a as $key => $a2){
				if($key==$id){$a_fixed[$k][$key] = Tcode($a[$id]);}
			}
		}else{
			if($k==$id){$a_fixed = Tcode($a[$id]);}
		}
	}
	return $a_fixed;
}
/**
 * Function that parses out the BB codeish tags and converts them into the correct html to be inserted.
 * 
 * @param string $text
 * @return string The text that has been formated 
 */
function Tcode($text,$escape=false,$loop = false,$email=false){
	$formated = $text;
	$formated1 = "";
	$start = strpos($text,"[");
	$end =  strpos($text,"]");
	preg_match_all('(\[[^]]+\])', $text, $matches);
	$matches = $matches[0];
	foreach($matches as $match){
		$orig = $match;
		$match=str_replace(" ","",$match);
		$match=str_replace("[","",$match);
		$match=str_replace("]","",$match);
		$match = explode("=",$match);
		//print_r($match);
		switch($match[0]){
			case "ticket":
				if($email){
					$formated1 = "<a href=\"http://www.lapcat.org/tickets/#ticket/".$match[1]."\" class=\"ticket_link ticket_sprite\">".$match[0]." ".$match[1]."</a>";
				}else{
					$formated1 = "<a href=\"#ticket/".$match[1]."\" class=\"ticket_link ticket_sprite\">".$match[0]." ".$match[1]."</a>";
				}
				$formated = str_replace("[".$match[0]."=".$match[1]."]", $formated1,$formated);			
				break;
			case "user":
				$userinfo = id2Username($match[1]);
				if($email){
					$formated1 = "<a href=\"http://dev.lapcat.org/tickets/#ticketlist/created_by/".$match[1]."\" class=\"ticket_sprite user\">".$userinfo['firstname']." ".$userinfo['lastname']."</a>";
				}else{
					$formated1 = "<a href=\"#ticketlist/created_by/".$match[1]."\" class=\"user fakelink ticket_sprite\">".$userinfo['firstname']." ".$userinfo['lastname']."</a>";
					
				}
				$formated = str_replace("[".$match[0]."=".$match[1]."]", $formated1,$formated);			
				
				break;
			default:
				
			break;
		}
	}
	if($escape){return mysql_escape_string($formated);
	}else{return $formated;}
}
/**
 * Post a response to the ticket.
 * 
 * @return void
 * @param int $ticket_id Id of the ticket your looking at
 * @param int $user_id user id of the user adding the response
 * @param str $title Title of the response
 * @param str $description the actual response
 */
function addReply($ticket_id,$user_id,$title,$description,$email=true,$closed=false){
	$description = mysql_escape_string($description);
	$db = db::getInstance();
	$db->Query('INSERT INTO responses (ticket_id,user_id,subject,body,created_on) VALUES('.$ticket_id.','.$user_id.',"'.$title.'","'.$description.'",NOW())');
	$db->Query("SELECT t.location,ln.email,ln.name FROM tickets AS t JOIN library_names AS ln ON (ln.id=t.location) WHERE t.id=".$ticket_id);
	$locationEmail= $db->Fetch("row");
	$db->Query("SELECT assigned_by_id,created_on,due_on,assigned_id,created_by_id,id,subject,description,priority,category FROM tcview WHERE id=".$ticket_id);
	$res1 = $db->Fetch("assoc");
	$users = getUsers();
	$userName = ucwords($users[$res1['created_by_id']]['firstname'])." ".ucwords($users[$res1['created_by_id']]['lastname']);
	$userName2 = ucwords($users[$res1['assigned_id']]['firstname'])." ".ucwords($users[$res1['assigned_id']]['lastname']);
	$body = $res1['description'];
	$db->Query("SELECT r.subject,r.body,r.created_on,r.user_id FROM responses AS r WHERE r.ticket_id=".$ticket_id." ORDER BY created_on DESC LIMIT 1");
	$res2 = $db->Fetch("assoc");
	$respon = array(
	"firstname"=>ucwords($users[$res2['user_id']]['firstname']),
	"lastname"=>ucwords($users[$res2['user_id']]['lastname']),
	"subject"=>$res2['subject'],
	"date"=>$res2['created_on'],					
	"body"=>nl2br(Tcode($res2['body'],false,false,true)));
	if(!isset($smarty)){
		$smarty = new Smarty();
		$smarty->template_dir = '/www/tickets/templates'; 
		$smarty->compile_dir = '/www/tickets/templates_c';
		$smarty->cache_dir = '/www/tickets/cache';
		$smarty->config_dir = '/www/tickets/configs';
	}
	$smarty -> assign('email_ticket_id',$ticket_id);
	$smarty -> assign('email_created_on',$res1['created_on']);
	$smarty -> assign('email_due_on',$res1['due_on']);
	$smarty -> assign('email_created_by',$userName);
	$smarty -> assign('email_assigned_to',$userName2);
	$smarty -> assign('email_category',$res1['category']);
	$smarty -> assign('email_title',$res1['subject']);
	$smarty -> assign('email_priority',$res1['priority']);				
	$smarty -> assign('email_location',$locationEmail[2]);
	$smarty -> assign('email_description',nl2br($res1['description']));
	$smarty -> assign('respon',$respon);
	$body = $smarty->fetch('email.tpl');
	if($email){generateEmail($res1['created_by_id'],$res1['assigned_id'],$res1['id'],$body,$res1['subject'],$closed,$locationEmail[1],true);}
}
function id2Email($user_id,$userTable="hex_users",$userDatabase="lapcat" ){
	$db = db::getInstance();
	if($storedResults = $db->Get_results("users")){/*This query has already been run */
		$Userinfo = $storedResults[$user_id];
	}else{
		//Get the email address from the user table
		$db -> Query("SELECT id,email_address FROM $userDatabase.$userTable",true);
		$res = $db->Format("assoc_array");
		$formatedArray = array(); //Create the storage array
		foreach ($res as $r){
			$formatedArray[$r['id']]=$r['email_address'];
		}
		//Get the email address from the alt email table
		$db -> Query("SELECT user_id,email FROM tickets.alt_email",true);
		$res = $db->Format("assoc_array");
		foreach ($res as $r){
			//replace the user table email with the alt email
			$formatedArray[$r['user_id']]=$r['email'];
		}
		$db -> Store_results($formatedArray,"users");	
		$Userinfo = $formatedArray[$user_id];
	}
	return $Userinfo;
}
function getDepartmentMembers($dep_id,$notify=0){
	$db = db::getInstance();
	$sql = "SELECT user_id FROM department_members WHERE department_id=$dep_id";
	if($notify ==1){$sql .= " AND (notify=2 OR notify=1)";}
	$db->Query($sql);
	return $db->Fetch("row_array");
}
function getUsers(){
	$return = array();
	$db = db::getInstance();
	$sql = "SELECT id,firstname,lastname FROM lapcat.hex_users";
	$db->Query($sql);
	$res = $db->Fetch("row_array");
	foreach ($res as $r){$return[$r[0]]= array("firstname"=>$r[1],"lastname"=>$r[2]);}
	return $return;
}
function getDepartmentMembers_by_userid($user_id,$notify=0){
	$db = db::getInstance();
	$db->Query("SELECT department_id FROM department_members WHERE user_id=$user_id");
	$res = $db->Fetch("row");
	return getDepartmentMembers($res,$notify);
}
function getDepartment_by_userid($user_id){
	$db = db::getInstance();
	$db->Query("SELECT dm.department_id,d.name FROM department_members AS dm JOIN department AS d ON (d.id=dm.department_id) WHERE dm.user_id=$user_id");
	return $db->Fetch("row_array");
}
function array_implode($arrays, &$target = array()) {
	if(is_array($arrays)){
    foreach ($arrays as $item) {
        if (is_array($item)) {
            array_implode($item, $target);
        } else {
            $target[] = $item;
        }
    }
    return $target;
	}else {return false;}
}
/**
 * Simple unique array generator
 * @return unique array
 * @param Mixed $array
 */
function uniqueArray($array){
	$cleanArray = array();
	foreach($array as $a){
		if(!in_array($a,$cleanArray))
			{$cleanArray[]=$a;}
	}
return $cleanArray;
}
function createDayArray($returnDays,$fillData=false,$amount=0,$order="desc"){
	if($fillData){
		if($order=="desc"){
			$cnt = $returnDays;
			for($a=0;$a<$returnDays;$a++){
				$cnt--;
				$day = date("j",mktime(0,0,0,date("m"),date("d")-$cnt,date("y")));
				$days[$day]=array($a,0);	
			}
		}else{
			for($a=0;$a<$returnDays;$a++){
				$day = date("j",mktime(0,0,0,date("m"),date("d")-$a,date("y")));
				$days[$day]=array($a,0);	
			}
		}
	}
	return $days;
}
function createMonthArray($returnMonths,$fillData=false,$amount=0,$order="desc"){
	if($fillData){
		if($order=="desc"){
			$cnt = $returnMonths;
			for($a=0;$a<$returnMonths;$a++){
				$cnt--;
				$day = date("n",mktime(0,0,0,date("m")-$cnt,date("d"),date("y")));
				$days[$day]=array($a,0);	
			}
		}else{
			for($a=0;$a<$returnMonths;$a++){
				$day = date("n",mktime(0,0,0,date("m")-$a,date("d"),date("y")));
				$days[$day]=array($a,0);	
			}
		}
	}
	return $days;	
}
function quoteArray($array,$style="d"){
	$tempArray = array();
	foreach($array as $key=>$a){
		if($style == "s"){
			$tempArray[$key]="'".$a."'";
		}else{
			$tempArray[$key]='"'.$a.'"';
		}
	}
	return $tempArray;
}
function rekeyArray($array){
	$tempArray = array();
	foreach($array as $a){
		$tempArray[] = $a;
	}
	return $tempArray;
}
function generateEmail($user_id,$assigned_id,$ticketId,$body,$ticketTitle,$closed=false,$location=false,$reply=false){
	$from = "Tickets@lapcat.org";
	$headers = "From: $from". "\r\n";
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	$emailIds['created'] = getDepartmentMembers_by_userid($user_id,1);//created by
	$emailIds['assigned'] = getDepartmentMembers_by_userid($assigned_id,1); //assigned to
	$emailIds[] = $assigned_id;
	$idsToEmail = uniqueArray(array_implode($emailIds));
	$email = array();
	$replyMessageLocation = "There is a new reply to ($ticketTitle)";
	if($closed){
		$createdMessage = "The Department ticket(".$ticketTitle.") is now Closed";
		$createdMessageLocation = "The Location ticket(".$ticketTitle.") is now Closed";
		$assignedMessage = "$ticketTitle is now Closed";
		$defaultMessage = "Ticket ".$ticketTitle. " is now Closed";
	}else{
		$createdMessage = "There is a new ticket ($ticketTitle) in your Department";
		$createdMessageLocation = "There is a new ticket ($ticketTitle) for this Location";
		$assignedMessage = "There is a new ticket ($ticketTitle) assigned to you";
		$defaultMessage = "$ticketTitle is now assigned to you";
	}
	if($location){
		if($reply){
			if($closed){mail($location,$createdMessageLocation,$body,$headers);
			}else{mail($location,$replyMessageLocation,$body,$headers);}
		}
	}
	foreach ($idsToEmail as $key=>$ite){
		$email = id2Email($ite); 
		//echo $email."=>".$location."<br>";
			if($reply && !$closed){mail($email,"There has been a reply to a one of your tickets",$body,$headers);
			}else{
				switch($key){
					case "created":
						mail($email,$createdMessage,$body,$headers);							
					break;
					case "assigned":
						mail($email,$assignedMessage,$body,$headers);							
					break;
					default:
						mail($email,$assignedMessage,$body,$headers);
					break;
				}
			}
		
	}
}
/**
 * Indents a flat JSON string to make it more human-readable
 *
 * @param string $json The original JSON string to process
 * @return string Indented version of the original JSON string
 */
function indentJson($json) {
 
    $result    = '';
    $pos       = 0;
    $strLen    = strlen($json);
    $indentStr = '  ';
    $newLine   = "\n";
 
    for($i = 0; $i <= $strLen; $i++) {
        
        // Grab the next character in the string
        $char = substr($json, $i, 1);
        
        // If this character is the end of an element, 
        // output a new line and indent the next line
        if($char == '}' || $char == ']') {
            $result .= $newLine;
            $pos --;
            for ($j=0; $j<$pos; $j++) {
                $result .= $indentStr;
            }
        }
        
        // Add the character to the result string
        $result .= $char;
 
        // If the last character was the beginning of an element, 
        // output a new line and indent the next line
        if ($char == ',' || $char == '{' || $char == '[') {
            $result .= $newLine;
            if ($char == '{' || $char == '[') {
                $pos ++;
            }
            for ($j = 0; $j < $pos; $j++) {
                $result .= $indentStr;
            }
        }
    }
 
    return $result;
}
?>