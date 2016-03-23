$(document).ready(function(){
		debugger;
		var user_id=sessionStorage.getItem("User_ID");
		loadDataintoScreen(user_id);

		function loadDataintoScreen(userID){
			var url=window.location.href;   	
			if(url.indexOf("caregiverEditPersonalInfo") > -1){
				 loadPersonalDetails(userID);
			}
			else if(url.indexOf("caregiverEditContact") > -1){

				loadContactDetails(userID);
			}
			else if(url.indexOf("caregiverEditExpr") > -1){
						loadEditExperienceData(userID);
			}
			else if(url.indexOf("caregiverEditBankingDetails") > -1){
					loadBankingInformation(userID);
			}
			else if(url.indexOf("caregiverEditAvailability") > -1){

					loadAval(userID);
			}
		}


		function loadBankingInformation(userId){
			var postString = "category=5&UserId="+userId;
				 $.ajax({
							url:'http://localhost/tend_services/caregiveredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var bankData =JSON.parse(data);
								if(bankData.length>0){
									loadBankDetails(bankData[0]);
								}
								else
								{
									alert("No Bank details in DB. Please add new details");
								}
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);
		}

		function loadBankDetails(bankdata){
			$("#account_no").val(bankdata.BankAccount_No);
			$("#route").val(bankdata.Routing_No);
			$("#name").val(bankdata.AccountHolder_Name);
		}

		$("#cg_bank").submit(function(event){
			var param="category=6&UserId="+user_id;
			param=param+"&"+$("form").serialize();
            alert(param);
			 $.ajax({
							url:'http://localhost/tend_services/caregiveredit.php',
							type:"POST",
							data:param,
							success:function(data)
							{
								loadBankingInformation(user_id);
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);
		});


		function loadAval(userID){
			var postString = "category=4&UserId="+userID;
				 $.ajax({
							url:'http://localhost/tend_services/caregiveredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var avalProfileData =JSON.parse(data);
								refreshAvalDisplay(avalProfileData[0]);
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);
		
		}

		function formatDate(date){
			var array=date.split("-");
			var date=array[1]+"/"+array[2]+"/"+array[0];
			return date;
		}

		function refreshAvalDisplay(avalData){
			var start_date=formatDate(avalData.start_date);
			var end_date=formatDate(avalData.end_date)
			$("#start_date").val(start_date);
			$("#end_date").val(end_date);
			var days=avalData.week_days;
			var daysarray=days.split(",");
			var i=0;
			for(i=0;i<daysarray.length;i++){
				if(daysarray[i].toLowerCase().indexOf("mon")>-1){
					$( "#mon" ).prop( "checked", true );
				}
				if(daysarray[i].toLowerCase().indexOf("tue")>-1){
					$( "#tue" ).prop( "checked", true );
				}
				if(daysarray[i].toLowerCase().indexOf("wed")>-1){
					$( "#wed" ).prop( "checked", true );

				}
				if(daysarray[i].toLowerCase().indexOf("thu")>-1){
					$( "#thu" ).prop( "checked", true );

				}
				if(daysarray[i].toLowerCase().indexOf("fri")>-1){
					$( "#fri" ).prop( "checked", true );

				}
				if(daysarray[i].toLowerCase().indexOf("sat")>-1){
					$( "#sat" ).prop( "checked", true );

				}
				if(daysarray[i].toLowerCase().indexOf("sun")>-1){
					$( "#sun" ).prop( "checked", true );

				}

			}


		}

		$("#editavail").submit(function(event){

				var i=0;
				var days = new Array(7);
				var j=0;
				var flagselected=false;
				if($("#mon").is(':checked')){
					i++;
					days[j]="mon";
					j++;

				}
				if($("#tue").is(':checked')){
					i++;
					days[j]="tue";
					j++;
				}	
				if($("#wed").is(':checked')){
					i++;
					days[j]="wed";
					j++;
				}	
				if($("#thu").is(':checked')){
					i++;
					days[j]="thu";
					j++;
				}	
				if($("#fri").is(':checked')){
					i++;
					days[j]="fri";
					j++;
				}	
				if($("#sat").is(':checked')){
					i++;
					days[j]="sat";
					j++;
				}	
				if($("#sun").is(':checked')){
					i++;
					days[j]="sun";
					j++;
				}	
				if(i==0)
				{
					alert("Please select Availability");
					$("#tar").css("color","red");
					$("#tar").text("*Days Of The Week")
					event.preventDefault();
				}
				else
				{
					event.preventDefault();
					var param=localStorage.getItem('SignupData');
					var start_date=$("#start_date").val();
					

					var end_date=$("#end_date").val();
				
					var weekdays=days[0];

					for(k=1;k<j;k++){
						weekdays=weekdays+","+days[k];
					}
					//alert(weekdays);
						var param=param+"&"+"week_days="+weekdays;
						param=param+"&"+"start_date="+start_date;
						param=param+"&"+"end_date="+end_date;
						param=param+"&"+"category=3";
						param=param+"&"+"UserId="+user_id;
						$.ajax({
							url:'http://localhost/tend_services/caregiveredit.php',
							type:"POST",
							data:param,
							success:function(data)
							{
								loadAval(user_id);
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);
				}		

		});


		function loadPersonalDetails(userid){
			var postString = "category=1&UserId="+userid;
				 $.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var editProfileData =JSON.parse(data);
								console.log(editProfileData[0]);
								refreshDisplay(editProfileData[0]);
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);
		}

		function refreshDisplay(viewData)
			{
				if(viewData.profile_picture.indexOf("null")>-1){
					$("#profile-image").attr("src","images/profile.png");
				}
				else
					$("#profile-image").attr("src",viewData.profile_picture);
				$("#idabout-me").text(viewData.About_Me);
				$("#idfname").val(viewData.First_Name);
				$("#idlname").val(viewData.Last_Name);
				$("#idage").val(viewData.age);
				$(':radio[value="' + viewData.Gender + '"]').attr('checked', 'checked');
		}

		$("#cg_per_edit").submit(function(event){
				event.preventDefault();
											
				var formData = new FormData($(this)[0]);
				
				$.ajax({
				    url: 'http://localhost/tend_services/fileuploader.php',
				    type: "POST",
				    data: formData,
				    processData: false,
				    contentType: false,
				    datatype:"text",
				    success: function (res) {

				       updatepersonalInDB();
				       

				    },
				    error:function(res){
				    	//alert("in error");
				    	console.log(res);
				    }
				  });

		});

		function updatepersonalInDB(){
			var params = $("form").serialize();
			params+="&category=16";
			params+="&UserId="+user_id;
			params+="&profile="+localStorage.getItem('profilename');
			$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
									loadPersonalDetails(user_id);
			
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);

		}
		$('#profileimg').change( function(event) {
			   var f = event.target.files[0]; // FileList object
  
			      if (!f.type.match('image.*')) {
			         alert("upload only image file");
			       }

			       
					localStorage.setItem('profilename',f.name);
				    var reader = new FileReader();
		            reader.onload = (function(theFile) {
			        return function(e) {
			         
			         $("#profile-image").attr("src",e.target.result);
			        };
			      })(f);
   
			      reader.readAsDataURL(f);
			   });


		function loadContactDetails(userid){
			var postString = "category=2&UserId="+userid;
				$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var editProfileData =JSON.parse(data);
								sessionStorage.setItem("contact_id",editProfileData[0].Contact_ID);
								console.log(editProfileData[0]);
								refreshContactDisplay(editProfileData[0]);
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);
		}

		function refreshContactDisplay(viewData){
			$("#mobile").val(viewData.Mobile);
			$("#home").val(viewData.Home_phone);
			$("#street").val(viewData.Street);
			$("#apt").val(viewData.Apt_No);
			$("#city").val(viewData.City);
			$("#state").val(viewData.State);
			$("#zipcode").val(viewData.Zip_code);
		}

		$("#savecontact").on("click",function(e){
			e.preventDefault();
			var params="";
			var params = $("form").serialize();
				params+="&category=15";
				params+="&UserId="+user_id;
				params+="&contact_id="+sessionStorage.getItem("contact_id");
			
			$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								alert("Data Saved!");
								loadContactDetails(user_id);
							},
							error:function(res){
						       	console.log(res);
						    }	

						}
					);
		 });

		function loadEditExperienceData(userID){
			var postString = "category=1&UserId="+userID;
				 $.ajax({
							url:'http://localhost/tend_services/caregiveredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var editexperienceData =JSON.parse(data);
								console.log(editexperienceData[0]);
								refreshExperienceDisplay(editexperienceData[0]);
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);

		}

		function refreshExperienceDisplay(expdata){
			$("#exp").val(expdata.Experience);
			$("#pay_rate").val(expdata.pay_rate);
			$("#care_resume").attr("href",expdata.Resume_filepath);
		    $("#care_ref").attr("href",expdata.Reference_filepath);
			var skills=expdata.Expertise;
			var arrayOfSkills=skills.split(",");
			for(i=0;i<arrayOfSkills.length;i++){
				if(arrayOfSkills[i].toLowerCase().indexOf("nurse")>-1){
					$( "#Nurse" ).prop( "checked", true );
				}
				if(arrayOfSkills[i].toLowerCase().indexOf("physiotherapy")>-1){
					$( "#Physiotherapy" ).prop( "checked", true );
				}
				if((arrayOfSkills[i].toLowerCase().indexOf("yoga")>-1)){
					$( "#Yoga" ).prop( "checked", true );
				}
				if((arrayOfSkills[i].toLowerCase().indexOf("counselor")>-1)){
					$( "#Counselor" ).prop( "checked", true );
				}
				if((arrayOfSkills[i].toLowerCase().indexOf("medicine")>-1)){
			     	$( "#Alternative_Medicine" ).prop( "checked", true );
				}
			}
		}
		$("#cg_exp_edit").submit(function(event){
			event.preventDefault();
			var formData = new FormData($(this)[0]);
			$.ajax({
						    url: 'http://localhost/tend_services/caregiveruploder.php',
						    type: "POST",
						    data: formData,
						    processData: false,
						    contentType: false,
						    datatype:"text",
						    success: function (res) {
						    	
						       updateCaregiverExpInDB();
						    },
						    error:function(res){
						    	
						    	console.log(res);
						    }
						  });
		});

		function updateCaregiverExpInDB(){
			
			var param="";
			param = $("form").serialize();
			param=param+"&category=2";
			var i=0;
			var j=0;
			var expertskills=new Array(5);
					if($("#Nurse").is(':checked')){
						i++;
						expertskills[j]="Nurse";
						j++;
					}	
					if($("#Physiotherapy").is(':checked')){
						i++;
						expertskills[j]="Physiotherapy";
						j++;
					}
					if($("#Yoga").is(':checked')){
						i++;
						expertskills[j]="Yoga";
						j++;	
					}
					if($("#Counselor").is(':checked')){
						i++;
						expertskills[j]="Counselor";
						j++;
					}	
					if($("#Alternative_Medicine").is(':checked')){
						i++;
						expertskills[j]="Alternative_Medicine";
						j++;
					}	
					if(i==0)
					{	
						alert("Please select a Profession");
						$("#pro").css("color","red");
						$("#pro").text("*Profession/Skill");
						
					}
					else
					{
					
						var expertise=expertskills[0];
						var k=0;
						for(k=1;k<j;k++){
							expertise=expertise+","+expertskills[k];
						}
						param=param+"&"+"expertise="+expertise;
						param=param+"&"+"UserId="+user_id;
						param=param+"&"+"reference_filepath="+sessionStorage.getItem('reference_filepath');
						param=param+"&"+"cv_filepath="+sessionStorage.getItem('resume_filepath');
						//alert(param);
						 $.ajax({
							url:'http://localhost/tend_services/caregiveredit.php',
							type:"POST",
							data:param,
							success:function(data)
							{
								//alert("data Update in table");
								var editexperienceData =JSON.parse(data);
								console.log(editexperienceData[0]);
								refreshExperienceDisplay(editexperienceData[0]);
							},
							error:function(res){
						       	console.log(res);
						    }	
						}
					);
					}
		}
		
		function isValid(str){
			 return /[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(str);
		}

		$("#resume").change(function(event){
				debugger;
				var f = event.target.files[0]; // FileList object
				if(isValid(f.name)){
			       		alert("File name should not contain special chars. Only - and space is allowed in name");
			       		 $("#resume").val('');
		       	}
			       	else{
		    		    sessionStorage.setItem('resume_filepath',f.name);
					}
			});

		$("#references").change(function(event){

				var f = event.target.files[0]; // FileList object
				if(isValid(f.name)){
			       		alert("File name should not contain special chars. Only - and space is allowed in name");
			       		 $("#references").val('');
			      }
			     else{
			    		   sessionStorage.setItem('reference_filepath',f.name);
					}		
		});

		

	
});		
