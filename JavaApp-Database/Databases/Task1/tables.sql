
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
	grade INTEGER NOT NULL CHECK (grade IN (0,3,4,5)),
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
