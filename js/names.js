/*
	Global vars

	productions: a list of key-value pairs, where the key is the
	symbol, and the value of a list of replacements
*/
var tokens = {};

/*
	Initialize the list of tokens
*/
function insulterInit(){
	var words;
	$.ajax({
    type: "POST",
    url: "php/get-data.php",
    success : function(result){
    	words = JSON.parse(result);
		  for(var key in words){
		  	if(words.hasOwnProperty(key)){
		  		var tokenKey = "<" + key + ">";
		  		if(!tokens.hasOwnProperty(tokenKey)){
		  			tokens[tokenKey] = [];
		  		}
		  		// dont ask me what apply does, its magic and it works
		  		tokens[tokenKey].push.apply(tokens[tokenKey], words[key]);
		  	}
		  }
		}
  });
}

/*
	Main function

	Begin with the top-level token, <insult>. Then iterate through all the
	tokens, to try and find tokens to repace. Does this over and over until
	no tokens are found. It is an implementation of a standard context-free
	grammar.
*/
function generateInsult(insult) {
	var allTerminals = false;
	while(!allTerminals){
		allTerminals = true;
		for(var key in tokens){
			if(tokens.hasOwnProperty(key)){ // Make sure it is one of ours, not a super type's
				if(insult.includes(key)){
					allTerminals = false;
					insult = insult.replace(key, randomElement(tokens[key]));
				}
			}
		}
	}

	return insult;
}

function randomElement(list) {
	var n = Math.floor(Math.random() * list.length);
	return list[n];
}

/*
	Sentence forms
*/

tokens["<insult>"] = [
		"<randomSentence>",
		"<classic>",
		"<interjectionInsult>",
		"<prepositionInsult>",
		"<neverGetAlongInsult>",
		"<afraidInsult>",
		"<moreInsult>",
		"<aroundInsult>",
		"<oneWordInsult>",
		"<nounInsult>",
		"<worthyInsult>",
		"<gallInsult>",
		"<twoSentenceInsult>"
	];

tokens["<twoSentenceInsult>"] = [
	"<insult> You know what else? <insult>"];

tokens["<gallInsult>"] = [
"<name> and <name> have the gall to be <prepositionalPhrase>. They have no shame."];

tokens["<worthyInsult>"] = [
	"<name> is not even <adjectivePhrase> enough to be called a <noun>."];

tokens["<nounInsult>"] = [
	"<name>'s <noun> is so <adjectivePhrase>, it <directObjectVerbPhrase>."];

tokens["<oneWordInsult>"] = [
	"<name> is such a <noun>."
];

tokens["<aroundInsult>"] = [
	"When the <noun> is around, <name> is a real <noun>."
	];

tokens["<moreInsult>"] = [
	"<name> is more <adjectivePhrase> than a <nounPhrase>."
	];

tokens["<afraidInsult>"] = [
	"<name> is afraid of the <nounPhrase>."
	];

tokens["<neverGetAlongInsult>"] = [
	"<name> and the <noun> never get along."
	];

tokens["<prepositionInsult>"] = [
	"I heard that <prepositionalPhrase>, <name> always <verb>."
	];

tokens["<interjectionInsult>"] = [
	"<interjection>! It's that <name> again."
	];

tokens["<classic>"] = [
	"<name> is a <nounPhrase>."
	];

tokens["<randomSentence>"] = [
	"<subjectPhrase> <verbPhrase>."
	];



/*
	Nonterminals
*/

tokens["<subjectPhrase>"] = [
	"<name>", 
	"The <adjectivePhrase> <name>", 
	"<name>, <prepositionalPhrase>, "
	];

tokens["<adjectivePhrase>"] = [
	"<adjective>", 
	"<adverb> <adjective>"
	];

tokens["<prepositionalPhrase>"] = [
	"<preposition> the <nounPhrase>"
	];

tokens["<nounPhrase>"] = [
	"<noun>", 
	"<adjectivePhrase> <noun>"
	];

tokens["<verbPhrase>"] = [
	"<simpleVerbPhrase>", 
	"<directObjectVerbPhrase>"
	];

tokens["<simpleVerbPhrase>"] = [
	"<verb>", 
	"<adverb> <verb>"
	];

tokens["<directObjectVerbPhrase>"] = [
	"<directObjectVerb> the <nounPhrase>", 
	"<adverb> <directObjectVerb> the <nounPhrase>"
	];

/*
	Terminals. These will all be moved to the database.
*/

tokens["<directObjectVerb>"] = [
		"avoids",
		"does not like",
		"laughs at",
		"is perplexed by"
	];


