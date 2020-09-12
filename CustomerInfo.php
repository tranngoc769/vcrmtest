<?php 
    require_once('include/utils/utils.php');
    $adb = PearDatabase::getInstance();
    function verifyUserID($sessionID) {
        // $sessionID = $_COOKIE['PHPSESSID'];
        session_id($sessionID);
        session_start();
        if ($_SESSION['authenticated_user_id']==null or $_SESSION['AUTHUSERID']==null or $_SESSION['authenticated_user_id'] != $_SESSION['AUTHUSERID'])
        {
            return false;
        }
        return true;
    }
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "POST") {
        $phone = $_POST['phonenumber'];
        $sessionID = $_POST['PHPSESSID'];
        if ($phone == null or $sessionID == null)
        {
            echo "Required parameters";
            return;
        }
        if (!verifyUserID($sessionID)) {echo "Permission Denied";
            return;}
        $sql = "SELECT * FROM vtiger_contactdetails JOIN vtiger_contactaddress ON vtiger_contactdetails.contactid = vtiger_contactaddress.contactaddressid JOIN vtiger_contactsubdetails ON vtiger_contactdetails.contactid = contactsubscriptionid WHERE (vtiger_contactdetails.phone LIKE '%$phone%') LIMIT 1";
        $result =  $adb->pquery($sql);
        $num_rows = $adb->num_rows($result);
        if ($num_rows > 0)
        {
            $resultrow = $adb->fetch_array($result);
            $info->contactid = $resultrow['contactid'];
            $info->contact_no = $resultrow['contact_no'];
            $info->accountid = $resultrow['accountid'];
            $info->salutation = $resultrow['salutation'];
            $info->firstname = $resultrow['firstname'];
            $info->lastname = $resultrow['lastname'];
            $info->email = $resultrow['email'];
            $info->phone = $resultrow['phone'];
            $info->mobile = $resultrow['mobile'];
            $info->title = $resultrow['title'];
            $info->department = $resultrow['department'];
            $info->fax = $resultrow['fax'];
            $info->reportsto = $resultrow['reportsto'];
            $info->training = $resultrow['training'];
            $info->usertype = $resultrow['usertype'];
            $info->contacttype = $resultrow['contacttype'];
            $info->otheremail = $resultrow['otheremail'];
            $info->secondaryemail = $resultrow['secondaryemail'];
            $info->donotcall = $resultrow['donotcall'];
            $info->emailoptout = $resultrow['emailoptout'];
            $info->imagename = $resultrow['imagename'];
            $info->reference = $resultrow['reference'];
            $info->notify_owner = $resultrow['notify_owner'];
            $info->isconvertedfromlead = $resultrow['isconvertedfromlead'];
            $info->tags = $resultrow['tags'];
            $info->contactaddressid = $resultrow['contactaddressid'];
            $info->mailingcity = $resultrow['mailingcity'];
            $info->mailingstreet = $resultrow['mailingstreet'];
            $info->mailingcountry = $resultrow['mailingcountry'];
            $info->othercountry = $resultrow['othercountry'];
            $info->mailingstate = $resultrow['mailingstate'];
            $info->mailingpobox = $resultrow['mailingpobox'];
            $info->othercity = $resultrow['othercity'];
            $info->otherstate = $resultrow['otherstate'];
            $info->mailingzip = $resultrow['mailingzip'];
            $info->otherzip = $resultrow['otherzip'];
            $info->otherstreet = $resultrow['otherstreet'];
            $info->otherpobox = $resultrow['otherpobox'];
            $info->contactsubscriptionid = $resultrow['contactsubscriptionid'];
            $info->homephone = $resultrow['homephone'];
            $info->otherphone = $resultrow['otherphone'];
            $info->assistant = $resultrow['assistant'];
            $info->assistantphone = $resultrow['assistantphone'];
            $info->birthday = $resultrow['birthday'];
            $info->laststayintouchrequest = $resultrow['laststayintouchrequest'];
            $info->laststayintouchsavedate = $resultrow['laststayintouchsavedate'];
            $info->leadsource = $resultrow['leadsource'];
            $info_json = json_encode($info);
            echo $info_json;
        }
        else
        {
            echo null;
            return;
        }
    }
    else
    {
        echo "Cannot solve ".$method." request";
    }
?>