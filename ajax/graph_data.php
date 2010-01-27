<?Php
include_once "../small_header.php";
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);

$returnDays = 7;
$returnMonths = 12;
$_GET = $db->Clean($_GET);
$a_Day = array();
$a_Month = array();
$a_Months = array();
$a_Year = array();
$a_Ts = array();
$response = array();
$response["graph"]["graphData"] = array();
$startD = date("Y-m-d",mktime(0,0,0,date("m"),date("d")-$returnDays,date("y")));

for($c=0;$c<$returnDays;$c++){
	$a_Day[] = date("d",mktime(0,0,0,date("m"),date("d")-$c,date("y")));
	$a_Month[] = date("m",mktime(0,0,0,date("m"),date("d")-$c,date("y")));
}
for($e=0;$e<$returnMonths;$e++){
	$a_Months[] = date("m/y",mktime(0,0,0,date("m")-$e,date("d"),date("y")));
	$a_Year[] = date("Y",mktime(0,0,0,date("m")-$e,date("d"),date("y")));
}

$a_Day = array_reverse($a_Day);
$a_Months = array_reverse($a_Months);
if(isset($_GET['graphType'])){//This must be set
	switch ($_GET['graphType']){
		case "tpd":case "tpdep":case "tpcate":case "rpd": case "rpdep":case "rpcate":
			for($d=0;$d<$returnDays;$d++){$response['graph']['display'][]=array($d, $a_Day[$d]);}			
		break;
		case "ttpm": case "rtpm": case "ttpmd": case "ttpmc":
			for($d=0;$d<$returnMonths;$d++){$response['graph']['display'][]=array($d, $a_Months[$d]);}			
		break;		
	}
}

$a_Month = uniqueArray($a_Month);
$a_Year = uniqueArray($a_Year);
if(isset($_GET['graphType'])){//This must be set
	switch ($_GET['graphType']){
		case "tpd"://Tickets per day 
			$sql = "SELECT count(id) AS count,DAY(created_on) AS day FROM tickets WHERE DAY(created_on) IN(".join(',',quoteArray($a_Day,"s")).") AND MONTH(created_on) IN(".join(',',quoteArray($a_Month,"s")).") GROUP BY DAY(created_on) ORDER BY DAY(created_on) ASC;";
			$days = createDayArray($returnDays,true);
			$db->Query($sql);
			if($db->Count_res()>0){
				$res = $db->Fetch("row_array");
				foreach($res as $k=>$r){$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));}
				if(isset($_GET['style'])){
					switch($_GET['style']){
						case "large":$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"label"=>"Tickets per day", "data"=>rekeyArray($days)); break;
						default: $response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"data"=>rekeyArray($days));break;
					}
				}else{$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"data"=>rekeyArray($days));}
			}else{$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"data"=>rekeyArray($days));}
			$response["message"]=$db->Queries;
		break; 
		case "tpdep":
			$db->Query("SELECT dm.department_id,dm.user_id,d.name FROM department_members AS dm JOIN department AS d ON(d.id=dm.department_id)");
			$dep = $db->Fetch("assoc_array");
			$dep_h = array();
			$depName = array();
			foreach($dep as $d){$dep_h[$d['department_id']][]=$d['user_id'];$depName[$d['department_id']]=$d['name'];  }
			$days = array();
			$cnt = 0;
			foreach($dep_h as $dep){
				$cnt++;
				$c = join(',',quoteArray($dep,"s"));
				$days = createDayArray($returnDays,true);
				$sql = "SELECT count(id) AS count,DAY(created_on) AS day FROM tickets WHERE DAY(created_on) IN(".join(',',quoteArray($a_Day,"s")).") AND MONTH(created_on) IN(".join(',',quoteArray($a_Month,"s")).") AND created_by_id IN (".$c.") GROUP BY DAY( created_on ) ORDER BY created_on DESC;";
				$db->Query($sql);
				if($db->Count_res()>0){
					$res = $db->Fetch("row_array");
					foreach($res as $k=>$r){
						$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
					}
					if(isset($_GET['style'])){
						switch($_GET['style']){
							case "large":$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"lines"=>array("show"=>true),"label"=>$depName[$cnt], "data"=>rekeyArray($days)); break;
							default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
						}
					}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				
			}
			$response["message"]=$db->Queries;
		break;
		case "tpcate":
			$db->Query("SELECT id,name FROM category");
			$cate = $db->Fetch("assoc_array");
			$days = array();
			foreach($cate as $c){
				$days = createDayArray($returnDays,true);
				$sql = "SELECT count(id) AS count,DAY(created_on) AS day,category_id FROM tickets WHERE DAY(created_on) IN(".join(',',quoteArray($a_Day,"s")).") AND MONTH(created_on) IN(".join(',',quoteArray($a_Month,"s")).") AND category_id=".$c['id']." GROUP BY DAY( created_on ) ORDER BY created_on DESC;";
				$db->Query($sql);
				if($db->Count_res()>0){
					$res = $db->Fetch("row_array");
					foreach($res as $k=>$r){
						$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
					}
					if(isset($_GET['style'])){
						switch($_GET['style']){
							case "large":$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"label"=>$c['name'], "data"=>rekeyArray($days)); break;
							default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
						}
					}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				}
			}
			$response["message"]=$db->Queries;
			$response["error"]="";
		break;
		case "ttpm":
			$sql = "SELECT count(id) AS count,MONTH(created_on) AS month FROM tickets WHERE MONTH(created_on) IN(".join(',',quoteArray($a_Months,"s")).") AND YEAR(created_on) IN(".join(',',quoteArray($a_Year,"s")).") GROUP BY MONTH(created_on) ORDER BY MONTH(created_on) ASC;";
			$days = createMonthArray($returnMonths,true);
			$db->Query($sql);
			if($db->Count_res()>0){
				$res = $db->Fetch("row_array");
				foreach($res as $k=>$r){
					$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
				}
				if(isset($_GET['style'])){
					switch($_GET['style']){
						case "large":$response["graph"]["graphData"][]=array("bars"=>array("show"=>true),"label"=>"Tickets per Month", "data"=>rekeyArray($days)); break;
						default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
					}
				}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				
			}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
			$response["message"]=$db->Queries;
		break;
		case "ttpmd":
			$db->Query("SELECT dm.department_id,dm.user_id,d.name FROM department_members AS dm JOIN department AS d ON(d.id=dm.department_id)");
			$dep = $db->Fetch("assoc_array");
			$dep_h = array();
			$depName = array();
			foreach($dep as $d){$dep_h[$d['department_id']][]=$d['user_id'];$depName[$d['department_id']]=$d['name'];  }
			$days = array();
			$cnt = 0;
			foreach($dep_h as $dep){
				$cnt++;
				$c = join(',',quoteArray($dep,"s"));
				$days = createMonthArray($returnMonths,true);
				$sql = "SELECT count(id) AS count,MONTH(created_on) AS month FROM tickets WHERE MONTH(created_on) IN(".join(',',quoteArray($a_Months,"s")).") AND YEAR(created_on) IN(".join(',',quoteArray($a_Year,"s")).") AND created_by_id IN (".$c.") GROUP BY MONTH( created_on ) ORDER BY created_on DESC;";
				$db->Query($sql);
				if($db->Count_res()>0){
					$res = $db->Fetch("row_array");
					foreach($res as $k=>$r){
						$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
					}
					if(isset($_GET['style'])){
						switch($_GET['style']){
							case "large":$response["graph"]["graphData"][]=array("bars"=>array("show"=>true),"stack"=>true,"label"=>$depName[$cnt], "data"=>rekeyArray($days)); break;
							default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
						}
					}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				}
				
			}
			$response["message"]=$db->Queries;
		break;
		case "ttpmc":
			$db->Query("SELECT id,name FROM category");
			$cate = $db->Fetch("assoc_array");
			$days = array();
			foreach($cate as $c){
				$days = createMonthArray($returnMonths,true);
				$sql = "SELECT count(id) AS count,MONTH(created_on) AS month,category_id FROM tickets WHERE MONTH(created_on) IN(".join(',',quoteArray($a_Months,"s")).") AND YEAR(created_on) IN(".join(',',quoteArray($a_Year,"s")).") AND category_id=".$c['id']." GROUP BY MONTH( created_on ) ORDER BY created_on DESC;";
				$db->Query($sql);
				if($db->Count_res()>0){
					$res = $db->Fetch("row_array");
					foreach($res as $k=>$r){
						$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
					}
					if(isset($_GET['style'])){
						switch($_GET['style']){
							case "large":$response["graph"]["graphData"][]=array("bars"=>array("show"=>true),"stack"=>true,"label"=>$c['name'], "data"=>rekeyArray($days)); break;
							default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
						}
					}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				}
			}
			$response["message"]=$db->Queries;
		break;


		
		/* Replies */
		case "rpd"://Tickets per day 
			$sql = "SELECT count(id) AS count,DAY(created_on) AS day FROM responses WHERE DAY(created_on) IN(".join(',',quoteArray($a_Day,"s")).") AND MONTH(created_on) IN(".join(',',quoteArray($a_Month,"s")).") GROUP BY DAY(created_on) ORDER BY DAY(created_on) ASC;";
			$days = createDayArray($returnDays,true);
			$db->Query($sql);
			if($db->Count_res()>0){
				$res = $db->Fetch("row_array");
				foreach($res as $k=>$r){
					$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
				}
				if(isset($_GET['style'])){
					switch($_GET['style']){
						case "large":$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"label"=>"Responses per day", "data"=>rekeyArray($days)); break;
						default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
					}
				}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				
			}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
			$response["message"]=$db->Queries;
		break; 
		case "rtpm":
			$sql = "SELECT count(id) AS count,MONTH(created_on) AS month FROM responses WHERE MONTH(created_on) IN(".join(',',quoteArray($a_Months,"s")).") AND YEAR(created_on) IN(".join(',',quoteArray($a_Year,"s")).") GROUP BY MONTH(created_on) ORDER BY MONTH(created_on) ASC;";
//			echo $sql;
			$days = createMonthArray($returnMonths,true);
			$db->Query($sql);
			if($db->Count_res()>0){
				$res = $db->Fetch("row_array");
				foreach($res as $k=>$r){
					$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
				}
				if(isset($_GET['style'])){
					switch($_GET['style']){
						case "large":$response["graph"]["graphData"][]=array("bars"=>array("show"=>true),"label"=>"Responses per Month", "data"=>rekeyArray($days)); break;
						default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
					}
				}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				
			}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
			$response["message"]=$db->Queries;
		break;
		case "rpcate":
			$db->Query("SELECT id,name FROM category");
			$cate = $db->Fetch("assoc_array");
			$days = array();
			foreach($cate as $c){
				$days = createDayArray($returnDays,true);
				$sql = "SELECT count(t.id) AS count,DAY(r.created_on) AS day,t.category_id FROM tickets AS t JOIN responses AS r ON (r.ticket_id=t.id) WHERE DAY(r.created_on) IN(".join(',',quoteArray($a_Day,"s")).") AND MONTH(r.created_on) IN(".join(',',quoteArray($a_Month,"s")).") AND t.category_id=".$c['id']." GROUP BY DAY( r.created_on ) ORDER BY r.created_on DESC;";
				$db->Query($sql);
				if($db->Count_res()>0){
					$res = $db->Fetch("row_array");
					foreach($res as $k=>$r){
						$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
					}
					if(isset($_GET['style'])){
						switch($_GET['style']){
							case "large":$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"stack"=>null,"label"=>$c['name'], "data"=>rekeyArray($days)); break;
							default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
						}
					}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				}
			}
			$response["message"]=$db->Queries;
			$response["error"]="";
		break;
		case "rpdep":
			$db->Query("SELECT dm.department_id,dm.user_id,d.name FROM department_members AS dm JOIN department AS d ON(d.id=dm.department_id)");
			$dep = $db->Fetch("assoc_array");
			$dep_h = array();
			$depName = array();
			foreach($dep as $d){$dep_h[$d['department_id']][]=$d['user_id'];$depName[$d['department_id']]=$d['name'];  }
			$days = array();
			$cnt = 0;
			foreach($dep_h as $dep){
				$cnt++;
				$c = join(',',quoteArray($dep,"s"));
				$days = createDayArray($returnDays,true);
				$sql = "SELECT COUNT(r.id) AS count,DAY(r.created_on) AS day FROM tickets AS t JOIN responses AS r ON (r.ticket_id=t.id) WHERE DAY(r.created_on) IN(".join(',',quoteArray($a_Day,"s")).") AND MONTH(r.created_on) IN(".join(',',quoteArray($a_Month,"s")).") AND r.user_id IN (".$c.") GROUP BY DAY( r.created_on ) ORDER BY r.created_on DESC;";
				$db->Query($sql);
				if($db->Count_res()>0){
					$res = $db->Fetch("row_array");
					foreach($res as $k=>$r){
						$days[$r[1]]=array($days[$r[1]][0],intval($r[0]));
					}
					if(isset($_GET['style'])){
						switch($_GET['style']){
							case "large":$response["graph"]["graphData"][]=array("lines"=>array("show"=>true),"label"=>$depName[$cnt], "data"=>rekeyArray($days)); break;
							default: $response["graph"]["graphData"][]=array("data"=>rekeyArray($days));break;
						}
					}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
				}else{$response["graph"]["graphData"][]=array("data"=>rekeyArray($days));}
			}
			$response["message"]=$db->Queries;
		break;
		default:break;
	}
	echo json_encode($response);
}
?>