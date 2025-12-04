# Phishing Detection System

A comprehensive phishing detection platform that combines machine learning models with heuristic analysis to identify phishing emails and malicious URLs across web and email channels.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Chrome Extension](#chrome-extension)
- [Datasets](#datasets)
- [Model Details](#model-details)

---

## ✨ Features

- **Email Classification**: ML-based detection of phishing emails with high accuracy
- **URL Classification**: Identifies malicious URLs using Random Forest classifier
- **Web Interface**: User-friendly Flask web portal for testing
- **Chrome Extension**: Real-time Gmail integration for automatic phishing detection
- **Heuristic Detection**: Rule-based detection combined with ML models
- **Threshold Tuning**: Customizable confidence thresholds for predictions

---

## 📁 Project Structure

```
Project/
├── Email/
│   ├── email.ipynb                 # Email classification model training
│   ├── test.ipynb                  # Email model testing
│   ├── combined_dataset.csv        # Processed email dataset
│   └── phishing_rf_pipeline.pkl    # Trained email model
|   └── phishing-email-dataset      # Contains all datasets
├── Url/
│   ├── malicious-urls-classification.ipynb  # URL classification model
│   ├── test.ipynb                  # URL model testing
│   ├── malicious_phish.csv         # URL dataset
│   ├── rf_phishing_model.joblib    # Trained URL model
│   └── tfidf_vectorizer.joblib     # TF-IDF vectorizer
├── gmail-phishing-detector/        # Chrome extension
│   ├── manifest.json
│   ├── background.js
│   ├── popup/
│   │   ├── popup.html
│   │   └── popup.js
│   ├── content-scripts/
│   └── model/
│       └── model.js
├── templates/
│   └── index.html                  # Web UI
├── app.py                          # Flask application
├── requirements.txt                # Dependencies
└── README.md                       # This file
```

---

## 📦 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Google Chrome (for extension)

---

## 🚀 Setup & Installation

### 1. Clone and Navigate to Project

```git clone https://github.com/radhikaasmar/Phishing-Detection-Portal.git```

### 2. Download Required Datasets

Before running the models, download the datasets:

- **Email Dataset**: [Phishing Email Dataset on Kaggle](https://www.kaggle.com/datasets/naserabdullahalam/phishing-email-dataset)
  - Extract to: `Email/phishing-email-dataset/`

- **URL Dataset**: [Malicious URLs Dataset on Kaggle](https://www.kaggle.com/datasets/sid321axn/malicious-urls-dataset)
  - Extract to: `Url/` as `malicious_phish.csv` 

### 3. Create Virtual Environment

**macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (PowerShell):**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Running the Application

### Train Models (Optional - Pre-trained models included)

To retrain the models with your dataset:

**Email Model:**
```bash
cd Email
jupyter notebook email.ipynb
# Run all cells
```

**URL Model:**
```bash
cd Url
jupyter notebook malicious-urls-classification.ipynb
# Run all cells
```

### Start Web Server

```bash
python app.py
```

Open your browser and navigate to:
```
http://127.0.0.1:5000
```

Enter email text or URL to test classification.

---

## 🧩 Chrome Extension

### Installation for Local Testing

1. **Open Chrome Extensions Page**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Click the toggle in the top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked"
   - Select: `Phishing-Detection-Portal/gmail-phishing-detector`

4. **Verify Installation**
   - Open [Gmail](https://mail.google.com)
   - Right-click page → **Inspect** → **Console** to view extension logs
   - Click extension icon in Chrome toolbar for popup


