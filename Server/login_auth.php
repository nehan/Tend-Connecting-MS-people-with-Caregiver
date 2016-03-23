<?php
	//session_start();
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

	$user_name=$_POST["u_name"];
	$password=$_POST["pass"];
	$flag=$_POST["isCaregiver"];
	$querry="select User_ID,flag from login where user_name='$user_name' and password='$password' and flag=$flag";
	$result=mysqli_query($con,$querry);
	$row=mysqli_fetch_assoc($result);
	$data=array();
	$data[]=$row;
	
	if (mysqli_num_rows($result) > 0)
	{
		$user_id=$row["User_ID"];
		$querry="update user_details set last_login=NOW() where User_ID='$user_id'";
		$_SESSION["user_id"]=$user_id;
		if (!mysqli_query($con,$querry))
		{
			die('Error:6 ' . mysqli_error($con));
		}
		else
		{
			echo json_encode($data);	
		}
	}
	else 
		echo 404;
	
	
	
	
	
	
	
	
	
	
	
	
 /*
 select * from caregiver as cg, user_details as us where us.gender='MALE' and cg.pay_rate=10 and cg.Experience=2 and (cg.Expertise Like '%Yoga%' OR cg.Expertise Like '%asd%') and cg.Availablity_ID=(select Availability_ID form availability where User_ID=1)*/
 ?>
 
 