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
		$query="select * from testimonial";
		$result=mysqli_query($con,$query);
		$data=array();
		//echo "here";
		while($row=mysqli_fetch_assoc($result))
		{	
			$rowdata['Name']=$row['Name'];
			$rowdata['isMember']=$row['isMember'];
			$rowdata['testimonial_text']=$row['testimonial_text'];
			if ( $row['isMember']==1)
			{
				$userName = $row['Name'];	
				
				$queryLogin="select User_ID from login where user_name='$userName'";
				
				$resultLogin=mysqli_query($con,$queryLogin);//Assume only one
				$loginRowUserId = mysqli_fetch_assoc($resultLogin);				
				$rowdata['User_ID']=$loginRowUserId['User_ID'];
				$userID = $loginRowUserId['User_ID'];
				
				$queryuserDetails="select First_Name,Last_Name,profile_picture from user_details where User_ID=$userID";
				$resultuserDetails=mysqli_query($con,$queryuserDetails);//Assume only one
				$userDetailsRow=mysqli_fetch_assoc($resultuserDetails);
				$rowdata['First_Name']=$userDetailsRow['First_Name'];
				$rowdata['Last_Name']=$userDetailsRow['Last_Name'];
				$rowdata['profile_picture']='http:/localhost/tend_services/upload/profile/'.$userDetailsRow['profile_picture'];
			}
			$data[]=$rowdata;
		}
		echo json_encode($data);
			
		mysqli_close($con);
		return;
	}
	if($category==2)
	{
		$userName=$_POST["username"];
		$queryLogin="select User_ID from login where user_name='$userName'";
		$result=mysqli_query($con,$queryLogin);
		$resultLogin=mysqli_query($con,$queryLogin);//Assume only one		
		$loginRowUserId = mysqli_fetch_assoc($resultLogin);
		$count=  count($loginRowUserId);
		echo json_encode($count);			
		mysqli_close($con);
	}
	if($category==3)
	{
		$transaction_flag=true;
		$name=$_POST["username"];
		$IsMember=$_POST["member"];
		$comment=$_POST["comments"];
		$valToBeInserted=0;
		if ( $IsMember=="yes")
			$valToBeInserted=1;
		$query="INSERT INTO testimonial VALUES ('$name',$valToBeInserted,'$comment',CURDATE())";
		if (!mysqli_query($con,$query))
		{
			$transaction_flag=FALSE;
			die('Error2: ' . mysqli_error($con));
		}
			
		if($transaction_flag)
		{
			mysqli_commit($con);
			echo "Success";
			return;
		}
		else
		{
			mysqli_rollback($con);
			echo "All queries were rolled back";
		}
		mysqli_autocommit($con,TRUE);
		mysqli_close($con);
	}
	if($category==4)
	{		
		$transaction_flag=true;
		$name=$_POST["username"];
		$IsMember=$_POST["member"];
		$reqType=$_POST["reqType"];
		$comment=$_POST["comments"];
		$valToBeInserted=0;
		if ( $IsMember=="yes")
			$valToBeInserted=1;
		$query="INSERT INTO contact_us VALUES ('$name','$comment',$reqType,$valToBeInserted)";
		if (!mysqli_query($con,$query))
		{
			$transaction_flag=FALSE;
			die('Error2: ' . mysqli_error($con));
		}
			
		if($transaction_flag)
		{
			mysqli_commit($con);
			echo "Success";
			return;
		}
		else
		{
			mysqli_rollback($con);
			echo "All queries were rolled back";
		}
		mysqli_autocommit($con,TRUE);
		mysqli_close($con);
	}
	if($category==5)
	{
		$transaction_flag=true;
		$userId=$_POST["User_ID"];
		$reqType=$_POST["reqType"];
		$comment=$_POST["comments"];
		$valToBeInserted=1;

		$queryLogin="select user_name from login where User_ID=$userId";
		$result=mysqli_query($con,$queryLogin);
		$resultLogin=mysqli_query($con,$queryLogin);//Assume only one		
		$loginRow = mysqli_fetch_assoc($resultLogin);
		$userName=$loginRow['user_name'];
		$query="INSERT INTO contact_us VALUES ('$userName','$comment',$reqType,$valToBeInserted)";
		if (!mysqli_query($con,$query))
		{
			$transaction_flag=FALSE;
			die('Error2: ' . mysqli_error($con));
		}
			
		if($transaction_flag)
		{
			mysqli_commit($con);
			echo "Success";
			return;
		}
		else
		{
			mysqli_rollback($con);
			echo "All queries were rolled back";
		}
		mysqli_autocommit($con,TRUE);
		mysqli_close($con);
	}
	if($category==6)
	{		
		$query="select * from contact_us";
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
?>