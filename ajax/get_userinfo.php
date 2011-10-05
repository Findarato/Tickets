<?php

include "../small_header.php";
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);

//print_r($usr);
$_GET = $db->Clean($_GET,true);

function formatData($graphData,$monthData){
	$displayData = array();
	if(!isset($graphData[0])){
		foreach($monthData as $nm){
			$displayData[] = array("month"=>$nm,"total"=>0);
		}
	}else{
		$cnt = 0;
		foreach($monthData as $nm){
			$cnt++;
			foreach($graphData as $key=>$gd){
				if($gd["month"] == $nm){
					$displayData[$cnt] = $graphData[$key];
					break;
				}else{
					$displayData[$cnt] = array("month"=>$nm,"total"=>0);
				}
			}
		}	
	}
	return $displayData;
}

if(isset($_GET["allUsers"])){

	
	die(json_encode($json));	
}

$json = array();
$json["userInfo"] = $db->Query("
SELECT 
	u.firstname,
	u.lastname,
	u.username,
	DATE_FORMAT(u.joined	, '%M %e, %Y') AS joined,
	u.email_address,
	u.type 
FROM 
	users AS u 
WHERE 
	id=".$_GET["userId"]
,false,"assoc");

$json["userInfo"]["mdEmail"] = md5( strtolower( trim( $json["userInfo"]["email_address"] ) ) ); 

$json["userInfo"]["tickets"] = $db->Query("
SELECT
	dm.department_id AS id,
	dm.notify,
	d.name AS departmentName
FROM 
	tickets.department_members AS dm 
JOIN
	department AS d
ON 
	(d.id=dm.department_id) 
WHERE 
	user_id=".$_GET["userId"]
,false,"assoc");


$json["userInfo"]["tickets"]["altEmail"] = $db->Query("

SELECT
	email
FROM 
	tickets.alt_email 
WHERE 
	user_id=".$_GET["userId"]
,false,"row");


$json["userInfo"]["departments"] = $db->Query("
SELECT
	id,name
FROM 
	tickets.department;" 
,false,"assoc");

$holderArray = array();
foreach ($json["userInfo"]["departments"] as $key => $data){
	$holderArray[intval($data["id"])] = $data["name"];
}
$json["userInfo"]["departments"] = $holderArray;

$months = array(1,2,3,4,5,6,7,8,9,10,11,12);
$monthLables = array();
for($a=1;$a<13;$a++){
	$monthLables[] = date("M",mktime(0,0,0,$a,1,1982));
}
$endMonths = array_slice($months,0,date("m"));
$startMonths = array_slice($months,date("m"));
$newMonths = array();
$nmh = array();
$displayData = array();

array_push($newMonths,$startMonths);
array_push($newMonths,$endMonths);
$newMonths = array_implode($newMonths);
$newMonthsHold = array(1,2,3,4,5,6,7,8,9,10,11,12);
$yearStart = date("Y-m-d",mktime(0,0,0,date("m")+1,1,date("Y")-1));
$yearEnd = date("Y-m-d",mktime(0,0,0,date("m"),31,date("Y")));
//Tickets
$json["tickets"]["byMe"] = $db->Query("SELECT count(id) FROM tickets WHERE tickettype_id=1 AND created_by_id=".$_GET["userId"],false,"row");
$json["tickets"]["toMe"] = $db->Query("SELECT count(id) FROM tickets WHERE tickettype_id=1 AND assigned_id=".$_GET["userId"]." AND open=1",false,"row");
$graphData = $db->Query("SELECT MONTH(created_on) AS month,count(*) AS total,YEAR(created_on) AS year FROM tickets WHERE created_on BETWEEN '".$yearStart."' AND '".$yearEnd."' AND tickettype_id=1 AND created_by_id=".$_GET["userId"]." GROUP BY MONTH(created_on),YEAR(created_on) ORDER BY YEAR(created_on),MONTH(created_on)",false,"assoc");

$json["tickets"]["graph"]["byMe"]["data"] = formatData($graphData,$newMonths);
$json["tickets"]["graph"]["byMe"]["title"] = "Tickets Created";
$json["tickets"]["graph"]["monthLables"] = $monthLables;

//Bugs
$json["bugs"]["byMeOpen"] = $db->Query("SELECT count(id) FROM tickets WHERE created_by_id=".$_GET["userId"]." AND open=1 AND tickettype_id=2",false,"row");
$json["bugs"]["byMe"] = $db->Query("SELECT count(id) FROM tickets WHERE created_by_id=".$_GET["userId"]." AND tickettype_id=2",false,"row");
$graphData = $db->Query("SELECT MONTH(created_on) AS month,count(*) AS total,YEAR(created_on) AS year FROM tickets WHERE created_on BETWEEN '".$yearStart."' AND '".$yearEnd."' AND tickettype_id=2 AND created_by_id=".$_GET["userId"]." GROUP BY MONTH(created_on),YEAR(created_on) ORDER BY YEAR(created_on),MONTH(created_on)",false,"assoc");
$json["bugs"]["graph"]["byMe"]["data"] = formatData($graphData,$newMonths);
$json["bugs"]["graph"]["byMe"]["title"] = "Bugs Filed";


//Responses
$json["responses"]["created"] = $db->Query("SELECT count(id) FROM responses WHERE user_id=".$_GET["userId"],false,"row");
$graphData = $db->Query("SELECT MONTH(created_on) AS month,count(*) AS total,YEAR(created_on) AS year FROM responses WHERE created_on BETWEEN '".$yearStart."' AND '".$yearEnd."' AND user_id=".$_GET["userId"]." GROUP BY MONTH(created_on),YEAR(created_on) ORDER BY YEAR(created_on),MONTH(created_on)",false,"assoc");
$json["responses"]["graph"]["byMe"]["data"] = formatData($graphData,$newMonths);
$json["responses"]["graph"]["byMe"]["title"] = "Responses Added";
//echo indentJson(json_encode($json));



// Lets get the linked google accounts to see if this account is linked to any google accounts
$json["userInfo"]["openIdLinks"] = $db->Query("SELECT count(user_id) FROM tickets.openId_users WHERE user_id=".$_GET["userId"],false,"row"); 

echo json_encode($json);
?>    