function test()
{
	//var randomized = fullShuffle();
	//appendParagraph(randomized[0].learning + " " + randomized[0].family + " " + randomized[0].alien + " " + randomized[0].path);
	var validCount = 0;
	var invalidCount = 0;
	var n = document.getElementById("trials").value;
		
	for(var i=0; i<n; i++)
	{
		var order = fullShuffle();	
		if(hasArraySameSuccessor(order))
		{
			invalidCount += 1;
		}else
		{
			validCount += 1;
		}

		appendParagraph("Elements in order: " + order.length);
		printObjectOrder(order);
	}
	appendParagraph("Test Result:");
	appendParagraph("Valid trials: " + validCount + "/" + n);
	appendParagraph("Invalid trials: " + invalidCount + "/" + n);
	
}

function printObjectOrder(order)
{
	for(var i=0; i<order.length; i++)
	{
		appendParagraph(order[i].family + " // " + order[i].learning + " // " + order[i].alien + " //" + order[i].path);
	}
}

//checks whether two successive array elements have the same value 
function hasArraySameSuccessor(arr)
{
	for(var i=0; i<arr.length-1; i++)
	{
		if(arr[i] == arr[i+1])
		{
			return true;
		}
	}
	return false;
}