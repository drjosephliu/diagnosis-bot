# Diagnosis Bot

Web version of the diagnosis bot that refers user a medical specialist based on symptom inputs.

*(N.B.) This is slightly different to the diagnosis-chatbot in that the web version does not utilise NLP.*

Server is written in Python and client in React.

# Setup
To run client:

```
npm start
```

To initialise databases:
```
// MySQL DB
cd server/mysqlDB
python initDB.py

// Redis DB
cd server/redisDB
python initDB.py
```
To run:
```
cd server
export FLASK_APP=server.py
flask run
```

# API
### GET `/api/symptoms?query=<query>`
Queries MySQL database to fetch all symptom names that match the query pattern string.

E.g. if query is `pain`, then request will return an array of all symptom names that match pattern `%pain%`
