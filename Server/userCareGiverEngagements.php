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
		$approveStaus=$_POST["approveStatus"];
		$query="select * from req_car_map,user_details                         
                        where req_car_map.requester_ID=$userId and user_details.User_ID = req_car_map.caregiver_ID and approve=$approveStaus";
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
	if($category==2)
	{
		$approveStaus=$_POST["approveStatus"];
		$query="select * from req_car_map,user_details                         
                        where req_car_map.caregiver_ID=$userId and user_details.User_ID = req_car_map.requester_ID and approve=$approveStaus";
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
		$careGiverId=$_POST["caregiverid"];
		$query="delete from req_car_map                         
                        where req_car_map.requester_ID=$userId and req_car_map.caregiver_ID =$careGiverId";
		$result=mysqli_query($con,$query);
					
		mysqli_close($con);
		return;
	}
?>