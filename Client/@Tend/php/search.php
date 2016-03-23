<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	$hostname="localhost";
	$username="root";
	$dbname="tend";
	$password="";
	$category=$_POST["category"];
	$con=mysqli_connect($hostname,$username,$password,$dbname);
	if (mysqli_connect_errno($con))
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	
	if($category==1)
	{
		$uid=$_POST["User_ID"];
		$querry="select First_Name,Last_Name,profile_picture from user_details where User_ID=$uid";
		$result=mysqli_query($con,$querry);
		$row=mysqli_fetch_assoc($result);
		$data=array();
		$row['profile_picture']='http:/localhost/tend_services/upload/profile/'.$row['profile_picture'];
		$data[]=$row;
		echo json_encode($data);
		mysqli_close($con);
		return;
	}
	else if($category==2)
	{
		$uid=$_POST["User_ID"];
		$start_date=$_POST["start_date"];
		$end_date=$_POST["end_date"];
		$gender=$_POST["gender"];
		//$mysqltime = date ("Y-m-d H:i:s", $phptime);
		$start_date = date('Y-m-d', strtotime(str_replace('-', '/', $start_date)));
		$end_date = date('Y-m-d', strtotime(str_replace('-', '/', $end_date)));
		if($gender=="No_Preference")
			$querry="select av.start_date,av.end_date,ud.profile_picture,cg.User_ID,av.week_days,cg.pay_rate,ud.First_Name,ud.Last_Name,cg.Expertise from availability as av,caregiver as cg,user_details as ud where av.start_date>='$start_date' and av.end_date<='$end_date' and cg.User_ID=ud.User_ID and av. Availablity_ID=cg.Availability_ID and cg.Authorization=0 and cg.User_ID NOT IN(select caregiver_ID from req_car_map where requester_ID=$uid)";
		else
			$querry="select av.start_date,av.end_date,ud.profile_picture,cg.User_ID,av.week_days,cg.pay_rate,ud.First_Name,ud.Last_Name,cg.Expertise from availability as av,caregiver as cg,user_details as ud where av.start_date<='$start_date' and av.end_date>='$end_date' and cg.User_ID=ud.User_ID and av. Availablity_ID=cg.Availability_ID and ud.Gender='$gender' and cg.Authorization=0 and cg.User_ID NOT IN(select caregiver_ID from req_car_map where requester_ID=$uid";
		//echo $querry;
		$result=mysqli_query($con,$querry);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
			$row['profile_picture']='http:/localhost/tend_services/upload/profile/'.$row['profile_picture'];
			$data[]=$row;
		}
		echo json_encode($data);
		mysqli_close($con);
		return;	
	}
	else if($category==3)
	{
		$rid=$_POST["rid"];
		$cid=$_POST["cid"];
		$start_date=$_POST["sd"];
		$end_date=$_POST["ed"];
		$start_date = date('Y-m-d', strtotime(str_replace('-', '/', $start_date)));
		$end_date = date('Y-m-d', strtotime(str_replace('-', '/', $end_date)));
		$days=$_POST["days"];
		$hr=$_POST["hr"];
		$querry="Insert into req_car_map values('$rid','$cid','$start_date','$end_date','$days','$hr',1)";
		if (!mysqli_query($con,$querry))
		{
			die('Error:4 ' . mysqli_error($con));
			echo 304;
		} 
		else
		{
			echo 200;
		}
		mysqli_close($con);
		return;
	}
	
?>
