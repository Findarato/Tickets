<?
define('SMARTY_DIR', '/www/smarty/libs/');
require_once(SMARTY_DIR . 'Smarty.class.php');
$smarty = new Smarty();
$smarty->template_dir = '/www/tickets/templates'; 
$smarty->compile_dir = '/www/tickets/templates_c';
$smarty->cache_dir = '/www/tickets/cache';
$smarty->config_dir = '/www/tickets/configs';
?>