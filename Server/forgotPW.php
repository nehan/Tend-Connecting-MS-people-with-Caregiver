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
	$category=$_POST["catergory"];
	
	if($category==1)
	{
		$query="select sm.question, sq.answer ,sq.User_ID from security_map sm, security_question sq, login lg where lg.user_name='$user_name' and lg.User_ID=sq.User_ID and 
						sq.Security_Id=sm.Security_Id";	
		$result=mysqli_query($con,$query);
		$data=array();
		
		while($row=mysqli_fetch_assoc($result))
		{			
			$data[]=$row;
		}	
		echo json_encode($data);
		mysqli_close($con);
	}
	if($category==2)
	{
		$pass=$_POST["pass"];
		$userId=$_POST["UserId"];
		
		$uid=intval($userId);
		
		$query="update login set password='$pass' where User_ID=$userId";
		
		if (!mysqli_query($con,$query))
		{			
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
 
 