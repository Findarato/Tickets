<?Php
class User {
	//Public Arrays
	public $a_User=array('logged-in'=>false);
	public $A_U = array();
	public $User_id = -1;//adding compatability to Joe's coding style
	
	public $debug = array();
	public $gravatar = ""; // image link to gravatar image
	
	//Private stuff
	private $openID = "";
	private $Permissions = array();
	private $md5Email = "";
	function UserLogin($name,$pass){ // just a wrapper to make sure that older stuff works
		$this->User($name,$pass); 
	}

	function User($name,$pass,$openID=false,$md5Pass=false){
		$db=db::getInstance();			
		if(!$openID){//Not a openID login
			$SQL='
				SELECT 
					u.ID, 
					u.username, 
					u.type, 
					u.firstname,
					u.lastname,
					u.email_address AS emailAddress
				FROM 
					tickets.users AS u 
				WHERE';
				if($md5Pass){
					$SQL.=' (u.username="'.$name.'" AND u.password="'.$pass.'");';
				}else{
					$SQL.=' (u.username="'.$name.'" AND u.password=MD5("'.$pass.'"));';
				}
					
		}else{//This is an openID login, lets do some cool stuff
			$SQL='
				SELECT
					u.ID, 
					u.username, 
					u.type, 
					u.firstname,
					u.lastname,
					u.email_address AS emailAddress
				FROM 
					tickets.users AS u 
				WHERE 
					';
				if($md5Pass){
					$SQL.=' (u.id="'.$name.'" AND u.password="'.$pass.'");';
				}else{
					$SQL.=' (u.id="'.$name.'" AND u.password=MD5("'.$pass.'"));';
				}
		}
		$rows = $db->Query($SQL,false,"assoc_array");
		
		if($db->Count_res()>0){
			foreach($rows as $row){
				$this->a_User['logged-in']=true;
				
				// Valid Log-In and Password 
				$this->User_id = $row['ID']; //adding compatability to Joe's coding style
				$this->A_U['type']=$row['type'];
				$this->A_U['first-name']=$row['firstname'];
				$this->A_U['last-name']=$row['lastname']; //adding compatability to Joe's coding style
				$this->A_P['username']=$row['username'];
				$this->A_U['logged-in']=3;
				$this->A_U['validated']=true;
				$this->A_U['email'] = $row["emailAddress"];
				$this->A_U['mdEmail'] = md5( strtolower( trim( $row["emailAddress"] ) ) );
				$this->md5Email =  md5( strtolower( trim( $row["emailAddress"] ) ) );
				$this->UserInfo["openID"]="";
				$this->LoadPermissions();
				if(in_array("NO_ACCESS",$this->Permissions)){ // this user is blocked
					$this->LogUserOut();
				}
			}
		}
		return array('success'=>0);
	}
	
	
	/* Function - Log User Out */
	function LogUserOut(){
		$this->a_User['logged-in']=false;
		$this->User_id = -1; //adding compatability to Joe's coding style
		$this->A_U = array();
	}
	
	public function LoadPermissions(){ //Load the permissions into the object and return true on success and false on fail
		$permissions = array();
		$db = db::getInstance();
		$sql = "SELECT permission_id FROM user_permissions WHERE user_id=".$this->User_id;
		$permissions = $db->Query($sql,false,"assoc_array");
		if($permissions==0){
			$sql = "SELECT id FROM permissions WHERE permission='VIEW'";
			$view = $db->Query($sql,false,"assoc_array");
			$sql = "INSERT INTO user_permissions VALUES(".$this->User_id.",".$view.")";
			$this->LoadPermissions();
			return false;	
		}else{
			$this->Permissions = $permissions;
			return true;
		}
	}
	/*
	 * Setters and getters
	 * 
	 */
	public function getPermissions(){ return $this->Permissions; }
	public function getMD5email(){ return $this->md5Email; }
}
?>