const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Name of Teachers That Assisted
const queryString = `
SELECT teachers.name AS teacher, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`;
const cohort_name = process.argv[2] || 'JUL02';
const values = [`${cohort_name}`];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(assistance => {
      console.log(`${assistance.cohort}: ${assistance.teacher}`);
    })
  })
  .catch(err => console.error('query error', err.stack));