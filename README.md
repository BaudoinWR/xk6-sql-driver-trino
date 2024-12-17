# xk6-sql-driver-trino

Database driver extension for [xk6-sql](https://github.com/grafana/xk6-sql) k6 extension to support trino database.

## Example

```JavaScript file=examples/example.js
import sql from "k6/x/sql";
import driver from "k6/x/sql/driver/trino";

const db = sql.open(driver, "test_db");

export function setup() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS roster
      (
        given_name VARCHAR NOT NULL,
        family_name VARCHAR NOT NULL
      )
  `);
}

export function teardown() {
  db.close();
}

export default function () {
  let result = db.exec(`
    INSERT INTO roster
      (given_name, family_name)
    VALUES
      ('Peter', 'Pan'),
      ('Wendy', 'Darling'),
      ('Tinker', 'Bell'),
      ('James', 'Hook')
  `);
  console.log(`${result.rowsAffected()} rows inserted`);

  let rows = db.query("SELECT * FROM roster WHERE given_name = $1", "Peter");
  for (const row of rows) {
    console.log(`${row.family_name}, ${row.given_name}`);
  }
}
```

## Usage

Check the [xk6-sql documentation](https://github.com/grafana/xk6-sql) on how to use this database driver.
