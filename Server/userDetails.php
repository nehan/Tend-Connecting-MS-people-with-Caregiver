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
		$query="select 	user_details.First_Name,user_details.Last_Name,user_details.profile_picture,user_details.About_Me,
						requester.Emergency_name, requester.Emergency_no,requester.Emergency_rel,						
                        contact.Apt_No,contact.Home_phone,contact.Mobile,contact.Street,contact.City,contact.State,contact.Country,contact.Zip_Code
                        from requester ,user_details,contact                         
                        where user_details.User_ID=$userId and requester.User_ID =user_details.User_ID and contact.Contact_ID=user_details.Contact_ID";
		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
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