SELECT teachers.name AS teacher, cohorts.name AS cohorts, count(assistance_requests) AS total_assistances
FROM students
JOIN cohorts ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = 'JUL02'
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;