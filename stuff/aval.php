<?Php
//http://catalog.lapcat.org/search/i008888344315
function avalByisbn($isbn){
	$url = "http://catalog.lapcat.org/search/i".$isbn;
	$doc = new DOMDocument();
	@$doc->loadHTMLFile($url);
	$elements = $doc->getElementsByTagName('tr');
	$keep = true;
	$cnt = 0;
	$ls = false;
	$a_status = array();
	$pnv = "";
	$multi = false;//default is that it is not a multi item record
	if (!is_null($elements)) {
		foreach ($elements as $element) {
		    $nodes = $element->childNodes;
			foreach ($nodes as $node){
				if($node->hasAttributes())
				{
				    $attributes = $node->attributes;
				    if(!is_null($attributes))
				    {
				        foreach ($attributes as $index=>$attr)
				        {
				        	if($attr->value == "browseHeaderData"){$multi = true;} //should only work with a tv show style item
							if($attr->name == "width"){
								if(substr_count($node->nodeValue,"Location")){
									if($ls == true){
										if(!$multi){return $a_status;}
									}else{$ls=true;}
								}
								if($attr->value == "27%"){
									if(!substr_count($node->nodeValue,"Multipart")){
										if(!substr_count($node->nodeValue,"Location")){
											if(!substr_count($node->nodeValue,"Status")){
												$keep = true;
												$pnv = trim($node->nodeValue);											
											}else{$keep = false;}
										}else{$keep = false;}
									}else{$keep = false;}
								}
								if($attr->value == "18%"){
									if($keep){
										if(isset($a_status[$pnv])){
											$a_status[$pnv][] = trim($node->nodeValue);
										}else{
											$a_status[$pnv] = array(trim($node->nodeValue));
										}
									}
								}
							}
				        }
				    }
				} 
			}
		}
		return $a_status;
	}
}
function makeCoolXMLStuff($array){
	if(is_array($array)){
		$locs = array(
		"Main"=>0,
		"Kingsford"=>0,
		"Union"=>0,
		"Rolling"=>0,
		"Hanna"=>0,
		"Coolspring"=>0,
		"Fish"=>0,
		"Bookmobile"=>0
		);
		foreach ($array as $k=>$v)	{
			$loc = split(" ",$k);

			foreach ($v as $v_k=>$v_v)	{
				if(strpos($v_v,'AVAILABLE')){$locs[$loc[1]]++;}
			}
		}
	}else{
		$locs=array('error'=>'Could not parse item record.');
	}
	return $locs;
}
//http://catalog.lapcat.org/search/i097368924345
//print_r(avalByisbn("097368924345"));
//echo "<br>";
//print_r(makeCoolXMLStuff(avalByisbn("097368924345")));

?>