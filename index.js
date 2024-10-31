let express = require("express");
let app = new express();

// set up database connection
const knex = require("knex")({
 client: "mysql",
 connection: {
  host: "concert-db.cd680864seo9.us-east-2.rds.amazonaws.com", // your original host
  user: "admin",
  password: "password1", // your original password
  database: "paradise-concerts",
  port: 3306,
 },
});

app.get("/", (req, res) => {
 knex
   .select()
   .from("venues")
   .then((result) => {
     // Generate HTML list of venues
     let html = "<body><ul>";
     for (let i = 0; i < result.length; i++) {
       html += "<li>" + result[i].location + "</li>";
     }
     html += "</ul></body>"; // Ensure closing tags
     res.send(html);
   })
   .catch((error) => {
     console.error("Database error:", error);
     res.status(500).send("An error occurred while retrieving venues.");
   });
});

app.listen(3000, () => {
 console.log("Server is running on http://localhost:3000");
});

