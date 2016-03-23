<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	$hostname="localhost";
	$username="root";
	$dbname="tend";
	$password="";
	
	$con=mysqli_connect($hostname,$username,$password,$dbname);
	if (mysqli_connect_errno($con))
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	$category=$_POST["category"];
	if($category==1)
	{
		$uid=$_POST["uid"];
		$querry="select map.start_date,map.end_date,map.days,map.hours_per_day,ud.First_Name,ud.Last_Name,ud.User_ID,ud.profile_picture from req_car_map as map , user_details as ud where map.approve=1 and map.caregiver_ID=$uid and map.requester_ID=ud.User_ID";
		$result=mysqli_query($con,$querry);
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
	else if($category==2)
	{
		$cid=$_POST["cid"];
		$rid=$_POST["rid"];
		$querry="update req_car_map set approve=0 where caregiver_ID=$cid and requester_ID=$rid";
		if (!mysqli_query($con,$querry))
		{
			die('Error:4 ' . mysqli_error($con));
			echo 304;
		} 
		else 
			echo 200;
	}
	else if($category==3)
	{
		$cid=$_POST["cid"];
		$rid=$_POST["rid"];
		$querry="delete from req_car_map where requester_ID=$rid and caregiver_ID=$cid";
		if (!mysqli_query($con,$querry))
		{
			die('Error:4 ' . mysqli_error($con));
			echo 304;
		} 
		else 
			echo 200;
	
	}
	else if($category==4)
	{
		$uid=$_POST["uid"];
		$querry="select * from user_details where User_ID=$uid and flag=1";
		$result=mysqli_query($con,$querry);
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
?>