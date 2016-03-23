
function init(uid)
{
	var form_data="uid="+uid+"&category=1";
	$.ajax
	({
		url:'http://localhost/tend_services/cargiver_landing.php',
		type:'POST',
		data:form_data,
		datatype:JSON,
		success:function (data)
		{
			if ( data.length >2)
			{
				populate(JSON.parse(data));
			}
			else{
				var htmlString="<h4 class=\"register-heading\" style=\"left:25%;\"> You don't have any pending requests.</h4> <br/>";
				$("#populus").html(htmlString);
			}
		}
	}); 


}

function init_image(userid){
	var form_data="uid="+userid+"&category=4";
	$.ajax
	({
		url:'http://localhost/tend_services/cargiver_landing.php',
		type:'POST',
		data:form_data,
		datatype:JSON,
		success:function (data)
		{
			if ( data.length >2)
			{
				var profiledata=JSON.parse(data);
				sessionStorage.setItem("profile_pic",profiledata[0].profile_picture);
				sessionStorage.setItem("name",profiledata[0].First_Name);
				$("#profile_pic").attr("src",profiledata[0].profile_picture);
				$("#name_span").html("Welcome "+profiledata[0].First_Name);
			}
			
		}
	}); 
}
function populate(data)
{
	var html="<ul class='resultul'>";
	for(var i=0;i<data.length;i++)
	{
		html+="<li><ul class='resultul'>";
		html+="<li class='result-align-left'><h2 class='h2-result'>"+data[i].First_Name+ " "+data[i].Last_Name+"</h2></li>";
		html+="<li class='result-align-left'><span><img src='"+data[i].profile_picture+"' class='result-align-left profile-img'><p class='result-align-right'>Hey there I am looking for your services from "+data[i].start_date+" to "+data[i].end_date+".<br/> My days requirement is : "+data[i].days+".<br/> My Houly need is "+data[i].hours_per_day+".<br/></p></span> </li>";
		html+="<li class='result-align-left'><input type='button' value='Accept' onclick='approve("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")' class='result-btn-class'><input type='button' value='Decline' onclick='decline("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")'class='result-btn-class'></li></ul></li>";
	}
	html+="</ul>";
	
	$("#populus").html(html);
	
}

function approve(cid,rid)
{
	var form_data="cid="+cid+"&rid="+rid+"&category=2";
	$.ajax
	({
		url:'http://localhost/tend_services/cargiver_landing.php',
		type:'POST',
		data:form_data,
		datatype:JSON,
		success:function (data)
		{
			if(data==200)
				init(sessionStorage.getItem("User_ID"));
		}
	}); 
}

function decline(cid,rid)
{
	var form_data="cid="+cid+"&rid="+rid+"&category=3";
	$.ajax
	({
		url:'http://localhost/tend_services/cargiver_landing.php',
		type:'POST',
		data:form_data,
		datatype:JSON,
		success:function (data)
		{
			if(data==200)
				init(sessionStorage.getItem("User_ID"));
		}
	}); 
}

$(document).ready(function()
{
	init_image(sessionStorage.getItem("User_ID"));
	init(sessionStorage.getItem("User_ID"));
	//init(sessionStorage.User_Id);
});



