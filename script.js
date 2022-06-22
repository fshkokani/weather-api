let weatherDiv = document.getElementById("weather");
let citiesDiv = document.getElementById("cities");
let subButton = document.getElementById('button');
let subkey = document.getElementById('city');
let cities =[];
let parameter;



// etablish a connection with the weather api:
// fetch request
const requestWeather = async (url) => {
    console.log("3")

    let response = await fetch(url);
    if(!response.ok){
        parameter=10;
        throw new Error(`There is an error with status ${response.status}`)
    };
    let weatherJson = await response.json();
    return weatherJson;
};
// Data extract function
const weather = async (location) => { 
    let url = `http://api.weatherapi.com/v1/forecast.json?key=<>=${location}&days=7`;
    let data = await requestWeather(url);

    // Update HTML
    weatherDiv.innerHTML = ` 
            <h2 id="date">${data.forecast.forecastday[0].date}</h2>
            <h2 id="city">${data.location.name} <br> ${data.location.region} <br> ${data.location.country}</h2>
            <h3 id="tempreture">${data.current.temp_f} F</h3>
            <img src="${data.current.condition.icon}"  alt="weather icon">
            <h3 id="condition">${data.current.condition.text}</h3>
            <div id="more-details">
            <h6><span>${data.current.feelslike_f}</span><br>Feels Like</h6>
            <h6><span>${data.current.wind_mph} mph</span><br>Wind Speed</h6>
            <h6><span>${data.current.humidity} % </span><br>Humidity</h6>
            </div>`;
            if (parameter===10){
                cities.push(newCity.name);
                newCity.submitting(newCity.name);
                parameter=0;
            }
            window.localStorage.setItem('keys', JSON.stringify(cities));
            
};

// create an object city:
let newCity = {
   _name: 'name',
   get name(){
       return this._name
   },
   set name(newName){
       this._name = newName
   },
    getweather(param){
    weather(param);
    },
    submitting(param){
        let cityButton = document.createElement('button')
        cityButton.innerHTML=`<button id="${param}" type="button" value="${param}">${param}</button>`
        citiesDiv.appendChild(cityButton);
        document.getElementById(param).addEventListener('click', eventhandlerFunc);

        }  
    };

// event handler function
eventhandlerFunc = (event) => {
event.preventDefault();
let location;


if ((event.target === subButton) || (event.value === 'Enter') ){ // Any submittion from the input box
    location = document.getElementById('city').value;
    if (location === ""){
        return "not working";
    }
    location = location.toLowerCase().trim();
    newCity.name = location;
    
    if (document.getElementById(location)){ // The city was searched for last time
        newCity.getweather(newCity.name);
    }
    else{
        parameter=10;
        newCity.getweather(newCity.name); // New city submitted to be searched for.
}

} else {
    location = event.target.innerHTML; // Submittion of history buttons
    newCity.name = location;
    newCity.getweather(newCity.name);
}}

eventhandlerFunc2 =()=>{
    let storage = JSON.parse(localStorage.getItem('keys'));
    storage.forEach((cityHistory)=>{
        newCity.name= cityHistory;
        newCity.submitting(newCity.name)

    })
}
subButton.addEventListener('click', eventhandlerFunc);
//subkey.addEventListener('keydown',eventhandlerFunc)
window.addEventListener('load',eventhandlerFunc2)