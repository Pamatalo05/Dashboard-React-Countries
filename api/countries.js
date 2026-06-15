const API_KEY = "rc_live_2c58fe17aceb4d6293f87cd3e18b0e71";
const BASE_URL = "https://api.restcountries.com/countries/v5";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { limit = 25, offset = 0 } = req.query;

  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}