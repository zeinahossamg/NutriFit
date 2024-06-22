document.addEventListener("DOMContentLoaded", function() {
    const extraDiv = document.querySelector(".extra");
    const API_KEY = '8367717409245459eadf4a8e9dcae1df';
    const APP_ID = '016de66c';
    let f=[];
    let fbd=[];
    let fm=[];

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
                    if(this.name==="foodItembd"){
                        fbd.push(data);
                        
                    }else if(this.name==="foodItemM"){
                        fm.push(data);
                    }
                    f.push(data);
                    calculatem(fm);
                    displayData(f);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            } else {
                // Remove the item from 'f' if unchecked
                f = f.filter(item => item.foods[0].food_name !== foodItem);
                calculatem(fm);
                displayData(f);
            }
            
        });
    });

    const person = {
        totalCalories: 2900,
        totalProtein: 253.75,
        totalCarbs: 362.50,
        totalFat: 48.33
    };
    
    // function calculatem(fm) {
    //     let pte = person.totalProtein;
    //     let cte=person.totalCarbs;
    //     let fte=person.totalFat
    //     let cal=person.totalCalories;
    //     let pbd = (pte / 3) / 2;
    //     let pm = (pte / 3) * 2 / 3;
    //     let cbd = (cte/3) / 2;
    //     let cm= (cte/3) * 2 / 3;
    //     let fbd=(fte/3)/2;
    //     let fMM=(fte/3)*2/3;
    
    //     fm.forEach(food => {
    //         if (food.foods && food.foods.length > 0) {
    //             const foodItem = food.foods[0];
    //             const proteinPerGram = foodItem.nf_protein / foodItem.serving_weight_grams;
    //             const calorieperGram=foodItem.nf_calories/foodItem.serving_weight_grams;
    //             const carbperGram=foodItem.nf_total_carbohydrate/foodItem.serving_weight_grams;
    //             const fatperGram=foodItem.nf_total_fat/foodItem.serving_weight_grams;
    
    //             console.log(`Protein per gram: ${proteinPerGram}`);
    //             console.log(`Protein per breakfast: ${pbd}`);
    //             if(food.foods[0].nf_protein>food.foods[0].nf_total_carbohydrate){
    //             const proteinLunch = pm * proteinPerGram;
    //             const gramsToEat = pm / proteinPerGram;
    //             const tc=carbperGram*gramsToEat;
    //             const tf=fatperGram*gramsToEat;
    //             const calll=calorieperGram*gramsToEat;
                
                
    //             console.log(`Should eat protein at lunch meals: ${proteinLunch}`);
    //             console.log(`Grams to eat: ${gramsToEat}`);
    //             console.log(`Calories: ${foodItem.nf_calories}`);
    //             console.log('Carbs (g):',tc);
    //             console.log('Fats (g):',tf);
    //             console.log('pro (g)',proteinLunch);
                
    //             cal-=calll*3;
    //             pte-=proteinLunch*3;
    //             cte-=tc*3;
    //             fte-=tf*3;

    //             console.log('cal',cal);
    //             console.log('pro',pte);
    //             console.log('carb',cte);
    //             console.log('fat',fte);
    //         }else if(food.foods[0].nf_total_carbohydrate>food.foods[0].nf_protein){
    //             const carblunch=cm*carbperGram;
    //             const gramte=cm/carbperGram;
    //             const tp=proteinPerGram*gramte;
    //             const ft=fatperGram*gramte;
    //             const calo=calorieperGram*gramte;

    //             console.log(`Should eat carbs at lunch meals: ${carblunch}`);
    //             console.log(`Grams to eat: ${gramte}`);
    //             console.log(`Calories: ${foodItem.nf_calories}`);
    //             console.log('Carbs (g):',carblunch);
    //             console.log('Fats (g):',ft);
    //             console.log('pro (g)',tp);
                
    //             cal-=calo*3;
    //             cte-=carblunch*3;
    //             pte-=tp*3;
    //             fte-=ft*3;

    //             console.log('cal',cal);
    //             console.log('pro',pte);
    //             console.log('carb',cte);
    //             console.log('fat',fte);

    //             }else{
    //             const fatlunch=fMM*fatperGram;
    //             const gramteF=fMM/fatperGram;
    //             const tpF=proteinPerGram*gramteF;
    //             const carbo=carbperGram*gramteF;
    //             const caloF=calorieperGram*gramteF;

    //             console.log(`Should eat carbs at lunch meals: ${fatlunch}`);
    //             console.log(`Grams to eat: ${gramteF}`);
    //             console.log(`Calories: ${caloF}`);
    //             console.log('Carbs (g):',carbo);
    //             console.log('Fats (g):',fatlunch);
    //             console.log('pro (g)',tpF);
                
    //             cal-=caloF*3;
    //             cte-=carbo*3;
    //             pte-=tpF*3;
    //             fte-=fatlunch*3;

    //             console.log('cal',cal);
    //             console.log('pro',pte);
    //             console.log('carb',cte);
    //             console.log('fat',fte);
    //             }
                
    //             // Ensure fbd and fm are properly logged if they exist
    //             if (typeof fbd !== 'undefined' && fbd.length > 0) {
    //                 console.log(fbd[0]);
    //             } else {
    //                 console.log('fbd is not defined or empty');
    //             }
    
    //             if (fm.length > 0) {
    //                 console.log(fm[0]);
    //             } else {
    //                 console.log('fm is empty');
    //             }
    //         } else {
    //             console.log('Food item structure is invalid or empty.');
    //         }
    //     });
    // }

    
        function calculatem(fm) {
            let pte = person.totalProtein;
            let cte = person.totalCarbs;
            let fte = person.totalFat;
            let cal = person.totalCalories;
            let pbd = (pte / 3) / 2;
            let pm = (pte / 3) * 2 / 3;
            let cbd = (cte / 3) / 2;
            let cm = (cte / 3) * 2 / 3;
            let fbd = (fte / 3) / 2;
            let fMM = (fte / 3) * 2 / 3;
    
            let calculatedData = [];
            let gramsToEat, tc, tf, calll, proteinLunch, carblunch, fatlunch, gramte, gramteF,pt;
            fm.forEach(food => {
                if (food.foods && food.foods.length > 0) {
                    const foodItem = food.foods[0];
                    const proteinPerGram = foodItem.nf_protein / foodItem.serving_weight_grams;
                    const caloriePerGram = foodItem.nf_calories / foodItem.serving_weight_grams;
                    const carbPerGram = foodItem.nf_total_carbohydrate / foodItem.serving_weight_grams;
                    const fatPerGram = foodItem.nf_total_fat / foodItem.serving_weight_grams;
    
    
                    if (food.foods[0].nf_protein > food.foods[0].nf_total_carbohydrate) {
                        proteinLunch = pm * proteinPerGram;
                        gramsToEat = pm / proteinPerGram;
                        tc = carbPerGram * gramsToEat;
                        tf = fatPerGram * gramsToEat;
                        calll = caloriePerGram * gramsToEat;
    
                        cal -= calll * 3;
                        pte -= proteinLunch * 3;
                        cte -= tc * 3;
                        fte -= tf * 3;
                    } else if (food.foods[0].nf_total_carbohydrate > food.foods[0].nf_protein) {
                        carblunch = cm * carbPerGram;
                        gramte = cm / carbPerGram;
                        tp = proteinPerGram * gramte;
                        tf = fatPerGram * gramte;
                        calll = caloriePerGram * gramte;
    
                        cal -= calll * 3;
                        cte -= carblunch * 3;
                        pte -= tc * 3;
                        fte -= tf * 3;
                    } else {
                        fatlunch = fMM * fatPerGram;
                        gramteF = fMM / fatPerGram;
                        tc = carbPerGram * gramteF;
                        tp = proteinPerGram * gramteF;
                        calll = caloriePerGram * gramteF;
    
                        cal -= calll * 3;
                        cte -= tc * 3;
                        pte -= tf * 3;
                        fte -= fatlunch * 3;
                    }
    
                    calculatedData.push({
                        foodName: foodItem.food_name,
                        gramsToEat: gramsToEat || gramte || gramteF,
                        calories: calll,
                        carbs: carblunch || tc,
                        fats: tf || fatlunch,
                        proteins: proteinLunch || tp || tpF
                    });
    
                } else {
                    console.log('Food item structure is invalid or empty.');
                }
            });
    
            displayCalculatedData(calculatedData);
        }
    
        function displayCalculatedData(data) {
            const plan = document.querySelector(".plan");
    
            plan.innerHTML = ""; // Clear previous content
    
            const table = document.createElement("table");
            table.classList.add("nutrition-table");
    
            const header = `
                <tr>
                    <th>Item</th>
                    <th>Grams to Eat</th>
                    <th>Calories</th>
                    <th>Carbs (g)</th>
                    <th>Fats (g)</th>
                    <th>Proteins (g)</th>
                </tr>
            `;
            table.innerHTML = header;
    
            data.forEach((item, index) => {
                const row = `
                    <tr class="${index % 2 === 0 ? 'white-row' : 'grey-row'}">
                        <td>${item.foodName}</td>
                        <td>${item.gramsToEat}</td>
                        <td>${item.calories}</td>
                        <td>${item.carbs}</td>
                        <td>${item.fats}</td>
                        <td>${item.proteins}</td>
                    </tr>
                `;
    
                table.innerHTML += row;
            });
    
            plan.appendChild(table);
        }
    
        // Attach event listeners, fetch data, and call calculatem as necessary.
    
    
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
                calculatem(f);
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