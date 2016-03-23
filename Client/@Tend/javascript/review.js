$(document).ready(function(){	

	loaddata();
	function loaddata(){
			var url=window.location.href;   	
				if(url.indexOf("Userviewreview") > -1){
					 loadReviewDetails();
				}
	}		
function loadReviewDetails(){
				$("#viewReviewUl").html('');
				var html="";
				var reviewdata=JSON.parse(localStorage.getItem("review_data"));
				console.log(reviewdata);
				for(var i=0;i<reviewdata.length;i++){

					html+="<li><label  class=\"col-label\" style=\"font-size: 18px;\">"+reviewdata[i].First_Name +" "+reviewdata[i].Last_Name+" </label></li>";
					html+="<li><p class=\"view-profile-p\" style=\"margin-top:0px;margin-left: 15px;margin-bottom: 10px;\">"+ reviewdata[i].Date + "</p>";
					html+="</li><li><p class=\"view-profile-p\" style=\"margin-top:0px;margin-left: 15px;margin-bottom: 10px;\">"+reviewdata[i].Review_text+"</p>";
					html+="</li><li><div class=\"rating\">"+generateStar(reviewdata[i].Rating)+"</div></li>";
					
				}
	console.log(html);
	$("#viewReviewUl").append(html);
}

	function generateStar(star){
		var htmlstar="";
		for(var j=0;j<star;j++){
			htmlstar+="<span>★</span>";
		}
		return htmlstar;
	}

	
	$("#user_cg_review").submit(function(e){
		e.preventDefault();
		var params = $("form").serialize();
		params+="&category=2";
		params+="&requ_id="+localStorage.getItem("UserIDforReview");
		params+="&CaregiverId="+localStorage.getItem("Caregiveridforreview");
		console.log(params);
		  $.ajax({
							url:'http://localhost/tend_services/review.php',
							type:"POST",
							data:params,
							success:function(data)
							{
								alert("Review Submitted");
								window.location.href="userCurrRqsts.html";
							},
							error:function(data){
								console.log(data);
							}	
						}
					);
	});
});