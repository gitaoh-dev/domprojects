(() => {
	const message = document.querySelector('#message');

	// check if the Geolocation API is supported
	if (!navigator.geolocation) {
		// @ts-ignore
		message.textContent = `Your browser doesn't support Geolocation`;
		// @ts-ignore
		message.classList.add('error');
		return;
	}

	// handle click event
	const btn = document.querySelector('#show');
	// @ts-ignore
	btn.addEventListener('click', function () {
		// get the current position
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	});

	// handle success case
	/**
	 * @param {{ coords: { latitude: any; longitude: any; }; }} position
	 */
	function onSuccess(position) {
		const { latitude, longitude } = position.coords;

		// @ts-ignore
		message.classList.add('success');
		// @ts-ignore
		message.textContent = `Your location: (${latitude},${longitude})`;
	}

	// handle error case
	function onError() {
		// @ts-ignore
		message.classList.add('error');
		// @ts-ignore
		message.textContent = `Failed to get your location!`;
	}
})();
