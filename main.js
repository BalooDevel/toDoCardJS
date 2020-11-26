const input = document.querySelector('.input-add');
const form = document.querySelector('.add-item');
const toDoList = document.querySelector('.todo-list');

loadData();

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const taskText = input.value;

	const textHtml = `<li class="todo-item">
	<span class="todo-item__text">${taskText}</span>
	<div class="todo-buttons">
		<i class="far fa-check-circle item-btn" data-input="done"></i>
		<i class="far fa-trash-alt delete item-btn" data-input="reset"></i>
	</div>
</li>`;


	toDoList.insertAdjacentHTML('afterbegin', textHtml);

	input.value = '';

	toggleStartItem();

	saveData();
});

toDoList.addEventListener('click', function (event) {
	const parentItem = event.target.closest('.todo-item');
	if (event.target.getAttribute('data-input') == 'done') {
		parentItem.querySelector('.todo-item__text').classList.toggle('todo-item__text--done');

		toDoList.insertAdjacentElement('beforeend', parentItem);

		parentItem.querySelector('i[data-input="done"]').remove();

		saveData();

	} else if (event.target.getAttribute('data-input') == 'reset') {
		parentItem.remove();

		toggleStartItem();

		saveData();
	}
});

function toggleStartItem() {
	if (toDoList.children.length > 1) {
		document.querySelector('.todo-item-start').style.display = "none";
	} else {
		document.querySelector('.todo-item-start').style.display = "block";
	}
};

function saveData() {
	localStorage.setItem('listToDo', toDoList.innerHTML);
};
function loadData() {
	if (localStorage.getItem('listToDo')) {
		toDoList.innerHTML = localStorage.getItem('listToDo');
	}
}



