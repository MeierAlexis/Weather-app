const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const weatherForecast = document.querySelector('.weather-forecast');

search.addEventListener('click', () => {
    const APIKey = 'de3f6ec2a72ab436b951a87fdf2246de';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const description = document.querySelector('.weather-box .description');
            const error404 = document.querySelector('.not-found');
            const cityHide = document.querySelector('.city-hide')


            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '400px'
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                weatherForecast.classList.remove('active');
                return;
            }
            container.style.height = '555px'
            weatherBox.classList.add('active');
            weatherForecast.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');



            if (cityHide.textContent == city) {
                return;
            } else {
                cityHide.textContent = city;
                container.classList.add('active')
                container.style.height = '555px';
                weatherBox.classList.add('active');
                error404.classList.remove('active');
                weatherForecast.classList.add('active');




                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${json.wind.speed}km/h`;
                description.innerHTML = `${json.weather[0].description}`;
            }
        })

        .catch(error => console.error('Error:', error));
});

const d = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CheckDay(day) {
    const adjustedDay = (day + d.getDay() + 1) % 7;
    return adjustedDay < 0 ? adjustedDay + 7 : adjustedDay;
}
function CheckMonth(index) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + index);

    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(currentDate);
    const dayOfMonth = currentDate.getDate();

    return `${dayOfMonth} ${month}`;
}


search.addEventListener('click', () => {
    const APIKey = 'de3f6ec2a72ab436b951a87fdf2246de';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 4; i++) {
                const temperatureElement = document.querySelector(`.next-temperature${i + 1}Prom`);
                temperatureElement.innerHTML = `${(data.list[i].main.temp_max).toFixed(1)}°C`;
            }
            for (let i = 0; i < 4; i++) {
                const DayElement = document.getElementById("day" + (i + 1));
                DayElement.innerHTML = weekday[CheckDay(i)];
            }
            for (let i = 0; i < 4; i++) {
                const image = document.getElementById("IMAGE" + (i + 1));
                switch (data.list[i].weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }
            }
            for (let i = 0; i < 4; i++) {
                const Month = document.getElementById("month-day" + (i + 1));
                Month.innerHTML = CheckMonth(i)
            }
        })
        .catch(error => console.error('Error:', error));
});



