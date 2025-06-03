const container =document.querySelector('.container');
const search =document.querySelector('.search-box button');
const weatherBox =document.querySelector('.weather-box');
const weatherDetails =document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', ()=>{
    const APIKey = '7b64b21817d23c1d490795d24f3fdad3';
    const city = document.querySelector('.search-box input').value;
    if (city == '') 
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {

        if(data.cod == '404'){
            cityHide.textContent = city; 
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        } 


        const image = document.querySelector('.weather-box img');
        console.log(image.src);
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if(cityHide.textContent == city){
            return;
        }else{
            cityHide.textContent = city;

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');


            switch(data.weather[0].main){
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
                    image.src = 'images/mist.png';
                    break;
    
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
    
                default:
                    image.src = 'images/cloud.png';
            }
            
            temperature.innerHTML =`${parseInt(data.main.temp)}<span>°C</span>`;
            description.innerHTML =`${data.weather[0].description}`;
            humidity.innerHTML =`${data.main.humidity}%`;
            wind.innerHTML =`${parseInt(data.wind.speed)}km/h`; 
        }

        
    });
});