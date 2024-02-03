# Library Management System

This is a simple Library Management System built with Node.js, Express, and MySQL.

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/) (optional)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/SalmaAbuelnaga/Library-Management-System.git
If you don't want to use Git, you can download the ZIP file and extract it.

2. Navigate to the project directory:

   ```bash
   cd library-management-system

3. Install dependencies using npm:
    ```bash
    npm install

4. Set up the MySQL database:

* Create a new database in MySQL (e.g., library_management).
* The ./database/models folder includes the creation of the tables files, they are called inside the app.js to be created.

5. Create a .env file in the project root and set the following environment variables:
    ```bash
    host=localhost
    user=your-mysql-username
    password=your-mysql-password
    database=library_management
Adjust the values according to your MySQL setup.


6. Start the application:
    ```bash
    npm app.js
The application will be accessible at http://localhost:3000.

