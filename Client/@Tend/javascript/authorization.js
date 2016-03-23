$(document).ready(function()
{	

	if(sessionStorage.getItem("User_ID")==null)
	{
		//alert("Please Log in first");
		window.location.href="login.html";
	}
	
});