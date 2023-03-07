SELECT avg(total_duration)
FROM (
  SELECT cohorts.name AS cohort, sum(completed_at - started_at) AS total_duration
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  JOIN assistance_requests ON students.id = student_id
  GROUP BY cohorts.name
)
AS average_total_duration;