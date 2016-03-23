
$(document).ready(function(){	
//extract from sessionn here and pass below
	
			
	 $("#profile_pic").attr("src",sessionStorage.getItem("profile_pic"));
	 $("#name_span").html("Welcome "+sessionStorage.getItem("name"));
	populateUserProfile(sessionStorage.getItem("User_ID"));
	
	function populateUserProfile(userId)
	{
		console.log("Populating USer Profile");
		 var postString = "category=1&UserId="+userId;//read userid
		 $.ajax({
					url:'http://localhost/tend_services/userDetails.php',
					type:"POST",
					data:postString,
					success:function(data)
					{
						var viewProfileData =JSON.parse(data);
						console.log(viewProfileData[0]);
						refreshDisplay(viewProfileData[0]);
					}	
				}
			);
	}
	function refreshDisplay(viewData)
	{
		console.log(viewData.First_Name);
		console.log(viewData.profile_picture);
		
		$("#viewProfileImg").attr("src",viewData.profile_picture);
		$("#profileName").text(viewData.First_Name+" "+viewData.Last_Name);
		$("#viewProfileAbout").text(viewData.About_Me);
		var address = viewData.Street+", Apt-"+viewData.Apt_No+"\t"+viewData.City+"\t"+viewData.State+"\t- "+viewData.Zip_Code;		
		$("#profAddr").text(address);
		
		$("#profMob").text(stylizePhone(viewData.Mobile));
		
		$("#profHome").text(stylizePhone(viewData.Home_phone));
		$("#emerge_name").text(viewData.Emergency_name);
		$("#emerge_no").text(stylizePhone(viewData.Emergency_no));
	}
	function stylizePhone(phone)
	{
		var res1Area = phone.substring(0, 3); 		
		var res2FirstPart = phone.substring(3, 6);
		var res3SecPArt = phone.substring(6, phone.length);
		var resPhone="("+res1Area+")"+" "+res2FirstPart+"-"+res3SecPArt;
		
		return resPhone;
	}
});


