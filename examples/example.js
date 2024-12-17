import sql from "k6/x/sql";
import driver from "k6/x/sql/driver/trino";

// Second parameter in the form https://<user>:<password>@trino-endpoint.com/
const db = sql.open(driver, "test_db");

export function setup() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS roster
      (
        given_name VARCHAR,
        family_name VARCHAR
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

  let rows = db.query("SELECT * FROM roster WHERE given_name = Peter");
  for (const row of rows) {
    console.log(`${row.family_name}, ${row.given_name}`);
  }
}
