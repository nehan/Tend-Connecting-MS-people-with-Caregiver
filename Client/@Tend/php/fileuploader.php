<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$target_dir = "upload/profile/";
$target_file = $target_dir . basename($_FILES["prof-img"]["name"]);
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image

   move_uploaded_file($_FILES["prof-img"]["tmp_name"], $target_file);
echo "<h2>Successfully Uploaded Images</h2>";

return;
?>