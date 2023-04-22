    // http://api.weatherapi.com/v1/forecast.json?key=b0d4fd8ed45245469b0165345232302&q=${city}&days=3&aqi=no&alerts=no

    let inputsearch = document.getElementById("inputsearch");
    let city = document.getElementById("city");
    let temp = document.getElementById("temp");
    let text = document.getElementById("text");
    let d = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthNames = [" January", " February", " March", " April", " May", " June"," July", " August", " September", " October", " November", " December"];
    let dayName = days[d.getDay()];

    async function getweather(city="cairo") {
    let data = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=b0d4fd8ed45245469b0165345232302&q=${city}&days=3&aqi=yes&alerts=no`
    );
    let res = await data.json();
    let arr=res.forecast.forecastday;
    displayCurrent(res);
    displayForcast(arr);
    }
    getweather();
    inputsearch.addEventListener("blur", function (el) {
    getweather(el.target.value);
    });
    function displayCurrent(res) {
    let temp = `<div class="our-one">
        <div class="mt-1 ms-2">
            <small class="">${days[d.getDay()]}</small>
            <small class="text-end ms-5">${monthNames[d.getMonth()]+1}</small>
            </div> 
        <div class="calender ">
            <h6 class="text-start py-4"id="city">${res.location.name}</h6>
            <div class="d-flex ">
            <h1 class="text-start mt-2 fa-4x"id="temp">${res.current.temp_c}<sup>o</sup>C</h1>
            <img src="https:${res.current.condition.icon}" class="ms-1 w-25" id="temp">
            </div>
        </div>
        <p class="text-start  text-info " id="text">${res.current.condition.text}</p>
    </div>
    <div class="text-start d-flex justify-content-evenly py-3">
    <i class="fa-solid fa-umbrella text-muted fa-2x"></i>20%
    <i class="fa-solid fa-wind text-muted fa-2x"></i>20km/h
    <i class="fa-regular fa-compass text-muted fa-2x"></i>East
    </div>
    `;
    document.getElementById("current").innerHTML = temp;
    }
    function displayForcast(arr) {
    let  temp=``;
    for(let i=1;i<arr.length;i++)
    {
        // debugger;
        temp += `<div class="col-sm-6 ">
        <div class="our-two ">
            <div class="head1 p-1 ">
                <p>${days[d.getDay()]}</p>
            </div>
            <div id="myRow"> 
            <img src="https:${arr[i].day.condition.icon}" class=" pt-3 word" id="temp">
                <h2 class="text-center pt-2 p-2">${arr[i].day.maxtemp_c}<sup>o</sup>C</h2>
                <p class="text-center pt-2 text-white">${arr[i].day.mintemp_c}<sup>o</sup>c</p>
                <p class="text-center  text-info ">${arr[i].day.condition.text}</p>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('forcast').innerHTML=temp;
    }

