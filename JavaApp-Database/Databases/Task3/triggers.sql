--Trigger 1
CREATE OR REPLACE FUNCTION student_register() RETURNS trigger as $student_register$
DECLARE
	maxSeat INT;
	studentsNumber INT;
	prereq VARCHAR(50);
	preGrade CHAR(1);
	BEGIN

		IF (SELECT COUNT(1) FROM PassedCourses WHERE course = NEW.course AND student = NEW.student) > 0 THEN
			RAISE EXCEPTION 'User % already passed the % course', NEW.student, NEW.course;
		END IF;
		
		IF (SELECT COUNT(1) FROM Registrations WHERE course = NEW.course AND student = NEW.student AND status = 'registered') > 0 THEN
			RAISE EXCEPTION 'User % already registered for the % course', NEW.student, NEW.course;
		END IF;
		
		IF (SELECT COUNT(1) FROM WaitingList WHERE course = NEW.course AND student = NEW.student) > 0 THEN
			RAISE EXCEPTION 'User % is on the waiting list with % course', NEW.student, NEW.course;
		END IF;
		
		prereq := (SELECT prerequisite FROM Prerequisite WHERE course = NEW.course);
		IF prereq IS NOT NULL THEN
			preGrade := COALESCE((SELECT grade FROM FinishedCourses WHERE student = NEW.student AND course = prereq), 'U');
			
			IF preGrade = 'U' THEN
				RAISE EXCEPTION 'User % did not match prerequisite of % course', NEW.student, NEW.course;
			END IF;
		END IF;
	
		studentsNumber := (SELECT COUNT(1) FROM Registrations WHERE course = NEW.course AND status = 'registered');
		maxSeat := (SELECT seats FROM LimitedCourse WHERE code = NEW.course);
		
		IF maxSeat IS NOT NULL AND studentsNumber >= maxSeat THEN
			INSERT INTO WaitingList (student, course, position) VALUES (NEW.student, NEW.course, COALESCE((SELECT MAX(position) FROM WaitingList WHERE course = NEW.course), 0) + 1);
		ELSE
			INSERT INTO Registered (student, course) VALUES (NEW.student, NEW.course);
		END IF;	
		RETURN NEW;
	END;
$student_register$ LANGUAGE plpgsql;	


CREATE TRIGGER student_register INSTEAD OF INSERT on Registrations
	FOR EACH ROW EXECUTE PROCEDURE student_register();

	

--Trigger 2
CREATE OR REPLACE FUNCTION student_unregister() RETURNS trigger as $student_unregister$
DECLARE
	maxSeat INT;
	studentsNumber INT;
	newStudent VARCHAR(50);
	BEGIN
	
		DELETE FROM WaitingList WHERE student = OLD.student AND course = OLD.course;
		DELETE FROM Registered WHERE student = OLD.student AND course = OLD.course;
	
		studentsNumber := (SELECT COUNT(1) FROM Registrations WHERE course = OLD.course AND status = 'registered');
		maxSeat := COALESCE((SELECT seats FROM LimitedCourse WHERE code = OLD.course), 0);
		
		newStudent = (SELECT student FROM CourseQueuePositions WHERE course = OLD.course AND place = 1);
		
		IF newStudent IS NOT NULL AND studentsNumber < maxSeat THEN
			DELETE FROM WaitingList WHERE student = newStudent AND course = OLD.course;
			INSERT INTO Registered (student, course) VALUES (newStudent, OLD.course);
		END IF;
		RETURN OLD;
	END;
$student_unregister$ LANGUAGE plpgsql;	


CREATE TRIGGER student_unregister INSTEAD OF DELETE on Registrations
	FOR EACH ROW EXECUTE PROCEDURE student_unregister();
