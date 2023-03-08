const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Print the first 5 rows from the database
// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT $1;`, [])
//   .then(res => {
//     console.log(res.rows);
//   })
//   .catch(err => console.error('query error', err.stack));

// Using process.argv in the query
const queryString = `
SELECT students.id as student_id, students.name as student, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
const cohort_name = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohort_name}%`, limit];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));