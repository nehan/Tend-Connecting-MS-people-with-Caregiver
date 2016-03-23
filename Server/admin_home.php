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
	//$category=2;
	if($category==1)
	{

		$querry="select ud.User_ID,ud.First_Name,ud.Last_Name,ud.profile_picture,cg.Resume_filepath,cg.Expertise from caregiver cg,user_details ud where Authorization=1 and cg.User_ID=ud.User_ID";
		$result=mysqli_query($con,$querry);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
			$row['profile_picture']='http:/localhost/tend_services/upload/profile/'.$row['profile_picture'];
			$row['Resume_filepath']='http:/localhost/tend_services/upload/resumes/'.$row['Resume_filepath'];
			//echo $row['profile_picture'];
			$data[]=$row;
		}
		echo json_encode($data);
		// echo $data[0]['profile_picture'];
	
		mysqli_close($con);
		return;
	}
	if($category==2)
	{
		$op=$_POST["operation"];
		$idd=$_POST["ids"];
		$transaction_flag=true;	
		if($op==0)
		{
			if(strlen($idd)>1)
			{	
				mysqli_autocommit($con, FALSE);
				$ids=explode(",",$idd);
				foreach($ids as $val)
				{
					$uid=intval($val);
					$querry="delete from caregiver  where User_ID=$uid";
					if (!mysqli_query($con,$querry))
					{
						$transaction_flag=false;
						die('Error:1 ' . mysqli_error($con));
					} 
					$querry="delete from login  where User_ID=$uid";
					if (!mysqli_query($con,$querry))
					{
						$transaction_flag=false;
						die('Error:2 ' . mysqli_error($con));
					} 
					$querry="delete from availability where User_ID=$uid";
					if (!mysqli_query($con,$querry))
					{
						$transaction_flag=false;
						die('Error:13 ' . mysqli_error($con));
					} 
					$querry="delete from  user_details where User_ID=$uid";
					if (!mysqli_query($con,$querry))
					{
						$transaction_flag=false;
						die('Error:14 ' . mysqli_error($con));
					} 
				}
				if($transaction_flag)
				{
					mysqli_commit($con);
					echo 200;
				}
				else
				{
					mysqli_rollback($con);
					echo 304;
				}
				mysqli_autocommit($con, TRUE);
				mysqli_close($con);
				return;
			}
			else
			{
				mysqli_autocommit($con, FALSE);
				$uid=intval($idd);
				//$querry="delete from caregiver,login,availablity,user_details where User_ID=$uid";
				$querry="delete from caregiver where User_ID=$uid";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=false;
					die('Error:15 ' . mysqli_error($con));
				} 
				$querry="delete from login where User_ID=$uid";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=false;
					die('Error:16 ' . mysqli_error($con));
				} 
				$querry="delete from availability where User_ID=$uid";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=false;
					die('Error:17 ' . mysqli_error($con));
				} 
				$querry="delete from user_details where User_ID=$uid";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=false;
					die('Error:18 ' . mysqli_error($con));
				} 
				if($transaction_flag)
				{
					mysqli_commit($con);
					echo 200;
				} 
				else
				{
					mysqli_rollback($con);
					echo 304;
				}
				mysqli_autocommit($con, TRUE);
				mysqli_close($con);
				return;
			}
		}
		else if($op==1)
		{
			if(strlen($idd)>1)
			{	
				mysqli_autocommit($con, FALSE);
				$ids=explode(",",$idd);
				foreach($ids as $val)
				{
					$uid=intval($val);
					$querry="update caregiver set Authorization=0 where User_ID=$uid" ;
					if (!mysqli_query($con,$querry))
					{
						$transaction_flag=false;
						die('Error:3 ' . mysqli_error($con));
					}
				}
				if($transaction_flag)
				{
					mysqli_commit($con);
					echo 200;
				}
				else
				{
					mysqli_rollback($con);
					echo 304;
				}
				mysqli_autocommit($con, TRUE);
				mysqli_close($con);
				return;
			}
			else
			{
				$uid=intval($idd);
				$querry="update caregiver set Authorization=0 where User_ID=$uid";
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
		}
	}
	if($category==3)
	{
		$querry="SELECT First_Name,Last_Name,Flag,profile_picture,member_since,last_login FROM user_details";
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
?>