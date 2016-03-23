
$( document ).ready(function() {
	    
var url=document.URL;
		
var screenwidth=$(window).width();
var screenheight=$(window).height();

// if(screenwidth>676){
// $(".body-class-user").height(screenheight+'px');
// $(".body-class-user").width(screenwidth+'px');
// $(".body-class").height(screenheight+'px');
// $(".body-class").width(screenwidth+'px');
// }
        $("div.later-page").height(screenheight+'px');

		if(url.indexOf("login")>-1)
		{
			if(sessionStorage.getItem("isCaregiver")==1)
				window.location.href="caregiverManageRqsts.html";
			else if(sessionStorage.getItem("isCaregiver")==0)
				window.location.href="userlanding.html";
		}
	   
		$(".toggle-advanced").on("click",function(e){
			e.preventDefault();
			$(".advance-search-data").toggleClass("visible");
			$(".toggle-advanced").toggleClass("toggle-advanced-img");
		})

		$('.menuopen').on('click', function(){
			     $(".content").addClass("visible");   
                // $(".content").addClass("changemargin");
                  
                  
			});
		
		$('.menuopen-inside').on('click', function(){
			     $(".content-user").addClass("visible");   
                // $(".content").addClass("changemargin");
                  
                  
			});

		$(".closePopMenu").on('click', function(){
                 
                 $(".content").removeClass("visible");     
                 $(".content-user").removeClass("visible");   
		});

		$(".close-menu").on('click', function(){
                 
                 $(".content").removeClass("visible");     
                 $(".content-user").removeClass("visible");   
		});


		$( "#target" ).submit(function( event ) {
			var i=0;
			if($("#Nurse").is(':checked'))
				i++;
			if($("#Physiotherapy").is(':checked'))
				i++;
			if($("#Yoga").is(':checked'))
				i++;
			if($("#Counselor").is(':checked'))
				i++;
			if($("#Alternative_Medicine").is(':checked'))
				i++;
			if(i==0)
			{	
				event.preventDefault();
				alert("Please select a Assistance Type");
				$("#pro").css("color","red");
				$("#pro").text("*Type of Assistance");
			}
			else
			{
				event.preventDefault();
				window.location.href = "searchresult.html";
			}
		});
		
		// $("#testimonial").submit(function(event){
			// event.preventDefault();
			// alert("Thank you for your kind words.");
			// window.location.href="index.html";
			
			
		// });
		
		

		
		// $('#contact').submit(function(event){alert("Message Sent");});
		
		$('#user_payment').submit(function(event){event.preventDefault();alert("Payment Completed");window.location.href="userCurrRqsts.html"});
		
		$('#user_new_payment').submit(function(event){
			event.preventDefault();
			alert("Card Added");
		});
		$('#q1').submit(function(event){alert("Inputs Recieved")});
		$('#q2').submit(function(event){alert("Inputs Recieved")});
		$("#user_landing").submit(function(event){
		var i=0;
		if($("#mon").is(':checked'))
			i++;
		if($("#tue").is(':checked'))
			i++;
		if($("#wed").is(':checked'))
			i++;
		if($("#thu").is(':checked'))
			i++;
		if($("#fri").is(':checked'))
			i++;
		if($("#sat").is(':checked'))
			i++;
		if($("#sun").is(':checked'))
			i++;
		if(i==0)
		{
			event.preventDefault();
			alert("Please select Days");
			$("#tar").css("color","red");
			$("#tar").text("*Days Of The Week")
			
		}
		else
		{
			event.preventDefault();
			window.location.href = "searchcontinue.html";
		}
	});
		
		
		  // $(".div-testimonials > div.reviews:gt(0)").hide();

			// setInterval(function() { 
			  // $('.div-testimonials > div.reviews:first')
			    // .fadeOut(1000)
			    // .next()
			    // .fadeIn(1000)
			    // .end()
			    // .appendTo('.div-testimonials');
			// },  3000);
			
			$('#securityContinue').on('click', function(){
                      
                    var isCaregiver; 
					var selectedoption=$('input[name=caregiver]:checked').val();
					if(selectedoption==="yes"){
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
			});

			$('#loginButton').on('submit',function(e){
				e.preventDefault();
				var username=$("#user").val();
				var password=$("#pass").val();
				
				if(username.toUpperCase().indexOf("ADMIN")>-1 && password.toUpperCase().indexOf("ADMIN")>-1){
						sessionStorage.setItem("User_ID",0);
					window.location.href="sysadmin.html";
				}
				else{
					var form_data=$(this).serialize();
					if($("#isCaregiver").is(':checked'))
						form_data+="&isCaregiver=1";
					else
						form_data+="&isCaregiver=0";
					
					
					//alert(form_data);
					$.ajax
					({
						url:'http://localhost/tend_services/login_auth.php',
						type:'POST',
						data:form_data,
						success:function (data)
						{
							if(parseInt(data)==404)
							{
								alert("Entered User Name or Password do not match");
							}
							else
							{
								data=JSON.parse(data);
								sessionStorage.setItem("User_ID",data[0].User_ID);
								sessionStorage.setItem("isCaregiver",data[0].flag);
								//alert(sessionStorage.User_Id);
								if(parseInt(data[0].flag)==1)
								{
									e.preventDefault();
									window.location.href="caregiverManageRqsts.html";	
								}
								else
								{
									e.preventDefault();
									window.location.href="userlanding.html";	
								}
							}
						}
					});
				}	
			});

			$("#leftmenu").on('click',function(){
				$("#navleft").toggleClass("visible");
			});

			// $(".editEmergency").on('click',function(){
				
			// 	$("#emergencyDetails").toggleClass("visible");
			// });

			// $(".addEmergency").on('click',function(){
				
			// 	$("#emergencyDetails").toggleClass("visible");
			// });

			$("#dropdownMenu").on('click',function(){
				
				$("#dropdown").toggleClass("visible");
			});
			
			$(".savePayment").on('click',function(){
				
				$("#emergencyDetails").toggleClass("visible");
			});
			$('#viewCareGiverReview').on('click',function(){
			
				window.location.href="Userviewreview.html";				
			});
			$('#viewCareGiverReview1').on('click',function(){
			
				window.location.href="Userviewreview.html";				
			});
			// $('#forgotload').on('submit',function(e){
			
				// $("#emergencyDetails").toggleClass("visible");
				// e.preventDefault();
				
			// });
			
			$('#user_edit_contact').on('submit',function(e){
				alert("Changes Saved");
				e.preventDefault();
			});
			$('#user_edit_personal').on('submit',function(e){
				alert("Changes Saved");
				e.preventDefault();
			});
			// $('#set_pass').on('submit',function(e){
				// var id1=$("#pass").val();
				// var id2=$("#cpass").val();
				// if(id1!=id2)
				// {
					// $('#label_cpass').css("color","red");
					// $('#label_cpass').text("*Confirm Password");
					// e.preventDefault();
				// }
				// else
				// {
					// e.preventDefault();
					// window.location.href="login.html"
				// }
			// });
			
});
