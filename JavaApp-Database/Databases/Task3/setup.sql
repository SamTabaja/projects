
CREATE TABLE Program(
	name VARCHAR(200) PRIMARY KEY,
	abbreviation VARCHAR(20) NOT NULL
);

CREATE TABLE Department(
	name VARCHAR(200) PRIMARY KEY,
	abbreviation VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE Hosts(
	department VARCHAR(200),
	program VARCHAR(200),
	PRIMARY KEY (department, program),
	CONSTRAINT fk_hosts_department_01 FOREIGN KEY (department)
		REFERENCES Department(name),
	CONSTRAINT fk_hosts_program_01 FOREIGN KEY (program)
		REFERENCES Program(name)
);

CREATE TABLE Student(
	ssn VARCHAR(50) PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	login VARCHAR(50) UNIQUE NOT NULL,
	program VARCHAR(200) NOT NULL,
	UNIQUE(ssn, program),
	CONSTRAINT fk_student_program_01 FOREIGN KEY (program)
		REFERENCES Program(name)
);

CREATE TABLE Branch(
	name VARCHAR(200),
	program VARCHAR(200),
	PRIMARY KEY(name, program),
	CONSTRAINT fk_branch_program_01 FOREIGN KEY (program)
		REFERENCES Program(name)
);

CREATE TABLE BelongsTo(
	student VARCHAR(50) PRIMARY KEY,
	branch VARCHAR(200) NOT NULL,
	program VARCHAR(200) NOT NULL,
	CONSTRAINT fk_belongsto_student_01 FOREIGN KEY (student)
		REFERENCES Student(ssn),
	CONSTRAINT fk_belongsto_student_02 FOREIGN KEY (student, program)
		REFERENCES Student(ssn, program),
	CONSTRAINT fk_belongsto_branch_01 FOREIGN KEY (branch, program)
		REFERENCES Branch(name, program)
);

CREATE TABLE Course(
	code VARCHAR(50) PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	credits FLOAT8 NOT NULL CHECK (credits >= 0),
	department VARCHAR(200) NOT NULL,
	CONSTRAINT fk_course_department_01 FOREIGN KEY (department)
		REFERENCES Department(name)
);

CREATE TABLE Prerequisite(
	course VARCHAR(50),
	prerequisite VARCHAR(50),
	PRIMARY KEY(course, prerequisite),
	CONSTRAINT fk_prerequisite_course_01 FOREIGN KEY (course)
		REFERENCES Course(code),
	CONSTRAINT fk_prerequisite_course_02 FOREIGN KEY (prerequisite)
		REFERENCES Course(code)
);

CREATE TABLE Classification(
	name VARCHAR(200) PRIMARY KEY
);

CREATE TABLE Classified(
	course VARCHAR(50),
	classification VARCHAR(200),
	PRIMARY KEY(course, classification),
	CONSTRAINT fk_classified_course_01 FOREIGN KEY (course)
		REFERENCES Course(code),
	CONSTRAINT fk_classified_classification_01 FOREIGN KEY (classification)
		REFERENCES Classification(name)
);

CREATE TABLE MandatoryProgram(
	course VARCHAR(50),
	program VARCHAR(200),
	PRIMARY KEY(course, program),
	CONSTRAINT fk_mandatoryprogram_course_01 FOREIGN KEY (course)
		REFERENCES Course(code),
	CONSTRAINT fk_mandatoryprogram_program_01 FOREIGN KEY (program)
		REFERENCES Program(name)
);

CREATE TABLE MandatoryBranch(
	course VARCHAR(50),
	branch VARCHAR(200),
	program VARCHAR(200),
	PRIMARY KEY(course, branch, program),
	CONSTRAINT fk_mandatorybranch_course_01 FOREIGN KEY (course)
		REFERENCES Course(code),
	CONSTRAINT fk_mandatorybranch_branch_01 FOREIGN KEY (branch, program)
		REFERENCES Branch(name, program)
);

CREATE TABLE RecommendedBranch(
	course VARCHAR(50),
	branch VARCHAR(200),
	program VARCHAR(200),
	PRIMARY KEY(course, branch, program),
	CONSTRAINT fk_recommendedbranch_course_01 FOREIGN KEY (course)
		REFERENCES Course(code),
	CONSTRAINT fk_recommended_branch_01 FOREIGN KEY (branch, program)
		REFERENCES Branch(name, program)
);

CREATE TABLE Registered(
	student VARCHAR(50),
	course VARCHAR(50),
	PRIMARY KEY(student, course),
	CONSTRAINT fk_registered_student_01 FOREIGN KEY (student)
		REFERENCES Student(ssn),
	CONSTRAINT fk_registered_course_01 FOREIGN KEY (course)
		REFERENCES Course(code)
);

CREATE TABLE Taken(
	student VARCHAR(50),
	course VARCHAR(50),
	grade CHAR (1) NOT NULL CHECK (grade IN ('U','3','4','5')),
	PRIMARY KEY(student, course),
	CONSTRAINT fk_taken_student_01 FOREIGN KEY (student)
		REFERENCES Student(ssn),
	CONSTRAINT fk_taken_course_01 FOREIGN KEY (course)
		REFERENCES Course(code)
);

CREATE TABLE LimitedCourse(
	code VARCHAR(50) PRIMARY KEY,
	seats INTEGER NOT NULL CHECK (seats > 0),
	CONSTRAINT fk_limitedcourse_course_01 FOREIGN KEY (code)
		REFERENCES Course(code)
);

CREATE TABLE WaitingList(
	student VARCHAR(50),
	course VARCHAR(50),
	position INTEGER NOT NULL CHECK (position >= 0),
	PRIMARY KEY(student, course),
	UNIQUE(position, course),
	CONSTRAINT fk_waitinglist_student_01 FOREIGN KEY (student)
		REFERENCES Student(ssn),
	CONSTRAINT fk_waitinglist_limitedcourse_01 FOREIGN KEY (course)
		REFERENCES LimitedCourse(code)
);



INSERT INTO Department (Name, abbreviation) VALUES
('Department of Computer Science and Engineering','CSE'),
('Department of Architecture and Civil','ARC'),
('Department of Mechanics','MC'),
('Department of Chemistry and Physics','CP');


INSERT INTO Program (Name, abbreviation) VALUES
('Program of Computer Systems and Networks', 'PCSN'),
('Program of Information Technology', 'PIT'),
('Program of Modern Architecture', 'PMA'),
('Program of Sound and Vibration', 'PSV'),
('Program of Organic Chemistry', 'POC'),
('Program of Langauges', 'PL'),
('Program of Nuclear Physics', 'POC');




INSERT INTO Branch (Name, program) VALUES
('Computer Systems','Program of Computer Systems and Networks'),
('Algorithms','Program of Information Technology'),
('Organic Chemistry','Program of Organic Chemistry'),
('English','Program of Langauges'),
('Quantom','Program of Nuclear Physics');



INSERT INTO Course (Code, Name, credits, department) VALUES
('TDA357','Database', 7.5 , 'Department of Computer Science and Engineering'),
('TDA222','Computer Security', 7.5 , 'Department of Computer Science and Engineering'),
('TDA333','Computer Communication', 7.5 , 'Department of Computer Science and Engineering'),
('TDA123','Computer Graphics', 7.5 , 'Department of Computer Science and Engineering'),
('SSY999','Routing and Switching', 7.5 , 'Department of Computer Science and Engineering'),
('FFY277','Nanotechology', 7.5 , 'Department of Chemistry and Physics'),
('FFY123','Biological Physics', 7.5 , 'Department of Chemistry and Physics'),
('ARK264','Urban Design', 13 , 'Department of Architecture and Civil'),
('ARK079','Nordic Architecture', 4.5 , 'Department of Architecture and Civil'),
('TME225','Mechanics of fluids', 7.5, 'Department of Mechanics'),
('MHA043','Material Mechanics', 7.5, 'Department of Mechanics'),
('ABC111','Mathmatics I', 10, 'Department of Computer Science and Engineering'),
('ABC222','Mathmatics II', 10, 'Department of Computer Science and Engineering'),
('ABC333','Research I', 10, 'Department of Computer Science and Engineering'),
('ABC444','Seminar I', 7.5, 'Department of Computer Science and Engineering'),
('ABC666','Writing for Engineers', 10, 'Department of Computer Science and Engineering'),
('ABC555','English for Engineers', 10, 'Department of Computer Science and Engineering');




INSERT INTO Student (ssn, Name, login, program) VALUES
( 111, 'Seif Tabaja', 'stabaja', 'Program of Computer Systems and Networks'),
( 222, 'Goerge William', 'gwillaim', 'Program of Computer Systems and Networks'),
( 333, 'Alex Gustavson', 'agustavson', 'Program of Information Technology'),
( 444, 'Tommy Salehson', 'tsalehson', 'Program of Information Technology'),
( 555, 'Adolf Marco', 'amarco', 'Program of Nuclear Physics'),
( 666, 'Noras Salman', 'nsalman', 'Program of Nuclear Physics'),
( 777, 'Ali Wyne', 'awyne', 'Program of Organic Chemistry'),
( 888, 'Leo Messi', 'lmessi', 'Program of Organic Chemistry'),
( 999, 'Jack Andres', 'jandres', 'Program of Computer Systems and Networks'),
( 1010, 'Sam Jackson', 'sjackson', 'Program of Computer Systems and Networks');



INSERT INTO LimitedCourse (Code, seats) VALUES
('TDA357', 4),
('TDA333', 1);



INSERT INTO Classification (Name) VALUES
('Mathematical'),
('Research'),
('Seminar');



INSERT INTO Hosts (department, program) VALUES
('Department of Computer Science and Engineering', 'Program of Computer Systems and Networks'),
('Department of Computer Science and Engineering', 'Program of Information Technology'),
('Department of Chemistry and Physics', 'Program of Nuclear Physics'),
('Department of Chemistry and Physics', 'Program of Organic Chemistry'),
('Department of Architecture and Civil', 'Program of Modern Architecture'),
('Department of Architecture and Civil', 'Program of Sound and Vibration');


INSERT INTO BelongsTo (student,branch, program) VALUES
( 111, 'Computer Systems', 'Program of Computer Systems and Networks'),
( 222, 'Computer Systems', 'Program of Computer Systems and Networks'),
( 333, 'Algorithms', 'Program of Information Technology'),
( 444, 'Algorithms', 'Program of Information Technology'),
( 555, 'Quantom', 'Program of Nuclear Physics'),
( 666, 'Quantom', 'Program of Nuclear Physics'),
( 777, 'Organic Chemistry', 'Program of Organic Chemistry'),
( 1010, 'Computer Systems', 'Program of Computer Systems and Networks'),
( 888, 'Organic Chemistry', 'Program of Organic Chemistry');



INSERT INTO classified (classification, course) VALUES
('Mathematical','TME225'),
('Mathematical','MHA043'),
('Mathematical','ABC111'),
('Mathematical','ABC222'),
('Research','ABC333'),
('Seminar','ABC444'),
('Seminar','ARK264');



INSERT INTO  mandatoryProgram (course, program) VALUES
('TDA357', 'Program of Computer Systems and Networks'),
('TDA222', 'Program of Computer Systems and Networks'),
('TDA333', 'Program of Information Technology'),
('FFY277', 'Program of Nuclear Physics'),
('FFY123', 'Program of Nuclear Physics');



INSERT INTO  mandatoryBranch (course, branch, program) VALUES
('TDA357', 'Computer Systems', 'Program of Computer Systems and Networks'),
('TDA222', 'Computer Systems', 'Program of Computer Systems and Networks'),
('FFY277', 'Quantom', 'Program of Nuclear Physics'),
('FFY123', 'Quantom', 'Program of Nuclear Physics');




INSERT INTO  recommendedBranch (course, branch, program) VALUES
('ABC555', 'English','Program of Langauges'),
('ABC666', 'Computer Systems','Program of Computer Systems and Networks');




INSERT INTO Prerequisite (course, prerequisite ) VALUES
('TDA357','TDA222'),
('TDA333','TDA222'),
('ARK264','ARK079'),
('TME225','MHA043');




INSERT INTO Registered(student, course) VALUES
( 111,'TDA357'),
( 111,'TDA333'),
( 222,'TDA333'),
( 333,'TDA333'),
( 444,'TDA357'),
( 444,'TDA222'),
( 555,'ARK079'),
( 666,'MHA043'),
( 666,'TME225'),
( 777,'TDA222'),
( 888,'TDA357'),
( 999,'FFY123');



INSERT INTO Taken(student, course, grade) VALUES
( 111, 	'TDA222', 	'4'),
( 111, 	'TDA333', 	'3'),
( 222, 	'TDA222', 	'5'),
( 333, 	'TDA123', 	'5'),
( 1010, 'TDA357',	'5'),
( 1010, 'TDA222',	'5'),
( 1010, 'ABC111',	'5'),
( 1010, 'ABC222',	'5'),
( 1010, 'ABC333',	'5'),
( 1010, 'ABC444', 	'5'),
( 1010, 'ABC555', 	'5'),
( 1010, 'ABC666', 	'4'),
( 999, 'TDA222', 	'4'),
( 444, 	'SSY999', 	'U' );



INSERT INTO WaitingList (student, course, position) VALUES
( 333,'TDA357', 1),
( 222,'TDA357', 2),
( 888,'TDA333', 1 );





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
  SELECT student, course, 'registered' AS status FROM registered
  UNION ALL
  SELECT student ,course, 'waiting' AS status FROM waitinglist;


CREATE VIEW PassedCourses AS
  SELECT finishedcourses.student,finishedcourses.course,finishedcourses.credits FROM finishedcourses
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
		(SELECT student, COUNT(credits) AS mandatoryLeft FROM UnreadMandatory AS UM INNER JOIN course ON course.code = UM.course GROUP BY student) AS UM
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
	
	
CREATE VIEW CourseQueuePositions AS
	SELECT course, student, row_number() OVER (PARTITION BY course) AS place
		FROM waitinglist ORDER BY course, position;