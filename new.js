const dateEl = document.getElementById("date-el")
const addBtn = document.getElementById("add-btn")
const cancelBtn = document.getElementById("cancel-btn")
const taskEl = document.getElementById("task")
const saveBtn = document.getElementById("save-btn")
const undoCtn = document.getElementById("undo-ctn")
const inputsCtn = document.getElementById("dialog-ctn")
const tasksCtn = document.getElementById("tasks-ctn")
const tasks = []
const savedTasks = JSON.parse(localStorage.getItem("savedTasks"))
const deletedTasks = []

function displayDay() {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	let currentDate = new Date()
	let dateToDisplay = `
			${days[currentDate.getDay()]},
			${months[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}
		`
	dateEl.textContent = dateToDisplay
}

displayDay()

addBtn.addEventListener("click", () => showInputs())
saveBtn.addEventListener("click", () => saveTask())
cancelBtn.addEventListener("click", () => closeInputs())

const showInputs = () => inputsCtn.style = "display: flex; visibility: visible; opacity: 1"
const closeInputs = () => inputsCtn.style = "display: none; visibility: hidden; opacity: 0"
const showUndo = () => {
	undoCtn.style = "display: initial; visibility: visible; opacity: 1"
	setTimeout(closeUndo, 3500)
}

const closeUndo = () => undoCtn.style = "display: none; visibility: hidden; opacity: 0"

if (savedTasks) {
	tasks.push(...savedTasks)
	display(tasks)
}

function saveTask() {
	if ( (taskEl.value) ) {
		newTask = taskEl.value
		tasks.push(newTask)

		taskEl.value = ""

		localStorage.setItem("savedTasks", JSON.stringify(tasks))

		closeInputs()
		display(tasks)
	}
}

function deleteTask(index) {
	deletedTasks.unshift({ev: tasks[index], in: index})
	tasks.splice(index, 1)
	localStorage.setItem("savedEvents", JSON.stringify(tasks))

	display(tasks)
	closeUndo()
	showUndo()
}

function undoDel() {
	tasks.splice(deletedTasks[0].in, 0, deletedTasks[0].ev)
	localStorage.setItem("savedTasks", JSON.stringify(tasks))
	display(tasks)
	closeUndo()
}

function display(arr) {
	let content = ""
	for(const x of arr) {
		content +=
			`<div class="task" onclick="deleteTask(${arr.indexOf(x)})">${x}</div>`
	}
	if (matchMedia('(max-width:600px)').matches) {
		content = content.replace(/ondblclick/g, "onclick")
	}
	tasksCtn.innerHTML = content
}

document.getElementById("footer").innerHTML = `© 2023 - ${new Date().getFullYear()} Techy Enochy`