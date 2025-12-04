# Overview
This repo contains:
- A simple web UI (templates/index.html) that is rendered with Jinja (Flask) or can be inspected as static HTML.
- A Chrome extension (folder `gmail-phishing-detector`) that injects content scripts into Gmail and uses a popup (`popup/`).
- Model code under `model/` (heuristics + optional model loading).


- Download datasets from https://www.kaggle.com/datasets/naserabdullahalam/phishing-email-dataset and put it in /Email/phishing-email-dataset
- Download dataset for url from https://www.kaggle.com/datasets/sid321axn/malicious-urls-dataset and move to /Url
- Run python files i.e. email.ipynb and url.ipynb in respective folders

## Download Required Datasets

Before running the models, download the datasets:

- **Email Dataset**: [Phishing Email Dataset on Kaggle](https://www.kaggle.com/datasets/naserabdullahalam/phishing-email-dataset)
  - Extract to: `Email/phishing-email-dataset/`

- **URL Dataset**: [Malicious URLs Dataset on Kaggle](https://www.kaggle.com/datasets/sid321axn/malicious-urls-dataset)
  - Extract to: `Url/`

## Run Phishing Detection Portal

1. Create a virtualenv and activate:
   - python3 -m venv venv
   - macOS / Linux: `source venv/bin/activate`
   - Windows (PowerShell): `.\venv\Scripts\Activate.ps1`

2. Install dependencies (minimal):
   - `pip install -r requirements.txt`

3. Run:
   - `python app.py`
   - Visit: http://127.0.0.1:5000

---

## Chrome extension — local testing (unpacked)
1. Open Chrome -> `chrome://extensions/`
2. Enable "Developer mode" (top-right).
3. Click "Load unpacked" and select the extension folder:
   `/Users/radhikaasmar/VIT/Project/gmail-phishing-detector`
4. Make sure `manifest.json` is present (already in repo) and `host_permissions` includes `https://mail.google.com/*`.
5. Open Gmail in a new tab and watch console logs (right-click page -> Inspect -> Console). Also open `chrome://extensions/` and click "background page" (or Service Worker) to see extension logs.




