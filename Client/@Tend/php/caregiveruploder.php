<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if(basename($_FILES["prof-resume"]["name"])){

$target_dir = "upload/resumes/";
$target_file = $target_dir . basename($_FILES["prof-resume"]["name"]);
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
move_uploaded_file($_FILES["prof-resume"]["tmp_name"], $target_file);
echo "<h2>Successfully Uploaded resume</h2>";

}
if(basename($_FILES["prof-ref"]["name"]))
{
	$target_dir = "upload/references/";
	$target_file = $target_dir . basename($_FILES["prof-ref"]["name"]);
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	move_uploaded_file($_FILES["prof-ref"]["tmp_name"], $target_file);
	echo "<h2>Successfully Uploaded ref</h2>";
}
?>