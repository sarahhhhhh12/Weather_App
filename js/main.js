var searchInput = document.getElementById('search')
var btnInput = document.getElementById('submit')
const alertMsg = document.querySelector(".alert");


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
getApi("cairo");


async function getApi(city) {
  try {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4dbcd10e8c014e6aa6b132508241206&q=${city}&days=3`
    );
    a = await weather.json();
    displayData(weather);
    alertMsg.classList.add("d-none");
  } catch (error) {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4dbcd10e8c014e6aa6b132508241206&q=cairo&days=3`
    );
    a = await weather.json();
    displayData(weather);
    alertMsg.classList.remove("d-none");
    if (searchInput.value == "") {
      alertMsg.classList.add("d-none");
    }
  }
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (location) {
    // Get the latitude and longitude of the current location
    let latitude = location.coords.latitude
    let longitude = location.coords.longitude
    // Fetch and display weather data for the current location
    getApi(`${latitude},${longitude}`)
  })
}
function displayData(api) {
  var cartona = ``;
  for (let i = 0; i < a.forecast.forecastday.length; i++) {
    let date = new Date(a.forecast.forecastday[i].date);
    if (i == 0) {
      cartona += `
             <div class="col-md-4 ">
          <div class="card shadow-lg">
            <div class="day d-flex justify-content-between p-2 shadow-lg">
              <p>${days[date.getDay()]}</p>
              <p>${date.getDate() + monthNames[date.getMonth()]}</p>
            </div>
           
           <div class="location p-3">
            <p>${a.location.name}</p>
            <small>${a.location.region}</small>

           </div>
           <div class="degree fs-2 p-3">
            <h1 class="fa-3x fw-bold">${Math.floor(a.current.temp_c)}<sup>o</sup>C</h1>
           </div>
           <div class="image">
            <img src="https:${a.current.condition.icon}"  alt="">
           </div>
           <div class="state p-3">
            <p>${a.current.condition.text}</p>
           </div>
           <div class="group d-flex gap-3">
            <div class="hummidity  p-2">
              <img src="Images/icon-umberella.png"  alt="">
              <span>${a.forecast.forecastday[0].day.daily_chance_of_rain} %</span>
            </div>
            <div class="wind  p-2">
              <img src="Images/icon-wind.png"  alt="">
              <span>  ${a.current.wind_kph}</span>
            </div>
            <div class="compass  p-2">
              <img src="Images/icon-compass.png"  alt="">
              <span>East</span>
            </div>

           </div>
          </div>
        </div>
            
            
            `
    } else {
      cartona +=
        `
             <div class="col-md-4 ">
                      <div class=" card shadow-lg">
                        <div class="day text-center p-2 shadow-lg">
                          <p>${days[date.getDay()]}</p>
            
                        </div>
                         <div class=" m-auto ">
                     <div class="image d-flex justify-content-center align-items-center ">
                      <img src="https:${a.forecast.forecastday[i].day.condition.icon}" alt="">
                     </div>
                     <div class="degree fs-5 p-3 text-center">
                      <h5 class=" fw-bold">${Math.floor(a.forecast.forecastday[i].day.maxtemp_c)} <sup>o</sup>C</h5>
                     </div>
                       <div class="degree fs-5 p-3 text-center">
                      <h5 class="text-secondary fw-bold">${a.forecast.forecastday[i].day.mintemp_c} <sup>o</sup></h5>
                     </div>
                     <div class="state p-3 text-center">
                      <p class="text-info">${a.forecast.forecastday[i].day.condition.text}</p>
                     

                     </div>
                     </div>
                    
                      </div>
                    </div>
            `
        ;
    }

  }
  document.getElementById('rowData').innerHTML = cartona
}

searchInput.addEventListener("input", a => {
  getApi(searchInput.value)
});

btnInput.addEventListener('click', function () {
  getApi(searchInput.value)

})
