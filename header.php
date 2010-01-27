<?php
include_once "small_header.php";
function getUrl() {	$turi = strtolower(str_replace("%20"," ",$_SERVER["REQUEST_URI"]));	$data = split("/",$turi);	$data = array_slice($data,1,count($data)-1);return $data;}

//Smarty header
/**
 * Setup the connection to smarty and set some variables
 */

include_once "smarty.inc.php";

//this is a test
?>  
     