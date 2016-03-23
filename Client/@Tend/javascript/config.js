$(document).ready(function(){

 	 $("#profile_pic").attr("src",sessionStorage.getItem("profile_pic"));
	 $("#name_span").html("Welcome "+sessionStorage.getItem("name"));
	 $("#sign_out").on("click",function ()
	 {
		sessionStorage.setItem("User_ID",null);
		sessionStorage.setItem("isCaregiver",null);
		sessionStorage.setItem("profile_pic",null);
		sessionStorage.setItem("name",null);
		sessionStorage.clear();
	});

});