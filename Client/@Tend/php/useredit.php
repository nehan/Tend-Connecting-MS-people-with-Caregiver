<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	$hostname="localhost";
	$username="root";
	$dbname="tend";
	$password="";
	//$category=$_POST["category"]
	$con=mysqli_connect($hostname,$username,$password,$dbname);
	if (mysqli_connect_errno($con))
		echo "Failed to connect to MySQL: " . mysqli_connect_error();

	$category=$_POST["category"];
	$userId=$_POST["UserId"];
	
	if($category==1)
	{		
		$query="select 	user_details.First_Name,user_details.Last_Name,user_details.profile_picture,user_details.About_Me,user_details.age,user_details.Gender from user_details where user_details.User_ID=$userId";

		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
			$row['profile_picture']='http://localhost/tend_services/upload/profile/'.$row['profile_picture'];
			$data[]=$row;
		}
		echo json_encode($data);
		mysqli_close($con);
		return;
	}
	if($category==2)
	{
		$query="select contact.Apt_No,contact.City, contact.Contact_ID,contact.Country, contact.Home_phone,contact.Mobile, contact.State, contact.Street,contact.Zip_code from contact,user_details where user_details.User_ID=$userId and user_details.Contact_ID=contact.Contact_ID ";

		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
			$data[]=$row;
		}
		echo json_encode($data);
		mysqli_close($con);
		return;
	}

	if($category==3)
	{
		$query="select Emergency_No,Emergency_rel,Emergency_name,Contact_ID,Card_ID from requester 
		where User_ID=$userId";

		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
			$data[]=$row;
		}
		echo json_encode($data);
		mysqli_close($con);
		return;
	}
	if($category==6){

		$name=$_POST["name"];
		$rel=$_POST["rel"];
		$no=$_POST["phone"];
		$nameemer=$_POST["oldname"];
		$query="UPDATE requester SET Emergency_name = '$name', Emergency_no= '$no', Emergency_rel='$rel' WHERE User_ID = $userId and Emergency_name='$nameemer'";
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
	if($category==7){

		$name=$_POST["name"];
		$rel=$_POST["rel"];
		$no=$_POST["phone"];
		$contact_id=$_POST["contact_id"];
		$card_no=$_POST["card_no"];
		$query="insert into requester values($userId,'$name','$no','$rel','$contact_id',$card_no)";
				
		if (mysqli_query($con, $query)) {
			    echo "Record inserted successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
	if($category==8){

		$name=$_POST["name"];
		
		$query="delete from requester where User_ID=$userId and Emergency_name='$name'";
				
		if (mysqli_query($con, $query)) {
			    echo "Record deleted successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
	if($category==9){
	
		$query="select subscription from user_details where User_ID=$userId";
				
		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
		   $data[]=$row;
		}
		echo json_encode($data);
		mysqli_close($con);
		return;
	}
	if($category==10){
	
		
		$sub=$_POST["NewsletterFeed"];		

		$query="UPDATE user_details SET subscription = $sub WHERE User_ID = $userId ";
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
	if($category==11){
	
		$query="select * from card_details where User_ID=$userId";
				
		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
		   $data[]=$row;
		}
		echo json_encode($data);
		mysqli_close($con);
		return;
	}
	if($category==12){
		
		$cardtype=$_POST["card_type"];
		$card_id=$_POST["card_id"];
		$cardnumber=$_POST["cardnumber"];
		$cvv=$_POST["cvv"];
		$expiry=$_POST["expiry"];

		$query="UPDATE card_details SET Card_Type='$cardtype',Card_Number='$cardnumber',CVV_Number=$cvv,Expiry_Date='$expiry' WHERE User_ID=$userId and Card_ID=$card_id;";
				
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
	if($category==13){
    	$selectQuery="select max(Card_ID) from card_details";
		$result=mysqli_query($con,$selectQuery);
			
		if ($result->num_rows > 0) {
     			
	     		while($row = mysqli_fetch_assoc($result)) {

			 	  	$card_id=$row["max(Card_ID)"]+1;
			 	  	
	         	 }
			 
			}
			else 		
			{
				$card_id=1;

			}
		$cardtype=$_POST["card_type"];
		$cardnumber=$_POST["cardnumber"];
		$cvv=$_POST["cvv"];
		$expiry=$_POST["expiry"];

		$query="INSERT INTO card_details VALUES ($card_id,'$cardtype','$cardnumber',$cvv,'$expiry',null,null,$userId)";
				
		if (mysqli_query($con, $query)) {
			    echo "Record inserted successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
	if($category==14){
    	
		$card_id=$_POST["card_id"];
		
		$query="delete from card_details where User_ID=$userId and Card_ID=$card_id";
				
		if (mysqli_query($con, $query)) {
			    echo "Record deleted successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
	if($category==15){
    	$home_phone=$_POST["home"];
    	$mobile=$_POST["mobile"];
    	$street=$_POST["street"];
    	$apt_no=$_POST["apt"];
    	$city=$_POST["city"];
    	$state=$_POST["state"];
    	$zipcode=$_POST["zipcode"];
    	$contact_id=$_POST["contact_id"];

    	$query="UPDATE contact SET Home_phone='$home_phone',Mobile='$mobile',Street='$street',Apt_No=$apt_no, City='$city',State='$state',Contact_ID=$contact_id,Zip_Code=$zipcode WHERE Contact_ID=$contact_id";
    	
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
		
	}
	

	if($category==16){
    	$fname=$_POST["fname"];
    	$lname=$_POST["lname"];
    	$age=$_POST["age"];
    	$gender=$_POST["gender"];
    	$profile_picture=$_POST["profile"];
    	$about_me=$_POST["about-me"];

    	$query="UPDATE user_details SET First_Name='$fname',Last_Name='$lname',profile_picture='$profile_picture',About_Me='$about_me', gender='$gender',age=$age WHERE User_ID=$userId";
    	
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
		
	}

?>