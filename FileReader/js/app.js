const imageList = document.querySelector('.image-list');
const fileInput = document.querySelector('.files');
const dropzone = document.querySelector('.dropzone');

const setActive = (/** @type {Element | null} */ dropzone, active = true) => {
	// active class
	// @ts-ignore
	const hasActiveClass = dropzone.classList.contains('active');

	if (active && !hasActiveClass) {
		// @ts-ignore
		return dropzone.classList.add('active');
	}

	if (!active && hasActiveClass) {
		// @ts-ignore
		return dropzone.classList.remove('active');
	}
};

// @ts-ignore
dropzone.addEventListener('dragenter', (e) => {
	e.preventDefault();
	setActive(dropzone);
});

// @ts-ignore
dropzone.addEventListener('dragover', (e) => {
	e.preventDefault();
	setActive(dropzone);
});

// @ts-ignore
dropzone.addEventListener('dragleave', (e) => {
	e.preventDefault();
	setActive(dropzone, false);
});

// @ts-ignore
dropzone.addEventListener('drop', (e) => {
	e.preventDefault();
	setActive(dropzone, false);
	// get the valid files
	// @ts-ignore
	const { files } = e.dataTransfer;
	// hand images
	handleImages(files);
});

const handleImages = (/** @type {any} */ files) => {
	// get valid images
	// let validImages = [...files].filter((file) =>
	// 	['image/jpeg', 'image/png'].includes(file.type)
	// );
	//  show the image
	// validImages.forEach(showImage);
	[...files].forEach(showImage);
	// upload files
	// uploadImages(validImages);
};

const showImage = (/** @type {Blob} */ image) => {
	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.addEventListener('load', (e) => {
		const div = document.createElement('div');
		div.classList.add('image');
		div.innerHTML = `
            <img src="${
				// @ts-ignore
				e.target.result
				// @ts-ignore
			}" alt="${image.name}">
            <p>${
				// @ts-ignore
				image.name
			}</p>
            <p>${formatBytes(image.size)}</p>
        `;
		// @ts-ignore
		imageList.appendChild(div);
	});
};

// @ts-ignore
const uploadImages = async (/** @type {any} */ images) => {
	const formData = new FormData();

	[...images].forEach((image) =>
		formData.append('images[]', image, image.name)
	);

	const response = await fetch('upload.php', {
		method: 'POST',
		body: formData,
	});

	return await response.json();
};

/**
 * @param {number} size
 */
function formatBytes(size, decimals = 2) {
	if (size === 0) return '0 bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(size) / Math.log(k));

	return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// @ts-ignore
fileInput.addEventListener('change', (e) => {
	// @ts-ignore
	const { files } = e.target;
	handleImages(files);
});

// prevent the drag & drop on the page
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());
