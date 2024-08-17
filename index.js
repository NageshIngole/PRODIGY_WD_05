const url =
    'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
    'f00c38e0279b7bc85480c3fe775d518c';



async function weatherFn(cName) {
    const temp =
        `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}



function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    
    // Fetch the weather icon using the icon code from the API response
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Set the image source to the icon URL
    $('#weather-icon').attr('src', iconUrl);
    
    $('#weather-info').fadeIn();
}

