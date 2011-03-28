<?
class User {
	/* Array - User */
	public $a_User=array(
		'logged-in'=>false,
		'theme'=>22
	);
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
	
	
	
	
	// Array - Achievements
	private $A_Achievements=array(
		1=>false,
		2=>false,
		3=>false,
		4=>false
	);
	//
	// Function - Remove Achievement
	function F_RemoveAchievement($v_AchievementID=0){
		if(array_key_exists($v_AchievementID,$this->A_Achievements)){
			unset($this->A_Achievements[$v_AchievementID]);
		}
	}
	//
	// Function - Load Achievements
	function F_LoadAchievements(){
		
	}
	//
	// Function - Check Achievements
	function F_CheckAchievements($a_AchievementIDs=array()){
		$v_DC=db::getInstance();
		$a_Response=array();
		foreach($a_AchievementIDs as $v_AchievementID){
			if(array_key_exists($v_AchievementID,$this->A_Achievements)){
				$a_Response[$v_AchievementID]=F_Achievements($this->User_id,$v_AchievementID);
				//
				//
			}
			//
		}
		return $a_Response;
	}
	//
	// Function - Get Points Information
	function F_GetPointsInformation($v_UserID=0){
		if($v_UserID==$this->User_id){
			$a_JSON=array('data'=>array(
				'objective'=>$this->A_P['objective-points'],
				'patron-plus'=>$this->A_P['patron-plus-points'],
				'LAPCAT'=>0
			));
			$a_JSON['pointer']='points';
			return json_encode($a_JSON);
		}else{
			return json_encode(array('fail'=>true,'pointer'=>'points'));
		}
	}

	//
	// Function - Get Promotions XML
	function F_GetPromotionsXML($v_UserID=0){
		if(empty($this->A_Promotions)){$this->F_LoadPromotions($v_UserID);}
		return FF_CATXML($this->A_Promotions,'promotions-list');
	}

	//
	public $A_U=array('area-ID'=>0,'user-ID'=>0,'type'=>2,'library-ID'=>0,'online'=>2,'logged-in'=>2,'XML'=>'','patron-plus'=>2,'tag'=>0,'validated'=>false);
	public $A_BG=array('on'=>2,'r'=>0,'g'=>0,'b'=>0,'a'=>100,'image'=>1);
	public $A_D=array(0=>1,1=>1,2=>0,3=>0,'r'=>67,'g'=>118,'b'=>169,'a'=>35);
	public $A_P=array('objective-points'=>0,'patron-plus-points'=>0,'hotkeys-unlocked'=>0,'username'=>'Guest','user-type-ID'=>2,'user-type-name'=>'Guest','library-ID'=>0);
	private $A_Promotions=array();
	private $V_Promotion=0;
	private $V_PromotionCount=0;
	public $V_LI=false;
	public $V_LIChanged=false;
	public $User_id = -1;//adding compatability to Joe's coding style
	//
	// Function - Get Data
	function F_GD(){return FF_CATXML($this->A_U,'user-info').'<boom>'.FF_CATXML($this->A_BG,'background-info').'<boom>'.FF_CATXML($this->A_D,'display-info').FF_CATXML($this->A_P,'points-info');}
	//
	// Function - Get Points Information
	function F_GPI(){return FF_CATXML($this->A_P,'points-info');}
	//
	// Function - Load Promotions
	function F_LoadPromotions($v_UserID=0){
		$v_DH=opendir($_SERVER['DOCUMENT_ROOT'].'/promotions/');
		while(($v_File=readdir($v_DH))!==false){
			if($v_File!=='..'&&$v_File!=='.'&&$v_File!=='.svn'){
				$this->A_Promotions[]=str_replace(' ','%20',$v_File);
			}
		}
		$this->V_PromotionCount=count($this->A_Promotions);
		closedir($v_DH);
	}
	//
	// Function - Next Promotion
	function F_NextPromotion(){
		if($this->V_Promotion+1<$this->V_PromotionCount){$this->V_Promotion++;}else{$this->V_Promotion=0;}
		return '<promotion>'.$this->A_Promotions[$this->V_Promotion].'</promotion>';
	}
	//
	// Function - User
	function User($tickets=false){if(!$tickets){$this->F_LoadPromotions();}}
	//
	// User Log-In
	function UserLogin($name=0,$pass='',$v_FailSafe=false){
		$SQL='SELECT hu.ID, hu.username, hu.adventureOn, hu.type, hu.cardnumber, hu.pin, hml.library_ID, hp.objective_points, hp.patron_plus_points, hp.hotkeys_unlocked, hu.firstname,hu.lastname FROM lapcat.hex_users AS hu LEFT JOIN lapcat.hex_points AS hp ON (hp.ID=hu.ID) LEFT JOIN lapcat.hex_my_library AS hml ON (hu.ID=hml.user_ID) WHERE (hu.username="'.$name.'" AND hu.password=MD5("'.$pass.'")) OR (hu.cardnumber="'.$name.'" AND hu.pin="'.$pass.'") AND hu.locked=2;';
		$v_DC=db::getInstance();
		$v_DC->Query($SQL);
		$rows=$v_DC->Format('assoc_array');
		if($v_DC->Count_res()>0){
			foreach($rows as $row){
				$this->a_User['logged-in']=true;
				$this->f_GetTheme($row['ID']);
				
				// Valid Log-In and Password 
				$this->A_U['area-ID']=0;
				$this->A_U['user-ID']=$row['ID'];
				$this->User_id=$row['ID']; //adding compatability to Joe's coding style
				$this->A_U['type']=$row['type'];
				$this->A_U['first-name']=$row['firstname'];
				$this->A_U['last-name']=$row['lastname']; //adding compatability to Joe's coding style
				$this->A_P['user-type-ID']=$row['type']; 
				$this->A_P['user-type-name']=FF_CaT($row['type']); 
				$this->A_P['username']=$row['username'];
				$this->A_P['library-ID']=$row['library_ID'];
				$this->A_U['library-ID']=$row['library_ID'];
				$this->A_P['objective-points']=$row['objective_points'];
				$this->A_P['patron-plus-points']=$row['patron_plus_points'];
				$this->A_P['hotkeys-unlocked']=$row['hotkeys_unlocked'];
				$this->A_U['online']=$row['adventureOn'];
				$this->A_U['logged-in']=3;
				$this->A_U['validated']=true;
				if($row['cardnumber']>0&&$row['pin']>0){$this->A_U['patron-plus']=FF_PinAPI($row['cardnumber'],$row['pin']);}
				return array('success'=>2,'user'=>$this->A_U['user-ID'],'theme'=>$this->a_User['theme'],'type'=>$this->A_U['type']);
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
	//
	// Function - Account Creation Completed
	function F_ACC($v_UID=0,$v_VK=''){
		$v_DC=db::getInstance();
		$v_DC->Query('UPDATE lapcat.hex_users SET validated="Yes" WHERE ID='.$v_UID.' AND valid_key="'.$v_VK.'";');
		if(empty($v_DC->Error)){$this->A_U['validated']=true;}
		return $this->A_U['validated'];
	}
}
?>