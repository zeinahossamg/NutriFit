document.addEventListener("DOMContentLoaded", function() {
    const selectedElement = document.getElementById("IN");
    const extraDiv = document.querySelector(".extra");
    const generateButton = document.getElementById("GB");

    class Ndata {
      constructor(calorieAdjustment, proteinPercentage, carbPercentage, fatPercentage, proteinGrams, carbGrams, fatGrams) {
        this.calorieAdjustment = calorieAdjustment;
        this.proteinPercentage = proteinPercentage;
        this.carbPercentage = carbPercentage;
        this.fatPercentage = fatPercentage;
        this.proteinGrams = proteinGrams;
        this.carbGrams = carbGrams;
        this.fatGrams = fatGrams;
      }
    }

    let Ndata1;

    generateButton.addEventListener("click", function() {
      console.log("Button clicked");

      extraDiv.innerHTML = ""; // Clear previous content

      const target = selectedElement.value;
      console.log("Selected target:", target);

      let calorieAdjustment;
      let proteinPercentage;
      let carbPercentage;
      let fatPercentage;

      switch(target) {
        case "Weight Loss":
          calorieAdjustment = -500;
          proteinPercentage = 0.23;
          carbPercentage = 0.45;
          fatPercentage = 0.32;
          break;
        case "Weight Gain":
          calorieAdjustment = 700;
          proteinPercentage = 0.27;
          carbPercentage = 0.55;
          fatPercentage = 0.18;
          break;
        case "Lean Bulking":
          calorieAdjustment = 500;
          proteinPercentage = 0.35;
          carbPercentage = 0.50;
          fatPercentage = 0.15;
          break;
        case "Cutting":
          calorieAdjustment = -300;
          proteinPercentage = 0.35;
          carbPercentage = 0.40;
          fatPercentage = 0.25;
          break;
        default:
          alert("Please select a target.");
          return;
      }

      const burnRate = parseFloat(document.getElementById("INBR").value);
      if (isNaN(burnRate)) {
        alert("Please enter a valid Burn Rate.");
        return;
      }

      const adjustedCalories = burnRate + calorieAdjustment;
      const totalCalories = adjustedCalories.toFixed(2);
      const proteinGrams = (adjustedCalories * proteinPercentage / 4).toFixed(2);
      const carbGrams = (adjustedCalories * carbPercentage / 4).toFixed(2);
      const fatGrams = (adjustedCalories * fatPercentage / 9).toFixed(2);

      Ndata1 = new Ndata(adjustedCalories, proteinPercentage, carbPercentage, fatPercentage, proteinGrams, carbGrams, fatGrams);

      const resultHTML = `
    <div>
      <h2>Nutrition Plan Summary</h2>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 15px;
          overflow: hidden;
          background-color:white;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          background-color:white;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
      <table>
        <tr>
          <th>Category</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Total Calories for the Day</td>
          <td>${totalCalories} kcal</td>
        </tr>
        <tr>
          <td>Percentage of Protein</td>
          <td>${(proteinPercentage * 100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>Grams of Protein</td>
          <td>${proteinGrams}g</td>
        </tr>
        <tr>
          <td>Percentage of Carbs</td>
          <td>${(carbPercentage * 100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>Grams of Carbs</td>
          <td>${carbGrams}g</td>
        </tr>
        <tr>
          <td>Percentage of Fats</td>
          <td>${(fatPercentage * 100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>Grams of Fats</td>
          <td>${fatGrams}g</td>
        </tr>
      </table>
    </div>
`;
extraDiv.innerHTML = resultHTML;

    });

    document.getElementById("s").addEventListener("click", async (event) => {
      event.preventDefault();

      let selectedGender;
    const radios = document.getElementsByName("radio-group");
    
    for (const radio of radios) {
        if (radio.checked) {
            selectedGender = radio.nextElementSibling.innerText.trim();
            break;
        }
    }
    const t=selectedElement.value;
    const br = parseFloat(document.getElementById("INBR").value);
      if (isNaN(br)) {
        alert("Please enter a valid Burn Rate.");
        return;
      }
      const Height=document.getElementById("INH").value;
    const Weight=document.getElementById("INW").value;
    const age=document.getElementById("INA").value;
    const BFP=document.getElementById("INFP").value;
    console.log("Selected gender:", selectedGender);

      const name = "Youssef Eldemerdash";
      // const age = 20;
      const email = "youssefashrafdem@gmail.com";

      const response = await fetch('/addPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, email,Target: t,Height,Weight,BurnRate: br,BodyFatPercent: BFP,Gender: selectedGender, nutrition_data:Ndata1 })
      });

      if (response.ok) {
        alert('Person added successfully');
        console.log(t);
      } else {
        alert('Error adding person');
      }
    });
  });
  




// document.addEventListener("DOMContentLoaded", function() {
//     const selectedElement = document.getElementById("IN");
//     const extraDiv = document.querySelector(".extra");
//     const generateButton = document.getElementById("GB");
    
//     class Ndata{
//         constructor(calorieAdjustment,proteinPercentage,carbPercentage,fatPercentage,proteinGrams,carbGrams,fatGrams){
//             this.calorieAdjustment=calorieAdjustment;
//             this.proteinPercentage=proteinPercentage;
//             this.carbPercentage=carbPercentage;
//             this.fatPercentage=fatPercentage;
//             this.proteinGrams=proteinGrams;
//             this.carbGrams=carbGrams;
//             this.fatGrams=fatGrams;
//         }
//     }

//     generateButton.addEventListener("click", function() {
//         console.log("Button clicked");

//         extraDiv.innerHTML = ""; // Clear previous content

//         const target = selectedElement.value;
//         console.log("Selected target:", target);

//         let calorieAdjustment;
//         let proteinPercentage;
//         let carbPercentage;
//         let fatPercentage;

//         switch(target) {
//             case "Weight Loss":
//                 calorieAdjustment = -500;
//                 proteinPercentage = 0.23;
//                 carbPercentage = 0.45;
//                 fatPercentage = 0.32;
//                 break;
//             case "Weight Gain":
//                 calorieAdjustment = 700;
//                 proteinPercentage = 0.27;
//                 carbPercentage = 0.55;
//                 fatPercentage = 0.18;
//                 break;
//             case "Lean Bulking":
//                 calorieAdjustment = 500;
//                 proteinPercentage = 0.35;
//                 carbPercentage = 0.50;
//                 fatPercentage = 0.15;
//                 break;
//             case "Cutting":
//                 calorieAdjustment = -300;
//                 proteinPercentage = 0.35;
//                 carbPercentage = 0.40;
//                 fatPercentage = 0.25;
//                 break;
//             default:
//                 alert("Please select a target.");
//                 return;
//         }

//         const burnRate = parseFloat(document.getElementById("INBR").value);
//         if (isNaN(burnRate)) {
//             alert("Please enter a valid Burn Rate.");
//             return;
//         }

//         const adjustedCalories = burnRate + calorieAdjustment;
//         const totalCalories = adjustedCalories.toFixed(2);
//         const proteinGrams = (adjustedCalories * proteinPercentage / 4).toFixed(2);
//         const carbGrams = (adjustedCalories * carbPercentage / 4).toFixed(2);
//         const fatGrams = (adjustedCalories * fatPercentage / 9).toFixed(2);

//         const Ndata1=new Ndata(adjustedCalories,proteinPercentage,carbPercentage,fatPercentage,proteinGrams,carbGrams,fatGrams);

//         const resultHTML = `
//             <div>
//                 <h2>Nutrition Plan Summary</h2>
//                 <p>Total Calories for the Day: ${totalCalories} kcal</p>
//                 <p>Percentage of Protein: ${(proteinPercentage * 100).toFixed(2)}%</p>
//                 <p>Grams of Protein: ${proteinGrams}g</p>
//                 <p>Percentage of Carbs: ${(carbPercentage * 100).toFixed(2)}%</p>
//                 <p>Grams of Carbs: ${carbGrams}g</p>
//                 <p>Percentage of Fats: ${(fatPercentage * 100).toFixed(2)}%</p>
//                 <p>Grams of Fats: ${fatGrams}g</p>
//             </div>
//         `;
//         extraDiv.innerHTML = resultHTML;
//         console.log(Ndata1.proteinGrams);
//     });
    
// });
// document.getElementById("save").addEventListener('submit',async  (event) => {
//     event.preventDefault();

//     const name = "Youssef Eldemerdash";
//     const age = 20;
//     const email = "youssefashrafdem@gmail.com";

//         const response = await fetch('/addPerson', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name, age, email, Ndata1 })
//         });

//         if (response.ok) {
//             alert('Person added successfully');
//         } else {
//             alert('Error adding person');
//         }

// });