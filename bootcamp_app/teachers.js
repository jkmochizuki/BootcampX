const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

console.log(`connected`);

// Name of Teachers That Assisted
pool.query(`
SELECT teachers.name AS teacher, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(assistance => {
    console.log(`${assistance.cohort}: ${assistance.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));