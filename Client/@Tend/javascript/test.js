$(document).ready(function(){
	$("button").click(function(){
		if(($(this).text())=="Edward Elric")
		{
			var temp="Lenny Cole, a London mob boss, puts the bite on all local real estate transactions. For substantial fees, he's helping Uri Omovich, a Russian developer. As a sign of good faith, Omovich loans Cole a valuable painting, promptly stolen off Cole's wall. While Cole's men, led by the dependable Archie, look for the canvas, three local petty criminals, the Wild Bunch, steal money from the Russian using inside information from his accountant, the lovely Stella. Meanwhile, a local drug-addled rocker, Johnny Quid, is reported drowned, and his connection to Cole is the key to unraveling the deceits and double crosses of life in the underworld.";
			$("#user_id").text("Edward Elric");
			$("#msg_type").text("Complaint");
			$("#msg").text(temp)
		}
		else if(($(this).text())=="Alphonse Elric")
		{
			var temp="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet tellus nec luctus blandit. Nunc rutrum viverra metus, sit amet euismod risus pretium in. Nullam mauris eros, egestas vitae urna ultricies, facilisis aliquet turpis. Cras sed placerat urna, sed euismod enim. Aenean tempus rhoncus orci, et malesuada ante vulputate eu. Aliquam aliquet neque vitae arcu efficitur congue. Quisque ut pellentesque sapien.Proin non condimentum ipsum. Donec pharetra suscipit ligula vitae condimentum. Donec dapibus facilisis ante, ut viverra quam ultricies fermentum. Nam purus leo, vulputate at pulvinar sit amet, tincidunt nec ante. Integer placerat, ante convallis cursus vestibulum, mauris odio cursus purus, nec commodo diam dui et enim. Suspendisse convallis sapien eget tortor aliquet varius. Sed ac erat quis neque hendrerit sollicitudin et non libero. In mattis interdum erat quis eleifend. Maecenas dictum ipsum id libero varius, sit amet lacinia dolor porta. Fusce et tincidunt arcu. Sed sit amet justo fringilla, lobortis nunc ac, dignissim velit. Nullam a malesuada lectus.";
			$("#user_id").text("Alphonse Elric");
			$("#msg_type").text("Suggestion");
			$("#msg").text(temp)
		}
	});
});


