

$( document ).ready(function() {


	function uploadImage(){
		//alert("in image upload");
		
	}
	var securityQuestions=JSON.parse(localStorage.getItem("SecurityQuestions"));		
	
	if(securityQuestions){
		console.log(securityQuestions);
		$.each(securityQuestions, function(key, val) {
			  	    	
			  	    	 $('#sec1')
				         .append($("<option></option>")
				         .attr("value",val.Security_Id)
				         .text(val.question)); 
							  	    
			  	     	$('#sec2')
				         .append($("<option></option>")
				         .attr("value",val.Security_Id)
				         .text(val.question)); 
							  	   
   	 					$('#sec3')
				         .append($("<option></option>")
				         .attr("value",val.Security_Id)
				         .text(val.question)); 
				 });	
	}
	   

   function loadSecurityQuestions(){
     	
   	$.ajax({
			 url: 'http://localhost/tend_services/signup.php',
			 type:'POST',
			 dataType: 'json',
			 data: {category : "getsecurityquestion"},
			 success: function(data) {
                   localStorage.setItem("SecurityQuestions",JSON.stringify(data));
                   window.location.href="securityquestion.html";
       		 },
       		 error:function(res){
						       	console.log(res);
						    }
		});		
   }

	$('#signUp').on('submit', function(event){
					event.preventDefault();
					var id1=$("#pass").val();
					var id2=$("#cpass").val();
					if(id1==id2)
					{
	                    var isCaregiver; 
						var selectedoption=$('input[name=flag]:checked').val();

						if(selectedoption==1){
							isCaregiver={
								iscaregiver:true
							};
							
						}	
						else{
							isCaregiver={	
								iscaregiver:false
							};
						}
						localStorage.setItem('isCaregiver', JSON.stringify(isCaregiver));
						var params = $("form").serialize();
						localStorage.setItem('SignupData', params);
						loadSecurityQuestions();
			    	}
					else{
						event.preventDefault();
						alert("Passwords do not match")
						$("#label_pass").css("color","red");
						
					}
				});

			$('#loadReg').on('submit',function(e){
				e.preventDefault();
				var sec1=$("#sec1").val();
				var sec2=$("#sec2").val();
				var sec3=$("#sec3").val();
				if((sec1==sec2) || (sec1==sec3) || (sec2==sec3))
				{
					alert("Please select separate security questions");
				}
				else
				{
					var param=localStorage.getItem('SignupData');
					param=param+"&"+$("form").serialize();
					localStorage.setItem('SignupData',param);
					var Caregiver=JSON.parse(localStorage.getItem('isCaregiver'));
					//alert(Caregiver.iscaregiver);
					if(Caregiver.iscaregiver){
					   $(".caregiverreg").addClass("display");
					   $(".userreg").addClass("hide");
					   window.location.href="caregiverregistration.html";
					}
					else{
						$(".caregiverreg").addClass("hide");
						$(".userreg").addClass("display");
						window.location.href="userregistration.html";
					}
				}
			});
			

			$("#user_reg").submit(function(event){
				event.preventDefault();
				// var param=$("form").serialize();
				var param=localStorage.getItem('SignupData');
				param=param+"&"+$("form").serialize();
				localStorage.setItem('SignupData',param);
				//var formData=JSON.parse(localStorage.getItem("formdata"));
				var formData = new FormData($(this)[0]);
				localStorage.setItem("formdataProfile",formData);
				$.ajax({
				    url: 'http://localhost/tend_services/fileuploader.php',
				    type: "POST",
				    data: formData,
				    processData: false,
				    contentType: false,
				    datatype:"text",
				    success: function (res) {
				        window.location.href ="userregistrationcontact.html";
				    },
				    error:function(res){
				    	//alert("in error");
				    	console.log(res);
				    }
				  });
				
			});


			$("#user_reg_contact").submit(function(event){

				event.preventDefault();
				var param=localStorage.getItem('SignupData');
				param=param+"&"+$("form").serialize();
				localStorage.setItem('SignupData',param);
				//alert(param);
				window.location.href ="useremergency.html";	
			});

			$("#finalUserReg").submit(function(event){

				event.preventDefault();
				var param=localStorage.getItem('SignupData');
				param=param+"&"+$("form").serialize();
				localStorage.setItem('SignupData',param);
				var self=this;
				$.ajax({
					      url: 'http://localhost/tend_services/signup.php',
					      jsonp: 'callback',
					      type:'POST',
					      data: param ? param : null,
					      success: function(data) {
					      	console.log(data);
					      	 window.location.href="doneregistration.html";
					      	 	//console.log(done);							
							},
							error:function(data){
								console.log(data);
								//alert("error");
							}
				});		


			});

			function isValid(str){
			 return /[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(str);
			}

			$('#profileimg').change( function(event) {

			  
			   var f = event.target.files[0]; // FileList object
  
			      if (!f.type.match('image.*')) {
			         alert("upload only image file");

			       }
			       else{

			       	if(isValid(f.name)){
			       		alert("File name should not contain special chars. Only - and space is allowed in name");
			       		
			       	}
			       	else{
				        var param=localStorage.getItem('SignupData');
						param=param+"&"+"profilename="+f.name;
						localStorage.setItem('SignupData',param);
					  
					    var reader = new FileReader();

				        reader.onload = (function(theFile) {
				        return function(e) {
				         
				         $("#profile").attr("src",e.target.result);
				        };
				      })(f);
	   
				      reader.readAsDataURL(f);
				     } 
				    } 
			   });

			
			$("#resume").change(function(event){

				var f = event.target.files[0]; // FileList object
					if(isValid(f.name)){
			       		alert("File name should not contain special chars. Only - and space is allowed in name");
			       		
			       	}
			       	else{
			    		    var param=localStorage.getItem('SignupData');
								param=param+"&"+"cv_filepath="+f.name;
								localStorage.setItem('SignupData',param);
						}		
			});

			$("#references").change(function(event){

				var f = event.target.files[0]; // FileList object
				if(isValid(f.name)){
			       		alert("File name should not contain special chars. Only - and space is allowed in name");
			       		
			    }
			    else{
	    		    var param=localStorage.getItem('SignupData');
						param=param+"&"+"reference_filepath="+f.name;
						localStorage.setItem('SignupData',param);
				}		
			})

		$("#caregivermainreg").submit(function(event){
			event.preventDefault();
			var param=localStorage.getItem('SignupData');
				param=param+"&"+$("form").serialize();
				localStorage.setItem('SignupData',param);
				//var formData=JSON.parse(localStorage.getItem("formdata"));
				var formData = new FormData($(this)[0]);
				localStorage.setItem("formdataProfile",formData);
				$.ajax({
				    url: 'http://localhost/tend_services/fileuploader.php',
				    type: "POST",
				    data: formData,
				    processData: false,
				    contentType: false,
				    datatype:"text",
				    success: function (res) {

				        window.location.href ="caregiverreg2.html";
				    },
				    error:function(res){
				    	//alert("in error");
				    	console.log(res);
				    }
				  });


			//window.location.href ="caregiverreg2.html";	

		});

	

		$("#targetcaregiver").submit(function(event){
			
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
						event.preventDefault();
					}
					else
					{
						event.preventDefault();

						var expertise=expertskills[0];
						var k=0;
						for(k=1;k<j;k++){
							expertise=expertise+","+expertskills[k];
						}
						var param=localStorage.getItem('SignupData');
						param=param+"&"+$("form").serialize();
						param=param+"&"+"expertise="+expertise;
						localStorage.setItem('SignupData',param);
						var formData = new FormData($(this)[0]);
						var self=this;
						$.ajax({
						    url: 'http://localhost/tend_services/caregiveruploder.php',
						    type: "POST",
						    data: formData,
						    processData: false,
						    contentType: false,
						    datatype:"text",
						    success: function (res) {
						    	//alert(param);
						       window.location.href ="caregiverreg3.html";	
						    },
						    error:function(res){
						    	//alert("in error");
						    	console.log(res);
						    }
						  });

					}

			
    	});	

		$("#sub").submit(function(event){
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
					var start_date=$("#start").val();
					

					var end_date=$("#end").val();
				
					var weekdays=days[0];

					for(k=1;k<j;k++){
						weekdays=weekdays+","+days[k];
					}
					//alert(weekdays);
						param=param+"&"+$("form").serialize();
						param=param+"&"+"week_days="+weekdays;
						param=param+"&"+"start_date="+start_date;
						param=param+"&"+"end_date="+end_date;
						localStorage.setItem('SignupData',param);
						window.location.href = "caregiverreg4.html";
				}
	});

	$("#doneCaregiverreg").submit(function(event){
				event.preventDefault();
				var param=localStorage.getItem('SignupData');
				param=param+"&"+$("form").serialize();
				localStorage.setItem('SignupData',param);
				var self=this;
				$.ajax({
					      url: 'http://localhost/tend_services/signup.php',
					      jsonp: 'callback',
					      type:'POST',
					      data: param ? param : null,
					      success: function(data) {
					      	window.location.href="doneregistration.html";
					      	 						
							},
							error:function(res){
						       	console.log(res);
						    }

				});		
	});


		
});	