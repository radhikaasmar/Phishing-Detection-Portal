class PhishingDetector {
  constructor(options = {}) {
    // Import your trained model components
    this.threshold = options.threshold ?? 0.5;
    this.externalPredict = null; // optional async function(text) => probability
    // keyword lists tuned for phishing heuristics
    this.suspiciousKeywords = [
      'verify', 'account', 'login', 'password', 'secure', 'update', 'confirm',
      'urgent', 'immediately', 'click', 'link', 'bank', 'paypal', 'amazon',
      'invoice', 'billing', 'suspend', 'reactivate', 'winner', 'congratulations'
    ];
    this.credentialKeywords = ['password', 'pin', 'ssn', 'security code', 'cvv'];
  }

  setThreshold(t) {
    this.threshold = t;
  }

  setExternalPredict(fn) {
    // fn should be async and return probability between 0 and 1
    this.externalPredict = fn;
  }

  async detect(text, options = {}) {
    // options can include { threshold, useExternalModel:true }
    if (!text || typeof text !== 'string') {
      return { label: 'Legitimate', probability: 0.0 };
    }

    // try external model first (if configured and requested)
    if (options.useExternalModel && this.externalPredict && typeof this.externalPredict === 'function') {
      try {
        const p = await this.externalPredict(text);
        const prob = Math.max(0, Math.min(1, Number(p) || 0));
        return {
          label: prob >= (options.threshold ?? this.threshold) ? 'Phishing' : 'Legitimate',
          probability: prob
        };
      } catch (err) {
        // fall back to heuristic on error
        // ...existing code...
      }
    }

    const heur = this.computeHeuristicProbability(text);
    const prob = heur.probability;
    const label = prob >= (options.threshold ?? this.threshold) ? 'Phishing' : 'Legitimate';

    return { label, probability: prob, heuristic: heur.details };
  }

  preprocess(text) {
    if (!text || typeof text !== 'string') return '';
    // remove HTML tags
    let s = text.replace(/<[^>]*>/g, ' ');
    // normalize whitespace
    s = s.replace(/\s+/g, ' ').trim();
    // lower-case
    s = s.toLowerCase();
    // keep punctuation for some heuristics but collapse repeated punctuation
    s = s.replace(/!{2,}/g, '!').replace(/\?{2,}/g, '?');
    return s;
  }

  extractUrls(text) {
    const urlRegex = /https?:\/\/[^\s'"]+|www\.[^\s'"]+|[a-z0-9.-]+\.[a-z]{2,}\/?[^\s'"]*/gi;
    const matches = text.match(urlRegex);
    return matches || [];
  }

  containsIpDomain(url) {
    // detect IPv4 in domain (e.g., http://192.168.0.1/...)
    const ipRegex = /\/\/\d{1,3}(?:\.\d{1,3}){3}|(^|\s)\d{1,3}(?:\.\d{1,3}){3}(:\d+)?/;
    return ipRegex.test(url);
  }

  allCapsRatio(text) {
    const letters = text.replace(/[^A-Za-z]/g, '');
    if (!letters.length) return 0;
    const upper = letters.replace(/[^A-Z]/g, '').length;
    return upper / letters.length;
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  computeHeuristicProbability(text) {
    const s = this.preprocess(text);
    const urls = this.extractUrls(s);

    // feature calculations
    const kwMatches = this.suspiciousKeywords.reduce((acc, kw) => acc + (s.includes(kw) ? 1 : 0), 0);
    const credMatches = this.credentialKeywords.reduce((acc, kw) => acc + (s.includes(kw) ? 1 : 0), 0);
    const numUrls = urls.length;
    const ipInUrl = urls.some(u => this.containsIpDomain(u)) ? 1 : 0;
    const exclaimCount = (s.match(/!/g) || []).length;
    const allCaps = this.allCapsRatio(text);
    const len = Math.min(text.length, 1000) / 1000; // normalize length

    // weighted sum (weights are heuristic and can be tuned)
    const score =
      0.9 * Math.log(1 + kwMatches) +      // suspicious keywords
      1.2 * credMatches +                  // credential requests are stronger signal
      0.8 * numUrls +                      // presence/number of links
      1.5 * ipInUrl +                      // IP in domain is strong signal
      0.2 * Math.log(1 + exclaimCount) +   // exclamation emphasis
      0.9 * allCaps +                      // all caps text
      0.05 * len;                          // longer messages slightly affect score

    // map to probability 0..1
    const probability = Math.min(0.9999, Math.max(1e-6, this.sigmoid(score - 1.5)));
    return { probability, details: { kwMatches, credMatches, numUrls, ipInUrl, exclaimCount, allCaps, len } };
  }
}

// UMD-friendly export:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhishingDetector; // CommonJS (if used elsewhere)
} else {
  // When loaded via importScripts in extension service worker, attach to global scope
  self.PhishingDetector = PhishingDetector;
}