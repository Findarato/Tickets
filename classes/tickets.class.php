<?Php
class Ticket {
	//Public items
	
	//Private stuff
	private $assignedById = 0;
	private $body = "";
	private $category = "";
	private $categoryId = 0;
	private $createdById = 0;
	private $createdOn = 0;
	private $dueOn = 0;
	private $id = 0;
	private $title = "";
	
	//Constructor
	public function __construct($id){
		if($id <0 || $id === undefined || $id==NULL){return false;}
		$db=db::getInstance();
		$user = $db->Query("SELECT * FROM tickets WHERE id=".$id." LIMIT 1;",false,"assoc");
		$this->assignedById = $user["assigned_by_id"];
		$this->body = $user["description"];
		$this->title = $user["subject"];
		$this->categoryId = $user["category_id"];
		$this->createdOn = $user["created_on"];
		$this->dueOn = $user["due_on"];
	}

	public function addReply($title=-1,$body=-1,$userId=-1){
		$db = db::getInstance();
		$body = mysql_escape_string($body);
		
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
			include_once("/smarty.inc.php");
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
	
		return true;	
	}
	
	public function getTicket($id){
		return array(
			"ticketId"=>$this->id,
			"body"=>$this->body,
			"category"=>$this->category,
			"categoryId"=>$this->categoryId,
			"createdById"=>$this->createdById,
			"createdOn"=>$this->createdOn,
			"dueOn"=>$this->dueOn			
		);	
	}
	
}