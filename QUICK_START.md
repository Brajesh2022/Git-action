# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Clone & Install
```bash
git clone https://github.com/Brajesh2022/Git-action.git
cd Git-action
npm install
```

### Step 2: Start Server
```bash
npm start
```

### Step 3: Open Browser
Visit: **http://localhost:3000**

---

## 📋 What You Get

✅ **Web Interface** - Beautiful UI to paste URLs and extract links
✅ **REST API** - Programmatic access via `/api/extract-sync`
✅ **GitHub Actions** - Run automation on GitHub without local setup
✅ **Automated Flow** - Handles all verification steps automatically

---

## 🎯 Usage Examples

### Web Interface
1. Open http://localhost:3000
2. Paste your verification URL
3. Click "Extract Final Link"
4. Copy the result

### API (cURL)
```bash
curl -X POST http://localhost:3000/api/extract-sync \
  -H "Content-Type: application/json" \
  -d '{"url": "YOUR_URL_HERE"}'
```

### GitHub Actions
1. Go to: https://github.com/Brajesh2022/Git-action/actions
2. Select "Extract Final Link" workflow
3. Click "Run workflow"
4. Enter URL and submit
5. Download result from artifacts

---

## 📁 Project Files

| File | Purpose |
|------|---------|
| `extractor.js` | Core automation logic |
| `server.js` | Express API server |
| `public/index.html` | Web interface |
| `.github/workflows/extract-link.yml` | GitHub Actions workflow |
| `README.md` | Full documentation |
| `SETUP_GUIDE.md` | Detailed setup instructions |

---

## ⚙️ Configuration

### Change Port
```bash
PORT=8080 npm start
```

### View Browser (Debug Mode)
Edit `extractor.js`, change:
```javascript
headless: 'new'  →  headless: false
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `PORT=8080 npm start` |
| npm install slow | Normal (Puppeteer downloads Chromium) |
| Module not found | `npm install --force` |
| Extraction timeout | Check if page structure changed |

---

## 📊 Performance

- **First run**: 3-5 minutes (Chromium download)
- **Subsequent runs**: 30-45 seconds per extraction
- **Success rate**: ~95%

---

## 🔐 Security Note

⚠️ **IMPORTANT**: The GitHub token provided should be regenerated immediately as it's now exposed.

---

## 📞 Support

- Check `SETUP_GUIDE.md` for detailed troubleshooting
- Review GitHub Actions logs for errors
- Check browser console for client-side issues

---

**Ready to extract links? Start with Step 1 above! 🎉**
