# Smartrr Support Engineer Project

This project is a web-based application that generates reports on Shopify organization and account details, including optimization settings and account plans, utilizing React.js for the frontend and Express for backend.

## How to Install and Run the Project
To run this project on your local machine, Node.js and npm must be installed in your machine. If not, it is easily available to download from the official [Node.js website](https://nodejs.org/en).

1. Clone the repository:
`git clone https://github.com/est-kim/support_engineer_homework.git`
2. Navigate into the project directory: `cd support-engineer-homework`
3. Open one terminal to navigate into the frontend directory: `cd frontend` and then install project dependencies using `npm install`
4. Open another terminal to navigate into the backend directory: `cd backend` and install project dependencies using `npm install`
5. In the backend terminal, use `node index.js` to start the backend
6. In the frontend terminal, use `npm start` to start the frontend

You should now be able to access the app in your web browser at http://localhost:3000/. Additionally, you can view the JSON data with http://localhost:3001/api/accountData for account data and http://localhost:3001/api/organizationData for organization data.

## Where to find JavaScript and SQL Solutions
### Directory Tree Structure
```
.
├── backend/
│   ├── data/
│   │   ├── account_plan_orm.csv [account data]
│   │   └── organization_orm.csv [organization data]
│   └── sql/
│       ├── queries.sql [SQL queries here]
│       └── testing_schemas.sql [SQL testing schemas here]
├── frontend/
│   └── src/
│       ├── App.js [root component of application]
│       └── components/
│           ├── CancelledOrganizations.js [JavaScript Answer #3]
│           ├── OptimizationSettings.js [JavaScript Answer #1]
│           ├── OrganizationDetails.js [JavaScript Answer #4]
│           └── OrganizationList.js [JavaScript Answer #2]
└── README.md
```

### JavaScript
Please refer to the directory tree structure above to view the JavaScript portion of this project.

### SQL
The testing schema is an intentionally simplified version of the account and organization tables to focus on the fields relevant to the required queries.

To test the queries:
1. Copy and paste the contents of `testing_schemas.sql` into a SQL editor of your choice, such as [Programiz SQL Online Compiler](https://www.programiz.com/sql/online-compiler/).
2. Execute the SQL queries: Copy and paste each respective query from `queries.sql` into the SQL editor to run them and observe the results.

This simplified schema captures the essence of the problem. If further detail is needed, the complete schemas can be provided.

## Technologies
This project was built with React.js primarily due to its scalability and component-based architecture. The component-based approach makes this application easier to scale the project in the future. Because components can be reused, it can also save and shorten future development time.

Express was used to build the backend as it provides a seamless JavaScript development experience across the stack. Its minimalistic and flexible nature allows for tailored solutions that cater to the specific needs of the application. This choice is also in alignment with the project's specifications requiring a JavaScript framework for backend development.

### Future Scalability Considerations
Though this project is a takehome assignment, there are several considerations worth mentioning for potential future scalability:

#### CSS Framework
Due to the small size of this current application, all styling was done in the App.css file. However, if scaled, utilizing a CSS framework like Bootstrap, Material-UI, or Chakra-UI can be advantageous for multiple reasons:
* Rapid prototyping: speeds up the design and development process by providing pre-built, responsive design components
* Modularity: components become more modular and easier to maintain due to less complexity per file
* Consistency: ensures a consistent design and feel across the application, thereby improving user experience

#### PostgreSQL Database
For data persistence, data integrity, and more complex queries, a relational database management system (RDBMS) such as PostgreSQL could be integrated for its robust features and capabilities:
* Scalability: well-suited for large-scale applications, in terms of both volume and complexity
* ACID compliance: guarantees reliability in every transaction to avoid validity errors and maintain data integrity

#### Docker
Docker can significantly enhance the scalability and maintainability of this application, particularly when transitioning to a microservices architecture. Utilizing Docker containers has many benefits:
* Microservice architecture: Docker is the ideal choice for a microservices architecture as each service can be containerized, allowing for easier scaling and management
* Container management: With the use of Docker Compose, it is simple to manage multiple containers, define how they interact, and scale as needed. If one service experiences higher demand, an additional container from the same Docker image can be spun up to handle the increased load
* Cross platform consistency: Docker solves the issue of 'it works on my machine'. Docker containers ensure that the application runs the same way everywhere, providing a consistent environment from development to production
