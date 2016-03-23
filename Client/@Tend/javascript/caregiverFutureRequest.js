
function deleteRequest(userId,caregiverid)
{
	console.log("deleteRequest");
	var postString = "category=3&UserId="+userId+"&caregiverid="+caregiverid;
	$.ajax({
				url:'http://localhost/tend_services/userCareGiverEngagements.php',
				type:"POST",
				data:postString,
				success:function(data)
				{
					populateUserCurrentRequests(userId);
				}	
			}
		);		
}
function populateUserCurrentRequests(userId)
{
	console.log("Populating populateUserCurrentRequests Profile");
	 var postString = "category=2&UserId="+userId+"&approveStatus=0";
	 $.ajax({
				url:'http://localhost/tend_services/userCareGiverEngagements.php',
				type:"POST",
				data:postString,
				success:function(data)
				{
					$("#careFutReq").html("");
					console.log(data.length );
					if ( data.length <= 0)							
						return;
					var viewProfileData =JSON.parse(data);	
					console.log(viewProfileData);
					
					console.log(viewProfileData.length);
					for(var nIndex=0;nIndex<viewProfileData.length;nIndex++)
					{
						refreshDisplay(viewProfileData[nIndex]);
					}
				}	
			}
		);
}
function refreshDisplay(viewData)
{	
	var dateInRange = isDateCurrentServingRange(viewData.start_date,viewData.end_date)
	if (dateInRange == false)
	{
		console.log("data is not within the current time range");
		return;
	}
	var htmlString="<li style=\"width:120px;left:10px;\">";
		htmlString = htmlString+ "<label class=\"lblemergency lighter\">"+viewData.First_Name+" "+viewData.Last_Name+"</label>";
	htmlString = htmlString+"</li>";
			
	var dateStart = dateFormat(viewData.start_date);
	var dateEnd = dateFormat(viewData.end_date);
	
	htmlString = htmlString+"<li style=\"width: 108px;\">";
	htmlString = htmlString+"<label class=\"lblemergency lighter\">"+dateStart+"</label>";
	htmlString=htmlString+"</li>";

	htmlString=htmlString+ "<li style=\"width: 100px;\">";
	htmlString=htmlString+ "<label class=\"lblemergency lighter\">"+dateEnd+"</label>";
	htmlString=htmlString+ "</li>";

	htmlString=htmlString+ "<li style=\"width:69px;\">";
	htmlString=htmlString+ "<label class=\"lblemergency lighter\">"+viewData.days+"</label>";
	htmlString=htmlString+ "</li>";
	htmlString=htmlString+ "<li>";
	htmlString=htmlString+ "<label class=\"lblemergency lighter\">"+viewData.hours_per_day+"</label>";
	htmlString=htmlString+ "</li>";
	htmlString=htmlString+ "<li style=\"width: 37px;\">";

	htmlString=htmlString+ "<a href=\"#\" class=\"cancelJob\"><img src=\"images/cancel.png\" class=\"cancel-icon-user\" onClick=\"deleteRequest("+viewData.requester_ID+","+viewData.caregiver_ID+")\"></a>";
	
	htmlString=htmlString+ "</li>";
	$("#careFutReq").append(htmlString);
}
function isDateCurrentServingRange(startDate,endDate)	
{
	var tStart=startDate.split(/[- :]/);
	
	var dStartDate = new Date(tStart[0], tStart[1]-1, tStart[2]);
	console.log("startdate"+dStartDate);
	var tEndDate=endDate.split(/[- :]/);
	
	var dEndDate = new Date(tEndDate[0], tEndDate[1]-1, tEndDate[2]);
	console.log("enddate"+dEndDate);
	
	var dateToday=new Date();
	console.log("dateToday"+dateToday);
	
	if ( dateToday < dEndDate && dateToday <dStartDate)
		return true;
	else
		return false;
}
function dateFormat(datetimeStamp)
{	
	var t=datetimeStamp.split(/[- :]/);
	console.log(t);		
	var d = new Date(t[0], t[1]-1, t[2]);
	var dateString=t[1]+'/'+t[2]+'/'+t[0];
	return dateString;
}
$(document).ready(function(){	
//extract from sessionn here and pass below

	populateUserCurrentRequests(sessionStorage.getItem("User_ID"));	
	
});


