<?
//
// FUNCTIONS

//
// Function - Get Tags
function FF_GetTags($v_ID=0,$v_T='event'){
	$a_Tags=array();
	$v_DC=db::getInstance();
	$v_SQL='SELECT htb.tag_ID AS ID, ht.name FROM hex_tags_by_'.$v_T.' AS htb LEFT JOIN hex_tags AS ht ON (htb.tag_ID=ht.ID) WHERE htb.ID='.$v_ID.' AND ht.locked=2;';
	$v_DC->Query($v_SQL);
	if($v_DC->Count_res()>0){$a_Tags=$v_DC->Format('assoc_array');}
	return $a_Tags;
}



//
// Function - Area XML
function FF_AreaXML($v_AreaID=0){return '<area-info><area-ID>'.$v_AreaID.'</area-ID></area-info>';}
//
// Function - Calculate Total
function FF_CalculateTotal($v_TotalRecords=0,$v_Length=10){$v_RemainingRecords=$v_TotalRecords%$v_Length;$v_FullPages=floor($v_TotalRecords/$v_Length);if($v_RemainingRecords>0){$v_FullPages++;}return $v_FullPages;}
//
// Function - Clean
function FF_Clean($v_Text=''){return str_replace('%e2%80%98','\'',str_replace('%27','\'',str_replace('%20',' ',$v_Text)));}
//
// Function - Convert Date
function FF_ConvertDate($v_Date=''){return date('l, F jS',strtotime($v_Date));}
//
// Function - Convert Time
function FF_ConvertTime($v_Time=''){if($v_Time=='00:00:00'){return '';}else{return date('g:i A',strtotime($v_Time));}}
//
// Function - Slim Results
function FF_SlimResults($a_Data=array()){$a_ModifiedData=array();foreach($a_Data as $v_Key=>$a_Slim){$a_ModifiedData[$v_Key]=$a_Slim['result'];}return $a_ModifiedData;}
//
// Function - Tag Select XML
function FF_TagSelectXML($v_TagID=0,$v_TagName=''){return '<tag-select><ID>'.$v_TagID.'</ID><name>'.$v_TagName.'</name></tag-select>';}


//
// Function - Complete Action
function FF_CA($v_V){return '<action-complete>'.$v_V.'</action-complete>';}
//
// Function - Calculate Type
function FF_CaT($v_T=0){switch($v_T){case 3:return 'Patron';break;case 4:return 'Patron Plus';break;case 5:return 'Staff';break;case 6:return 'Staff Plus';break;case 7:return 'Staff Lv.3';break;case 8:return 'Staff Lv.4';break;case 9:return 'Staff Lv.5';break;case 10:return 'Administrator';break;case 11:return 'Developer';break;default:return 'Guest';break;}}
//
// Function - Convert Array To XML
function FF_CATXML($a_R,$v_W='data-set',$v_MDA=false,$v_MDAW='data'){$v_XML='';if(!empty($a_R)){$v_XML.=(($v_W=='')?$v_W:'<'.$v_W.'>');foreach($a_R as $v_K=>$v_D){if(is_array($v_D)){$v_XML.='<'.$v_MDAW.'>';foreach($v_D as $v_Ke=>$v_Da){$v_XML.='<'.str_replace('_','-',$v_Ke).'>'.$v_Da.'</'.str_replace('_','-',$v_Ke).'>';}$v_XML.='</'.$v_MDAW.'>';}else{$v_XML.='<'.str_replace('_','-',$v_K).'>'.$v_D.'</'.str_replace('_','-',$v_K).'>';}}$v_XML.=(($v_W=='')?$v_W:'</'.$v_W.'>');}else{$v_XML=(($v_W=='')?$v_W:'<'.$v_W.'/>');}return $v_XML;}
//
// Function - Convert Color
function FF_CC($v_V){if($v_V>255){return 255;}elseif($v_V<0){return 0;}else{return $v_V;}}
//
// Function - Convert Date
function FF_CDate($v_V){return date('l, F jS',strtotime($v_V));}
//
// Function - Convert On / Off
function FF_COO($v_V){if($v_V>2){return 3;}else{return 2;}}
//
// Function - Convert Transparency
function FF_CT($v_V,$v_TV){if($v_V>100){return (($v_TV)?1.0:100);}elseif($v_V<=0){return 0;}else{return (($v_TV)?round(($v_V/100),2):$v_V);}}
//
// Function - Convert Time
function FF_CTime($v_V){return date('g:i a',strtotime($v_V));}
//
// Function - Remove Array NULLs
function FF_RAN($a_R){foreach($a_R as $v_K=>$v_D){if(is_array($v_D)){foreach($v_D as $v_Ke=>$v_Da){if($v_Da==NULL){$a_R[$v_K][$v_Ke]=0;}}}else{if($v_D==NULL){$a_R[$v_K]=0;}}}return $a_R;}
//
// Function - Create Email
function FF_CE($v_UID=0,$v_To='',$v_GVK='',$v_OID=0){
	$v_E='';
	switch($v_OID){
		case 26:
			$v_M=$_SERVER['HTTP_HOST'].'/valid/'.$v_UID.'/'.$v_GVK;
			$v_E=str_replace('\n','',@file_get_contents($_SERVER['DOCUMENT_ROOT'].'/lapcat/files/mail-0.tpl'));
			$v_E=str_replace('<replace-link>',$v_M,$v_E);
			$v_Ti='Welcome to LAPCAT - My Library, Online';
			break;
		case 0:default:break;
	}
	$v_H="MIME-Version: 1.0\r\n".
   "Content-type: text/html; charset=iso-8859-1\r\n".
   "From: \"LAPCAT\" <no-reply@lapcat.org>\r\n".
   "Date: ".date("r")."\r\n";
	mail($v_To,$v_Ti,$v_E,$v_H);
}
//
// Function - Page Exists
function FF_PageExists($v_UserID=0,$v_PageName=''){
	$v_DH=opendir($_SERVER['DOCUMENT_ROOT'].'/lapcat/layout/pages/');
	$a_Pages=array();
	while(($v_File=readdir($v_DH))!==false){if($v_File!=='..'&&$v_File!=='.'&&$v_File!=='.svn'){$a_Pages[]=str_replace('.html','',$v_File);}}
	closedir($v_DH);
	foreach($a_Pages as $v_Page){if($v_Page==$v_PageName){return TRUE;}}
	return FALSE;
}
//
// Function - Load Page
function FF_LoadPage($v_UserID=0,$v_PageName=''){return file_get_contents($_SERVER['DOCUMENT_ROOT'].'/lapcat/layout/pages/'.$v_PageName.'.html');}
//
// Function - Get Tags
function FF_GE($v_ID=0,$v_T='event'){
	$a_T=array();
	$v_DC=db::getInstance();
	$v_SQL='SELECT htb.tag_ID, ht.name FROM hex_tags_by_'.$v_T.' AS htb LEFT JOIN hex_tags AS ht ON (htb.tag_ID=ht.ID) WHERE htb.ID='.$v_ID.' AND ht.locked=2;';
	$v_DC->Query($v_SQL);
	if($v_DC->Count_res()>0){$a_T=FF_RAN($v_DC->Format('assoc_array'));}
	return FF_CATXML($a_T,'tags',true,'tag');
}
//
// Function - Get Tag Name (by Tag ID)
function FF_GTN($v_TagID=0){
	if($v_TagID>0){
		$v_DC=db::getInstance();
		$v_SQL='SELECT ht.name FROM hex_tags AS ht WHERE ht.ID='.$v_TagID.' AND ht.locked=2;';
		$v_DC->Query($v_SQL);
		if($v_DC->Count_res()>0){$a_T=FF_RAN($v_DC->Format('assoc'));return $a_T['name'];}}
}
//
// Function - Message
function FF_Message($v_Title='',$v_Body='',$v_Sticky=false){return '<message><message-title>'.$v_Title.'</message-title><message-body>'.$v_Body.'</message-body><message-sticky>'.$v_Sticky.'</message-sticky></message>';}
//
// Function - Pin API
function FF_PinAPI($card,$pin){
	// Patron Validation Attempt
	// $bad=array('<HTML>','</HTML>','<BODY>','</BODY>');
	$url='http://10.1.1.2:4500/PATRONAPI/'.$card.'/'.$pin.'/pintest';
	$data=@file_get_contents($url);
	if(substr_count($data,'ERRNUM')>0||$data==''){
		return false;
	}elseif(substr_count($data,'RETCOD')>0){
		return true;
	}else{
		return false;
	}
	/*
	$info=array();
	$data=str_replace('\n','',@file_get_contents($url));
	$data=str_replace($bad,'',$data);
	$data=explode('<BR>',$data);
	foreach($data as $value){
		if(substr_count($value,'=')>0){
			$holdvalue=explode('=',$value);
			if(substr_count($holdvalue[0],'RETCOD')>0){$holdvalue[0]='RETCOD';}
			if(!in_array($holdvalue[0],array('','UNIQUEID','PIN'))){$info[$holdvalue[0]]=$holdvalue[1];}
		}
	}
	if(isset($info['RETCOD'])){if($info['RETCOD']==0){return true;}}
	return false;
	*/
}
?>