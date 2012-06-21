<?Php
/**
 * Statistics for Tickets.
 * There will be a few paramaters this page will take, then return a json result of the statistics.
 * @author Joseph Harry  
 * @version 1.0  
 * @copyright May 27, 2009
 */  
include "../small_header.php";
$usr = unserialize($_SESSION['user']);
$response = array("message"=>"","error"=>"");
if(isset($_GET['type'])){/*This is a valid get request*/
	$_GET = $db->Clean($_GET); //lets clean up the get array
//	print_r($_GET);
	$sql = "";//create the sql variable that will eventurally get ran at the end
	switch($_GET['style']){
		case 2:
			$dmembers = getDepartmentMembers_by_userid($usr->User_id);
			$months = array(1,2,3,4,5,6,7,8,9,10,11,12);
			$monName = array(1=>"January",2=>"February",3=>"March",4=>"April",5=>"May",6=>"June",7=>"July",8=>"August",9=>"September",10=>"October",11=>"November",12=>"December");
			$db->Query("SELECT id,name FROM library_names ORDER BY name;");
			$response['departments']=$db->Fetch("assoc");
				foreach (explode(',',$_GET['type']) as $t){
					switch ($t){
						case 1: //Closed tickets per month, by department, for all members of the department.
							$response['Largestats'][$t]['title']="Closed Ticket per Department for this Month";
							foreach($dmembers as $dm){
								$sql = "SELECT  t.count	FROM library_names AS ln
								LEFT OUTER JOIN (
									SELECT count( * ) AS count, location
									FROM tickets
									WHERE assigned_id =".$dm."
									AND open =0
									AND MONTH( created_on ) = ".date("m")."
									AND YEAR( created_on ) =".date("Y")."
									GROUP BY location
									) AS t 
								ON (ln.id = t.location) ORDER BY ln.name";
								$db->Query($sql);
								$res = $db->Fetch("assoc");
								$res['username']=id2Username($dm);
								if(count($db->Error)==2){$response['Largestats'][$t][$dm]['Error']=$db->Error[1];}
								$response['Largestats'][$t]['stats'][$dm]=$res;
								//$response['debug']=$sql;
							}
						break;
						case 2: 
							$response['Largestats'][$t]['title']="Total Tickets per Department for this Month";
							foreach($dmembers as $dm){
								$sql = "SELECT t.count	FROM library_names AS ln
								LEFT OUTER JOIN (
									SELECT count( * ) AS count, location
									FROM tickets
									WHERE assigned_id =".$dm."
									AND MONTH( created_on ) = ".date("m")."
									AND YEAR( created_on ) =".date("Y")."
									GROUP BY location
									) AS t 
								ON ln.id = t.location ORDER BY ln.name";
								
								$db->Query($sql);
								$res = $db->Fetch("assoc");
								$res['username']=id2Username($dm);
								if(count($db->Error)==2){$response['Largestats'][$t][$dm]['Error']=$db->Error[1];}
								$response['Largestats'][$t]['stats'][$dm]=$res;
							}
						break;
						case 3: 
							$response['Largestats'][$t]['title']="Total Tickets per Department for this Year";
							foreach($dmembers as $dm){
								$sql = "SELECT t.count	FROM library_names AS ln
								LEFT OUTER JOIN (
									SELECT count( * ) AS count, location
									FROM tickets
									WHERE assigned_id =".$dm."
									AND YEAR( created_on ) =".date("Y")."
									GROUP BY location
									) AS t 
								ON ln.id = t.location ORDER BY ln.name";
								
								$db->Query($sql);
								$res = $db->Fetch("assoc");
								$res['username']=id2Username($dm);
								if(count($db->Error)==2){$response['Largestats'][$t][$dm]['Error']=$db->Error[1];}
								$response['Largestats'][$t]['stats'][$dm]=$res;
							}
						break;						
						case 4:
							$response['Largestats'][$t]['title']="Open tickets per Department";
							foreach($dmembers as $dm){
								$sql = "SELECT  t.count	FROM library_names AS ln
								LEFT OUTER JOIN (
									SELECT count( * ) AS count, location
									FROM tickets
									WHERE assigned_id =".$dm."
									AND open =1
									GROUP BY location
									) AS t 
								ON ln.id = t.location ORDER BY ln.name";
								$db->Query($sql);
								$res = $db->Fetch("assoc_array");
								$res['username']=id2Username($dm);
								if(count($db->Error)==2){$response['Largestats'][$t][$dm]['Error']=$db->Error[1];}
								$response['Largestats'][$t]['stats'][$dm]=$res;
							}
						break;
						case 5: 
							$response['Largestats'][$t]['title']="Created and Closed Tickets Per Month for This year";
							foreach($months as $m){
								$sql = "SELECT t.count	FROM library_names AS ln
								LEFT OUTER JOIN (
									SELECT count( * ) AS count, location
									FROM tickets
									WHERE MONTH( created_on ) = ".$m."
									AND open =0
									AND YEAR( created_on ) =".date("Y")."
									GROUP BY location
									) AS t 
								ON ln.id = t.location ORDER BY ln.name";
								$db->Query($sql);
								$res = $db->Fetch("assoc");
								$res['username']=array("firstname"=>$monName[$m],"lastname"=>"");
								if(count($db->Error)==2){$response['Largestats'][$t][$dm]['Error']=$db->Error[1];}
								$response['Largestats'][$t]['stats'][$monName[$m]]=$res;
									
							}
						break; 
						case 6: //Average completion time per month by Department
							$response['Largestats'][$t]['title']="Average completion time per Month by Location (In hours)";
							foreach($monName as $k=> $m){
								$sql = "SELECT t.count FROM library_names AS ln
								LEFT OUTER JOIN (
									SELECT location,
									FLOOR(AVG(TIMESTAMPDIFF(HOUR ,created_on, closed_on ))) AS count
									FROM tickets
									WHERE MONTH( created_on ) = ".$k."
									AND open =0
									AND YEAR( created_on ) =".date("Y")."
									GROUP BY location
									) AS t 
								ON ln.id = t.location ORDER BY ln.name";
								$db->Query($sql);
								$res = $db->Fetch("assoc");
								//$res['count']=strTime($res['count']); //clean up the seconds
								$res['username']=array("firstname"=>$monName[$k],"lastname"=>"");
								if(count($db->Error)==2){$response['Largestats'][$t][$m]['Error']=$db->Error[1];}
								$response['Largestats'][$t]['stats'][$m]=$res;
								$response['debug']=$sql;
							}
						break;
						default:break;
					}
				}
					$response['message'] = "Generating General Statistics";
			break;
	
		case 1: default:
				foreach (explode(',',$_GET['type']) as $t){
					$searchTitle = "";
					switch ($t){
						case 1:
							$sql = "SELECT COUNT(id) AS cntId,AVG(priority) AS avgPriority FROM tcview AS t WHERE YEAR(created_on)=".date("Y").";";
							$searchTitle = "general";
						break;
						case 2:
							$sql = "SELECT COUNT(id) AS cntId,AVG(priority) AS avgPriority FROM tcview AS t WHERE YEAR(created_on)=".date("Y")." AND open=1;";
							$searchTitle = "open";
						break;			
						case 3:
							$sql = "SELECT AVG(TIMESTAMPDIFF(SECOND ,t.created_on, t.closed_on )) AS dago FROM tcview AS t WHERE YEAR(created_on)=".date("Y")." AND open=0;";
							$searchTitle = "closed";
						break;	
						case 4:
							$sql = "SELECT AVG(TIMESTAMPDIFF(SECOND ,t.created_on, t.closed_on )) AS dago FROM tcview AS t WHERE YEAR(created_on)=".date("Y")." AND open=0 AND assigned_id=".$usr->User_id.";";
							$searchTitle = "myclosed"; 
						break;	
						case 5:
							$sql = "SELECT COUNT(id) as cntId FROM responses AS t WHERE YEAR(created_on)=".date("Y").";";
							$searchTitle = "totalResponses"; 
						break;
						default:break;
					}
					$response['message'] = "Generating General Statistics";
					$db->Query($sql);
					$res = $db->Fetch("assoc");	
					if(count($db->Error)==2){$response['error']=$db->Error[1];}	
					$response['stats'][$searchTitle] = $res;
				}
			break;	
	}
	
//	echo array2json($response);
	//echo indentJson(json_encode($response));
	echo json_encode($response);
}else{
	$response['message'] = "No statistics asked for";
	$response['error'] = "No statistics asked for";
	echo json_encode($response);
}
?>