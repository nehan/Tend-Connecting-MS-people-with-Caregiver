var maxItemsInPage=3;
var pageIdPaginationPrefix="page_";

function onClickPageNumber(pageNumber)
{
	var dataMemberArrayFromJSON = JSON.parse(localStorage.getItem('adminMemberProfiles'));
	var pageNumberCurrent = JSON.parse(localStorage.getItem('adminMemberProfilesCurrentPage'));
	var idOldPage="#"+pageIdPaginationPrefix+pageNumberCurrent;
		
	$(idOldPage).removeClass("current");
	var idNewPage="#"+pageIdPaginationPrefix+pageNumber;
	$(idNewPage).addClass("current");	
	
	if ( pageNumber ==1 )
	{
		var startIndex=0;
		var endIndex=1;
		if ( dataMemberArrayFromJSON.length < maxItemsInPage  )
		{
			endIndex = dataMemberArrayFromJSON.length-1;
			startIndex=0;
		}
		else
			endIndex = maxItemsInPage-1;
		
		refreshDisplay(startIndex,endIndex,dataMemberArrayFromJSON);	
	}
	else
	{
		var prevPageNumber = pageNumber-1;	
		var startIndex = (prevPageNumber * maxItemsInPage) ;
		var endIndex = pageNumber * maxItemsInPage-1;
		if ( endIndex >= dataMemberArrayFromJSON.length)
		{
			endIndex=dataMemberArrayFromJSON.length-1;
		}
		if ( startIndex < dataMemberArrayFromJSON.length && endIndex < dataMemberArrayFromJSON.length)
		{			
			refreshDisplay(startIndex,endIndex,dataMemberArrayFromJSON);
		}
	}
	localStorage.setItem('adminMemberProfilesCurrentPage', JSON.stringify(pageNumber));
}
function onClickPageNames(pageName)
{
	if (pageName=='First')
	{
		onClickPageNumber(1);
	}
	else if (pageName=='Previous')
	{
		var pageNumberCurrent = JSON.parse(localStorage.getItem('adminMemberProfilesCurrentPage'));
		if ( pageNumberCurrent ==1)
			return;
		
		var pagePrevNumber = pageNumberCurrent-1;
		onClickPageNumber(pagePrevNumber);		
	}
	else if (pageName=='Next')
	{
		var pageNumberCurrent = JSON.parse(localStorage.getItem('adminMemberProfilesCurrentPage'));
		var pageNumberTotal = JSON.parse(localStorage.getItem('adminMemberProfilesTotalPage'));
		
		if ( pageNumberCurrent ==pageNumberTotal)
			return;
		var pageNextNumber = pageNumberCurrent+1;
		onClickPageNumber(pageNextNumber);
	}
	else if(pageName=='Last')
	{
		var pageNumberTotal = JSON.parse(localStorage.getItem('adminMemberProfilesTotalPage'));

		onClickPageNumber(pageNumberTotal);
	}
}
function refreshDisplay(startIndex,endIndex,dataCareGiverArray)
{
	$("#sysAdminMemberBody").html("");		
	
	for(var nIndex=startIndex;nIndex<=endIndex;nIndex++)
	{
		var firstName = dataCareGiverArray[nIndex].First_Name;		
		var lastName = dataCareGiverArray[nIndex].Last_Name;		
		var imageProfileName = dataCareGiverArray[nIndex].profile_picture;
		var name=firstName+ " " +lastName;
		var status="Active";//TODO Currently hard coded, need to be retrieved from JSON
		var memberSince=dataCareGiverArray[nIndex].member_since;
		
		var lastLogin=dataCareGiverArray[nIndex].last_login;
		var flag=dataCareGiverArray[nIndex].Flag;
		var role="Caregiver";
		if ( flag ==0)
			role="User";
		var memberDateString = dateFormat(memberSince);
		var lastLoginDateString="Never Logged in So far"
		var status="InActive";
		if ( lastLogin != null)
		{
			var lastLoginDateString=dateFormatWithTimeStamp(lastLogin);
			var status= isActive(lastLogin);
			if ( status == true)
				status="Active";
			else
				status="InActive";
		}
		
		var vHTML = getRowHTML(imageProfileName,name,role,status,memberDateString,lastLoginDateString);
		addSysAdminTableData(vHTML);
	}			
}
function getRowHTML(imageProfileName,name,role,status,memberSince,lastLogin)
{
	var tableRowHTML = "<tr id=>\
						 <td class=\"TableColProfile\" > <img src="+imageProfileName+" height=\"65px\" width=\"65px\" class=\"img-admin\"></td>\
						<td class=\"TableColName\">"+name+"</td>\
						<td class=\"TableColRole\">"+role+"</td>\
						<td class=\"TableColRole\">"+status+"</td>\
						<td class=\"TableColGeneral tableResumeDownload\">"+ memberSince+"</td>\
						<td class=\"TableColGeneral tableResumeDownload\">"+ lastLogin+"</td>\
					</tr>";
	
	return tableRowHTML;
}
function addSysAdminTableData(tableRowHTML)
{		
	$("#sysAdminMemberBody").append(tableRowHTML);		
}
function dateFormat(datetimeStamp)
{
	//Split timestamp into [ Y, M, D, h, m, s ]
	
	var t=datetimeStamp.split(/[- :]/);
	
	//var t = "2010-06-09 13:12:01".split(/[- :]/);
	// Apply each element to the Date function
	//// -> Wed Jun 09 2010 13:12:01 GMT+0100 (GMT Daylight Time)
	var d = new Date(t[0], t[1]-1, t[2]);
	var dateString=t[1]+'/'+t[2]+'/'+t[0];
	return dateString;
}
function dateFormatWithTimeStamp(datetimeStamp)
{
	//Split timestamp into [ Y, M, D, h, m, s ]
	if ( datetimeStamp != null)
	{
		var t=datetimeStamp.split(/[- :]/);
		var d = new Date(t[0], t[1]-1, t[2],t[3],t[4],t[5]);		
		return d.toLocaleString();
	}
	else
		return "Never Loggedin so far.";
}
function isActive(datetimeStamp)
{
	console.log(datetimeStamp);
	if ( datetimeStamp!=null)
	{
		var t=datetimeStamp.split(/[- :]/);
		var d = new Date(t[0], t[1]-1, t[2],t[3],t[4],t[5]);
		var today=new Date();
		
		var one_day=1000*60*60*24;

		// Convert both dates to milliseconds
		var date1_ms = d.getTime();
		var date2_ms = today.getTime();

		var difference_ms = date2_ms - date1_ms;
			
		  // Convert back to days and return
		var diff =  Math.round(difference_ms/one_day); 
		if ( diff > 30)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}
$(document).ready(function(){

	var screenwidth=$(window).width();
    var screenheight=$(window).height();
    $("div.later-page").height(screenheight+'px');

	
	populateSysAdminMembersList();
	var startIndex = 0;
	var endIndex = 0;
	
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
	function populateSysAdminMembersList()
	{
		console.log("Populating Table");
		 var sent_data = "category=3";
		 $.ajax({
					url: 'http://localhost/tend_services/admin_home.php',
					type:"POST",
					data:sent_data,
					success:function(data)
					{
						var dataCareGiverArray =JSON.parse(data);
						
						localStorage.setItem('adminMemberProfiles', JSON.stringify(dataCareGiverArray));								
						if ( dataCareGiverArray.length <=0)
							return;	
						console.log(dataCareGiverArray);
						if ( dataCareGiverArray.length < maxItemsInPage  )
						{
							endIndex = dataCareGiverArray.length-1;
							startIndex=0;
						}
						else
							endIndex = maxItemsInPage-1;
						addFooterTable(dataCareGiverArray.length);
						refreshDisplay(startIndex,endIndex,dataCareGiverArray);					
										
					}	
				}
			);
	}	
	function addFooterTable(dataLength)
	{
		$(".pagination").html("");
		if ( dataLength < maxItemsInPage )
		{
			return;
		}
		var nPages = Math.ceil(dataLength/maxItemsInPage);
		
		var html="<a href=\"#\" onClick=\"onClickPageNames('First')\" title=\"First Page\">« First</a>";
		html+="<a href=\"#\" onClick=\"onClickPageNames('Previous')\" title=\"Previous Page\">« Previous</a>";
		var firstPageId;
		for(var nIndex=0;nIndex<nPages;nIndex++)
		{			
			if ( nIndex == 0)
			{
				var nPgNo=nIndex+1;
				var idPage=pageIdPaginationPrefix+nPgNo;
				firstPageId = idPage;
				html = html + "<a id =\""+idPage+"\" href=\"#\" onClick=\"onClickPageNumber("+nPgNo+")\" class=\"number current \" title=\""+ nPgNo+"\">"+nPgNo+"</a>";
				
			}
			else
			{
				var nPgNo=nIndex+1;
				var idPage=pageIdPaginationPrefix+nPgNo;
				html = html + "<a id =\""+idPage+"\" href=\"#\" onClick=\"onClickPageNumber("+nPgNo+")\" class=\"number \" title=\""+ nPgNo+"\">"+nPgNo+"</a>";
			}
		}		
		html=html+"<a href=\"#\" onClick=\"onClickPageNames('Next')\" title=\"Next Page\">Next »</a><a href=\"#\" onClick=\"onClickPageNames('Last')\" title=\"Last Page\">Last \»</a>";

		$(".pagination").html(html);	
		
		localStorage.setItem('adminMemberProfilesCurrentPage', JSON.stringify(1));		
		localStorage.setItem('adminMemberProfilesTotalPage', JSON.stringify(nPages));		
	}
});


