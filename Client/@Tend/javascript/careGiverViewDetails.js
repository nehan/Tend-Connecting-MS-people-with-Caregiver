
$(document).ready(function(){	
//extract from sessionn here and pass below

	populateCareGiverProfile(sessionStorage.getItem("User_ID"));
	
	function populateCareGiverProfile(userIdParam)
	{
		var userId = userIdParam;
		
		var url = window.location.href;
		var nUSerIdFromUrl = url.indexOf("?"); 
		if ( nUSerIdFromUrl != -1)
		{
			var resSplit = url.split("=");
			userId = resSplit[1];
			$("#backtocaregiver").attr("href", "userlanding.html");
			//alert(userId);			
		}
		else{
			$("#backtocaregiver").attr("href", "caregiverManageRqsts.html");
		}
		console.log("Populating USerCaregiver Profile");
		 var postString = "category=1&UserId="+userId;//read userid
		 $.ajax({
					url:'http://localhost/tend_services/careGiverDetails.php',
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
		
		$("#careImg").attr("src",viewData.profile_picture);
		$("#careName").text(viewData.First_Name+" "+viewData.Last_Name);
		$("#care_about_me").text(viewData.About_Me);
		var address = viewData.Street+", Apt-"+viewData.Apt_No+"\t"+viewData.City+"\t"+viewData.State+"\t- "+viewData.Zip_Code;	
		
		$("#care_addr").text(address);		
		$("#care_cell").text(stylizePhone(viewData.Mobile));
		
		$("#care_home").text(stylizePhone(viewData.Home_phone));
		$("#care_days").text(viewData.week_days);
		var startDateString = dateFormat(viewData.start_date);
		var endDateString = dateFormat(viewData.end_date);
		$("#care_date").text(startDateString +" - "+endDateString);
		$("#care_expr").text(viewData.Experience);
		$("#care_skill").text(viewData.Expertise);
		$("#care_resume").attr("href",viewData.Resume_filepath);
		$("#care_ref").attr("href",viewData.Reference_filepath);
	}
	function stylizePhone(phone)
	{
		var res1Area = phone.substring(0, 3); 		
		var res2FirstPart = phone.substring(3, 6);
		var res3SecPArt = phone.substring(6, phone.length);
		var resPhone="("+res1Area+")"+" "+res2FirstPart+"-"+res3SecPArt;		
		return resPhone;
	}
	function dateFormat(datetimeStamp)
	{	
		//Split timestamp into [ Y, M, D, h, m, s ]
		var t=datetimeStamp.split(/[- :]/);
		console.log(t);
		
		//var t = "2010-06-09 13:12:01".split(/[- :]/);
		// Apply each element to the Date function
		//// -> Wed Jun 09 2010 13:12:01 GMT+0100 (GMT Daylight Time)
		var d = new Date(t[0], t[1]-1, t[2]);
		var dateString=t[1]+'/'+t[2]+'/'+t[0];
		return dateString;
	}
});


