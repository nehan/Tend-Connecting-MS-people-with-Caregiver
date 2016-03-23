var contactUsPageData;
function showMesaage(id)
{
	console.log(id);
	console.log(contactUsPageData.length);
	if ( id < contactUsPageData.length)
	{		
		var text = contactUsPageData[id].Contact_Text;
		console.log(text);
		$("#mailBody").html("");
		var htmlString="<h2 style='text-align:center;'> Message Content </h2><p style='margin-left:20px;'>"+text+"</p>";
		$("#mailBody").html(htmlString);
	}
}
function populateDisplayData()
{
	console.log("Populating Table");
	 var sent_data = "category=6";
	 $.ajax({
				url:'http://localhost/tend_services/testimonials.php',
				type:"POST",
				data:sent_data,
				success:function(data)
				{
					contactUsPageData =JSON.parse(data);					
					console.log(contactUsPageData);
					if ( contactUsPageData.length>0)
						refreshDisplay(contactUsPageData);
				}	
			}
		);
}
function refreshDisplay(pageData)
{
	$("#inboxBody").html("");
	$("#mailBody").html("");
	for(var nIndex=0;nIndex<pageData.length;nIndex++)
	{
		var name = pageData[nIndex].Name;
		var typeofQuery = pageData[nIndex].Type_Of_Query;
		var isUser = pageData[nIndex].isUser;
		var vHTML = getRowHTML(nIndex,name,typeofQuery,isUser);		
		addDisplayData(vHTML);
	}
}
function getRowHTML(nIndex,name,typeofQuery,isUser)
{
	var queryString ="";
	
	if ( typeofQuery == 0)
		queryString="Query";
	if ( typeofQuery == 1)
		queryString="Complaint";
	if ( typeofQuery == 2)
		queryString="Feedback";
	if ( typeofQuery == 3)
		queryString="Other";

	var memberStr="No";
	if ( isUser==1)
		memberStr="Yes";
	var htmlString="<tr>";
	var idButton="showMessageButton_"+nIndex;
	htmlString= htmlString + "<td class=\"TableColName\" style=\"text-align:left; padding-left: 10px;\">"+name+"</td>";
	htmlString= htmlString + "<td class=\"TableColSkills\">"+queryString+"</td>";
	htmlString= htmlString + "<td class=\"TableColRole\">"+memberStr+"</td>";
	htmlString= htmlString + "<td class=\"TableColAction showMessageButton\" >";
	htmlString= htmlString + "<type=\"button\" 	id=\""+idButton+"\"	onClick=\"showMesaage("+nIndex+");\"title=\"showMessage\" ><img src=\"images/mail.jpg\" height=\"30px\" width=\"30px\" alt=\"Show Mail\">";
	htmlString= htmlString + "</td>";
	htmlString= htmlString + "</tr>";
	
	return htmlString;
}
function addDisplayData(vHTML)
{
	$("#inboxBody").append(vHTML);
}
$(document).ready(function(){
	
	
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
	populateDisplayData();
});


