const select    = document.getElementById('city-select');
const spinner   = document.getElementById('spinner');
const info      = document.getElementById('weather-info');
const cityName  = document.getElementById('city-name');
const tempEl    = document.getElementById('temp');
const humidityEl= document.getElementById('humidity');
const descEl    = document.getElementById('desc');

//API Key de OpenWeatherMap
const API_KEY = '9b3aaf735addd3d8930dd92c5d1ec39c';

select.addEventListener('change', () => {
  const city = select.value;
  console.log('City selected:', city);
  if (!city) return;

  // show spinner y ocultar info
  spinner.classList.remove('hidden');
  info.classList.add('hidden');
  console.log('Showing spinner, hiding weather info');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},BO&units=metric&lang=es&appid=${API_KEY}`;
  console.log('Fetching URL:', url);

  fetch(url)
    .then(res => {
      console.log('Fetch response status:', res.status);
      return res.json();
    })
    .then(data => {
      console.log('Received weather data:', data);
      cityName.textContent = data.name;
      tempEl.textContent = data.main.temp.toFixed(1);
      humidityEl.textContent = data.main.humidity;
      descEl.textContent = data.weather[0].description;
      info.classList.remove('hidden');
      console.log('Updated DOM with weather info');
    })
    .catch(err => {
      console.error('Error fetching weather:', err);
      alert('Error al obtener el clima');
    })
    .finally(() => {
      spinner.classList.add('hidden');
      console.log('Hid spinner');
    });
});
