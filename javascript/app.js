// import config from '../Config/config';
const apiKey =  '8292bc0f34msh9c332479f6a0823p14a994jsnb22418fc602f'

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

        console.log(autoCompleteResponse);

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
            console.log(companyInfoResult["5-year average dividend yield"]);

            // Display the relevant information
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
            <h2>${companyInfoResult.shortname}</h2>Z
            <p>Symbol: ${companySymbol}</p>
            <p>Sector: ${companyInfoResult.sector}</p>
            <p>Market Cap: ${companyInfoResult.marketCap}</p>
            <p>5-year Average Dividend Yield: ${companyInfoResult["5-year average dividend yield"].Value}</p>
            <!-- Add more information as needed -->
        `;
        console.log(companyInfoResult["5-year average dividend yield"]);
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
