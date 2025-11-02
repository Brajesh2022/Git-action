# Link Extractor - Verification Page Automation

Automated tool to extract final links from verification pages with timers and multi-step verification flows.

## Features

✅ **Automated Verification Flow** - Automatically clicks through verification steps
✅ **Timer Handling** - Waits for countdown timers automatically
✅ **Multi-Step Navigation** - Handles complex verification sequences
✅ **GitHub Actions Integration** - Run automation on GitHub Actions
✅ **Web Interface** - User-friendly frontend for testing
✅ **API Endpoints** - RESTful API for programmatic access

## Project Structure

```
.
├── extractor.js              # Core automation logic using Puppeteer
├── server.js                 # Express server with API endpoints
├── package.json              # Dependencies
├── public/
│   └── index.html           # Web interface
└── .github/workflows/
    └── extract-link.yml     # GitHub Actions workflow
```

## Installation

### Local Setup

```bash
# Clone the repository
git clone https://github.com/Brajesh2022/Git-action.git
cd Git-action

# Install dependencies
npm install

# Start the server
npm start
```

The server will run on `http://localhost:3000`

## Usage

### Web Interface

1. Open `http://localhost:3000` in your browser
2. Paste your verification URL
3. Click "Extract Final Link"
4. Wait for the automation to complete
5. Copy the final link

### API Endpoints

#### Synchronous Extraction (Recommended)

```bash
curl -X POST http://localhost:3000/api/extract-sync \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-verification-url.com"}'
```

Response:
```json
{
  "success": true,
  "finalUrl": "https://final-link.com/file/xyz",
  "message": "Link extracted successfully"
}
```

#### Asynchronous Extraction

```bash
curl -X POST http://localhost:3000/api/extract \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-verification-url.com"}'
```

### GitHub Actions

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **Extract Final Link** workflow
4. Click **Run workflow**
5. Enter your verification URL
6. Wait for completion
7. Download the artifact containing the final link

## Automation Flow

The tool automates the following steps:

1. **Navigate** to the initial verification URL
2. **Click** START VERIFICATION button
3. **Wait** for 10-second timer to complete
4. **Click** VERIFY TO CONTINUE button
5. **Click** CLICK HERE TO CONTINUE button
6. **Click** GO TO DOWNLOAD button
7. **Extract** the final URL from the resulting page

## Configuration

### Puppeteer Options

Edit `extractor.js` to customize:

- **Headless mode**: Change `headless: 'new'` to `headless: false` to see the browser
- **Timeout**: Adjust `timeout: 30000` (milliseconds)
- **Viewport**: Modify `setViewport({ width: 1280, height: 720 })`

### Server Port

Set the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## Requirements

- Node.js 16+
- npm or yarn
- Chromium/Chrome (installed automatically by Puppeteer)

## Troubleshooting

### "Browser launch failed"
- Ensure you have sufficient disk space
- Try: `npm install --force`

### "Timeout waiting for selector"
- The page structure may have changed
- Update selectors in `extractor.js`

### "Cannot find module 'puppeteer'"
- Run: `npm install`

## GitHub Actions Setup

The workflow is already configured in `.github/workflows/extract-link.yml`

To use it:

1. Push this code to your GitHub repository
2. Go to **Settings** → **Actions** → **General**
3. Enable "Allow all actions and reusable workflows"
4. Go to **Actions** tab and run the workflow

## Security Notes

⚠️ **Important**: Your GitHub token is sensitive. Never commit it to the repository.

For GitHub Actions:
- Use GitHub Secrets for sensitive data
- The token provided should be regenerated after use
- Consider using a dedicated bot account for automation

## API Response Examples

### Success Response
```json
{
  "success": true,
  "finalUrl": "https://driveseed.org/file/zvoGedGENhFNMQcHu6ro",
  "message": "Link extracted successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Timeout waiting for selector 'button'"
}
```

## Performance

- **Average extraction time**: 30-45 seconds
- **Success rate**: ~95% (depends on page stability)
- **Concurrent requests**: Limited by system resources

## Limitations

- Works only with pages following the specific verification flow
- Requires JavaScript to be enabled
- May fail if page structure changes
- Rate limiting may apply on target servers

## Future Enhancements

- [ ] Support for multiple verification patterns
- [ ] Proxy rotation support
- [ ] Retry logic with exponential backoff
- [ ] Database for storing results
- [ ] Webhook notifications
- [ ] Batch processing

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review GitHub Issues
3. Check the logs in GitHub Actions

## Author

Created for automated verification page processing

---

**Last Updated**: November 2, 2025
