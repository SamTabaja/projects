/* This is the driving engine of the program. It parses the command-line
 * arguments and calls the appropriate methods in the other classes.
 *
 * You should edit this file in two ways:
 * 1) Insert your database username and password in the proper places.
 * 2) Implement the three functions getInformation, registerStudent
 *    and unregisterStudent.
 */
import java.sql.*; // JDBC stuff.
import java.util.Properties;
import java.util.Scanner;
import java.io.*;  // Reading user input.

public class StudentPortal
{
    /* TODO Here you should put your database name, username and password */
	static final String DATABASE = "jdbc:postgresql://ate.ita.chalmers.se/tda357_033";
    static final String USERNAME = "tda357_033";
    static final String PASSWORD = "WmMpCv5m";

    /* Print command usage.
     * /!\ you don't need to change this function! */
    public static void usage () {
        System.out.println("Usage:");
        System.out.println("    i[nformation]");
        System.out.println("    r[egister] <course>");
        System.out.println("    u[nregister] <course>");
        System.out.println("    q[uit]");
    }

    /* main: parses the input commands.
     * /!\ You don't need to change this function! */
    public static void main(String[] args) throws Exception
    {
        try {
            Class.forName("org.postgresql.Driver");
            String url = DATABASE;
            Properties props = new Properties();
            props.setProperty("user",USERNAME);
            props.setProperty("password",PASSWORD);
            Connection conn = DriverManager.getConnection(url, props);

            String student = args[0]; // This is the identifier for the student.

            Console console = System.console();
	    // In Eclipse. System.console() returns null due to a bug (https://bugs.eclipse.org/bugs/show_bug.cgi?id=122429)
	    // In that case, use the following line instead:
	    // BufferedReader console = new BufferedReader(new InputStreamReader(System.in));
            usage();
            System.out.println("Welcome!");
            while(true) {
	        System.out.print("? > ");
                String mode = console.readLine();
                String[] cmd = mode.split(" +");
                cmd[0] = cmd[0].toLowerCase();
                if ("information".startsWith(cmd[0]) && cmd.length == 1) {
                    /* Information mode */
                    getInformation(conn, student);
                } else if ("register".startsWith(cmd[0]) && cmd.length == 2) {
                    /* Register student mode */
                    registerStudent(conn, student, cmd[1]);
                } else if ("unregister".startsWith(cmd[0]) && cmd.length == 2) {
                    /* Unregister student mode */
                    unregisterStudent(conn, student, cmd[1]);
                } else if ("quit".startsWith(cmd[0])) {
                    break;
                } else usage();
            }
            System.out.println("Goodbye!");
            conn.close();
        } catch (SQLException e) {
            System.err.println(e);
            System.exit(2);
        }
    }

    /* Given a student identification number, ths function should print
     * - the name of the student, the students national identification number
     *   and their issued login name (something similar to a CID)
     * - the programme and branch (if any) that the student is following.
     * - the courses that the student has read, along with the grade.
     * - the courses that the student is registered to. (queue position if the student is waiting for the course)
     * - the number of mandatory courses that the student has yet to read.
     * - whether or not the student fulfills the requirements for graduation
     */
    static void getInformation(Connection conn, String student) throws SQLException
    {
		System.out.println("Information for student " + student);
		System.out.println("-------------------------------------");	
		
        String studentQuery = "SELECT student.name, login, student.program, abbreviation, branch"
								+ " FROM student"
								+ " INNER JOIN program ON program.name = student.program"
								+ " INNER JOIN studentsfollowing AS sf ON sf.student = student.ssn"
								+ " WHERE student.ssn = ?";								
		try (PreparedStatement pstmt = conn.prepareStatement(studentQuery)) {
 
            pstmt.setString(1, student);
            ResultSet studentRS = pstmt.executeQuery();
			studentRS.next();
            System.out.println("Name: " + studentRS.getString("name"));
            System.out.println("Student ID: " + studentRS.getString("login"));
            System.out.println("Line: " + studentRS.getString("program") + " (" + studentRS.getString("abbreviation") + ")");
            System.out.println("Branch: " + studentRS.getString("branch"));
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
		
		System.out.println("\nRead courses (name (code), credits: grade):");
		
		String courseQuery = "SELECT name, course.code, course.credits, grade"
								+ " FROM course"
								+ " INNER JOIN finishedcourses AS fc ON fc.course = course.code"
								+ " WHERE student = ?";							
		try (PreparedStatement pstmt = conn.prepareStatement(courseQuery)) {
 
            pstmt.setString(1, student);
            ResultSet coursesRS = pstmt.executeQuery();
			
			while(coursesRS.next())
			{
				System.out.println("\t"+coursesRS.getString("name") + " (" + coursesRS.getString("code")
				+ "), " + coursesRS.getString("credits") + "p: " + coursesRS.getString("grade"));
			}
			
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
		
		System.out.println("\nRegistered courses (name (code): status):");
		
		String registerQuery = "SELECT course.name, course.code, course.credits, status, place"
								+ " FROM registrations AS r"
								+ " INNER JOIN course ON course.code = r.course"
								+ " LEFT JOIN coursequeuepositions AS cp ON cp.student = r.student"
								+ " WHERE r.student = ?";
								
		try (PreparedStatement pstmt = conn.prepareStatement(registerQuery)) {
 
            pstmt.setString(1, student);
            ResultSet registerRS = pstmt.executeQuery();
			
			while(registerRS.next())
			{
				
				String longStatus = registerRS.getString("status");
				if(!longStatus.equals("registered"))
					longStatus = "waiting as nr " + registerRS.getString("place"); 
							
				System.out.println("\t"+registerRS.getString("name") + " (" + registerRS.getString("code")
				+ "): " + longStatus);
			}
			
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
			
		
        String graduatQuery = "SELECT *"
								+ " FROM pathtograduation"
								+ " WHERE student = ?";								
		try (PreparedStatement pstmt = conn.prepareStatement(graduatQuery)) {
 
            pstmt.setString(1, student);
            ResultSet graduatRS = pstmt.executeQuery();
			graduatRS.next();
            System.out.println("\nSeminar courses taken: " + graduatRS.getString("seminarcourses"));
            System.out.println("Math credits taken: " + graduatRS.getString("mathcredits"));
            System.out.println("Research credits taken: " + graduatRS.getString("researchcredits"));
            System.out.println("Total credits taken: " + graduatRS.getString("totalcredits"));
            System.out.println("Fulfills the requirements for graduation: " + (graduatRS.getBoolean("status") ? "yes" : "no"));
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
    }

    /* Register: Given a student id number and a course code, this function
     * should try to register the student for that course.
     */
    static void registerStudent(Connection conn, String student, String course)
    throws SQLException
    {
		
		if(!isCourseExist(conn, course))
		{
			System.out.println("Course "+course+" does not exist.");
			return;
		}
		
		String courseFullName = getCourseFullName(conn, course);
		
		Boolean registered = false;
    	String RegisterQuery = "INSERT INTO Registrations Values (?,?)";
    	 try (PreparedStatement pstmt = conn.prepareStatement(RegisterQuery)){
             pstmt.setString(1, student);
             pstmt.setString(2, course);
             pstmt.executeUpdate();
			 registered = true;
           } catch (SQLException ex) {
             System.out.println(ex.getMessage());
           }
		   
		if(registered)
		{
			String registeredQuery = "SELECT *"
								+ " FROM Registrations"
								+ " WHERE course = ? AND student = ?";								
			try (PreparedStatement pstmt = conn.prepareStatement(registeredQuery)) {
	 
				pstmt.setString(1, course);
				pstmt.setString(2, student);
				ResultSet registeredRS = pstmt.executeQuery();
				registeredRS.next();
				
				String longStatus = registeredRS.getString("status");
				if(longStatus.equals("waiting"))
				{
					System.out.println("Course " + courseFullName +" is full, you are put in the waiting list.");
				}
				else if(longStatus.equals("registered"))
				{
					System.out.println("You are now successfully registered to course " +courseFullName);
				}
				else
				{
					System.out.println("ERROR: Unexpected error occured.");
				}
				
			} catch (SQLException ex) {
				System.out.println(ex.getMessage());
			}
		}
    }

    /* Unregister: Given a student id number and a course code, this function
     * should unregister the student from that course.
     */
    static void unregisterStudent(Connection conn, String student, String course)
    throws SQLException
    {
		
		if(!isCourseExist(conn, course))
		{
			System.out.println("Course "+course+" does not exist.");
			return;
		}
		
		String courseFullName = getCourseFullName(conn, course);
		
    	String UnregisterQuery = "DELETE FROM Registrations WHERE student = ? AND course = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(UnregisterQuery)){
            pstmt.setString(1,student);
            pstmt.setString(2,course);
            pstmt.executeUpdate();
            System.out.println("Student " + student +" is now unregistered from course " + courseFullName);
        }catch (SQLException ex) {
        	 System.out.println("Unregister Operation Failed");
             ex.printStackTrace();
        }
    }
	
	static Boolean isCourseExist(Connection conn, String course)
    throws SQLException
    {
    	String courseQuery = "SELECT * FROM course WHERE code = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(courseQuery)){
            pstmt.setString(1,course);
            ResultSet courseRS = pstmt.executeQuery();
			return courseRS.next();
        }catch (SQLException ex) {
        	 return false;
        }
    }
	
	static String getCourseFullName(Connection conn, String course)
    throws SQLException
    {
    	String courseQuery = "SELECT * FROM course WHERE code = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(courseQuery)){
            pstmt.setString(1,course);
            ResultSet courseRS = pstmt.executeQuery();
			courseRS.next();
			return (courseRS.getString("code")+" "+courseRS.getString("name"));
        }catch (SQLException ex) {
        	 return course;
        }
    }
}