document.querySelector('.timestamp')
    .innerText = (new Date()).toLocaleTimeString();

document.querySelector('.ajax-html')
    .addEventListener('click', getAjaxHtml);
    
function getAjaxHtml() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html-placeholder')
                .innerHTML = xhr.responseText;
        } 
    }
    xhr.open('GET', 'client-data.html', true);
    xhr.send();
}

document.querySelector('.fetch-html')
    .addEventListener('click', fetchHtml);
    
// function fetchHtml() {
//     fetch('client-data.html')
//         .then( response => response.text() )
//         .then( html => document.querySelector('.html-placeholder')
//                 .innerHTML = html );
// }

async function fetchHtml() {
    const response = await fetch('client-data.html');
    const html = await response.text();
    document.querySelector('.html-placeholder').innerHTML = html;
} 

document.querySelector('.ajax-json')
    .addEventListener('click', getAjaxJson);
    
function getAjaxJson() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.client-name')
                .innerText = clientData.name;
            document.querySelector('.account-balance')
                .innerText = clientData.balance;
        } 
    }
    xhr.open('GET', 'client-data.json', true);
    xhr.send();
}

document.querySelector('.fetch-json')
    .addEventListener('click', fetchJSON);
    
async function fetchJSON() {
    const response = await fetch('client-data.json');
    const clientData = await response.json();
    document.querySelector('.client-name').innerText = clientData.name;
    document.querySelector('.account-balance').innerText = clientData.balance;
} 

document.querySelector('.login-form input[type=submit]')
    .addEventListener('click', login);

function login(e) {
    e.preventDefault();
    fetch('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            name: document.querySelector('.login-form input[name=name]').value,
            password: document.querySelector('.login-form input[name=password]').value
        })
    })
        .then( _ => document.querySelector('.login-form').reset());
}

document.querySelector('.weather .get-temp')
    .addEventListener('click', getTemp);

async function getTemp() {
    const city = document.querySelector('.weather input[name=city]').value;
    const response = await fetch(`https://samples.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=b1b15e88fa797225412429c1c50c122a1`);
    const data = await response.json();
    document.querySelector('.weather input[name=temp]')
        .value = data.list[0].temp.day;
}


document.querySelector('.curr-convert').addEventListener('click', currConvert);
    
function currConvert(e) {
    e.preventDefault();
    const currFrom = document.querySelector('.converter input[name=curr-from]').value;
    const currTo = document.querySelector('.converter input[name=curr-to]').value;
    const currKey = currFrom + '_' + currTo;   
    fetch(`https://free.currencyconverterapi.com/api/v6/convert?q=${currKey}&compact=ultra&apiKey=d1b5218e0be93e157106`)
        .then( response => response.json() )
        .then( currency => {
           const rate = currency[currKey];
           const sourceAmount = document.querySelector('.converter input[name=curr-amount]').value;
           const convertedAmount = rate * sourceAmount;
           document.querySelector('.converter output[name=curr-converted]')
            .innerText = convertedAmount.toFixed(2);
        });
}