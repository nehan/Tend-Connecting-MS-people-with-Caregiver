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
	/*
	SELECT caregiver.Resume_filepath caregiver.Reference_filepath caregiver.Experience caregiver.Experience
	SELECT availability.start_date availability.end_date availability.week_days FROM `availability` 
	SELECT user_details.First_Name, user_details.Last_Name, user_details.About_Me FROM `user_details`
	SELECT contact.Home_phone contact.Mobile contact.Street contact.Apt_No contact.City contact.State, contact.Country,contact.Zip_Code contact
	*/
	if($category==1)
	{		
		$query="select * from user_details,caregiver,availability,contact                         
                        where user_details.User_ID=$userId and caregiver.User_ID =user_details.User_ID and availability.User_ID =user_details.User_ID and  contact.Contact_ID=user_details.Contact_ID";
		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
			$row['Reference_filepath']='http://localhost/tend_services/upload/references/'.$row['Reference_filepath'];
			$row['Resume_filepath']='http://localhost/tend_services/upload/resumes/'.$row['Resume_filepath'];
			$row['profile_picture']='http://localhost/tend_services/upload/profile/'.$row['profile_picture'];
			$data[]=$row;
		}
		echo json_encode($data);
		// echo $data[0]['profile_picture'];
	
		mysqli_close($con);
		return;
	}
	if($category==2)
	{
		
	}
	if($category==3)
	{
		
	}
?>