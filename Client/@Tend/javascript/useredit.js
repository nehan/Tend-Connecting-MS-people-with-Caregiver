
$(document).ready(function(){

		var user_id=sessionStorage.getItem("User_ID");
		loadDataintoScreen(user_id);

		function loadDataintoScreen(userID){
			var url=window.location.href;   	
			if(url.indexOf("userEditPersonalDetails") > -1){
				 loadPersonalDetails(userID);
			}
			else if(url.indexOf("userEditContactDetails") > -1){

				loadContactDetails(userID);
			}
			else if(url.indexOf("userEditEmergencyContactDetails") > -1){
						loadEditEmergencyData(userID);
			}
			else if(url.indexOf("userEditPayment") > -1){
					loadPaymentInformation(userID);
			}
			else if(url.indexOf("userEditSubscription") > -1){

					loadSubscription(userID);
			}
		}


		function loadPersonalDetails(userid){
			var postString = "category=1&UserId="+userid;
				 $.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var editProfileData =JSON.parse(data);
								console.log(editProfileData[0]);
								refreshDisplay(editProfileData[0]);
							}	
						}
					);
		}
		function loadContactDetails(userid){
			var postString = "category=2&UserId="+userid;
				$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var editProfileData =JSON.parse(data);
								sessionStorage.setItem("contact_id",editProfileData[0].Contact_ID);
								console.log(editProfileData[0]);
								refreshContactDisplay(editProfileData[0]);
							}	
						}
					);
		}

		function loadPaymentInformation(userid){
			var postString = "category=11&UserId="+userid;
				$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var paymentData =JSON.parse(data);
								console.log(paymentData);
								localStorage.setItem("paymentInfo",JSON.stringify(paymentData));
								if(paymentData.length>0)
									refreshPaymentDisplay(paymentData);
								else
									loadNodataPaymentView();
							}	
						}
					);
		}


		function refreshPaymentDisplay(paymentData){
			$("div.dataforPayment").html("");
			for(var i=0;i<paymentData.length;i++){

				createRowforPayment(paymentData[i].Card_Type,paymentData[i].Card_Number,paymentData[i].Expiry_Date,paymentData[i].Card_ID);
			}
		}

		function loadNodataPaymentView(){
			var html="<p><h3 class=\"emergency-h3\" style=\"top: 130px;\"> No Card details found! Add here. </h3></p>";
			html+="<a href=\"#\" class=\"addEmergency\" style=\"left: 8px;\"><img src=\"images/add.png\" class=\"emergency-icon\" id=\"add\" style=\"top: 12px;margin-left: 340px;\"></a>"
			$(".dataforemergency").html(html);
			$("div.editUserInfoContainer").on("click", 'a', function(event){
				event.stopImmediatePropagation();
			    if(event.target.id.indexOf("add")>-1){
			    	    $(".addEmergency").addClass("hide");
						addPaymentInfo();
				}
				
			});
			$(".dataforPayment").html(html);
		}

		function maskCard(cardnumber){
			var maskedcard="****";
			maskedcard+=cardnumber.substring(cardnumber.length-4, cardnumber.length);
			return maskedcard;
		}

		function createRowforPayment(cardtype,cardnumber,expiry,cardid){
			var Editid="edit"+cardid;
			var deleteid="delete"+cardid;
			var html="";
			html+="<ul class=\"userreq-register-list emergency\" id=\"listOfemergency\">";	
			html+="<li style=\"width:120px;\">";
			html+="<label class=\"lblemergency\">"+cardtype+"</label>";
			html+="</li>";
			html+="<li style=\"width: 100px;\">";
			html+="<label class=\"lblemergency\">"+maskCard(cardnumber)+"</label>";
			html+="  </li> <li style=\"width: 150px;\">";
			html+="<label class=\"lblemergency\"> "+expiry+"</label>";	    	
			html+="</li>";    
			html+="<li style=\"width: 30%\" class=\"button\">";
			html+="<a href=\"#\" class=\"editEmergency\"><img src=\"images/edit.png\" class=\"emergency-icon\" id="+Editid+"></a>";
			html+="<a href=\"#\" class=\"addEmergency\" style=\"left: 8px;\"><img src=\"images/add.png\" class=\"emergency-icon\" id=\"add\"></a>";
			html+="<a href=\"#\" class=\"deleteEmergency\" style=\"width: 26px;  height: 25px;\"><img src=\"images/delete.png\" class=\"useredit-cancel-icon\" id="+deleteid+"></a>"	
			html+="</li></ul>";

			$("div.dataforPayment").append(html);
			
			$("div.editUserInfoContainer").on("click", 'a', function(event){
				event.stopImmediatePropagation();
			    if(event.target.id.indexOf("edit")>-1){
			    	   editPaymentInfo(event.target.id.substring(4, event.target.id.length));
				}
				else if(event.target.id.indexOf("add")>-1){
						addPaymentInfo();
				}
				else if(event.target.id.indexOf("delete")>-1)
						deletePaymentInfo(event.target.id.substring(6, event.target.id.length));
			});
		}


		function deletePaymentInfo(cardid){
			var params="UserId="+user_id;
			params+="&card_id="+cardid;
			params+="&category=14";
			UpdatepaymentDetails(params);
		}

		function editPaymentInfo(cardid){
			//alert(cardid);
			sessionStorage.setItem("PaymentAction","Edit");
			var paymentdata=JSON.parse(localStorage.getItem("paymentInfo"));
			for(var i=0;i<paymentdata.length;i++){

				if(paymentdata[i].Card_ID==cardid){
					sessionStorage.setItem("card_id",paymentdata[i].Card_ID);
					var value=getSelectValue(paymentdata[i].Card_Type);
					$("#cardtype").val(value);
					$("#cardnumber").val(paymentdata[i].Card_Number);
					$("#expiry").val(paymentdata[i].Expiry_Date);
					$("#cvv").val(paymentdata[i].CVV_Number);

				}

			}

			$("#cardDetails").addClass("visible");
			$(".userreq-register-list").addClass("hide");
			$(".emergency-h3").addClass("hide");
			
		}

		function getSelectValue(cardtype){
			if(cardtype.toUpperCase().indexOf("AMEX")>-1){
				return 2;
			}
			else if(cardtype.toUpperCase().indexOf("VISA")>-1){
				return 0;
			}
			else if(cardtype.toUpperCase().indexOf("MASTERCARD")>-1){
				return 1;
			}
		}
		function addPaymentInfo(){
			sessionStorage.setItem("PaymentAction","Add");
			$("#cardDetails").addClass("visible");
			$(".userreq-register-list").addClass("hide");
			$(".emergency-h3").addClass("hide");

		}


		function loadSubscription(user_id){
			checkSubscription(user_id);
			
		}

		function loadEditEmergencyData(userID){
			var postString = "category=3&UserId="+userID;
				$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:postString,
							success:function(data)
							{
								var editProfileData =JSON.parse(data);
								console.log(editProfileData);
								localStorage.setItem("EmergencyContact",JSON.stringify(editProfileData));
								if(editProfileData.length>0)
									refreshEmergencyDisplay(editProfileData);
								else
									loadNodataView();
							}	
						}
					);

		}

		function loadNodataView(){
			html="<p><h3 class=\"emergency-h3\" style=\"top: 130px;\"> No details found! </h3></p>";
			$(".dataforemergency").html(html);
			
		}
		function refreshDisplay(viewData)
			{
				if(viewData.profile_picture.indexOf("null")>-1){
					$("#profile-image").attr("src","images/profile.png");
				}
				else
					$("#profile-image").attr("src",viewData.profile_picture);
				$("#idabout-me").text(viewData.About_Me);
				$("#idfname").val(viewData.First_Name);
				$("#idlname").val(viewData.Last_Name);
				$("#idage").val(viewData.age);
				$(':radio[value="' + viewData.Gender + '"]').attr('checked', 'checked');
		}

		function refreshContactDisplay(viewData){
			$("#mobile").val(viewData.Mobile);
			$("#home").val(viewData.Home_phone);
			$("#street").val(viewData.Street);
			$("#apt").val(viewData.Apt_No);
			$("#city").val(viewData.City);
			$("#state").val(viewData.State);
			$("#zipcode").val(viewData.Zip_code);
		}
		
		function refreshEmergencyDisplay(viewData){
			$("div.dataforemergency").html("");
			var needDelete=false;
			for(var i=0;i<viewData.length;i++){

				createRow(viewData[i].Emergency_No,viewData[i].Emergency_rel,viewData[i].Emergency_name,needDelete);
				needDelete=true;

			}
	}
		function createRow(no,rel,name,needDelete){
			var Editid="edit"+name;
			var deleteid="delete"+name;
			var html="";
			html+="<ul class=\"userreq-register-list emergency\" id=\"listOfemergency\">";	
			html+="<li style=\"width:120px;\">";
			html+="<label class=\"lblemergency\">"+name+"</label>";
			html+="</li>";
			html+="<li style=\"width: 100px;\">";
			html+="<label class=\"lblemergency\">"+rel+"</label>";
			html+="  </li> <li style=\"width: 150px;\">";
			html+="<label class=\"lblemergency\"> "+no+"</label>";	    	
			html+="</li>";    
			html+="<li style=\"width: 30%\" class=\"button\">";
			html+="<a href=\"#\" class=\"editEmergency\"><img src=\"images/edit.png\" class=\"emergency-icon\" id="+Editid+"></a>";
			html+="<a href=\"#\" class=\"addEmergency\" style=\"left: 8px;\"><img src=\"images/add.png\" class=\"emergency-icon\" id=\"add\"></a>";
			if(needDelete)
				html+="<a href=\"#\" class=\"deleteEmergency\" style=\"width: 26px;  height: 25px;\"><img src=\"images/delete.png\" class=\"useredit-cancel-icon\" id="+deleteid+"></a>"	
			html+="</li></ul>";

			$("div.dataforemergency").append(html);
			
			$("div.editUserInfoContainer").on("click", 'a', function(event){
				event.stopImmediatePropagation();
			    if(event.target.id.indexOf("edit")>-1){
			    	    editEmergencyContact(event.target.id.substring(4, event.target.id.length));
				}
				else if(event.target.id.indexOf("add")>-1){
						addEmergencyContact();
				}
				else if(event.target.id.indexOf("delete")>-1)
						deleteEmergencyContact(event.target.id.substring(6, event.target.id.length));
			});
						
		}

		function deleteEmergencyContact(name){
			var params="UserId="+user_id;
			params+="&name="+name;
			params+="&category=8";
			UpdateEmergencyDetails(params);
		}

		function editEmergencyContact(name){
			sessionStorage.setItem("emergencyAction","Edit");
			var editdata=JSON.parse(localStorage.getItem("EmergencyContact"));
			for(var i=0;i<editdata.length;i++){

				if(editdata[i].Emergency_name.toUpperCase().indexOf(name.toUpperCase())>-1){
					$("#name").val(editdata[i].Emergency_name);
					sessionStorage.setItem("emergencyname",editdata[i].Emergency_name);
					$("#relation").val(editdata[i].Emergency_rel);
					$("#phone").val(editdata[i].Emergency_No);
				}

			}

			$("#emergencyDetails").addClass("visible");
			$(".userreq-register-list").addClass("hide");
			$(".emergency-h3").addClass("hide");
			
		}

		function addEmergencyContact(){
			sessionStorage.setItem("emergencyAction","Add");
			$("#emergencyDetails").addClass("visible");
			$(".userreq-register-list").addClass("hide");
			$(".emergency-h3").addClass("hide");

		}

		$("#saveData").on("click", function(){
			
			if(sessionStorage.getItem("emergencyAction").indexOf("Edit")>-1){
				var params = $("form").serialize();
				params+="&category=6";
				params+="&UserId="+user_id;
				params+="&oldname="+sessionStorage.getItem("emergencyname");
				UpdateEmergencyDetails(params);
			}
			else if(sessionStorage.getItem("emergencyAction").indexOf("Add")>-1){
				var data=JSON.parse(localStorage.getItem("EmergencyContact"));
				var params = $("form").serialize();
				params+="&category=7";
				params+="&UserId="+user_id;
				params+="&contact_id="+data[0].Contact_ID;
				params+="&card_no="+data[0].Card_ID;
				UpdateEmergencyDetails(params);
			}
			
		});

		$("#savePaymentData").on("click",function(){
			if(sessionStorage.getItem("PaymentAction").indexOf("Edit")>-1){
				var params = $("form").serialize();
				params+="&category=12";
				params+="&UserId="+user_id;
				params+="&card_id="+sessionStorage.getItem("card_id");
				var cardtypefromscreen=$("#cardtype :selected").text();
				//alert(cardtypefromscreen);
				params+="&card_type="+cardtypefromscreen;
				//alert(params);
				UpdatepaymentDetails(params);
			}
			else if(sessionStorage.getItem("PaymentAction").indexOf("Add")>-1){
				
				var params = $("form").serialize();
				params+="&category=13";
				params+="&UserId="+user_id;
				var cardtypefromscreen=$("#cardtype :selected").text();
				params+="&card_type="+cardtypefromscreen;
				UpdatepaymentDetails(params);
			}
		});

		$("#user_edit_personal").submit(function(event){
				event.preventDefault();
											
				var formData = new FormData($(this)[0]);
				
				$.ajax({
				    url: 'http://localhost/tend_services/fileuploader.php',
				    type: "POST",
				    data: formData,
				    processData: false,
				    contentType: false,
				    datatype:"text",
				    success: function (res) {

				       updatepersonalInDB();
				       

				    },
				    error:function(res){
				    	//alert("in error");
				    	console.log(res);
				    }
				  });

		});


		function updatepersonalInDB(){
			var params = $("form").serialize();
			params+="&category=16";
			params+="&UserId="+user_id;
			params+="&profile="+localStorage.getItem('profilename');
			$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
									loadPersonalDetails(user_id);
			
							}	
						}
					);

		}
		function UpdatepaymentDetails(params){
				$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
									$("#cardDetails").removeClass("visible");
									$(".userreq-register-list").removeClass("hide");
									$(".emergency-h3").removeClass("hide");
									loadPaymentInformation(user_id);
			
							}	
						}
					);
		}

		function UpdateEmergencyDetails(params){
			$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								$("#emergencyDetails").removeClass("visible");
								$("#emergencyDetails").addClass("hide");
								$(".userreq-register-list").removeClass("hide");
								$(".emergency-h3").removeClass("hide");	
								loadEditEmergencyData(user_id);
							}	
						}
					);
		}

		function checkSubscription(user_id){
			
			var params="";
			params+="&category=9";
			params+="&UserId="+user_id;

			$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								var sub =JSON.parse(data);
								if(sub[0].subscription==1){
									$('#issubscribe').prop('checked', true);
								}
								else
									$('#issubscribe').prop('checked', false);
							}	

						}
					);
		}
		$("#updatesub").on("click", function(e){
			e.preventDefault();
			var params="";
			params+="&category=10";
			params+="&UserId="+user_id;
			if($("#issubscribe").is(':checked')){
				params+="&NewsletterFeed=1";
			}
			else
				params+="&NewsletterFeed=0";

			$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								//alert(data);
							}	

						}
					);

		});

		$("#savecontact").on("click",function(e){
			e.preventDefault();
			var params="";
			var params = $("form").serialize();
				params+="&category=15";
				params+="&UserId="+user_id;
				params+="&contact_id="+sessionStorage.getItem("contact_id");
			
			$.ajax({
							url:'http://localhost/tend_services/useredit.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								alert("Data Saved!");
								loadContactDetails(user_id);
							}	

						}
					);
		 });
		
			function isValid(str){
			 return /[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(str);
			}


		$('#profileimg').change( function(event) {
			   var f = event.target.files[0]; // FileList object
  
			      if (!f.type.match('image.*')) {
			         alert("upload only image file");
			       }
			       else{
			       			if(isValid(f.name)){
			       				alert("File name should not contain special chars. Only - and space is allowed in name");
			       			}
			       			else{
									localStorage.setItem('profilename',f.name);
								    var reader = new FileReader();
						            reader.onload = (function(theFile) {
							        return function(e) {
							         
							         $("#profile-image").attr("src",e.target.result);
							        };
							      })(f);
				   
							      reader.readAsDataURL(f);
							 } 
				    } 
			   });
});