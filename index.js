const clockEl = document.getElementById("clock-el")
const addBtn = document.getElementById("add-btn")
const cancelBtn = document.getElementById("cancel-btn")
const eventEl = document.getElementById("event")
const dateEl = document.getElementById("date")
const timeEl = document.getElementById("time")
const saveBtn = document.getElementById("save-btn")
const undoCtn = document.getElementById("undo-ctn")
const inputsCtn = document.getElementById("inputs-ctn")
const eventsCtn = document.getElementById("events-ctn")
const savedEvents = JSON.parse(localStorage.getItem("savedEvents"))
const deletedEvents = []

function displayTime() {
	let currentDate = new Date()
	let currentTime = currentDate.toLocaleTimeString()
	clockEl.textContent = currentTime
}

displayTime()
setInterval(displayTime, 1000)

class Event {
	constructor(ev, dt, tm) {
		this.eventName = ev
		this.eventDate = dt
		this.eventTime = tm
	}
}
let newEvent = {}
let events = []

addBtn.addEventListener("click", function(){showInputs()})
saveBtn.addEventListener("click", function(){saveEvent()})
cancelBtn.addEventListener("click", function(){closeInputs()})

const showInputs = () => inputsCtn.style = "display: flex; visibility: visible; opacity: 1"
const closeInputs = () => inputsCtn.style = "display: none; visibility: hidden; opacity: 0"
const showUndo = () => {
	undoCtn.style = "display: initial; visibility: visible; opacity: 1"
	setTimeout(closeUndo, 3500)
}

const closeUndo = () => undoCtn.style = "display: none; visibility: hidden; opacity: 0"

if (savedEvents) {
	events.push(...savedEvents)
	display(events)
}

function saveEvent() {
	if ( !(eventEl.value && dateEl.value && timeEl.value) ) {
		alert("Please complete the task form.")
	} else {
		newEvent = new Event(eventEl.value, dateEl.value, timeEl.value)
		events.push(newEvent)

		eventEl.value = ""
		dateEl.value = ""
		timeEl.value = ""

		localStorage.setItem("savedEvents", JSON.stringify(events))

		closeInputs()
		display(events)
	}
}

function deleteEvent(index) {
	deletedEvents.unshift({ev: events[index], in: index})
	events.splice(index, 1)
	localStorage.setItem("savedEvents", JSON.stringify(events))

	display(events)
	showUndo()
}

function undoDel() {
	events.splice(deletedEvents[0].in, 0, deletedEvents[0].ev)
	display(events)
	closeUndo()
}

function display(arr) {
	let content = ""
	for(const x of arr) {
		content += `
		<div class="events" tabindex="${arr.indexOf(x) + 1}">
			<div class="event-top">
				<button ondblclick="deleteEvent(${arr.indexOf(x)})" title="Double-click to Delete">✖</button>
				<b>${x.eventName}</b>
			</div>
			<div class="event-btm">
				Due on: ${x.eventDate}, at ${x.eventTime}
			</div>
		</div>` 
	}
	if (matchMedia('(max-width:600px)').matches) {
		content = content.replace("ondblclick", "onclick")
	}
	eventsCtn.innerHTML = content
}

document.getElementById("footer").innerHTML = "© 2023 Techy Enochy"