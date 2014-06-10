<?php

// Receiving variables
@$Name = addslashes($_POST['Name']);
@$Job_Title = addslashes($_POST['Job_Title']);
@$Company = addslashes($_POST['Company']);
@$Email = addslashes($_POST['Email']);
@$Phone = addslashes($_POST['Phone']);
@$Fax = addslashes($_POST['Fax']);
@$Message = addslashes($_POST['Message']);

// Validation
if (! ereg('[A-Za-z0-9_-]+\@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+', $Email))
{
header("Location: error.html");
exit;
}

//Sending Email to form owner
# Email to Owner 
$pfw_header = "From: $Email";
$pfw_subject = "ASEAN BEAUTY 2015 ENQUIRY FORM";
// Change to your email address.........
$pfw_email_to = "aseanbeauty@ubm.com";
//......................................
$pfw_message = "***** CONTACT DETAILS *****\n"
. "Name : $Name\n"
. "Job Title : $Job_Title\n"
. "Company Name : $Company\n"
. "Email : $Email\n"
. "Phone No : $Phone\n"
. "Fax No : $Fax\n"
. "\n"
. "\n"
. "***** MESSAGE *****\n"
. "\n"
. "Message : $Message\n"
. "\n";
@mail($pfw_email_to, $pfw_subject ,$pfw_message ,$pfw_header ) ;

//Sending auto respond Email to user
# Email to Owner 
// Change to your email address.........
$pfw_header = "From: aseanbeauty@ubm.com";
//......................................
$pfw_subject = "ASEAN BEAUTY 2015 ENQUIRY FORM";
$pfw_email_to = "$Email";
$pfw_message = "Thank you. Your form has been successfully sent to us. Our sales person will be contact you as soon as possible.\n"
. "\n";
@mail($pfw_email_to, $pfw_subject ,$pfw_message ,$pfw_header ) ;

header("Location: thank_you.html");

?>
