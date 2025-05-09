(function () {
	const quotesEl = document.querySelector('.quotes');
	const loaderEl = document.querySelector('.loader');

	// get the quotes from API
	const getQuotes = async (
		/** @type {any} */ page,
		/** @type {any} */ limit
	) => {
		const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
		const response = await fetch(API_URL);
		// handle 404
		if (!response.ok) {
			throw new Error(`An error occurred: ${response.status}`);
		}
		return await response.json();
	};

	// show the quotes
	const showQuotes = (/** @type {any[]} */ quotes) => {
		quotes.forEach(
			(/** @type {{ id: any; quote: any; author: any; }} */ quote) => {
				const quoteEl = document.createElement('blockquote');
				quoteEl.classList.add('quote');

				quoteEl.innerHTML = `
            <span>${quote.id})</span>
            ${quote.quote}
            <footer>${quote.author}</footer>
        `;

				// @ts-ignore
				quotesEl.appendChild(quoteEl);
			}
		);
	};

	const hideLoader = () => {
		// @ts-ignore
		loaderEl.classList.remove('show');
	};

	const showLoader = () => {
		// @ts-ignore
		loaderEl.classList.add('show');
	};

	const hasMoreQuotes = (
		/** @type {number} */ page,
		/** @type {number} */ limit,
		/** @type {number} */ total
	) => {
		const startIndex = (page - 1) * limit + 1;
		return total === 0 || startIndex < total;
	};

	// load quotes
	const loadQuotes = async (
		/** @type {number} */ page,
		/** @type {number} */ limit
	) => {
		// show the loader
		showLoader();

		// 0.5 second later
		setTimeout(async () => {
			try {
				// if having more quotes to fetch
				if (hasMoreQuotes(page, limit, total)) {
					// call the API to get quotes
					const response = await getQuotes(page, limit);
					// show quotes
					showQuotes(response.data);
					// update the total
					total = response.total;
				}
			} catch (error) {
				// @ts-ignore
				console.log(error.message);
			} finally {
				hideLoader();
			}
		}, 500);
	};

	// control variables
	let currentPage = 1;
	const limit = 10;
	let total = 0;

	window.addEventListener(
		'scroll',
		() => {
			const { scrollTop, scrollHeight, clientHeight } =
				document.documentElement;

			if (
				scrollTop + clientHeight >= scrollHeight - 5 &&
				hasMoreQuotes(currentPage, limit, total)
			) {
				currentPage++;
				loadQuotes(currentPage, limit);
			}
		},
		{
			passive: true,
		}
	);

	// initialize
	loadQuotes(currentPage, limit);
})();
