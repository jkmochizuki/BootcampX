SELECT cohorts.name as cohort, count(assignment_submissions.*) as total_submissions
FROM students
JOIN assignment_submissions ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
GROUP BY cohort
ORDER BY total_submissions DESC;