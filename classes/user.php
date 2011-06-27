<?
class User {

	//
	// Function - User
	function User($tickets=false){if(!$tickets){$this->F_LoadPromotions();}}
	
	/* Array - User */
	public $a_User=array(
		'logged-in'=>false,
	);
	public $User_id = -1;//adding compatability to Joe's coding style
	
	/* Function - Get Logged In Status */
	function f_GetLoggedInStatus(){
		return json_encode(array('switch'=>$this->a_User['logged-in'],'type'=>$this->A_U['type'],'theme'=>$this->a_User['theme']));
	}
	/* Function - Log User Out */
	function f_LogUserOut(){
		$this->a_User['logged-in']=false;
		$this->a_User['theme']=22;
		$this->A_U['type']=2;
		return $this->f_GetLoggedInStatus();
	}
	/* Function - Get Theme */ 
	function f_GetTheme($v_UserID=0){
		$v_DC=db::getInstance();
		$v_SQL='SELECT htbu.theme_ID AS theme FROM lapcat.hex_themes_by_user AS htbu WHERE htbu.user_ID='.$v_UserID.';';
		$v_DC->Query($v_SQL);
		if($v_DC->Count_res()>0){$a_Results=$v_DC->Format('assoc');$this->a_User['theme']=$a_Results['theme'];}
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
	
		//$this->Homelibrary = $info["HOMELIBR"];
		//$this->Birthdate = $info["BIRTHDATE"];
		//$this->Currentcheckout = $info["CURCHKOUT"];
		//$this->Patapi = $info;
		return $info["BIRTHDATE"];
	}

	//
	// User Log-In
	function UserLogin($name=0,$pass='',$v_FailSafe=false){
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
		$v_DC=db::getInstance();
		$v_DC->Query($SQL);
		$rows=$v_DC->Format('assoc_array');
		if($v_DC->Count_res()>0){
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
			}
		}else{
			if(!$v_FailSafe){
				if(FF_PinAPI($name,$pass)){
					$v_Birthday=strtotime($this->patAPI($name));
					if(strtotime('today - 13 years')<$v_Birthday){
						return array('success'=>1,'could-not-create-account'=>true);
					}else{
						$v_DC->Query('INSERT INTO hex_users (type,cardnumber,pin,birthday) VALUES (3,"'.$name.'","'.$pass.'","'.date('Y-m-d',$v_Birthday).'");');
						return $this->UserLogin($name,$pass,true);
					}
				}
			}
		}
		return array('success'=>0);
	}

}
?>