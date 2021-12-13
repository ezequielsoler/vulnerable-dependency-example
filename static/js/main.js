document.getElementById('form').addEventListener('submit', e => {
	e.preventDefault();

	fetch('/api/submit', {
		method: 'POST',
		body: JSON.stringify({
			'search': document.querySelector('input[type=text]').value
		}),
		headers: {'Content-Type': 'application/json'}
	}).then(resp => {
		return resp.json();
	}).then(data => {
		document.getElementById('term').innerHTML = `Resultados para: ${data.response.search}`;
		var list = "<li>" + data.response.results.join("</li><li>") + "</li>";
		document.getElementById("results").innerHTML = list;
	});

});