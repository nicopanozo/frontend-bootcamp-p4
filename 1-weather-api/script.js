// script.js
const select     = document.getElementById('city-select');
const spinner    = document.getElementById('spinner');
const info       = document.getElementById('weather-info');
const cityName   = document.getElementById('city-name');
const tempEl     = document.getElementById('temp');
const windEl     = document.getElementById('wind');
const descEl     = document.getElementById('desc');

const cityCoords = {
  'La Paz':      { latitude: -16.4897, longitude: -68.1193 },
  'Santa Cruz': { latitude: -17.7899, longitude: -63.1985 },
  'Cochabamba': { latitude: -17.3916, longitude: -66.1568 },
  'Sucre':      { latitude: -19.0196, longitude: -65.2619 },
  'Oruro':      { latitude: -17.9614, longitude: -67.1064 }
};

select.addEventListener('change', async () => {
  const city = select.value;
  if (!city) return;

  spinner.classList.remove('hidden');
  info.classList.add('hidden');

  const { latitude, longitude } = cityCoords[city];
  // Open-Meteo current weather endpoint
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
              `&longitude=${longitude}&current_weather=true&timezone=America%2FLa_Paz`;

  try {
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    // current_weather provides temperature (°C) and windspeed (km/h)
    const cw = json.current_weather;
    updateUI({
      name: city,
      temp: cw.temperature,
      wind: cw.windspeed,
      // Open-Meteo doesn't give “description”—we can approximate:
      desc: `Wind ${cw.winddirection}°, ${cw.weathercode}`
    });

  } catch (err) {
    alert(`Failed to fetch live weather: ${err.message}`);
    console.error(err);
  } finally {
    spinner.classList.add('hidden');
  }
});

function updateUI({ name, temp, wind, desc }) {
  cityName.textContent   = name;
  tempEl.textContent     = temp.toFixed(1);
  windEl.textContent     = wind.toFixed(1);
  descEl.textContent     = desc;
  info.classList.remove('hidden');
}
