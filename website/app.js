/* Global Variables */
const apiKey = 'ca7d3c092a48d61e6de28af803b12c3a';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (!zipCode) {
    alert('Please enter a valid zip code.');
    return;
  }

  getWeatherData(baseURL, zipCode, apiKey)
    .then((data) => {
      if (data.cod !== 200) {
        alert(`Error: ${data.message}`);
        return;
      }

      postData('http://localhost:3000/add', {
        date: new Date().toLocaleDateString(),
        temp: data.main.temp,
        feel: feelings,
      });
    })
    .then(() => {
      updateUI();
    });
}

const getWeatherData = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(`${baseURL}${zipCode}&appid=${apiKey}&units=imperial`);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error fetching weather data:', error);
  }
};

const postData = async (url = '', data = {}) => {
    console.log("Posting data:", data, "To URL:", url);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log("Response:", response);
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      if (error.name === 'SyntaxError') {
        console.error('Error parsing JSON:', error);
      } else if (error.message.startsWith('HTTP error!')) {
        console.error('Network error:', error.message);
      } else {
        console.error('Error posting data:', error);
      }
    }
  };
  

const updateUI = async () => {
  const request = await fetch('http://localhost:3000/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temp)}°F`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.feel}`;
  } catch (error) {
    console.log('Error updating UI:', error);
  }
};
