# Getting Started

## Starting the Mongod server

1. Remove data files inside `server/data`
2. Run mongod

  ```
  cd server
  ./mongod
  ```
3. Add fixtures (generate test data)

  ```
  cd scripts
  node create.js
  Ctrl+C to exit
  ```
4. Verify test data

  ```
  node read.js
  Ctrl+C to exit
  ```
5. Run the server at `server/index.js`.  In Cloud9, open the file and click run.
