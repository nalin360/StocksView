// import config from '../config/config.js';

const apiKey = '8292bc0f34msh9c332479f6a0823p14a994jsnb22418fc602f'

async function searchStock() {
    const companyInput = document.getElementById('companyInput').value;
    const stockAnalysisURl = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete'
    // Auto-complete API
    const autoCompleteUrl = `${stockAnalysisURl}?q=${companyInput}&region=US`;
    const autoCompleteOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };


    try {
        const autoCompleteResponse = await fetch(autoCompleteUrl, autoCompleteOptions);
        const autoCompleteResult = await autoCompleteResponse.json();

        // console.log(autoCompleteResult);

        const stockAnalysisURl = 'https://stock-analysis.p.rapidapi.com/api/v1/resources';

        // Check if there are quotes in the response
        if (autoCompleteResult.quotes && autoCompleteResult.quotes.length > 0) {
            const companySymbol = autoCompleteResult.quotes[0].symbol;

            // Company Information API
            const companyInfoUrl = `${stockAnalysisURl}/key-stats?ticker=${companySymbol}`;
            const companyInfoOptions = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'stock-analysis.p.rapidapi.com'
                }
            };

            const companyInfoResponse = await fetch(companyInfoUrl, companyInfoOptions);
            const companyInfoResult = await companyInfoResponse.json();
            // console.log(companyInfoResult);

            // Display the relevant information
            const resultDiv = await document.getElementById('result');
            resultDiv.innerHTML = `
            <h2>${autoCompleteResult.quotes[0].longname}</h2>
            <ul>
            <p>Symbol: ${companySymbol}</p>
            <p>Market Cap: ${companyInfoResult["Market cap (intra-day)"]["Value"]}</p>
            <p>5-year Average Dividend Yield: 
            ${companyInfoResult["5-year average dividend yield "]["Value"]}</p>
            <p>PEG Ratio (5 yr expected): 
            ${companyInfoResult["PEG Ratio (5 yr expected)"]["Value"]}</p>
            <p>Fiscal year ends: 
            ${companyInfoResult["Fiscal year ends"]["Value"]}</p>
            <p>Forward P/E: 
            ${companyInfoResult["Forward P/E"]["Value"]}</p>
            <p>Total debt/equity (mrq): 
            ${companyInfoResult["Total debt/equity (mrq)"]["Value"]}</p>
            </ul>
            
            <!-- Add more information as needed -->
        `;
            // console.log(companyInfoResult["5-year average dividend yield"]);
        } else {
            throw new Error('No quotes found for the provided company');
        }

    } catch (error) {
        console.error(error);

        // Display an error message to the user
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }

}
