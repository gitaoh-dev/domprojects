// Get the new year
const getNewYear = () => {
	const currentYear = new Date().getFullYear();
	return new Date(`January 01 ${currentYear + 1} 00:00:00`);
};

// update the year element
const year = document.querySelector('.year');
const header = document.querySelector('h1')
const nextYear = getNewYear().getFullYear()

// @ts-ignore
year.innerHTML = nextYear;
// @ts-ignore
header.innerHTML = `${nextYear} COUNTDOWN`

// select elements
const app = document.querySelector('.countdown-timer');
const message = document.querySelector('.message');
const heading = document.querySelector('h1');

// @ts-ignore
const format = (t) => {
	return t < 10 ? '0' + t : t;
};

// @ts-ignore
const render = (time) => {
	// @ts-ignore
	app.innerHTML = `
        <div class="count-down">
            <div class="timer">
                <h2 class="days">${format(time.days)}</h2>
                <small>Days</small>
            </div>
            <div class="timer">
                <h2 class="hours">${format(time.hours)}</h2>
                <small>Hours</small>
            </div>
            <div class="timer">
                <h2 class="minutes">${format(time.minutes)}</h2>
                <small>Minutes</small>
            </div>
            <div class="timer">
                <h2 class="seconds">${format(time.seconds)}</h2>
                <small>Seconds</small>
            </div>
        </div>
        `;
};

const showMessage = () => {
	// @ts-ignore
	message.innerHTML = `Happy New Year ${newYear}!`;
	// @ts-ignore
	app.innerHTML = '';
	// @ts-ignore
	heading.style.display = 'none';
};

const hideMessage = () => {
	// @ts-ignore
	message.innerHTML = '';
	// @ts-ignore
	heading.style.display = 'block';
};

const complete = () => {
	showMessage();

	// restart the countdown after showing the
	// greeting message for a day ()
	setTimeout(() => {
		hideMessage();
		countdownTimer.setExpiredDate(getNewYear());
	}, 1000 * 60 * 60 * 24);
};

// @ts-ignore
class CountDown {
	// @ts-ignore
	constructor(expiredDate, onRender, onComplete) {
		this.setExpiredDate(expiredDate);

		this.onRender = onRender;
		this.onComplete = onComplete;
	}

	// @ts-ignore
	setExpiredDate(expiredDate) {
		// get the current time
		const currentTime = new Date().getTime();

		// calculate the remaining time
		this.timeRemaining = expiredDate.getTime() - currentTime;

		this.timeRemaining <= 0 ? this.complete() : this.start();
	}

	complete() {
		if (typeof this.onComplete === 'function') {
			// @ts-ignore
			onComplete();
		}
	}

	getTime() {
		return {
			// @ts-ignore
			days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
			// @ts-ignore
			hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
			// @ts-ignore
			minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
			// @ts-ignore
			seconds: Math.floor(this.timeRemaining / 1000) % 60,
		};
	}

	update() {
		if (typeof this.onRender === 'function') {
			this.onRender(this.getTime());
		}
	}

	start() {
		// update the countdown
		this.update();

		//  setup a timer
		const intervalId = setInterval(() => {
			// update the timer
			// @ts-ignore
			this.timeRemaining -= 1000;

			// @ts-ignore
			if (this.timeRemaining < 0) {
				// call the callback
				// @ts-ignore
				complete();

				// clear the interval if expired
				clearInterval(intervalId);
			} else {
				this.update();
			}
		}, 1000);
	}
}


// @ts-ignore
const countdownTimer = new CountDown(getNewYear(), render, complete);
