document.addEventListener("DOMContentLoaded", function() {
    const extraDiv = document.querySelector(".extra");
    const API_KEY = '8367717409245459eadf4a8e9dcae1df';
    const APP_ID = '016de66c';
    let f=[];

    document.getElementById("addItemButton").addEventListener("click", function() {
            const foodItem = document.getElementById("foodItem").value;
            const apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
            
            fetch(apiUrl, {
                method:'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': APP_ID,
                    'x-app-key': API_KEY
                },
                body: JSON.stringify({
                    query: foodItem
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                f.push(data);
                console.log(f[0].foods[0].nf_protein/f[0].foods[0].serving_weight_grams);
                console.log(f[0].foods[0].nf_calories);
                //extraDiv.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                //extraDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            });
             //console.log(data.protien);
    });

});
function displayData(data) {
    // Assuming 'data' is an object with nutrition information
    const extraDiv = document.querySelector(".resultsDiv");

    // Clear previous content if needed
    extraDiv.innerHTML = "";

    // Example of displaying some properties from 'data'
    const html = `
        <div>
            <h2>Nutrition Data</h2>
            <p>Calories: ${data.nf_protein}</p>
            <p>Protein Percentage: ${data.proteinPercentage}</p>
            <p>Carb Percentage: ${data.carbPercentage}</p>
            <p>Fat Percentage: ${data.fatPercentage}</p>
            <p>Protein Grams: ${data.proteinGrams}</p>
            <p>Carb Grams: ${data.carbGrams}</p>
            <p>Fat Grams: ${data.fatGrams}</p>
        </div>
    `;

    // Append HTML to 'extraDiv' element
    extraDiv.innerHTML = html;
}