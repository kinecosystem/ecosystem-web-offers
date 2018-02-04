
let container: HTMLOListElement;

export function append(message: string): void {
	const item = document.createElement("li");
	item.innerText = message;
	item.style.padding = "3px 0 4px 2px";
	container.appendChild(item);
}

document.addEventListener("DOMContentLoaded", () => {
	container = document.createElement("ol");
	container.style.margin = "0";
	container.style.padding = "0";
	container.style.listStyle = "none";

	document.body.appendChild(container);
}, false);