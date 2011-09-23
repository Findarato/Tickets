<?
class cURL {
var $headers;
var $user_agent;
var $compression;
var $cookie_file;
var $proxy;
function cURL($cookies=TRUE,$cookie='cookies.txt',$compression='gzip',$proxy='') {
$this->headers[] = 'Accept: image/gif, image/x-bitmap, image/jpeg, image/pjpeg';
$this->headers[] = 'Connection: Keep-Alive';
$this->headers[] = 'Content-type: application/x-www-form-urlencoded;charset=UTF-8';
$this->user_agent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Media Center PC 4.0)';
$this->compression=$compression;
$this->proxy=$proxy;
$this->cookies=$cookies;
if ($this->cookies == TRUE) $this->cookie($cookie);
}
function cookie($cookie_file) {
if (file_exists($cookie_file)) {
$this->cookie_file=$cookie_file;
} else {
fopen($cookie_file,'w') or $this->error('The cookie file could not be opened. Make sure this directory has the correct permissions');
$this->cookie_file=$cookie_file;
fclose($this->cookie_file);
}
}
function get($url) {
$process = curl_init($url);
curl_setopt($process, CURLOPT_HTTPHEADER, $this->headers);
curl_setopt($process, CURLOPT_HEADER, 0);
curl_setopt($process, CURLOPT_USERAGENT, $this->user_agent);
if ($this->cookies == TRUE) curl_setopt($process, CURLOPT_COOKIEFILE, $this->cookie_file);
if ($this->cookies == TRUE) curl_setopt($process, CURLOPT_COOKIEJAR, $this->cookie_file);
curl_setopt($process,CURLOPT_ENCODING , $this->compression);
curl_setopt($process, CURLOPT_TIMEOUT, 30);
curl_setopt($process, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($process, CURLOPT_FOLLOWLOCATION, 1);
$return = curl_exec($process);
curl_close($process);
return $return;
}
function post($url,$data) {
$process = curl_init($url);
curl_setopt($process, CURLOPT_HTTPHEADER, $this->headers);
curl_setopt($process, CURLOPT_HEADER, 1);
curl_setopt($process, CURLOPT_USERAGENT, $this->user_agent);
if ($this->cookies == TRUE) curl_setopt($process, CURLOPT_COOKIEFILE, $this->cookie_file);
if ($this->cookies == TRUE) curl_setopt($process, CURLOPT_COOKIEJAR, $this->cookie_file);
curl_setopt($process, CURLOPT_ENCODING , $this->compression);
curl_setopt($process, CURLOPT_TIMEOUT, 30);
if ($this->proxy) curl_setopt($process, CURLOPT_PROXY, $this->proxy);
curl_setopt($process, CURLOPT_POSTFIELDS, $data);
curl_setopt($process, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($process, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($process, CURLOPT_POST, 1);
$return = curl_exec($process);
curl_close($process);
return $return;
}
function error($error) {
echo "<center><div style='width:500px;border: 3px solid #FFEEFF; padding: 3px; background-color: #FFDDFF;font-family: verdana; font-size: 10px'><b>cURL Error</b><br>$error</div></center>";
die;
}
} 

$card=1201101207390;
$pin=1982;
$name="harry,joe"; 
$data = array ('name' => $name, 'code' => $card, 'pin' => $pin);
$url0 = 'https://catalog.lapcat.org:444/patroninfo/';
$url = 'https://catalog.lapcat.org:444/patroninfo/1060648/top/';
$logout ='https://catalog.lapcat.org:444/logout?';

$cc = new cURL();
$document = $cc->post('https://catalog.lapcat.org:444/patroninfo/','name=harry,joe&code=1201101207390&pin=1982');
$cc->get('https://catalog.lapcat.org:444/logout?');

print_r($document);die();

$document = str_replace("http://catalog.lapcat.org:2082/feeds~S12/pat/","<boom>",$document);
$document = str_replace(".xml","<boom>",$document);
$file=explode("<boom>",$document);
echo $file[3];
?>
