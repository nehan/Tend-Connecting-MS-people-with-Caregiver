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
	// $userId=$_POST["UserId"];
	$caregiverId=$_POST["CaregiverId"];

	if($category==1)
	{		
		$query="select * from review,user_details where review.caregiver_ID=$caregiverId and review.caregiver_ID=user_details.User_ID;";

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

		$req_id=$_POST["requ_id"];
		$review=$_POST["review"];
		$rating=$_POST["rating"];
		$query="INSERT INTO review VALUES ($req_id,$caregiverId,$rating,CURDATE(),'$review')";

		if (!mysqli_query($con,$query))
				{
					
					die('Error4: ' . mysqli_error($con));
					echo "Error";
		}
		mysqli_close($con);
	    echo "Sucess";
	}


?>