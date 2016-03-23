$(document).ready(function(){

		var userName = sessionStorage.getItem("name")
		var varInterval;
		loadDataintoScreen();
		
		function loadDataintoScreen(){
			var url=window.location.href;   	
			if(url.indexOf("index") > -1){
				 loadtestimonials();
			}
		}
		function loadtestimonials(userid){
			var postString = "category=1";
				 $.ajax({
							url:'http://localhost/tend_services/testimonials.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var testimonials =JSON.parse(data);
								if ( testimonials  == undefined)
									return;
								if ( testimonials.length>0)
								{
									stopTimer();
									refreshDisplay(testimonials);
									if ( testimonials.length >1)
										startTimer();
								}
							}	
						}
					);
		}		

		function refreshDisplay(testimonials)
		{
			$("#div-testimonials").html("");
			var htmlDataString="<h2 class=\"h2-feature\" style=\"margin:0; color: black;\"> Testimonials </h2>";
			for(var nIndex=0;nIndex < testimonials.length;nIndex++)
			{
				var htmlTestimonial = getHTML(nIndex,testimonials[nIndex]);	
				htmlDataString = htmlDataString + htmlTestimonial;
			}
			$("#div-testimonials").html(htmlDataString);
		}
		function getHTML(nIndex,testimonial)
		{
			nIndex++;
			var userName="";
			var profilePic="images/profile.png";
			if ( testimonial.isMember ==1)
			{
				if ( testimonial.User_ID!=undefined)
				{
					var firstName = testimonial.First_Name;
					var lastName = testimonial.Last_Name;					
					userName=" "+firstName+" "+lastName;
					profilePic = testimonial.profile_picture;
				}
			}
			var testimonialstring = testimonial.testimonial_text+ userName;
			var htmlTestimonial = "\<div class=\"reviews\" id=\"review"+nIndex+"\">";
			htmlTestimonial = htmlTestimonial +"<div class=\"align-left\">";
			htmlTestimonial = htmlTestimonial +"<img src=\""+profilePic+"\">";
			htmlTestimonial = htmlTestimonial +"</div>";
			htmlTestimonial = htmlTestimonial +"<div class=\"align-right\">";
			htmlTestimonial = htmlTestimonial +"<p>"+testimonialstring+"</p>";
			htmlTestimonial = htmlTestimonial +"<a class=\"start-here write-testimonial\" href=\"testimonial.html\" >Share your experience</a>";
			htmlTestimonial = htmlTestimonial +"</div>";
			htmlTestimonial = htmlTestimonial +"</div>";	
			
			console.log(htmlTestimonial);
			return htmlTestimonial;
		}
		function startTimer()
		{
			$(".div-testimonials > div.reviews:gt(0)").hide();

			varInterval = setInterval(function() { 
			  $('.div-testimonials > div.reviews:first')
			    .fadeOut(1000)
			    .next()
			    .fadeIn(1000)
			    .end()
			    .appendTo('.div-testimonials');
			 },  3000);
		}
		function stopTimer()
		{
			clearInterval(varInterval);
		}
		function validateMemberName(params,contactTable)
		{
			var selection;
			if ( contactTable == false)
				selection = $('input[name=member]:checked', '#testimonial').val();
			else
				selection = $('input[name=member]:checked', '#contact').val();
			if ( selection=="yes")
			{			
				var paramNameCheck=params;
				paramNameCheck+="&category=2";
				$.ajax({
					url:'http://localhost/tend_services/testimonials.php',
					type:"POST",
					data:paramNameCheck,
					success:function(data)
					{
						var result =JSON.parse(data);
						if ( result > 0)
						{	
							if ( contactTable == false)
								updateTestimonials(params);
							else
								updateContactUs(params);
						}
						else
						{
							alert("Username is not valid for the existing member, please correct the field of user name to match with your login e-mail address.");
						}
							
					}	
				}
				);
			}
			else
			{
				if ( contactTable == false)
					updateTestimonials(params);
				else
					updateContactUs(params);
			}
		}
		function updateTestimonials(params)
		{
			console.log(params);
			params += "&category=3";
				 $.ajax({
							url:'http://localhost/tend_services/testimonials.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								window.location.href="index.html";
							}
				 });
		}
		function updateContactUs(params)
		{
			console.log(params);
			params += "&category=4";
				 $.ajax({
							url:'http://localhost/tend_services/testimonials.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								alert("Thank you for submitting the request, the message is sent to the @tend team.");
								window.location.href="index.html";
							}
				 });
		}
		function updateFeedback(params)
		{
			var userId=sessionStorage.getItem("User_ID")			
			params += "&category=5+&User_ID="+userId;
			console.log(params);
				 $.ajax({
							url:'http://localhost/tend_services/testimonials.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								alert("Thank you for submitting the request, the message is sent to the @tend team.");
							}
				 });
		}
		$("#contact").submit(function(event){
			event.preventDefault();
			var params = $("form").serialize();	
			validateMemberName(params,true);
		});
		$("#testimonial").submit(function(event){
			event.preventDefault();
			var params = $("form").serialize();	
			validateMemberName(params,false);
		});
		$("#qFormForCareGiver").submit(function(event){
			event.preventDefault();
			var params = $("form").serialize();	
			updateFeedback(params);
		});
		$("#qFormForUser").submit(function(event){
			event.preventDefault();
			var params = $("form").serialize();	
			updateFeedback(params);
		});
		
});