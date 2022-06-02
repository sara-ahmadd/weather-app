// Creating a new date instance dynamically with JS.
let d = new Date();
let newDate = d.toDateString();

// The URL to retrieve weather information from his API (country : US)
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API.
// &units=metric to get the Celsius Temperature.
const apiKey = ',&appid=bfd6531ad0276dd8d63d5135364a7925&units=metric';
// the URL of the server to post data.
const myServer = 'http://localhost:3000';
// showing the error message to the UI .
const error = document.getElementById("error");


//(action) is function to get input values.
const action = () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    //call getData to fetch the data from API.
    getData(zip).then((data) => {
        if (data) {
            //create object from API object by using destructuring.
            const {
                main: {
                    temp,
                    humidity,
                    pressure
                },
                name: city,
                weather: [{
                    description
                }]
            } = data;
            const info = {
                newDate,
                city,
                // to get integer number.
                temperature: Math.round(temp),
                humidity,
                pressure,
                description,
                feelings
            };
            //call postData function to post the data in the server.
            postData(myServer + '/add', info);
            //call updateUI function.
            updateUI();
            document.getElementById('entry').style.opacity = 1;
        }
    });

}
// Event listener to add function to existing HTML DOM element.
// acion function called by event listener.
document.querySelector("#generate").addEventListener("click", action);



//getData function to GET Web API Data.
const getData = async (zip) => {
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();

        if (data.cod != 200) {
            // display the error message on UI.
            error.innerHTML = data.message;
            setTimeout(_ => error.innerHTML = '', 2000)
            throw `${data.message}`;
        }

        return data;
    } catch (error) {
        console.log('error', error);
    }
}


// postData function to POST data.
const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(info),
    })
    try {
        const newinfo = await res.json();
        return newinfo;
    } catch (error) {
        console.log('error', error);
    }
};
//get the data to update UI.
const updateUI = async () => {
    const res = await fetch(myServer + '/all')
    try {
        const dataSaved = await res.json();
        document.getElementById('date').innerHTML = 'Date is : ' + dataSaved.newDate;
        document.getElementById('temp').innerHTML = 'Temp is : ' + dataSaved.temperature + '&degC';
        document.getElementById('description').innerHTML = 'Description : ' + dataSaved.description;
        document.getElementById('humidity').innerHTML = 'Humidity is : ' + dataSaved.humidity;
        document.getElementById('pressure').innerHTML = 'Pressure is : ' + dataSaved.pressure;
        document.getElementById('city').innerHTML = 'City is : ' + dataSaved.city;
        document.getElementById('content').innerHTML = 'Your Feelings : ' + dataSaved.feelings;
    } catch (error) {
        console.log('error', error);
    }
};