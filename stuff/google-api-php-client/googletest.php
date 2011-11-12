<?php
require_once 'src/apiClient.php';
require_once 'src/contrib/apiPlusService.php';
session_start();

$client = new apiClient();
$client->setApplicationName('Google+ PHP Starter Application');
// Visit https://code.google.com/apis/console?api=plus to generate your
// client id, client secret, and to register your redirect uri.
$client->setClientId('750669202824.apps.googleusercontent.com');
$client->setClientSecret('bxVPjPk2M6Gm8Ys0mRE8QUTC');
$client->setRedirectUri('http://tickets.lapcat.org/oauth2callback');
$client->setDeveloperKey('AIzaSyCFh5oGRPL3J15oi08tUMqITBKeBtEFzyw');
$plus = new apiPlusService($client);

if (isset($_GET['code'])) {
  $client->authenticate();
  $_SESSION['token'] = $client->getAccessToken();
  header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
}

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}

if ($client->getAccessToken()) {
  $optParams = array('maxResults' => 100);
  $activities = $plus->activities->listActivities('me', 'public', $optParams);

  print 'Your Activities: <pre>' . print_r($activities, true) . '</pre>';

  // The access token may have been updated lazily.
  $_SESSION['token'] = $client->getAccessToken();
} else {
  $authUrl = $client->createAuthUrl();
  print "<a class='login' href='$authUrl'>Connect Me!</a>";
}