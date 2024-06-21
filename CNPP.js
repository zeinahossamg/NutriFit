document.addEventListener("DOMContentLoaded", function() {
    const extraDiv = document.querySelector(".extra");
    const API_KEY = '8367717409245459eadf4a8e9dcae1df';
    const APP_ID = '016de66c';
    let f=[];

    document.querySelectorAll('#INBFPP input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const foodItem = this.value;
            const apiUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
            
            if (this.checked) {
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-app-id': APP_ID,
                        'x-app-key': API_KEY
                    },
                    body: JSON.stringify({ query: foodItem })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Data:', data);
                    // Assuming 'f' is a global array to store food data
                    f.push(data);
                    calculateProtein(f);
                    displayData(f);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            } else {
                // Remove the item from 'f' if unchecked
                f = f.filter(item => item.foods[0].food_name !== foodItem);
                calculateProtein(f);
                displayData(f);
            }
        });
    });
    
    function calculateProtein(f) {
        f.forEach(food => {
            let pg = food.foods[0].nf_protein / food.foods[0].serving_weight_grams;
            console.log(pg);
            const pte = 209.25;
            const pbd = ((pte / 3)) / 2;
            console.log(pbd);
            const pm = ((pte / 3) * 2) / 3;
            let toeat = pm * pg;
            let grr = pm / pg;
            console.log("should eat protein at lunch meals: ", toeat);
            console.log("grams to eat: ", grr);
            console.log(food.foods[0].nf_calories);
        });
    }
    
    
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
                calculateProtein(f);
                displayData(f);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                //extraDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            });
             //console.log(data.protien);
    });

});

function displayData(f) {
    // Assuming 'data' is an object with nutrition information
    const extraDiv = document.querySelector(".resultsDiv");

    // Clear previous content if needed
    extraDiv.innerHTML = "";

    // Create the table and header
    const table = document.createElement("table");
    table.classList.add("nutrition-table");

    const header = `
        <tr>
            <th>Item</th>
            <th>Serving (g)</th>
            <th>Calories (cal)</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
        </tr>
    `;
    table.innerHTML = header;

    // Loop through each item and create a row in the table
    f.forEach((item, index) => {
        for(let v=0;v<item.foods.length;v++){
        const food = item.foods[v];

        const row = `
            <tr class="${index % 2 === 0 ? 'white-row' : 'grey-row'}">
                <td>${food.food_name}</td>
                <td>${food.serving_weight_grams}</td>
                <td>${food.nf_calories}</td>
                <td>${food.nf_protein}</td>
                <td>${food.nf_total_carbohydrate}</td>
                <td>${food.nf_total_fat}</td>
            </tr>
        `;
    
        table.innerHTML += row;
    }
    });


    // Append the table to 'extraDiv' element
    extraDiv.appendChild(table);
}


// Append data to extraDiv
                // foodItemd.innerHTML = `
                //     <p><strong>Item ${index + 1}</strong></p>
                //     <p>Food Name: ${food.food_name}</p>
                //     <p>Calories: ${food.nf_calories}</p>
                //     <p>Serving: ${food.serving_weight_grams} Gram</p>
                // `;
                // extraDiv.appendChild(dataDiv);
                // })
                //extraDiv.innerHTML = JSON.stringify(data, null, 2);




// function displayData(f) {
//     // Assuming 'data' is an object with nutrition information
//     const extraDiv = document.querySelector(".resultsDiv");

//     // Clear previous content if needed
//     extraDiv.innerHTML = "";

//     f.forEach((item, index) => {
//         const food = item.foods[0];
        
//         // Example of displaying some properties from 'food'
//         const html = `
//             <div>
//                 <h2>Nutrition Data for Item ${index + 1}</h2>
//                 <p>Calories: ${food.nf_calories}</p>
//                 <p>Protein Grams: ${food.nf_protein}</p>
//                 <p>Carb Grams: ${food.nf_total_carbohydrate}</p>
//                 <p>Fat Grams: ${food.nf_total_fat}</p>
//             </div>
//         `;

//         // Append HTML to 'extraDiv' element
//         extraDiv.innerHTML += html;
//     });
// }