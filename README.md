# SignalizeAI

SignalizeAI is a Chrome extension that helps users quickly understand what a business website does and how it can be approached from a sales perspective.

It analyzes publicly visible website content and converts it into clear, actionable sales insights directly inside the browser.

## ✨ What it does

* Analyzes the current website you’re viewing
* Summarizes what the business does
* Identifies the target customer
* Suggests a value proposition and sales angle
* Assigns a sales readiness score
* Recommends the best sales persona
* Lets users save, filter, and export analyses

## 🔐 Authentication

Users can optionally sign in using Google to:

* Save analyses
* Access them later
* Export results as CSV or Excel

Authentication and storage are handled securely using **Supabase**.

## 🧠 AI Processing

* Only publicly visible website text is analyzed
* No personal user data is sent to the AI
* API keys are securely handled server-side
* Requests are rate-limited and protected

## 🔧 Tech Stack

* Chrome Extension (Manifest V3)
* JavaScript
* Supabase (Auth & Storage)
* Cloudflare Workers (Backend)
* AI API (Text analysis)

## 🔒 Backend

The backend is deployed using **Cloudflare Workers** and is **not publicly accessible**.
It exists solely to:

* Secure API keys
* Enforce rate limits
* Process AI requests safely

## 📄 Privacy

SignalizeAI respects user privacy.

* No tracking
* No ads
* No selling of data
* No background monitoring

See [`privacy.md`](./PRIVACY.md) for full details.

## 📬 Contact

For questions or feedback:

📧 **[signalizeaiorg@gmail.com](mailto:signalizeaiorg@gmail.com)**

---
