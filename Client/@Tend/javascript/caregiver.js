$( document ).ready(function() {
	
	$( "#cg_exp_edit" ).submit(function( event ) {
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
			alert("Please select a Profession");
			$("#pro").css("color","red");
			$("#pro").text("*Profession/Skill");
			event.preventDefault();
		}
		else
		{
			alert("Changes Saved")
			event.preventDefault();
		}
	});
	
	$("#editavail").submit(function(event){
		var i=0;
		var week_days="";
		if($("#mon").is(':checked')){
			i++;
			week_days+="mon";
		}	
		if($("#tue").is(':checked')){
			i++;
			week_days+="tue";
		}
		if($("#wed").is(':checked')){
			i++;
			week_days+="wed";
		}	
		if($("#thu").is(':checked')){
			i++;
			week_days+="thu";
		}	
		if($("#fri").is(':checked')){
			i++;
			week_days+="fri";
		}	
		if($("#sat").is(':checked')){
			i++;
			week_days+="sat";
		}
		if($("#sun").is(':checked')){
			i++;
			week_days+="sun";
		}	
		if(i==0)
		{
			alert("Please select Days");
			$("#tar").css("color","red");
			$("#tar").text("*Days Of The Week")
			event.preventDefault();
		}
		else
		{
		
			//window.location.href = "caregiverreg4.html";
			alert("Availability saved")
			event.preventDefault();
		}
	});
	
	$("#cg_bank").submit(function(event){alert("Changes Saved");event.preventDefault();});
	$("#caregiver_contact").submit(function(event){alert("Changes Saved");event.preventDefault();});
	$("#cg_per_edit").submit(function(event){alert("Changes Saved");event.preventDefault();});
});