const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fetch = require('node-fetch');

// Express app
const app = express();
const dbURI = 'mongodb+srv://youssef_dem:Programmer-02851@cluster0.gu5krui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const API_KEY = '8367717409245459eadf4a8e9dcae1df';
const APP_ID = '016de66c';

// Define your API route
app.get('/api/external-data', async (req, res) => {
  try {
    const response = await fetch(`https://trackapi.nutritionix.com/v2/search/item?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching external data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(8080, () => {
   console.log('server is running on http://localhost:8080');
});


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

const schema = new mongoose.Schema({
  name: String,
  age: String,
  email: String,
  Target: String,
  Height: String,
  Weight: String,
  BurnRate: Number,
  BodyFatPercent: Number,
  Gender: String,
  nutrition_data: Object
});

const Person = mongoose.model('Person', schema);

// POST route to add a new person
app.post('/addPerson', async (req, res) => {
  const { name, age, email, Target, Height, Weight, BurnRate, BodyFatPercent, Gender, nutrition_data } = req.body;

  const newPerson = new Person({ name, age, email, Target, Height, Weight, BurnRate, BodyFatPercent, Gender, nutrition_data });

  try {
    await newPerson.save();
    res.status(201).send('Person added successfully');
    console.log("Data saved successfully");
  } catch (error) {
    res.status(400).send('Error adding person');
    console.error("Error adding person:", error);
  }
});



// // app.listen(8080,()=>{
// //   console.log('server is running on http://localhost:8080');
// // });
// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to serve homepage.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'nutritionplans.html'));
});





















// const express = require('express');
// const session = require('express-session');
// const fileUpload = require('express-fileupload');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');

// // Express app
// const app = express();
// const dbURI = 'mongodb+srv://youssef_dem:Programmer-02851@cluster0.gu5krui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect(dbURI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(8080, () => {
//       console.log('Server is running on http://localhost:8080');
//     });
//   })
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// const schema = new mongoose.Schema({
//   name: String,
//   age: String,
//   email: String,
//   Target: String,
//   Height: String,
//   Weight: String,
//   BurnRate: Number,
//   BodyFatPercent: Number,
//   Gender: String,
//   nutrition_data: Object
// });

// const Person = mongoose.model('Person', schema);

// // POST route to add a new person
// app.post('/addPerson', async (req, res) => {
//   const { name, age, email, Target, Height, Weight, BurnRate, BodyFatPercent, Gender, nutrition_data } = req.body;

//   const newPerson = new Person({ name, age, email, Target, Height, Weight, BurnRate, BodyFatPercent, Gender, nutrition_data });

//   try {
//     await newPerson.save();
//     res.status(201).send('Person added successfully');
//     console.log("Data saved successfully");
//   } catch (error) {
//     res.status(400).send('Error adding person');
//     console.error("Error adding person:", error);
//   }
// });

// const apiKey = process.env.API_KEY;

// // Define your API route
// app.get('/api/external-data', async (req, res) => {
//   try {
//     const response = await fetch(`https://developer.nutritionix.com/v1_1/search?api_key=${apiKey}`);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching external data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // Route to serve homepage.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'nutritionplans.html'));
// });





















// const express = require('express');
// const session = require('express-session');
// const fileUpload = require('express-fileupload');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');

// // express app
// const app = express();
// const dbURI = 'mongodb+srv://youssef_dem:Programmer-02851@cluster0.gu5krui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect(dbURI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(8080, () => {
//       console.log('Server is running on http://localhost:8080');
//     });
//   })
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// const schema = new mongoose.Schema({
//   name: String,
//   age: String,
//   email: String,
//   Target:String,
//   Height:String,
//   Weight:String,
//   BurnRate:Number,
//   BodyFatPercent:Number,
//   Gender:String,
//   nutrition_data: Object
// });

// const Person = mongoose.model('Person', schema);

// // POST route to add a new person
// app.post('/addPerson', async (req, res) => {
//   const { name, age, email,Target,Height,Weight,BurnRate,BodyFatPercent,Gender, nutrition_data } = req.body;

//   const newPerson = new Person({ name, age, email,Target,Height,Weight,BurnRate,BodyFatPercent,Gender, nutrition_data });

//   try {
//     await newPerson.save();
//     res.status(201).send('Person added successfully');
//     console.log("data saved successfully");
//   } catch (error) {
//     res.status(400).send('Error adding person');
//     console.log("Error adding person");
//   }
// });
// const apiKey = process.env.API_KEY;

// // Define your API route
// app.get('/api/external-data', async (req, res) => {
//     try {
//         const response = await fetch(`https://developer.nutritionix.com//data?api_key=${apiKey}`);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching external data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // Route to serve homepage.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'nutritionplans.html'));
// });




// const express = require('express');
// const session = require('express-session')
// const fileUpload = require('express-fileupload');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// // express app
// const app = express();
// const dbURI = 'mongodb+srv://youssef_dem:Programmer-02851@cluster0.gu5krui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// app.use(bodyParser.json());
// mongoose.connect(dbURI)
// .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(8080, () => {
//         console.log('Server is running on http://localhost:8080');
//     });
// })
// .catch(err => console.error('Error connecting to MongoDB:', err));
//  app.use(express.urlencoded({ extended: true }));

//  const schema=mongoose.Schema;
//  const P=new schema({
//     name:String,
//     age:Number,
//     email:String,
//     nutrition_data: Object
//  });

//  const Person = mongoose.model('Person', P);

// // POST route to add a new person
// app.post('/addPerson', async (req, res) => {
//     const { name, age, email } = req.body;

//     const newPerson = new Person({ name, age, email });

//     try {
//         await newPerson.save();
//         res.status(201).send('Person added successfully');
//     } catch (error) {
//         res.status(400).send('Error adding person');
//     }
// });

// // Serve static files from the "public" directory
// //app.listen(8080);
// app.use(express.static('public'));

// // Route to serve homepage.html
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/nutritionplans.html');
// });

// const apiKey = process.env.API_KEY;

// // Define your API route
// app.get('/api/external-data', async (req, res) => {
//     try {
//         const response = await fetch(`https://developer.nutritionix.com//data?api_key=${apiKey}`);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching external data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
// // });