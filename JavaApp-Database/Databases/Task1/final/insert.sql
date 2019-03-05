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



INSERT INTO limitedCourse (Code, seats) VALUES
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
( 444, 	'SSY999', 	'U' );



INSERT INTO WaitingList (student, course, position) VALUES
( 333,'TDA357', 1),
( 222,'TDA357', 2),
( 888,'TDA333', 1 );



