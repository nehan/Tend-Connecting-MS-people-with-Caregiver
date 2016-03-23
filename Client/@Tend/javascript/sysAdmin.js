var maxItemsInPage=3;
var userIdList;
var pageIdPaginationPrefix="page_";

function approveCareGiver(userId)
{
	var sent_data="ids="+userId+"&operation=1&category=2";
	// sent_data="ids=1,2&operation=1&category=2";
	console.log("approveCareGiver"+sent_data);
	$.ajax({
				url:'http://localhost/tend_services/admin_home.php',
				type:'POST',
				data:sent_data,
				success:function (data){
				if(data==200)
				{
					console.log("successful transaction");
					populateSysAdminManageProfile();
				}
				else
				{
					console.log("Failed transaction for approving it.");
					alert("Failed transaction for approving it.");
				}
			}
		}
	);
}
function rejectCareGiver(userId)
{
	var sent_data="ids="+userId+"&operation=0&category=2";
	// sent_data="ids=1,2&operation=0&category=2";
	console.log("rejectCareGiver" + sent_data);
	$.ajax({
				url:'http://localhost/tend_services/admin_home.php',
				type:'POST',
				data:sent_data,
				datatype:JSON,
				success:function (data){
				if(data==200)
				{
					console.log("successful transaction");
					populateSysAdminManageProfile();
				}
				else
				{
					console.log("Failed transaction for rejecting it.");
					alert("Rejection of Caregiver Profile Failed.");
				}
			}
		}
	);
}
function onClickPageNumber(pageNumber)
{
	var dataCareGiverArrayFromJSON = JSON.parse(localStorage.getItem('adminCareGiverProfiles'));
	var pageNumberCurrent = JSON.parse(localStorage.getItem('adminCareGiverProfilesCurrentPage'));
	var idOldPage="#"+pageIdPaginationPrefix+pageNumberCurrent;
	console.log("idOldPage:",idOldPage);
		
	$(idOldPage).removeClass("current");
	var idNewPage="#"+pageIdPaginationPrefix+pageNumber;
	console.log("newPAgeId:",idNewPage);
	$(idNewPage).addClass("current");	
		
	if ( pageNumber ==1 )
	{			
		var startIndex=0;
		var endIndex=1;
		if ( dataCareGiverArrayFromJSON.length < maxItemsInPage  )
		{
			endIndex = dataCareGiverArrayFromJSON.length-1;
			startIndex=0;
		}
		else
			endIndex = maxItemsInPage-1;
		
		refreshDisplay(startIndex,endIndex,dataCareGiverArrayFromJSON);		
	}
	else
	{
		var prevPageNumber = pageNumber-1;	
		var startIndex = (prevPageNumber * maxItemsInPage) ;
		var endIndex = pageNumber * maxItemsInPage-1;
		if ( endIndex >= dataCareGiverArrayFromJSON.length)
		{
			endIndex=dataCareGiverArrayFromJSON.length-1;
		}
		if ( startIndex < dataCareGiverArrayFromJSON.length && endIndex < dataCareGiverArrayFromJSON.length)
		{								
			refreshDisplay(startIndex,endIndex,dataCareGiverArrayFromJSON);
		}
	}
	localStorage.setItem('adminCareGiverProfilesCurrentPage', JSON.stringify(pageNumber));
}
function onClickPageNames(pageName)
{
	if (pageName=='First')
	{
		onClickPageNumber(1);
	}
	else if (pageName=='Previous')
	{
		var pageNumberCurrent = JSON.parse(localStorage.getItem('adminCareGiverProfilesCurrentPage'));
		if ( pageNumberCurrent ==1)
			return;
		
		var pagePrevNumber = pageNumberCurrent-1;
		onClickPageNumber(pagePrevNumber);		
	}
	else if (pageName=='Next')
	{
		var pageNumberCurrent = JSON.parse(localStorage.getItem('adminCareGiverProfilesCurrentPage'));
		var pageNumberTotal = JSON.parse(localStorage.getItem('adminCareGiverProfilesTotalPage'));
		
		if ( pageNumberCurrent ==pageNumberTotal)
			return;
		var pageNextNumber = pageNumberCurrent+1;
		onClickPageNumber(pageNextNumber);
	}
	else if(pageName=='Last')
	{
		var pageNumberTotal = JSON.parse(localStorage.getItem('adminCareGiverProfilesTotalPage'));

		onClickPageNumber(pageNumberTotal);
	}
}
function refreshDisplay(startIndex,endIndex,dataCareGiverArray)
{
	$("#sysAdminTableBody").html("");
		
	userIdList = new Array(endIndex-startIndex+1);
		
	// addFooterTable(dataCareGiverArray.length);
	for(var nIndex=startIndex;nIndex<=endIndex;nIndex++)
	{
		var firstName = dataCareGiverArray[nIndex].First_Name;
		var lastName = dataCareGiverArray[nIndex].Last_Name;
		var imageProfileName = dataCareGiverArray[nIndex].profile_picture;
		var skillsSet = dataCareGiverArray[nIndex].Expertise;
		var resumePath = dataCareGiverArray[nIndex].Resume_filepath;
		var userID = dataCareGiverArray[nIndex].User_ID;
		userIdList[nIndex] = userID;
		var name=firstName+ " " +lastName;
		var vHTML = getRowHTML(userID,imageProfileName,name,resumePath,skillsSet);		
		addSysAdminTableData(vHTML);
	}	
}
function getRowHTML(userID,imageProfileName,name,resumePath,skillsSet)
	{
		var approveId="approveButton_"+userID;
		var rejectId="rejectButton_"+userID;
		var checkBoxId="Check_"+userID;
		resumePath=encodeURI(resumePath);
	
				
		var tableRowHTML = "<tr id=>\
							 <td><input type=\"checkbox\" id="+checkBoxId+"></td>\
							 <td class=\"TableColProfile\" > <img src="+imageProfileName+" height=\"65px\" width=\"65px\" class=\"img-admin\"></td>\
							<td class=\"TableColName\">"+name+"</td>\
							<td class=\"TableColSkills\">"+skillsSet+"</td>\
							<td class=\"TableColGeneral tableResumeDownload\"><a href="+resumePath+" target=\"_blank\">Click to Download</a></td>\
							<td class=\"TableColAction actionCol\">\
								<ul>\
								<li >\
								 <type=\"button\" class=\"approveButton\" id="+approveId+" title=\"Approve\" onClick=\"approveCareGiver("+userID+")\" ><img src=\"images/greenTick.png\" height=\"20px\" width=\"20px\" alt=\"Approve\">\
								 </li>\
								 <li>\
								 <type=\"button\" class=\"rejectButton\" id = "+rejectId +" title=\"Reject\" onClick=\"rejectCareGiver("+userID+")\"><img src=\"images/wrong.jpg\" height=\"20px\" width=\"20px\" alt=\"Delete\"> \
								 </li>\
								 </ul>\
							</td>\
						</tr>";
		console.log("userId",userID);
		console.log("name",name);
		
		return tableRowHTML;
	}	
function addSysAdminTableData(tableRowHTML)
{		
	$("#sysAdminTableBody").append(tableRowHTML);		
}
function populateSysAdminManageProfile()
{
	var startIndex = 0;
	var endIndex = 0;
	console.log("Populating Table");
	 var sent_data = "category=1";
	 $.ajax({
				url:'http://localhost/tend_services/admin_home.php',
				type:"POST",
				data:sent_data,
				success:function(data)
				{
					var dataCareGiverArray =JSON.parse(data);
					
					localStorage.setItem('adminCareGiverProfiles', JSON.stringify(dataCareGiverArray));		
					//var Caregiver=JSON.parse(localStorage.getItem('isCaregiver'));
					
					$("#sysAdminTableBody").html("");
					if ( dataCareGiverArray.length <=0)
						return;
					
					userIdList = new Array(dataCareGiverArray.length);
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
			html = html + "<a id =\""+idPage+"\" href=\"#\" onClick=\"onClickPageNumber("+nPgNo+")\" class=\"number\" title=\""+ nPgNo+"\">"+nPgNo+"</a>";
		}
	}		
	html=html+"<a href=\"#\" onClick=\"onClickPageNames('Next')\" title=\"Next Page\">Next »</a><a href=\"#\" onClick=\"onClickPageNames('Last')\" title=\"Last Page\">Last \»</a>";		
	console.log(html);
	$(".pagination").html(html);	
	
	localStorage.setItem('adminCareGiverProfilesCurrentPage', JSON.stringify(1));		
	localStorage.setItem('adminCareGiverProfilesTotalPage', JSON.stringify(nPages));		
}


function sendAjaxRequestForSending(sendString)
{
	console.log("sendAjaxRequestForSending:"+sendString);
	$.ajax({
				url:'http://localhost/tend_services/admin_home.php',
				type:'POST',
				data:sendString,
				success:function (data){
				if(data==200)
				{
					console.log("successful transaction");
					populateSysAdminManageProfile();
				}
				else
				{
					console.log("Failed transaction for approving it.");
					alert("Failed transaction for approving it.");
				}
			}
		}
	);
}
$(document).ready(function(){
	var screenwidth=$(window).width();
    	var screenheight=$(window).height();
    	$("div.later-page").height(screenheight+'px');
$('#buttonApplySysAdminChoice').on('click', function(event){
	event.preventDefault();
	var valueSelection = $('#dropdownChoiceId').val();
	var ChooseString="Choose";
	var ApproveString="Approve";
	var RejectString="Reject";
	if ( valueSelection == ChooseString)		
	{			
		return;
	}		
	{			
		var operationString;
		if ( valueSelection == RejectString)
		{
			operationString = "&operation=0&category=2";
		}
		else if(valueSelection == ApproveString)
		{
			operationString = "&operation=1&category=2";
		}
		else
			return;
		// sent_data="ids=1,2&operation=1&category=2";
		
		var bFoundOneItem=false;
		var send_string="ids=";
		for(var index=0;index<userIdList.length;index++)
		{
			var checkBoxId="input"+"[id="+"Check_"+userIdList[index]+"]:checked";
				var valTest = $(checkBoxId).val();				
			if ( valTest == 'on')
			{
				if ( bFoundOneItem == false )
				{
					send_string+=userIdList[index];
					bFoundOneItem = true;
				}
				else
				{
					send_string+=","+userIdList[index];
				}
			}
		}
		if ( bFoundOneItem)
		{
			send_string+=operationString;
			sendAjaxRequestForSending(send_string);
		}
	}
});

		
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
	populateSysAdminManageProfile();
		
});


