var psiTurk = require('./psiturk');
var Experiment = require('./experiment');

// All pages to be loaded
var pages = [
	"instructions/instruction-1.html",
	"instructions/instruction-2.html",
	"item.html",
    "postquestionnaire.html"
];

var images = [ // TODO: doesn't work that way
    "../static/aliens/Fa1/*",
    "../static/aliens/Fa2/*",
    "../static/aliens/Fb1/*",
    "../static/aliens/Fb2/*",
    "../static/aliens/Fc1/*",
    "../static/aliens/Fc2/*"
];

var instructionPages = [
	"instructions/instruction-1.html",
	"instructions/instruction-2.html",
];

psiTurk.preloadPages(pages);
psiTurk.preloadImages(images);

// Task object to keep track of the current phase
var currentview;

// RUN TASK
$(window).load(() => {
    psiTurk.doInstructions(
    	instructionPages, // list of instruction pages
    	() => currentview = new Experiment().start() // after instructions
    );
});
