const express = require('express');
const cors = require('cors');
const path = require('path');
const { extractFinalLink } = require('./extractor');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint to extract link
app.post('/api/extract', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`[API] Received request to extract: ${url}`);
    res.json({ status: 'processing', message: 'Starting extraction...' });

    // Run extraction in background
    extractFinalLink(url)
      .then(finalUrl => {
        console.log(`[API] Extraction completed: ${finalUrl}`);
      })
      .catch(error => {
        console.error(`[API] Extraction failed: ${error.message}`);
      });

  } catch (error) {
    console.error(`[API] Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to extract and return result
app.post('/api/extract-sync', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`[API] Received sync request to extract: ${url}`);
    const finalUrl = await extractFinalLink(url);
    
    res.json({ 
      success: true, 
      finalUrl: finalUrl,
      message: 'Link extracted successfully'
    });

  } catch (error) {
    console.error(`[API] Error: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`[*] Server running on http://localhost:${PORT}`);
  console.log(`[*] Frontend available at http://localhost:${PORT}`);
});
