CREATE VIEW StudentsFollowing AS
	SELECT ssn AS student, student.program, BelongsTo.branch AS branch
		FROM student
		LEFT JOIN BelongsTo ON BelongsTo.student = student.ssn;
		
CREATE VIEW FinishedCourses AS
	SELECT ssn AS student, course.code AS course,  grade, credits
		FROM student
		INNER JOIN taken ON taken.student = student.ssn
		INNER JOIN course ON course.code = taken.course;
	
CREATE VIEW Registrations AS
	SELECT ssn AS student, course.code AS course, 'registered' AS status
		FROM student
			INNER JOIN registered ON registered.student = student.ssn
			INNER JOIN course ON course.code = registered.course
	UNION
	SELECT ssn AS student, course.code AS course, 'waiting' AS status
		FROM student
			INNER JOIN waitinglist ON waitinglist.student = student.ssn
			INNER JOIN limitedcourse ON limitedcourse.code = waitinglist.course
			INNER JOIN course ON course.code = limitedcourse.code;

CREATE VIEW PassedCourses AS
	SELECT ssn AS student, course.code AS course, credits
		FROM student
		INNER JOIN taken ON taken.student = student.ssn
		INNER JOIN course ON course.code = taken.course			
	WHERE grade <> 'U';
	
CREATE VIEW UnreadMandatory AS
SELECT student.ssn AS student, curs.course FROM
		(SELECT ssn, course FROM mandatoryprogram
			INNER JOIN student ON student.program = mandatoryprogram.program
		UNION
		SELECT ssn, course FROM mandatorybranch
			INNER JOIN student ON student.program = mandatorybranch.program) AS curs
	INNER JOIN student ON student.ssn = curs.ssn
	LEFT JOIN taken
		ON taken.student = student.ssn AND taken.course = curs.course
	WHERE COALESCE(grade, 'U') = 'U';
	
		
CREATE VIEW PathToGraduation AS
	SELECT student.ssn AS student, COALESCE(totalCredits, 0) AS totalCredits, COALESCE(mandatoryLeft, 0) AS mandatoryLeft, COALESCE(mathCredits, 0) AS mathCredits, COALESCE(researchCredits, 0) AS researchCredits, COALESCE(seminarCourses, 0) AS seminarCourses,
	CASE WHEN COALESCE(mandatoryLeft, 0) = 0 AND COALESCE(mathCredits, 0) >= 20 AND COALESCE(researchCredits, 0) >= 10 AND COALESCE(seminarCourses, 0) > 0 AND COALESCE(recommendedCredits, 0) >= 10 THEN TRUE
	ELSE FALSE
	END AS status
	FROM student
	LEFT JOIN
		(SELECT student, SUM(credits) AS totalCredits FROM PassedCourses GROUP BY student) AS PC
	ON PC.student = student.ssn
	LEFT JOIN
		(SELECT student, SUM(credits) AS mandatoryLeft FROM UnreadMandatory AS UM INNER JOIN course ON course.code = UM.course GROUP BY student) AS UM
	ON UM.student = student.ssn
	LEFT JOIN
		(SELECT student, SUM(credits) AS mathCredits FROM PassedCourses AS PC INNER JOIN classified ON classified.course = PC.course
		WHERE classification = 'Mathematical' GROUP BY student) AS MC
	ON MC.student = student.ssn
	LEFT JOIN
		(SELECT student, SUM(credits) AS researchCredits FROM PassedCourses AS PC INNER JOIN classified ON classified.course = PC.course
		WHERE classification = 'Research' GROUP BY student) AS RC
	ON RC.student = student.ssn
	LEFT JOIN
		(SELECT student, COUNT(*) AS seminarCourses FROM PassedCourses AS PC INNER JOIN classified ON classified.course = PC.course
		WHERE classification = 'Seminar' GROUP BY student) AS SC
	ON SC.student = student.ssn
	LEFT JOIN
		(SELECT student, SUM(credits) AS recommendedCredits FROM PassedCourses AS PC INNER JOIN recommendedbranch ON recommendedbranch.course = PC.course GROUP BY student) AS RECC
	ON RECC.student = student.ssn;
	