
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./doctors.db');


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    specialization TEXT,
    location TEXT,
    timing TEXT,
    contact TEXT,
    image TEXT
  )`);

  
  db.run(`DELETE FROM doctors`);

  
  db.run(`INSERT INTO doctors (name, specialization, location, timing, contact, image)
          VALUES 
          ('Dr. Ramesh Kumar', 'Cardiologist', 'Delhi', '10 AM - 5 PM', '9876543210', 'images/doctor1.jpeg'),
          ('Dr. Mohit Mehta', 'Dermatologist', 'Mumbai', '9 AM - 2 PM', '9876501234', 'images/doctor2.jpeg'),
          ('Dr. Arjun Singh', 'Orthopedic', 'Bangalore', '11 AM - 6 PM', '9988776655', 'images/doctor3.jpeg'),
          ('Dr. Neha Kapoor', 'Pediatrician', 'Pune', '8 AM - 1 PM', '9876123456', 'images/doctor4.jpeg'),
          ('Dr. Mina Bhosale', 'Oncologist', 'Pune', '9 AM - 2 PM', '9933234578', 'images/doctor5.jpeg'),
          ('Dr. Rohit Mule', 'Surgeon', 'Nashik', '4 PM - 7 PM', '9352347881', 'images/doctor6.jpeg')
  `);
});

module.exports = db;
