import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; // Import join from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Initialize an array to store lists and their titles
const lists = [];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/workspace", (req, res) => {
    // Pass the lists data to the template
    console.log("Lists Data:", lists);
    res.render("workspace", { listCount: lists.length, lists });
  });

  app.post("/submit", (req, res) => {
    const listTitle = req.body.listTitle;
    const tasks = req.body.tasks; // Change to tasks
  
    // Create a new list object and push it to the lists array
    const newList = { listTitle, tasks };
    
    lists.push(newList);
  
    // Redirect to the workspace page to display the lists
    res.redirect("/workspace");
  });
  
  app.post("/addform", (req, res) => {
    const listTitle = req.body.listTitle2; // Change to listTitle2
    const tasks = req.body.task1; // Corrected variable name
  
    // Create a new list object and push it to the lists array
    const newList = { listTitle, tasks }; // Use the corrected variable name
    lists.push(newList);
  
    // Redirect to the workspace page to display the lists
    res.redirect("/workspace");
  });
  
  app.post('/update-list', (req, res) => {
    const updatedLists = req.body;
    console.log(updatedLists); // Log the updatedLists for debugging
  
    // Set the response content type to JSON
    res.setHeader('Content-Type', 'application/json');
  
    // Send a JSON response with the message
    res.json({ message: 'List updated successfully' });
  });
  


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
