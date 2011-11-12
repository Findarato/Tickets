<?php
session_start();

print_r($_SESSION);
print_r($_POST);
print_r($_GET);



// In a real application this would use a database, and not a session!


require_once '/stuff/google-api-php-client/src/apiClient.php';
require_once '/stuff/google-api-php-client/src/contrib/apiBuzzService.php';

$client = new apiClient();
// Visit https://code.google.com/apis/console to generate your
// oauth2_client_id, oauth2_client_secret, and to register your oauth2_redirect_uri.
// $client->setClientId('insert_your_oauth2_client_id');
// $client->setClientSecret('insert_your_oauth2_client_secret');
// $client->setRedirectUri('http://example.com/path/to/myapp.php');
// $client->setApplicationName("OAuth2_Example_App");
$buzz = new apiBuzzService($client);

if (isset($_SESSION['access_token'])) {
  $client->setAccessToken($_SESSION['access_token']);
} else {
  $client->setAccessToken($client->authenticate());
}
$_SESSION['access_token'] = $client->getAccessToken();

if (isset($_GET['code'])) {
  header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
}

// Make an authenticated request to the Buzz API.
if ($client->getAccessToken()) {
  $me = $buzz->getPeople('@me');
  $ident = '<img src="%s"> <a href="%s">%s</a>';
  printf($ident, $me['thumbnailUrl'], $me['profileUrl'], $me['displayName']);
}
?>