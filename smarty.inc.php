<?
define('SMARTY_DIR', '/data/www/smarty/libs/');
require_once(SMARTY_DIR . 'Smarty.class.php');
$smarty = new Smarty();
$smarty->template_dir = $_SERVER["DOCUMENT_ROOT"].'/templates'; 
$smarty->compile_dir = $_SERVER["DOCUMENT_ROOT"].'/templates_c';
$smarty->cache_dir = $_SERVER["DOCUMENT_ROOT"].'/cache';
$smarty->config_dir = $_SERVER["DOCUMENT_ROOT"].'/configs';
?>