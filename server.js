import http from "http";
import https from "https";

const API_KEY = "rc_live_2c58fe17aceb4d6293f87cd3e18b0e71";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Extraer query string de la URL entrante /api?limit=25&offset=0
  const incoming = req.url.replace(/^\/api\/?/, "");
  const targetUrl = incoming
    ? `https://api.restcountries.com/countries/v5?${incoming.includes("?") ? incoming.split("?")[1] : incoming}`
    : `https://api.restcountries.com/countries/v5`;

  console.log("→ Fetching:", targetUrl);

  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  https.get(targetUrl, options, (apiRes) => {
    let data = "";
    apiRes.on("data", (chunk) => (data += chunk));
    apiRes.on("end", () => {
      console.log("← Status:", apiRes.statusCode);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(apiRes.statusCode);
      res.end(data);
    });
  }).on("error", (err) => {
    console.error("Error:", err.message);
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  });
});

server.listen(3001, () => {
  console.log("✅ Proxy corriendo en http://localhost:3001");
});