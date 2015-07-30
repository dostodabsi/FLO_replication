var num = new Array (15,5,15,5,15,5,20);

var names = new Array ('tob', 'tob', 'wug', 'wug', 'dep','dep','xbim');
var categories = new Array(0, 1, 2, 3, 4, 5, 6);
var done = false;

function shuffle()
{
	var order = new Array();

	var count;
	//set counts of each category to 0
	count = new Array(0,0,0,0,0,0,0);

	//Make bins of possible followers for each category
	var bins = new Array();

	for(var i=0; i<categories.length; i++)
	{	
		var cat = categories[i];
		var egory = new Array();

		//the control category can be followed by any category
		if(cat == 6)
		{	
			for(var i=0; i<6; i++)
			{
				pushNTimes(egory, i, num[i]);
			}
		}
		else
		{
			//add the appropriate number of exemplars (hi vs lo frequency)
			//from the appropriate category
			pushNTimes(egory, (cat+2)%6, num[(cat+2)%6]);
			pushNTimes(egory, (cat+3)%6, num[(cat+3)%6]);
			pushNTimes(egory, (cat+4)%6, num[(cat+4)%6]);
			//the names in names are ordered such that the code above selects
			//appropriate categories i.e. categories that don't share body type

			//any category can be followed by the control category
			pushNTimes(egory, 6, num[6]);
		}
		
		bins.push(egory);
	}
	
	//select the first element at random
	var prev = categories[Math.floor(Math.random()*categories.length)];
	
	while (!done)
	{
		//if there are still valid successors...
		if (bins[prev].length != 0)
		{
			// ...chooose one at random
			var s = bins[prev][Math.floor(Math.random()*bins[prev].length)];

			//put it in the stimulus order
			var stim_obj = getRandomStimuli(names[s]);
			order.push(stim_obj); //-> ##global##
			//increment the count
			count[s] += 1;
			//remember which item was selected
			prev = s;
			
			//remove the item from every bin
			for (var i=0; i<bins.length; i++)
			{
				var bin = bins[i];
				try
				{
					//remove s from bin
					var index = bin.indexOf(s);
					if (index > -1) 
					{
						bin = bin.splice(index, 1);
					}
				}
				catch(err)
				{	
					//ValueError: # not every item is in every bin
					//print '', # so just catch the error but do nothing
				}
			}
			done = true;
			for (var i=0; i<count.length; i++)
			{
				//var c = count[i];???
				if (num[i] != count[i])
				{
					done = false;
					break;
				}
			}
		}
		else
		{
			break;
		}
	}
	return order;
}

function pushNTimes(array, value, n)
{
	for(var i=0; i<n; i++)
	{
		array.push(value);
	}
}

function fullShuffle()
{
	while(!done)
	{	
		order = new Array();
        order = shuffle();
	}
	done = false;
	return order;
}

function appendParagraph(txt) 
{
  var oNewP = document.createElement("p");
  var oText = document.createTextNode(txt);
  oNewP.appendChild(oText);
  document.body.appendChild(oNewP);
}

function getRandomStimuli(family)
{
	var familyObjects = new Array();
	for(var i=0; i<stim_items.length; i++)
	{
		if(stim_items[i].family == family)
		{
			familyObjects.push(stim_items[i]);
		}
	}
	return familyObjects[Math.floor(Math.random()*familyObjects.length)];
}

var stim_items = 
[ { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3333',
    path: 'Fc1/Fc1_3333' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_2212',
    path: 'Fc2/Fc2_2212' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_2113',
    path: 'Fc1/Fc1_2113' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_2211',
    path: 'Fa1/Fa1_2211' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3312',
    path: 'Fa2/Fa2_3312' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3313',
    path: 'Fa2/Fa2_3313' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3331',
    path: 'Fc2/Fc2_3331' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3332',
    path: 'Fb2/Fb2_3332' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3312',
    path: 'Fc1/Fc1_3312' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_1113',
    path: 'Fa1/Fa1_1113' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_2213',
    path: 'Fc1/Fc1_2213' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_2213',
    path: 'Fb2/Fb2_2213' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3332',
    path: 'Fc2/Fc2_3332' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_1113',
    path: 'Fb2/Fb2_1113' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_2111',
    path: 'Fc2/Fc2_2111' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_2111',
    path: 'Fb2/Fb2_2111' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3322',
    path: 'Fc2/Fc2_3322' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_2211',
    path: 'Fb2/Fb2_2211' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3323',
    path: 'Fb2/Fb2_3323' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3333',
    path: 'Fc2/Fc2_3333' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_2213',
    path: 'Fa2/Fa2_2213' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_1112',
    path: 'Fc1/Fc1_1112' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_2213',
    path: 'Fc2/Fc2_2213' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3321',
    path: 'Fc1/Fc1_3321' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3321',
    path: 'Fb2/Fb2_3321' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3322',
    path: 'Fa2/Fa2_3322' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_1111',
    path: 'Fb1/Fb1_1111' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_1113',
    path: 'Fa2/Fa2_1113' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3313',
    path: 'Fc2/Fc2_3313' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_2113',
    path: 'Fc2/Fc2_2113' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_2113',
    path: 'Fa1/Fa1_2113' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3331',
    path: 'Fa1/Fa1_3331' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3323',
    path: 'Fb1/Fb1_3323' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3321',
    path: 'Fa2/Fa2_3321' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_2112',
    path: 'Fb1/Fb1_2112' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_2112',
    path: 'Fc2/Fc2_2112' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3312',
    path: 'Fa1/Fa1_3312' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_2113',
    path: 'Fa2/Fa2_2113' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3311',
    path: 'Fa1/Fa1_3311' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3321',
    path: 'Fc2/Fc2_3321' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3312',
    path: 'Fb1/Fb1_3312' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3311',
    path: 'Fc1/Fc1_3311' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_2213',
    path: 'Fa1/Fa1_2213' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3333',
    path: 'Fb2/Fb2_3333' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3331',
    path: 'Fa2/Fa2_3331' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3323',
    path: 'Fa2/Fa2_3323' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_1111',
    path: 'Fc1/Fc1_1111' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_2112',
    path: 'Fa2/Fa2_2112' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_1112',
    path: 'Fa1/Fa1_1112' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3331',
    path: 'Fb2/Fb2_3331' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_2212',
    path: 'Fc1/Fc1_2212' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_2112',
    path: 'Fa1/Fa1_2112' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_2112',
    path: 'Fb2/Fb2_2112' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_1112',
    path: 'Fa2/Fa2_1112' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_1113',
    path: 'Fc2/Fc2_1113' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3311',
    path: 'Fb1/Fb1_3311' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_2211',
    path: 'Fc2/Fc2_2211' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_1111',
    path: 'Fb2/Fb2_1111' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3313',
    path: 'Fa1/Fa1_3313' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_1113',
    path: 'Fb1/Fb1_1113' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3331',
    path: 'Fc1/Fc1_3331' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_1111',
    path: 'Fa1/Fa1_1111' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3322',
    path: 'Fb2/Fb2_3322' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3313',
    path: 'Fc1/Fc1_3313' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3332',
    path: 'Fb1/Fb1_3332' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3313',
    path: 'Fb1/Fb1_3313' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3312',
    path: 'Fc2/Fc2_3312' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3333',
    path: 'Fa1/Fa1_3333' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3321',
    path: 'Fa1/Fa1_3321' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_2211',
    path: 'Fb1/Fb1_2211' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_1111',
    path: 'Fa2/Fa2_1111' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_2211',
    path: 'Fc1/Fc1_2211' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3321',
    path: 'Fb1/Fb1_3321' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3333',
    path: 'Fb1/Fb1_3333' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_1112',
    path: 'Fb2/Fb2_1112' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_2111',
    path: 'Fb1/Fb1_2111' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3313',
    path: 'Fb2/Fb2_3313' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_1111',
    path: 'Fc2/Fc2_1111' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_2212',
    path: 'Fb2/Fb2_2212' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_2111',
    path: 'Fa2/Fa2_2111' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_2112',
    path: 'Fc1/Fc1_2112' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_2212',
    path: 'Fa1/Fa1_2212' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_2211',
    path: 'Fa2/Fa2_2211' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3333',
    path: 'Fa2/Fa2_3333' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3323',
    path: 'Fc1/Fc1_3323' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3323',
    path: 'Fa1/Fa1_3323' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3322',
    path: 'Fa1/Fa1_3322' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_2111',
    path: 'Fa1/Fa1_2111' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3332',
    path: 'Fa2/Fa2_3332' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3311',
    path: 'Fc2/Fc2_3311' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3312',
    path: 'Fb2/Fb2_3312' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_3323',
    path: 'Fc2/Fc2_3323' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_1113',
    path: 'Fc1/Fc1_1113' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3332',
    path: 'Fc1/Fc1_3332' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3322',
    path: 'Fb1/Fb1_3322' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_3311',
    path: 'Fa2/Fa2_3311' },
  { learning: 'LF',
    family: 'niz',
    alien: 'Fa2_2212',
    path: 'Fa2/Fa2_2212' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_3311',
    path: 'Fb2/Fb2_3311' },
  { learning: 'FL',
    family: 'tob',
    alien: 'Fc2_1112',
    path: 'Fc2/Fc2_1112' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_2213',
    path: 'Fb1/Fb1_2213' },
  { learning: 'LF',
    family: 'wug',
    alien: 'Fa1_3332',
    path: 'Fa1/Fa1_3332' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_3322',
    path: 'Fc1/Fc1_3322' },
  { learning: 'FL',
    family: 'xbim',
    alien: 'Fc1_2111',
    path: 'Fc1/Fc1_2111' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_2212',
    path: 'Fb1/Fb1_2212' },
  { learning: 'LF',
    family: 'dep',
    alien: 'Fb2_2113',
    path: 'Fb2/Fb2_2113' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_1112',
    path: 'Fb1/Fb1_1112' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_3331',
    path: 'Fb1/Fb1_3331' },
  { learning: 'LF',
    family: 'zak',
    alien: 'Fb1_2113',
    path: 'Fb1/Fb1_2113' } ]
