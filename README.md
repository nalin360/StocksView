# Stock Analysis Web App

This is a simple web application that allows users to search for stock information using the Yahoo Finance API and a custom Stock Analysis API.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- API keys for Yahoo Finance and Stock Analysis API

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/stock-analysis-web-app.git
   cd stock-analysis-web-app
   ```

2. Create a configuration file:

   Create a file named `config.js` in the `src/config` directory with the following content:

   ```javascript
   const config = {
       apiKey: 'YOUR_YAHOO_FINANCE_API_KEY',
       // Add other configuration parameters as needed
   };

   export default config;
   ```

   Replace `'YOUR_YAHOO_FINANCE_API_KEY'` with your actual Yahoo Finance API key.

### Usage

1. Open the `index.html` file in a web browser.
2. Enter the company name in the input field and click the search button.
3. The application will fetch stock information using the Yahoo Finance API and display relevant details on the web page.

### Example

```javascript
// Code snippet demonstrating how to access and display 5-year average dividend yield in the resultDiv

// ...

// Display the relevant information
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = `
    <h2>${companyInfoResult.shortname}</h2>
    <p>Symbol: ${companyInfoResult.symbol}</p>
    <p>Sector: ${companyInfoResult.sector}</p>
    <p>Market Cap: ${companyInfoResult.marketCap}</p>
    `;

// Check if the property exists before accessing 'Value'
if (companyInfoResult["5-year average dividend yield"] && companyInfoResult["5-year average dividend yield"].Value) {
    resultDiv.innerHTML += `<p>5-year Average Dividend Yield: ${companyInfoResult["5-year average dividend yield"].Value}</p>`;
}

// Add more information as needed

// ...
```
