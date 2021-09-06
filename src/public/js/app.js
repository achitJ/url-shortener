const urlForm = document.getElementById('url-form');
const largeUrl = document.getElementById('long-url-input');
const shortUrlTxt = document.getElementById('short-url-text');
const shortUrl = document.getElementById('short-url-input');
const shortUrlDiv = document.getElementById('new-url-div');

function copyText() {

	shortUrl.select();
	shortUrl.setSelectionRange(0, 99999);

	navigator.clipboard.writeText(shortUrl.value);

}


urlForm.reset();

urlForm.addEventListener('submit', (event) => {

	event.preventDefault();

	const reqBody = {
		url: largeUrl.value
	};

	let currUrl = window.location.href;

	fetch('/api/url', {

		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
	      'Content-Type': 'application/json'
	    },
	    redirect: 'follow',
	    referrerPolicy: 'no-referrer',
	    body: JSON.stringify(reqBody)

	})
	.then((response) => { return response.json() })
	.then((data) => {

		console.log(data);

		if(data.error)
		{
			return shortUrlTxt.textContent = "ERROR: " + data.error;
		}

		currUrl += data.shortURL;

		shortUrl.value = currUrl;
		shortUrlDiv.style.display = 'flex';

	})
})