<?
//print_r($_FILES['attachment']);
include_once "../small_header.php";
$usr=unserialize($_SESSION['user']);
$_GET = $db->Clean($_GET);
if(isset($_GET['type']) && $_GET['type']=="delete"){
	if(isset($_GET['filename'])){
		$test = explode("_",$_GET['filename']);
		if($test[0]==$usr->User_id){//this image is owned by the current user
			if(file_exists("/www/tickets/Attachments/".$_GET["filename"])){
				unlink("/www/tickets/Attachments/".$_GET["filename"]);
				unlink("/www/tickets/Attachments/thumbs/".$_GET["filename"]);
				$db->Query("SELECT attachment FROM tickets WHERE id=".$_GET["ticket_id"]);
				$res = $db->Fetch("row");
				$res = unserialize($res);
				$keyToBeRemoved = @array_search($_GET["filename"],$res);
				unset($res[$keyToBeRemoved]);
				$db->Query("UPDATE tickets SET attachment='".serialize($res)."' WHERE id=".$_GET["ticket_id"]);
				if(count($db->Error)==2){$response['error']=$db->Error;}
				$response['message']="Image successfully deleted";
			}else{$response['error']="Image already deleted";}
		}else{
			$response['error']="You may not delete a different user's Images";
		}
	}
}else{
	$uploaddir = '/www/tickets/Attachments/';
	$uploadfile = $uploaddir . basename($_FILES['attachment']['name']);
	$extTest = explode(".",basename($_FILES['attachment']['name']));
	$newFilename =$usr->User_id."_".time().".".$extTest[1];
	$uploadfile = $uploaddir . $newFilename;
	$response['newFilename']= $newFilename;
	if (move_uploaded_file($_FILES['attachment']['tmp_name'], $uploadfile)) {
		$response['message']="Success";
		if(!is_dir('/www/tickets/Attachments/thumbs')){ mkdir('/www/tickets/Attachments/thumbs') or die('can\' create thumbs directory');}
	
		// The file you are resizing
		$file = $uploadfile;
		
		//This will set our output to 45% of the original size
		$newWidth = 100;
		
		$extTest = explode(".",$file);
		switch($extTest[1]){
			case "jpg":
		//	header('Content-type: image/jpeg');
			$source = imagecreatefromjpeg($file);	break;
			case "png":
		//	header('Content-type: image/png');
			$source = imagecreatefrompng($file);break; 
		}
			
		// Setting the resize parameters
		list($width, $height) = getimagesize($file);
		$ratio = ($height/$width);
		$modwidth = floor($newWidth);
		//$modheight = floor($ratio*$newWidth);
		$modheight = 75;
		$response['upload']['height']=$modheight;
		$response['upload']['width']=$modwidth;
		// Creating the Canvas
		$tn= imagecreatetruecolor($newWidth, $modheight);
		
		// Resizing our image to fit the canvas
		imagecopyresized($tn, $source, 0, 0, 0, 0, $modwidth, $modheight, $width, $height);
		
		// Outputs a jpg image, you could change this to gif or png if needed
		switch($extTest[1]){
			case "jpg":imagejpeg($tn,"/www/tickets/Attachments/thumbs/".$newFilename);break;
			case "png":imagepng($tn,"/www/tickets/Attachments/thumbs/".$newFilename);break; 
		}
	} else {$response['error']="There was a problem";}
}
echo json_encode($response);


?>