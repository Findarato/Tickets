<?
header ("content-type: text/xml");

if($_SERVER['DOCUMENT_ROOT'] != "/www/tickets"){
	$_SERVER['DOCUMENT_ROOT'] = "/www/tickets";
}
$response = array("message"=>"","error"=>""); //including the generatic response
require_once "functions.php";
require_once "classes/db.class.php";
$db = db::getInstance();

$_GET = $db->Clean($_GET);
if(isset($_GET['id'])){
	$user_id = $_GET['id'];
	$dmembs = getDepartmentMembers_by_userid($user_id);
	if(isset($_GET['bookmark'])){
		$db->Query("SELECT ticket_id FROM favorite WHERE user_id=".$user_id);
		$ids = $db->Fetch('row_array');
		$db->Query('SELECT tcv.id,tcv.subject,tcv.description,tcv.category,tcv.created_on,tcv.open,tcv.closed_on FROM tcview AS tcv WHERE id IN('.join(',',array_implode($ids)).')');
		$res = $db->Fetch('assoc_array');
		$rssDescription = "All of your bookmarked Tickets";
		$rssTitle = "Bookmarked Tickets";
	}else{
		$db->Query('SELECT tcv.id,tcv.subject,tcv.description,tcv.category,tcv.created_on,tcv.open FROM tcview AS tcv WHERE tcv.open=1 AND (assigned_id IN('.join(',',$dmembs).') OR created_by_id IN( '.join(',',$dmembs).' ))');
		$res = $db->Fetch('assoc_array');
		$rssTitle = "All tickets involving you";
		$rssDescription = "All tickets open for you,your department,or created by your department.";
	}
echo ' 
<rss version="2.0">
  <channel>
    <title>'.$rssTitle.'</title>
    <link>http://www.lapcat.org/tickets</link>
    <description>'.$rssDescription.'</description>
    <language>en-us</language>
    <pubDate>'.date(DATE_RSS).'</pubDate>
    <generator>Tickets RSS editor</generator>
    <webMaster>webmaster@lapcat.org</webMaster>
    <ttl>5</ttl>
 ';
$description = "";
$subject = "";
foreach ($res as $r){
	$description = "";
	$subject ="";
	$subject = $r['subject'];
	if($r['open']==0){	$subject .= ' | Closed';}
	$description = $r['description'];

echo '
    <item>
      <title>'.$subject.'</title>
      <link>http://www.lapcat.org/tickets/#ticket/'.$r['id'].'</link>
      <description>'.$description.'</description>
      <pubDate>'.date(DATE_RSS,strtotime($r['created_on'])).'</pubDate>
    </item>
	';
}
echo '
  </channel>
</rss>';
}
?>

 