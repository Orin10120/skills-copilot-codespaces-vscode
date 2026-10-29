const tasks = [];

function render() {
	// Rebuild the task list whenever the task state changes.
	const list = document.querySelector("#task-list");
	list.innerHTML = "";

	tasks.forEach((task, index) => {
		const item = document.createElement("li");
		item.innerHTML = `
			<label>
				<input type="checkbox" ${task.done ? "checked" : ""}>
				<span>${task.text}</span>
			</label>
			<button type="button" aria-label="Delete task">Delete</button>
		`;

		item.querySelector("input").addEventListener("change", (event) => {
			tasks[index].done = event.target.checked;
			item.querySelector("span").style.textDecoration = event.target.checked
				? "line-through"
				: "none";
		});

		item.querySelector("button").addEventListener("click", () => {
			tasks.splice(index, 1);
			render();
		});

		list.appendChild(item);
	});
}

document.body.innerHTML = `
	<main>
		<h1>My Tasks</h1>
		<form id="task-form">
			<input id="task-input" placeholder="What needs doing?" required>
			<button>Add task</button>
		</form>
		<ul id="task-list"></ul>
	</main>
`;

document.querySelector("#task-form").addEventListener("submit", (event) => {
	event.preventDefault();
	const input = document.querySelector("#task-input");
	tasks.push({ text: input.value.trim(), done: false });
	input.value = "";
	input.focus();
	render();
});

render();
