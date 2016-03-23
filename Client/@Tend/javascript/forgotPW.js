var secQuestion;
var secAns;
var UserId;
var userName;

$(document).ready(function()
{
	function init(userName)
	{		
		var form_data="catergory=1"+"&u_name="+userName;
		console.log(form_data);
		$.ajax
		({
			url:'http://localhost/tend_services/forgotPW.php',
			type:'POST',
			data:form_data,			
			success:function (data)
			{
				data=JSON.parse(data);
				if ( data.length)
				{
					var randIndex = Math.floor((Math.random() * data.length) + 0); 
					secQuestion = data[randIndex].question;
					//alert(secQuestion);
					secAns = data[randIndex].answer;
					UserId = data[randIndex].User_ID;
					$("#forgot_q1").text(secQuestion);
				}
			}
		});
	}
	$('#resetPwQ').on('submit',function(e){
		userName = $("#username").val();
		init(userName);
		$("#usernameEmail").val(userName);
		$("#secQSection1").toggleClass("hide");
		$("#secQSection2").toggleClass("visible");
		e.preventDefault();
	});
	$('#forgotload').on('submit',function(e){
		
		console.log(secAns);
		var ansKey = $("#ansKey").val();
		//alert(ansKey);
		//alert("saved - "+secAns);
		if ( secAns===ansKey)
		{
			$("#secQSection2").toggleClass("visible");
			$("#secQSection3").toggleClass("visible");
		}
		else
		{
			alert("Answer key does not match");
		}
		e.preventDefault();				
	});
	$('#set_pass').on('submit',function(e){
		e.preventDefault();
		var id1=$("#pass").val();
		var id2=$("#cpass").val();
		if(id1!=id2)
		{
			$('#label_cpass').css("color","red");
			$('#label_cpass').text("*Confirm Password");
			e.preventDefault();
		}
		else
		{
			var id1=$("#pass").val();
			var form_data="catergory=2"+"&u_name="+userName+"&pass="+id1+"&UserId="+UserId;
			$.ajax
			({
				url:'http://localhost/tend_services/forgotPW.php',
				type:'POST',
				data:form_data,
				success:function (data)
				{
					//alert(data);
					if(parseInt(data)==304)
					{
						alert("Password could not be reset. Please retry.");
					}
					else
					{
						alert("Password changed successfully.");
						window.location.href="login.html";	
					}
				}
			});
		}		
	});			
	
});