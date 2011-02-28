<?Php 
/**
 * class user
 *
 * Contains all the user information for Tickets
 * @author Joseph Harry
 * @version 1.0 
 * @copyright March 16, 2009
 */
class user{ //The user class for tickets 1.0

///////////////////////Basic Configuration and Variable definition
	//Public Variables
	public $Username = ""; //Combination of Firstname and Lastname
	public $User_id = 100000; //user ID as index of user table
	public $Email = "";
	public $Firstname = "John";
	public $Lastname = "Doe";
	//private variables
	private $dbconfig = array();
	private $db = "";

///////////////////////Constructor
	function user($username="",$password=""){//create and load the values from the table
		 $this->db=db::getInstance();
		//No user passed means its a blank session
		if($username=="" && $password=="" ){//blank session
				$this -> invalid_user();
		}else{//validate user and create the session
			$res = $this->db -> Query("SELECT id,username,firstname,lastname FROM ".$this->db->Prefix."lapcat.hex_users WHERE username='$username' AND (password='$password' OR password=MD5('$password'))");
			$this -> checkerror($this->db);
			if($this->db -> Count_res() == 1){//this is the result we are looking for
				$res = $this->db->Format("assoc");
				$this->User_id = $res['id'];
				$this->Username = $res['username'];
				$this->Firstname = $res['firstname'];
				$this->Lastname = $res['lastname'];
			}else{//not a valid user
				$this -> invalid_user();
			}
		}
		$this->reset_db(); //Clear out the database connection.
	}

///////////////////////Public Functions	
	public function Get_userid(){return $this->User_id;}

///////////////////////Private Functions	
	private function reset_db(){$this->db = "";}
	/**
	 * Checks to see if there was an error with the query
	 * @since 1.0
	 * @return 
	 * @param object $db
	 */
	private function checkerror($db){if(count($db -> Error) == 2) {echo "There was an error with the query <br><pre>";	print_r($db -> Error);echo "</pre>";$this -> invalid_user(); die();}}
	/**
	 * Used to create the object with "Invalid data"
	 * @since 1.0
	 * @return Void
	 */
	private function invalid_user(){ $this -> Username = "Tickets Guest"; $this->User_id=-1;}
	

}
?>