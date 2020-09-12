<?php
require_once('include/utils/utils.php');
function verifyUserID($sessionID)
{
      // $sessionID = $_COOKIE['PHPSESSID'];
      session_id($sessionID);
      session_start();
      if ($_SESSION['authenticated_user_id'] == null or $_SESSION['AUTHUSERID'] == null or $_SESSION['authenticated_user_id'] != $_SESSION['AUTHUSERID']) {
            return false;
      }
      return true;
}
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "POST") {
      $sessionID = $_POST['PHPSESSID'];
      if ($sessionID == null) {
            echo "Required parameters";
            return;
      }
      if (!verifyUserID($sessionID)) {
            echo "Permission Denied";
            return;
      }
      function insert_cdrs($a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $p, $q)
      {
            $adb = PearDatabase::getInstance();
            $query = "INSERT INTO `vtiger_pbxmanager`(`pbxmanagerid`, `direction`, `callstatus`, `hangup_cause`, `starttime`, `endtime`, `totalduration`, `billduration`, `recordingurl`, `sourceuuid`, `gateway`, `customer`, `user`, `customernumber`, `customertype`, `tags`) VALUES ($a, '$b', '$c', '$d', '$e', '$f',$g,$h, '$i','$j', '$k', '$l', '$m', '$n', '$p', '$q')";
            $adb->pquery($query);
      }
      $a = $_POST['pbxmanagerid'];
      $b = $_POST['direction'];
      $c = $_POST['callstatus'];
      $d = $_POST['hangup_cause'];
      $e = $_POST['starttime'];
      $f = $_POST['endtime'];
      $g = $_POST['totalduration'];
      $h = $_POST['billduration'];
      $i = $_POST['recordingurl'];
      $j = $_POST['sourceuuid'];
      $k = $_POST['gateway'];
      $l = $_POST['customer'];
      $m = $_POST['user'];
      $n = $_POST['customernumber'];
      $p = $_POST['customertype'];
      $q = $_POST['tags'];
      try {
            insert_cdrs($a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $p, $q);
            echo ("Success");
      } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage();
      }
}
else
{
      echo("Can'r resolve ".$method." request");
}
