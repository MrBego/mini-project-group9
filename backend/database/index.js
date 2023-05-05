const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_mini_project",
  port: 3306,
});

db.connect((err) => {
  const queries = [
    {
      name: "createTableProducts",
      value: `CREATE TABLE IF NOT EXISTS products (
            Id_Product int NOT NULL AUTO_INCREMENT,
            Store_Name varchar(100) NOT NULL,
            Product_Name varchar(255) NOT NULL,
            Description varchar(255) NOT NULL,
            Price int NOT NULL,
            Id_Category int NOT NULL,
            Stock int NOT NULL,
            Img varchar(255) NOT NULL,
            Is_Active tinyint DEFAULT '1',
            PRIMARY KEY (Id_Product),
            KEY Id_Category_idx (Id_Category),
            CONSTRAINT Id_Category FOREIGN KEY (Id_Category) REFERENCES categories (Id_Category)
          ) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
    },
    {
      name: "createTableCategories",
      value: `CREATE TABLE IF NOT EXISTS categories (
            Id_Category int NOT NULL AUTO_INCREMENT,
            Category_Name varchar(45) NOT NULL,
            PRIMARY KEY (Id_Category)
          ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
    },
    {
      name: "createTableUsers",
      value: `CREATE TABLE IF NOT EXISTS users (
            id_users int NOT NULL AUTO_INCREMENT,
            username varchar(45) NOT NULL,
            email varchar(45) NOT NULL,
            password varchar(255) NOT NULL,
            phone_number varchar(45) NOT NULL,
            store_name varchar(45) DEFAULT NULL,
            isSeller tinyint NOT NULL DEFAULT '0',
            isAdmin tinyint NOT NULL DEFAULT '0',
            PRIMARY KEY (id_users),
            UNIQUE KEY id_users_UNIQUE (id_users),
            UNIQUE KEY username_UNIQUE (username)
          ) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
    },
    {
      name: "createTableTransaction",
      value: `CREATE TABLE IF NOT EXISTS transaction (
        id_transaction INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        total_price INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,  
    }
  ];

  // Loop through the queries and execute them
  queries.forEach((query) => {
    db.query(query.value, function (err, result) {
      if (err) throw err;
      if (result.warningCount === 0) {
        console.log(`${query.name} table created`);
      } else {
        console.log(`${query.name} table already exists`);
      }
    });
  });

  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to mysql server");
});

const query = util.promisify(db.query).bind(db);

module.exports = { db, query };
