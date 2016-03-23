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

	if(isset($_POST["category"])){
		 $category=$_POST["category"];
		 $sql = "SELECT * FROM security_map";
		$result=mysqli_query($con,$sql);
		if ($result->num_rows > 0) {
     
     		while($row = mysqli_fetch_assoc($result)) {
		 	  $array[]= $row;
         	 }
         	echo json_encode($array);
			return;
		} 
	}
	else{
		$email=$_POST["email"];
		$password=$_POST["password"];
		$fname=$_POST["fname"];
		$lname=$_POST["lname"];
		$flag=$_POST["flag"];
        $secquestion1=$_POST["secquestion1"];
        $ans1=$_POST["ans1"];
        $secquestion2=$_POST["secquestion2"];
        $ans2=$_POST["ans2"];
        $secquestion3=$_POST["secquestion3"];
        $ans3=$_POST["ans3"];
        $about_me=$_POST["about-me"];
        $age=$_POST["age"];
        $gender=$_POST["gender"];
        $country="USA";
        $mobile=$_POST["mobile"];
        $home_phone=$_POST["home_phone"];
        $street=$_POST["street"];
		$apt_no=$_POST["apt_no"];
		$city=$_POST["city"];
		$state=$_POST["state"];
		$zipcode=$_POST["zipcode"];
		//$path="/upload/profile/";
		$link=$_POST["profilename"];
		//$path_resume="/upload/resumes/";
		//$path_reference="/upload/references";
	   
	    
	    // $availablity_id=1;
		
			$selectQuery="select max(User_ID) from user_details";
			$result=mysqli_query($con,$selectQuery);
			
			if ($result->num_rows > 0) {
     			while($row = mysqli_fetch_assoc($result)) {

			 	  	$User_id=$row["max(User_ID)"]+1;
			 	}
			 
			}
			else 		
			{
				$User_id=1;

			}


			
			
    		$transaction_flag=true;
    		mysqli_autocommit($con, FALSE);
			
			$querry="INSERT INTO login  VALUES('$email','$password',$flag,$User_id)";
			if (!mysqli_query($con,$querry))
			{
				$transaction_flag=FALSE;
				die('Error1: ' . mysqli_error($con));
			}

			$querry="INSERT INTO security_question VALUES($User_id,$secquestion1,'$ans1')";
			if (!mysqli_query($con,$querry))
			{
				$transaction_flag=FALSE;
				die('Error1: ' . mysqli_error($con));
			}

			$querry="INSERT INTO security_question VALUES($User_id,$secquestion2,'$ans2')";
			if (!mysqli_query($con,$querry))
			{
				$transaction_flag=FALSE;
				die('Error1: ' . mysqli_error($con));
			}


			$querry="INSERT INTO security_question VALUES($User_id,$secquestion3,'$ans3')";
			if (!mysqli_query($con,$querry))
			{
				$transaction_flag=FALSE;
				die('Error1: ' . mysqli_error($con));
			}


			$selectQuery="select max(contact_id) from contact";
			$result=mysqli_query($con,$selectQuery);
			
			if ($result->num_rows > 0) {
     			
	     		while($row = mysqli_fetch_assoc($result)) {

			 	  	$contact_id=$row["max(contact_id)"]+1;
			 	  	
	         	 }
			 
			}
			else 		
			{
				$contact_id=1;

			}


			$querry="Insert into user_details values($User_id,'$fname','$lname','$gender','$about_me',$age,$User_id,$flag,CURDATE(),null,'$link',0)";
			if (!mysqli_query($con,$querry))
			{
				$transaction_flag=FALSE;
				die('Error2: ' . mysqli_error($con));
			}
			$querry="Insert into contact values('$home_phone','$mobile','$street','$apt_no','$city','$state','$country',$User_id,$zipcode)";
			if (!mysqli_query($con,$querry))
			{
				$transaction_flag=FALSE;
				die('Error3: ' . mysqli_error($con));
			}
			if($flag)
			{

				$selectQuery="select max(Availablity_ID) from availability";
				$result=mysqli_query($con,$selectQuery);
				
				if ($result->num_rows > 0) {
	     			while($row = mysqli_fetch_assoc($result)) {

				 	  	$availablity_id=$row["max(Availablity_ID)"]+1;
				 	  	
		         	 }
				 
				}
				else 		
				{
					$availablity_id=1;

				}
				$cv_filepath=$_POST["cv_filepath"];
				$reference_filepath=$_POST["reference_filepath"];
				$exp=$_POST["exp"];
				$expertise=$_POST["expertise"];
				$pay_rate=$_POST["pay_rate"];
				$querry="Insert into caregiver values($User_id,'$cv_filepath','$reference_filepath',$pay_rate,$exp,'$expertise',1,$User_id,1)";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=FALSE;
					die('Error4: ' . mysqli_error($con));
				}
				
				$start_date = date('Y-m-d', strtotime(str_replace('-', '/', $_POST["start_date"])));
				
				$end_date =  date('Y-m-d', strtotime(str_replace('-', '/', $_POST["end_date"])));
				
				$week_days=$_POST["week_days"];

				$querry="Insert into availability values($User_id,$User_id,'$start_date','$end_date','$week_days')";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=FALSE;
					die('Error5: ' . mysqli_error($con));
				}
				$querry="Insert into bank_account values($User_id,null,null,null)";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=FALSE;
					die('Error7: ' . mysqli_error($con));
				}
			}
			else
			{	
				$emergency_name=$_POST["emergency_name"];
				$emergency_no=$_POST["emergency_no"];
				$emergency_rel=$_POST["emergency_rel"];
				$Card_ID=1;
				$querry="insert into requester values($User_id,'$emergency_name','$emergency_no','$emergency_rel','$User_id',$User_id)";
				if (!mysqli_query($con,$querry))
				{
					$transaction_flag=FALSE;
					die('Error:6 ' . mysqli_error($con));
				}
				// $querry="Insert into card_details values($Card_ID,null,null,null,null,null,null)";
				// if (!mysqli_query($con,$querry))
				// {
				// 	$transaction_flag=FALSE;
				// 	die('Error:8 ' . mysqli_error($con));
				// }
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
	
	
?>