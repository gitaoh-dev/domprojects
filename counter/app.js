const WordCounter = require('./counter');
const inputText = document.querySelector('#text');
const statElem = document.querySelector('#stat');

// create a new instance of WordCounter
new WordCounter(inputText);

const render = (
	/** @type {{ detail: { wordStat: { words: any; characters: any; }; }; }} */ event
) => {
	// @ts-ignore
	statElem.innerHTML = `<p>You've written <span class="highlight">${event.detail.wordStat.words} words</span> 
        and <span class="highlight">${event.detail.wordStat.characters} characters</span>.</p>`;
};

// @ts-ignore
inputText.addEventListener('count', render);
