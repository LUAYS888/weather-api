const axios = require('axios');

module.exports = async function handler(req, res) {
  const city = req.query.city || 'Riyadh';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;

    res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      humidity: data.main.humidity
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather', message: err.message });
  }
};
