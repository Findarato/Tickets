<?
class User {
	//Public Arrays
	public $a_User=array(
		'logged-in'=>false,
	);
	public $A_U = array();
	public $User_id = -1;//adding compatability to Joe's coding style
	public $Permissions = array();
	public $Permissions_name = array();
	
	//Private stuff
	private $openID = "";

	function User(){
		$SQL='
			SELECT 
				u.ID, 
				u.username, 
				u.type, 
				u.firstname,
				u.lastname
			FROM 
				tickets.users AS u 
			WHERE 
				(u.username="'.$name.'" AND u.password=MD5("'.$pass.'")) 
				OR (u.open_id="'.$name.'" AND u.email_address="'.$pass.'");'
		;
		
		$db=db::getInstance();
		$rows = $db->Query($SQL,false,"assoc_array");
		
		if($db->Count_res()>0){
			foreach($rows as $row){
				$this->a_User['logged-in']=true;
				
				// Valid Log-In and Password 
				$this->User_id=$row['ID']; //adding compatability to Joe's coding style
				$this->A_U['type']=$row['type'];
				$this->A_U['first-name']=$row['firstname'];
				$this->A_U['last-name']=$row['lastname']; //adding compatability to Joe's coding style
				$this->A_P['username']=$row['username'];
				$this->A_U['logged-in']=3;
				$this->A_U['validated']=true;
				$this->UserInfo["openID"]="";
				$this->Permissions = $this->LoadPermissions($row['ID']);
			}
		}else{//Lets check to see if there is a valid openID but no user account information			
			
		}
		return array('success'=>0);
	}
	
	
	
	/* Function - Log User Out */
	function LogUserOut(){
		$this->a_User['logged-in']=false;
		$this->User_id = -1; //adding compatability to Joe's coding style
		$this->A_U = array();
	}
	
	/* Function - Patron API */
	function patAPI($cardno) { //take validated card information and get values.
		$bad = array("<HTML>","</HTML>","<BODY>","</BODY>");
		$oldTags = array('REC INFO[p!]','EXP DATE[p43]','PCODE1[p44]','PCODE2[p45]','PCODE3[p46]','P TYPE[p47]','TOT CHKOUT[p48]','TOT RENWAL[p49]','CUR CHKOUT[p50]','BIRTH DATE[p51]','HOME LIBR[p53]','PMESSAGE[p54]','MBLOCK[p56]','REC TYPE[p80]','RECORD #[p81]','REC LENG[p82]','CREATED[p83]','UPDATED[p84]','REVISIONS[p85]','AGENCY[p86]','CL RTRND[p95]','MONEY OWED[p96]','CUR ITEMA[p102]','CUR ITEMB[p103]','CUR ITEMC[p124]','CIRCACTIVE[p163]','NOTICE PREF[p268]','PATRN NAME[pn]','ADDRESS[pa]','TELEPHONE[pt]','UNIQUE ID[pu]','P BARCODE[pb]','PIN[p=]','EMAIL ADDR[pz]','LINK REC[p^]','');
		$newTags = array('RECINFO','EXPDATE','PCODE1','PCODE2','PCODE3','PTYPE','TOTCHKOUT','TOTRENWAL','CURCHKOUT','BIRTHDATE','HOMELIBR','PMESSAGE','MBLOCK','RECTYPE','RECORD','RECLENG','CREATED','UPDATED','REVISIONS','AGENCY','CLRTRND','MONEYOWED','CURITEMA','CURITEMB','CURITEMC','CIRCACTIVE','NOTICEPREF','PATRNNAME','ADDRESS','TELEPHONE','UNIQUEID','PBARCODE','PIN','EMAILADDR','LINKREC','EMPTY');
		$url = "http://10.1.1.2:4500/PATRONAPI/".$cardno."/dump";
		$info = array();
		$data = str_replace("\n","",@file_get_contents($url));
		$data = str_replace($bad,"",$data); 
		$data = str_replace($oldTags,$newTags,$data);
		$data = explode("<BR>",$data);
	
		foreach($data as $value)	{
			$holdvalue = explode("=",$value);
			if($holdvalue[0]!="" && $holdvalue[0]!="UNIQUEID" && $holdvalue[0]!="PIN"){
				$info[$holdvalue[0] ]= $holdvalue[1];
			}
		}
	
		return $info["BIRTHDATE"];
	}

	public function LoadPermissions($user_id){ //Load the permissions into the object and return true on success and false on fail
		$permissions = array();
		$db=db::getInstance();
		$sql = "SELECT permission_id FROM user_permissions WHERE user_id=$user_id";
		$permissions = $db->Query($SQL,false,"assoc_array");
		if($permissions==0){
			return false;	
		}else{
			$this->Permissions = $permissions;
			return true;
		}
	}
	
	
	function UserLogin($name=0,$pass='',$v_FailSafe=false){

	}

}
?>