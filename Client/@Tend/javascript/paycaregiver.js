$( document ).ready(function() {

var user_id=sessionStorage.getItem("User_ID");
loadPaymentInformation(user_id);

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
								
								if(paymentData.length>0)
									refreshCardsDisplay(paymentData);								
							}	
						}
					);
		}

	function refreshCardsDisplay(paymentData)
	{
		$("#creditCardTblBody").html("");
		var htmlString="";
		for(nIndex=0;nIndex<paymentData.length;nIndex++)
		{
			htmlString=htmlString+"<tr>";
			htmlString=htmlString+ "<td ><input type=\"radio\" name=\"selectPayment\" required></td>";
			htmlString=htmlString+ "<td>"+paymentData[nIndex].Card_Type+"</td>";
			htmlString=htmlString+ "<td>"+ maskCard(paymentData[nIndex].Card_Number)+"</td>";
			htmlString=htmlString+ "<td>"+paymentData[nIndex].Expiry_Date+"</td>";
			htmlString=htmlString+ "</tr>";
		}
		console.log(htmlString);
		$("#creditCardTblBody").append(htmlString);
	}
	function maskCard(cardnumber){
		var maskedcard="****";
		maskedcard+=cardnumber.substring(cardnumber.length-4, cardnumber.length);
		return maskedcard;
	}
	
});