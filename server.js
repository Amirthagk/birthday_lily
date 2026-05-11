const express = require('express');
const localtunnel = require('localtunnel');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(express.static(__dirname));

app.listen(PORT, async () => {
  console.log(`Local server is running on http://localhost:${PORT}`);
  try {
    const tunnel = await localtunnel({ port: PORT });
    console.log(`Public URL: ${tunnel.url}`);
    
    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
  } catch (err) {
    console.error('Localtunnel error:', err);
  }
});
