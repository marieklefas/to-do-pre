let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage.getItem("tasks")) {
		return JSON.parse(localStorage.getItem("tasks"));
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove(item);
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", true);
		textElement.focus();
	})

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", false);
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemsNamesElements.forEach(function (el) {
		tasks.push(el.textContent)
	})
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(item => {
	newItem = createItem(item);
	listElement.append(newItem)
})

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	let items = createItem(inputElement.value)
	listElement.prepend(items);
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
})