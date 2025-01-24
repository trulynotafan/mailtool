# 📧 JSON Email Tool

A simple utility that takes a JSON file with customer data and sends personalized emails using the GeminiAPI key.

## 🚀 Features

- Accepts JSON files with attributes:
  - `name`
  - `place`
  - `business type`
- Sends personalized emails tailored to each recipient.
- Lightweight and easy to configure.

## 🛠️ Requirements

- Node.js (v14+)
- GeminiAPI key

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/trulynotafan/mailtool
   cd mailtool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your GeminiAPI key to a `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

## 📄 Usage

1. Prepare your JSON input file:
   ```json
   [
     {
       "name": "John Doe",
       "place": "New York",
       "business type": "Restaurant"
     },
     {
       "name": "Jane Smith",
       "place": "London",
       "business type": "Tech Startup"
     }
   ]
   ```

2. Run the tool:
   ```bash
   npm start 
   ```
   Then input your JSON file. 

3. The tool will process the JSON and send emails to each entry.

## 🙏 Acknowledgments

- GeminiAPI for powering the email functionality.

## 📝 License

MIT License - free to use and modify.

---

This tool is designed for basic email automation and is not intended for advanced workflows or large-scale campaigns.

You can find the json files by using the other tool called Business Finder which is available [here](https://github.com/trulynotafan/Business_Finder) 
