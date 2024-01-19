## Simply do npm i in each directory...

# 1-Async Funtion
# Task:
Create a function that takes in an array of URLs and downloads the contents from each URL using asynchronous methods. Once all downloads are complete, return an array with the downloaded contents in the same order as the URLs.

# Solution:
axios used for getting data from the urls...
async function returns promise...
to get all response together of promise, I used Promise.all()
at the end I just handle the promise by using .then() & .catch()


# 2-Problem 3: File System Operations
Develop a utility that reads a directory and lists all files with a specific extension (e.g., .txt). Implement this functionality using Node.js's File System module.

# Solution:
for reading and writing purpose in node js we used fs package
for reding directory I used fs.readdir...
then I get only file base name because I have to read the data from the file of any extension and write in the txt extension file.

# 3-Problem 2: Error Handling + Problem 4: Database Interaction + Problem 5: Authentication
...Design a function that fetches data from an API endpoint. Implement proper error handling to handle various HTTP status codes and network failures. Log appropriate messages for each type of error encountered.

...Create a simple REST API endpoint using Express.js that interacts with a database (can be any database of your choice). Implement CRUD operations (Create, Read, Update, Delete) for a specific resource (e.g., users, posts).

...Implement an authentication middleware using JWT (JSON Web Tokens) in a Node.js application. Create endpoints that require authentication to access specific resources. Ensure proper token validation and handling of expired or invalid tokens.

# Solution:
All task related to api so I did all together.
CRUD_Express conatins error handling with their responses...
CRUD_Express having the crud operation with mongodb...
CRUD_Express having the Authentication with token validation ans handling invalid tokens

Lets brief the folder structure of CRUD_Express:
having index js file where the db connection is established but the db data is in the db file
while accessing the credentials from .env
Model having the db data schema. user model and log model
Middleware folder is for token handling
Common Srvices have different methods which we can also use independently
