var days='';
var dataset;
function name_search(data,val)
{
	
	var html="<ul class='resultul'>";
	for(var i=0;i<data.length;i++)
	{
		if((data[i].First_Name.toLowerCase().indexOf(val.toLowerCase())>-1) || (data[i].Last_Name.toLowerCase().indexOf(val.toLowerCase())>-1))
		{
			html+="<li><ul class='resultul'>";
			html+="<li class='result-align-left'><h2 class='h2-result'>"+data[i].First_Name+" "+data[i].Last_Name+"</h2></li>";
			html+="<li class='result-align-left'><span><img src='"+data[i].profile_picture+"' onclick='viewcg("+data[i].User_ID+")' class='result-align-left profile-img'><p";
			html+=" class='result-align-right'> Dates:  "+data[i].start_date+" to "+data[i].end_date+"<br/>";
			html+="Days of the Week:  "+data[i].week_days+"<br/>Rate Per Hour: "+data[i].pay_rate+"</p></span> </li>";
			// html+="Days of the Week:  "+data[i].week_days+"<br/>Hours per day:  "+data[i].day_hrs+"</p></span> </li>";
			html+="<li class='result-align-left'><input type='button' value='Request' onclick='hire("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")' class='result-btn-class'>";
			html+="<input type='button'  value='View Reviews' onclick='loadReview("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")' class='result-btn-class'></li>";
			html+="</ul></li>";
		}
	}
	html+="</ul>";
	$("#search_display").html(html);
}
function loadReview(userID, caregiverID){
	loadReviewdata(caregiverID);
	
}

function loadReviewdata(caregiverid){
			var postString = "category=1&CaregiverId="+caregiverid;
			//alert(postString);
				 $.ajax({
							url:'http://localhost/tend_services/review.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var editProfileData =JSON.parse(data);
								localStorage.setItem("review_data",JSON.stringify(editProfileData));
								window.location.href="Userviewreview.html";
							}	
						}
					);
}
function hire(rid,cid)
{
	//alert(rid+","+cid);
	var hr=prompt("Please enter the hours")
	if(hr!=null)
	{
		if(days.length>1)
			var form_data="rid="+rid+"&cid="+cid+"&sd="+$("#sd").val()+"&ed="+$("#ed").val()+"&days="+days+"&hr="+hr+"&category=3";
		else
			for(var i=0;i<dataset.length;i++)
				if(dataset[i].User_ID==cid)
				{	
					var form_data="rid="+rid+"&cid="+cid+"&sd="+$("#sd").val()+"&ed="+$("#ed").val()+"&days="+dataset[i].week_days+"&hr="+hr+"&category=3";
					break;
				}
		//alert(form_data);
		$.ajax
		({
			url:'http://localhost/tend_services/search.php',
			type:'POST',
			data:form_data,
			success:function (data)
			{
				//alert(data);
				if(data==200)
				{
					alert("We have sent your request, awaiting caregiver approval");
					$("#user_landing").submit();
					
				}
			}
		}); 
	}
}
function viewcg(uid)
{
	var html="careGiverviewprofile.html?uid="+uid;
	window.location.href=html;
}


$(document).ready(function()
{	
	$("#cgname").keyup(function ()
	{
		//alert($(this).val());
		name_search(dataset,$(this).val())
	});
	init();
	function init()
	{
		
		var form_data="User_ID="+sessionStorage.getItem("User_ID")+"&category=1";
		$.ajax
		({
			url:'http://localhost/tend_services/search.php',
			type:'POST',
			data:form_data,
			datatype:JSON,
			success:function (data)
			{
				data=JSON.parse(data);
				sessionStorage.setItem("profile_pic",data[0].profile_picture);
				sessionStorage.setItem("name",data[0].First_Name);
				$("#profile_pic").attr("src",data[0].profile_picture);
				$("#name_span").html("Welcome "+data[0].First_Name);
				if(sessionStorage.getItem("search_data")!=null && sessionStorage.getItem("search_toa")!=null)
					populate(sessionStorage.getItem("search_data"),sessionStorage.getItem("search_toa"),0);
			}
		});
	}
	$('.menuopen').on('click', function(){
			     $(".content").addClass("visible");   
                // $(".content").addClass("changemargin");
                  
                  
			});
		
	$('.menuopen-inside').on('click', function(){
			     $(".content-user").addClass("visible");   
                // $(".content").addClass("changemargin");
                  
                  
			});


	$(".close-menu").on('click', function(){
                 
                 $(".content").removeClass("visible");     
                 $(".content-user").removeClass("visible");   
		});

	
	//var hrs=parseInt($("#hr").val());
	
	$(".toggle-advanced").on("click",function(e){
			e.preventDefault();
			$(".advance-search-data").toggleClass("visible");
			$(".toggle-advanced").toggleClass("toggle-advanced-img");
	});
	
	
	$("#user_landing").submit(function(event)
	{
		event.preventDefault();
		var st=$("#sd").val();
		var ed=$("#ed").val();
		if(st>ed)
		{
			alert("Start Date cannot be greater than end Date")
			return;
		}
		var toa='';
		if($("#Nurse").is(':checked'))
			toa+="Nurse,";
		if($("#Physiotherapy").is(':checked'))
			toa+="Physiotherapy,";
		if($("#Yoga").is(':checked'))
			toa+="Yoga,";
		if($("#Alternative_Medicine").is(':checked'))
			toa+="Alternative_Medicine,"
		if($("#Counselor").is(':checked'))
			toa+="Counselor,"
		if(toa.length>1)
		{
			toa=toa.substr(0,toa.length-1);
		}
		var form_data=$(this).serialize();
		form_data+="&toa="+toa+"&category=2&User_ID="+sessionStorage.getItem("User_ID");
		//alert(form_data);
		$.ajax
		({
			url:'http://localhost/tend_services/search.php',
			type:'POST',
			data:form_data,
			datatype:JSON,
			success:function (data)
			{
				
				if(sessionStorage.getItem("search_data")==null)
					sessionStorage.setItem("search_data",data);
				if(sessionStorage.getItem("search_toa")==null)
					sessionStorage.setItem("search_toa",toa);
				populate(data,toa,0);
				
			}
		});
	});
	$('#filter').on('click',function(){	
		filter(dataset);
	});

	function populate(data,toa,flag)
	{
		data=JSON.parse(data);
		var html="<ul class='resultul'>";
		if(toa.length<1)
		{
			for(var i=0;i<data.length;i++)
			{
				html+="<li><ul class='resultul'>";
				html+="<li class='result-align-left'><h2 class='h2-result'>"+data[i].First_Name+" "+data[i].Last_Name+"</h2></li>";
				html+="<li class='result-align-left'><span><img src='"+data[i].profile_picture+"' onclick='viewcg("+data[i].User_ID+")' class='result-align-left profile-img'><p";
				html+=" class='result-align-right'> Dates:  "+data[i].start_date+" to "+data[i].end_date+"<br/>";
				html+="Days of the Week:  "+data[i].week_days+"<br/>Rate Per Hour: "+data[i].pay_rate+"</p></span> </li>";
				// html+="Days of the Week:  "+data[i].week_days+"<br/>Hours per day:  "+data[i].day_hrs+"</p></span> </li>";
				html+="<li class='result-align-left'><input type='button' value='Request' onclick='hire("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")'class='result-btn-class'>";
				html+="<input type='button'  value='View Reviews' onclick='loadReview("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")' class='result-btn-class'></li>";
				html+="</ul></li>";
			}
		}
		else
		{
			if(toa.indexOf(",")>-1)
			{
				var toa_split=toa.split(",");
				for(var j=0;j<toa_split.length;j++)
				{
					for(var i=0;i<data.length;i++)
					{
						if((data[i].Expertise.indexOf(toa_split[j]))>-1)
						{
							html+="<li><ul class='resultul'>";
							html+="<li class='result-align-left'><h2 class='h2-result'>"+data[i].First_Name+" "+data[i].Last_Name+"</h2></li>";
							html+="<li class='result-align-left'><span><img src='"+data[i].profile_picture+"' class='result-align-left profile-img'><p";
							html+=" class='result-align-right'> Dates:  "+data[i].start_date+" to "+data[i].end_date+"<br/>";
							html+="Days of the Week:  "+data[i].week_days+"<br/>Rate Per Hour: "+data[i].pay_rate+"</p></span> </li>";
							//html+="Days of the Week:  "+data[i].week_days+"<br/>Hours per day:  "+data[i].day_hrs+"</p></span> </li>";
							html+="<li class='result-align-left'><input type='button' value='Request' onclick='hire("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")'class='result-btn-class'>";
							html+="<input type='button'  value='View Reviews' onclick='loadReview("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")' class='result-btn-class'></li>";
							html+="</ul></li>";
							data.splice(i,1);
							i--;
						}
					}
				}
			}
			else
			{
				for(var i=0;i<data.length;i++)
				{
					if((data[i].Expertise.indexOf(toa))>-1)
					{
						html+="<li><ul class='resultul'>";
						html+="<li class='result-align-left'><h2 class='h2-result'>"+data[i].First_Name+" "+data[i].Last_Name+"</h2></li>";
						html+="<li class='result-align-left'><span><img src='"+data[i].profile_picture+"' class='result-align-left profile-img'><p";
						html+=" class='result-align-right'> Dates:  "+data[i].start_date+" to "+data[i].end_date+"<br/>";
						html+="Days of the Week:  "+data[i].week_days+"<br/>Rate Per Hour: "+data[i].pay_rate+"</p></span> </li>";
						//html+="Days of the Week:  "+data[i].week_days+"<br/>Hours per day:  "+data[i].day_hrs+"</p></span> </li>";
						html+="<li class='result-align-left'><input type='button' value='Request' onclick='hire("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")' class='result-btn-class'>";
						html+="<input type='button'  value='View Reviews' onclick='loadReview("+sessionStorage.getItem('User_ID')+","+data[i].User_ID+")' class='result-btn-class'></li>";
						html+="</ul></li>";
					}
				}
			
			}
		}
		html+="</ul>";
		$("#search_display").html(html);
		if(parseInt(flag)==0)
		{
			dataset=data;
		}
		//alert(dataset);
	}
	function hire(rid,cid)
	{
		//alert(uid,cid);
	}
	function filter(dataset)
	{
		var range=parseInt($("#range").val());
		days='';
		if($("#mon").is(':checked'))
			days+="mon,";
		if($("#tue").is(':checked'))
			days+="tue,";
		if($("#wed").is(':checked'))
			days+="wed,";
		if($("#thu").is(':checked'))
			days+="thu,";
		if($("#fri").is(':checked'))
			days+="fri,";
		if($("#sat").is(':checked'))
			days+="sat,";
		if($("#sun").is(':checked'))
			days+="sun,";	
		var data=JSON.parse(JSON.stringify(dataset));
		//alert(range);
		for(var i=0;i<data.length;i++)
		{
			if(data[i].pay_rate>range)
			{
				data.splice(i,1);
				i--;
			}
		}
		/* for(var i=0;i<data.length;i++)
		{
			if(data[i].day_hrs>=hrs)
			{
				data.splice(i,1);
				i--;
			}
		} */
		if(days.length>1)
		{
			days=days.substr(0,days.length-1);
			var dayArray=days.split(",");
			for(var i=0;i<data.length;i++)
			{
				var cnt=0;
				for(var j=0;j<dayArray.length;j++)
				{
					if((data[i].week_days.indexOf(dayArray[j].toLowerCase()))==-1)
					{
						cnt++;
					}
				}
				if(cnt==dayArray.length)
				{
					data.splice(i,1);
					i--;
				}
			}
		}
		populate(data,'',1);
	}
	
	
	$("#sign_out").on("click",function ()
	 {
		sessionStorage.setItem("User_ID",null);
		sessionStorage.setItem("isCaregiver",null);
		sessionStorage.setItem("profile_pic",null);
		sessionStorage.setItem("name",null);
	});
	
	
	
	
	
	
	
});