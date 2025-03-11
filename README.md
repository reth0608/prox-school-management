
A simple proximity based school management API made with node, express and mySql. Allows you to add schools and view them in the order of your distance from them.

1. Add schools with name, address, latitude and longitude
2. Retrieve those schools based on how far you are from them

Installation:
1. Clone the repository using "https://github.com/reth0608/prox-school-management.git"
2. Then "cd prox-school-management"
3. install all dependencies "npm i"
4. create a .env file and add your stuff
"DB_host=your_mysql_host
DB_user=your_mysql_user
DB_password=your_mysql_password
DB_name=your_database_name
PORT=5000
"

API endpoints:
1. in the body of "POST /routes/addSchool" enter the information of school:-
{
"name": school-name,
"address": school-address,
"latitude": school-latitude,
"longitude": school-longitude
}

eg:
{
    "name": "Delhi Public School",
    "address": "nacharam, Hyderabad",
    "latitude": 37.7749,
    "longitude": 122.4194
}

2. to list schools "GET /routes/listSchools?latitude=your-latitude&longitude=your-longitude"

eg:
routes/listSchools?latitude=22.2341&longitude=102.5523
