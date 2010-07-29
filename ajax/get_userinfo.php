<?php

include "../small_header.php";
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);	
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

$json = array();
$json["userInfo"] = $db->Query("
SELECT 
	lhu.firstname,
	lhu.lastname,
	lhu.username,
	DATE_FORMAT(lhu.joined	, '%M %e, %Y') AS joined,
	lhu.type 
FROM 
	lapcat.hex_users AS lhu 
WHERE 
	id=".$_GET["userId"]
,false,"assoc");
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
echo json_encode($json);
?>    