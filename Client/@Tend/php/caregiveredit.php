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
		$query="select * from caregiver where User_ID=$userId";

		$result=mysqli_query($con,$query);
		$data=array();
		while($row=mysqli_fetch_assoc($result))
		{
			$row['Resume_filepath']='http://localhost/tend_services/upload/resumes/'.$row['Resume_filepath'];
			$row['Reference_filepath']='http://localhost/tend_services/upload/references/'.$row['Reference_filepath'];
			$data[]=$row;
		}
		echo json_encode($data);
		mysqli_close($con);
		return;
	}
	else if($category==2){
		$exp=$_POST["exp"];
		$pay_rate=$_POST["pay_rate"];
		$expertise=$_POST["expertise"];
		$ref=$_POST["reference_filepath"];
		$cv=$_POST["cv_filepath"];

		$query="UPDATE caregiver SET Resume_filepath='$cv',Reference_filepath='$ref',pay_rate='$pay_rate',Experience=$exp,Expertise='$expertise' where User_ID=$userId ";
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}


	}
	else if($category==3){

		$start_date = date('Y-m-d', strtotime(str_replace('-', '/', $_POST["start_date"])));
		$end_date =  date('Y-m-d', strtotime(str_replace('-', '/', $_POST["end_date"])));
		$week_days=$_POST["week_days"];

		$query="UPDATE availability SET start_date='$start_date',end_date='$end_date',week_days='$week_days' where User_ID=$userId ";
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}

	}

	else if($category==4){
		
		$query="select * from availability where User_ID=$userId";

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
	
	else if($category==5){
		$query="select * from bank_account where Account_ID=$userId";

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
	else if($category==6){
		$name=$_POST["name"];
		$route=$_POST["route"];
		$no=$_POST["account_no"];
		$query="UPDATE bank_account SET AccountHolder_Name='$name',Routing_No='$route',BankAccount_No='$no' WHERE Account_ID=$userId";
		if (mysqli_query($con, $query)) {
			    echo "Record updated successfully";
		} else {
			    echo "Error updating record: " . mysqli_error($con);
		}
	}
?>	