module.exports = class WordCounter {
	/**
	 * @param {Element | null} inputText
	 */
	constructor(inputText) {
		this.inputText = inputText;
		// @ts-ignore
		this.inputText.addEventListener('input', () => {
			this.count();
		});
	}
	count() {
		// @ts-ignore
		let wordStat = this.getWordStat(this.inputText.value.trim());
		this.emitEvent(wordStat);
	}

	/**
	 * @param {{ characters: any; words: any; }} wordStat
	 */
	emitEvent(wordStat) {
		// Create count event
		let countEvent = new CustomEvent('count', {
			bubbles: true,
			cancelable: true,
			detail: {
				wordStat,
			},
		});
		// dispatch the count event
		// @ts-ignore
		this.inputText.dispatchEvent(countEvent);
	}
	/**
	 * @param {string} str
	 */
	getWordStat(str) {
		let matches = str.match(/\S+/g);
		return {
			characters: str.length,
			words: matches ? matches.length : 0,
		};
	}
};
