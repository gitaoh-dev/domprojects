/* draggable element */
const item = document.querySelector('.item');

// @ts-ignore
item.addEventListener('dragstart', dragStart);

/**
 * @param {{ dataTransfer: { setData: (arg0: string, arg1: any) => void; }; target: { id: any; classList: { add: (arg0: string) => void; }; }; }} e
 */
function dragStart(e) {
	e.dataTransfer.setData('text/plain', e.target.id);
	setTimeout(() => {
		e.target.classList.add('hide');
	}, 0);
}

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => {
	// @ts-ignore
	box.addEventListener('dragenter', dragEnter);
	// @ts-ignore
	box.addEventListener('dragover', dragOver);
	// @ts-ignore
	box.addEventListener('dragleave', dragLeave);
	// @ts-ignore
	box.addEventListener('drop', drop);
});

/**
 * @param {{ preventDefault: () => void; target: { classList: { add: (arg0: string) => void; }; }; }} e
 */
function dragEnter(e) {
	e.preventDefault();
	e.target.classList.add('drag-over');
}

/**
 * @param {{ preventDefault: () => void; target: { classList: { add: (arg0: string) => void; }; }; }} e
 */
function dragOver(e) {
	e.preventDefault();
	e.target.classList.add('drag-over');
}

/**
 * @param {{ target: { classList: { remove: (arg0: string) => void; }; }; }} e
 */
function dragLeave(e) {
	e.target.classList.remove('drag-over');
}

/**
 * @param {{ target: { classList: { remove: (arg0: string) => void; }; appendChild: (arg0: HTMLElement | null) => void; }; dataTransfer: { getData: (arg0: string) => any; }; }} e
 */
function drop(e) {
	e.target.classList.remove('drag-over');

	// get the draggable element
	const id = e.dataTransfer.getData('text/plain');
	const draggable = document.getElementById(id);

	// add it to the drop target
	e.target.appendChild(draggable);

	// display the draggable element
	// @ts-ignore
	draggable.classList.remove('hide');
}
