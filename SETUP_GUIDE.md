# Setup & Testing Guide

## Quick Start (Local Testing)

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- ~500MB free disk space (for Puppeteer/Chromium)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/Brajesh2022/Git-action.git
cd Git-action

# 2. Install dependencies (this may take 2-3 minutes)
npm install

# 3. Start the server
npm start
```

The server will start on `http://localhost:3000`

### Testing the Web Interface

1. Open your browser and go to `http://localhost:3000`
2. Paste your verification URL in the text area
3. Click "Extract Final Link"
4. Wait for the automation to complete (30-45 seconds)
5. Copy the final link from the result box

### Testing via API (cURL)

```bash
# Test the synchronous extraction endpoint
curl -X POST http://localhost:3000/api/extract-sync \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://tech.unblockedgames.world/?sid=VWNwbWlPV1lMWFcwa1ZDb1dxQVBZc29Pb0k0c2NuQU9QakIvSHhwZ3c5TUxtQ1pkVjhBMEw3TktPbG9BeXhzM2ZoNW5tZXdHNzN2SDM0VlJvU0NueDN3LzVkVnlldWpnSU5mRjlxY0cwdW0wR2kxYVhKUWFwZnBSeG4xSmNqS0lVc3VyR20zWUdFZUZnVU5QOUlSZkp0Q3kwMjVZOGZ0akxKdjhQa2k0R21Jc3FBTFZWQStMaHBDaVFmYXZGMXM2Zm8yNzM2dVVKL2Z4dFV3czlVN2VEU08wbHpsb3hwMEtXL3hUSWFlemNUSW1uUlMvSk9PU0k3aXFlY0RxRjYvQw=="
  }'
```

Expected response:
```json
{
  "success": true,
  "finalUrl": "https://driveseed.org/file/zvoGedGENhFNMQcHu6ro",
  "message": "Link extracted successfully"
}
```

## GitHub Actions Setup

### Prerequisites
- GitHub account with repository access
- The code already pushed to your repository

### How to Use GitHub Actions

1. **Go to your repository**: https://github.com/Brajesh2022/Git-action

2. **Navigate to Actions tab**:
   - Click on "Actions" in the top menu
   - Select "Extract Final Link" workflow on the left

3. **Run the workflow**:
   - Click "Run workflow" button
   - Enter your verification URL in the input field
   - Click "Run workflow" (green button)

4. **Monitor execution**:
   - Watch the workflow run in real-time
   - Check the logs for detailed output

5. **Get the result**:
   - Once completed, go to "Artifacts" section
   - Download "final-link" artifact
   - Open "final_link.txt" to see your extracted link

### Workflow Output

The GitHub Actions workflow will:
- Show real-time logs of the extraction process
- Display the final URL in the job output
- Save the result to an artifact file
- Keep the artifact for 7 days

## Troubleshooting

### Issue: "npm install" takes too long

**Solution**: 
- This is normal for Puppeteer (it downloads Chromium)
- First install may take 3-5 minutes
- Subsequent installs are faster

### Issue: "Browser launch failed"

**Solution**:
```bash
# Try installing with --force flag
npm install --force

# Or clear npm cache
npm cache clean --force
npm install
```

### Issue: "Cannot find module 'puppeteer'"

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution**:
```bash
# Use a different port
PORT=8080 npm start
```

### Issue: Extraction times out

**Solution**:
- The target page may have changed its structure
- Update the selectors in `extractor.js`
- Check if the verification flow is still the same

## File Structure

```
.
├── extractor.js              # Core automation logic
├── server.js                 # Express server
├── package.json              # Dependencies
├── README.md                 # Main documentation
├── SETUP_GUIDE.md           # This file
├── public/
│   └── index.html           # Web interface
└── .github/workflows/
    └── extract-link.yml     # GitHub Actions workflow
```

## Environment Variables

### Local Server

```bash
# Set custom port
PORT=8080 npm start

# Set timeout (milliseconds)
TIMEOUT=60000 npm start
```

### GitHub Actions

No environment variables needed - the workflow is self-contained.

## Performance Tips

1. **First run**: May take longer due to Chromium download
2. **Subsequent runs**: Faster as Chromium is cached
3. **Concurrent requests**: Limit to 1-2 simultaneous extractions
4. **Rate limiting**: Add delays between multiple requests

## Security Considerations

⚠️ **Important Security Notes**:

1. **GitHub Token**: 
   - The token you provided should be regenerated immediately
   - Never commit tokens to the repository
   - Use GitHub Secrets for sensitive data

2. **URL Handling**:
   - URLs are processed locally
   - No data is stored or logged
   - Results are temporary

3. **Best Practices**:
   - Use HTTPS URLs only
   - Validate URLs before processing
   - Monitor API usage

## Advanced Configuration

### Customizing Puppeteer Options

Edit `extractor.js` to modify:

```javascript
// Change headless mode to see browser
headless: false

// Increase timeout
timeout: 60000

// Change viewport size
setViewport({ width: 1920, height: 1080 })

// Add proxy support
args: ['--proxy-server=http://proxy:port']
```

### Adding Retry Logic

Modify `extractor.js` to add retries:

```javascript
async function extractWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await extractFinalLink(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
}
```

## Support & Debugging

### Enable Debug Logging

```bash
# Run with debug output
DEBUG=* npm start
```

### Check Logs

```bash
# View server logs
tail -f server.log

# View GitHub Actions logs
# Go to Actions tab → Select workflow run → View logs
```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Timeout waiting for selector" | Page structure changed | Update selectors in extractor.js |
| "Browser launch failed" | Insufficient resources | Increase disk space or memory |
| "Cannot find module" | Dependencies not installed | Run `npm install` |
| "EADDRINUSE" | Port already in use | Use different port with `PORT=8080` |

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start server: `npm start`
3. ✅ Test web interface: Open `http://localhost:3000`
4. ✅ Test API: Use curl commands above
5. ✅ Deploy to GitHub Actions: Push code and use Actions tab

## Additional Resources

- [Puppeteer Documentation](https://pptr.dev/)
- [Express.js Guide](https://expressjs.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: November 2, 2025
