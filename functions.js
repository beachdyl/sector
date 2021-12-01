// Require the necessary files and modules
const fs = require('fs');
const errHandle = require ('./errorHandler.js');
const { channelId } = require('./config.json');

// matchWord function. Returns a value, usually 0 or 1, for how many matches there are of the first argument in the words list
let matchWord = async function(word) {
	let length;
	let answer = await new Promise((resolve) => {
		const regEx = new RegExp('\\b'+word+'\\b', "i")
		const result = [];

		// Scan the file for the word
		fs.readFile('./files/US.txt', 'utf8', function (err, contents) {
			let lines = contents.toString().split("\n");
			lines.forEach(line => {
				if (line && line.search(regEx) >= 0) {
					result.push(line);
				};
			});
			resolve(result);
		});
	}).then(value => {
		// Return how many matches there are. Should only be 0 or 1.
		length = value.length;
	});
	return length;
};

// getNickname function. Returns a string of the nickanme of that user. If one doesn't exist, create it and then return that.
let getNickname =  function(userid) {
	const regEx = new RegExp('\\b'+userid+'\\b', "i")
	let result = [];

	// Scan the file for the user
	let file = fs.readFileSync('./files/Nicknames.txt', 'utf8');
	let lines = file.split("\n");
	lines.forEach(line => {
		if (line && line.search(regEx) >= 0) {
			result.push(line);
		};
	});

	if (result.length > 0) {
		// If they have one, return the nickname of the user
		result = result[0];
		result = result.substring(result.indexOf(" ")+1, result.length);
		result = result.substring(0, result.indexOf(" "));
		return result;
	} else {
		// If they don't have one, create a nickname and color for the user and return the name
		let newName = getRandomWord();
		let randColor = Math.floor(Math.random()*16777215).toString(16);
		fs.appendFileSync('./files/Nicknames.txt',`${userid} ${newName} #${randColor} \n`);;
		return newName;
	};
};

let getColor =  function(userid) {
	const regEx = new RegExp('\\b'+userid+'\\b', "i")
	let result = [];

	// Scan the file for the user
	let file = fs.readFileSync('./files/Nicknames.txt', 'utf8');
	let lines = file.split("\n");
	lines.forEach(line => {
		if (line && line.search(regEx) >= 0) {
			result.push(line);
		};
	});

	console.log(result)
	console.log(result.length)

	if (result.length > 0) {
		// If they exist, return the color of the user
		result = result[0];
		result = result.substring(result.indexOf(" ")+1, result.length);
		result = result.substring(result.indexOf(" ")+1, result.length);

		return result;
	} else {
		// If they don't exist, return black
		return `#000000`;
	};
};

// Get a random word from the words file
let getRandomWord = function() {
	let file = fs.readFileSync('./files/US.txt', "utf-8")

	var lines = file.split('\n');
	var line = lines[Math.floor(Math.random()*lines.length)]

	return line;
};

// Allow us to get the ID (as a promise result) of the user that said a word. The word passed in must have already been said.
let whoSaid = async function(word) {
	let answer = await new Promise((resolve) => {
		const regEx = new RegExp('\\b'+word+'\\b', "i")
		let result = [];

		// Scan the file for the word
		fs.readFile('./files/Used.txt', 'utf8', function (err, contents) {
			let lines = contents.toString().split("\n");
			lines.forEach(line => {
				if (line && line.search(regEx) >= 0) {
					result.push(line);
				};
			});
			// Converting the results into a promise-returned user ID string
			result = result[0];
			result = result.substring(result.indexOf(" ")+1, result.length);
			resolve(result);
		});
	});
	return answer;
};

// Process when a correct and accepted word is said
// let correctWord = async function(message) {
// 	message.react('✅');
// 	fs.appendFileSync('./files/Used.txt',`${message.content} ${message.author.id}\n`);
// 	fs.writeFileSync(`./files/users/${message.author.id}.txt`,`${getScore(message.author.id)+1}`);
// };

module.exports = { matchWord, getRandomWord, whoSaid, getNickname, getColor } ;