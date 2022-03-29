let form = document.querySelector('#upload');
let file = document.querySelector('#file');

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {

	event.preventDefault();
	if (!file.value.length) return;
	let reader = new FileReader();
	reader.onload = logFile;
	reader.readAsText(file.files[0]);
}

function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);
    barGraph(json);
}

