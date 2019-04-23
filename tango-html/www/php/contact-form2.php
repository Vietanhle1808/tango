<?php
$name = $_POST["name2"];
$email = $_POST["email2"];
$subject = $_POST["subject2"];
$message = $_POST["message2"];
 
$EmailTo = "mooraa.xd@gmail.com";
$Subject = "New Message Received from Tango Template";
 
// prepare email body text
$Body = "Name: ";
$Body .= $name;
$Body .= "\n";
 
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
 
$Body .= "Subject: ";
$Body .= $subject;
$Body .= "\n";
 
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";
 
// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);
 
// redirect to success page
if ($success){
   echo "success";
}else{
    echo "invalid";
}
 
?>