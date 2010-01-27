<?php
  include_once('small_header.php');
  $db->Query("SELECT * FROM lapcat.calendar");
  $res = $db->Format('assoc_array');
  $sql = "";
  foreach ($res as $r){
	$sql = "INSERT INTO lapcat.obj_calendar (
	name,
	o_date,
	o_place,
	o_endtime,
	o_starttime,
	o_text,
	summer,
	entered_on) VALUES(
		'".$r['pTitle']."',
		'".$r['pDate']."',		
		'".location2id($r['pLocation'])."',
		'".$r['pETime']."',
		'".$r['pSTime']."',
		'".mysql_real_escape_string($r['pDescription'])."',
		'".srp($r['pCategory'])."',
		NOW());
	";
	  $db->Query($sql);
	  echo $db->Lastsql."<br>";
  print_r($db->Error);
  }

  function srp($string){
  	if($string == "Summer Reading Program"){return "3";}else{return"0";}
  }
  function location2id($location){
  	switch($location){
  		case "Fish Lake Branch Library": case "Fish Lake": return '2';break;
  		case "Coolspring Branch Library": case "Coolspring":return '1';break;
  		case "Kingsford Heights Branch Library":case "Kingsford Heights":return '4';break;
  		case "Hanna Branch Library":case "Hanna": return '3';break;
  		case "Union Mills Branch Library":case "Union Mills":return '6';break;
  		case "Rolling Prairie Branch Library":case "Rolling Prairie":return '5';break;
		default:return '0';break;
  	}
  }
?>
(0, 'Main Library'),
(1, 'Coolspring'),
(2, 'Fish Lake'),
(3, 'Hanna'),
(4, 'Kingsford Heights'),
(5, 'Rolling Prairie'),
(6, 'Union Mills'),
(7, 'Mobile Library');