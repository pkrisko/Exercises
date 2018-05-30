import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;


/**
 * @author Patrick Krisko 2018
 * The goal of this class is to read standard input in a certain format,
 * where the first line contains an integer of how many N 'rows' of the
 * 'database' there are to read, and the next N repeating lines contain
 * a name followed by a valid email address.
 * 
 * Once the input is parsed and read, if the email is a gmail address,
 * the firstname is added to an ArrayList of Strings, sorted, and then
 * printed to standard output.
 */
public class Solution {

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int N = scanner.nextInt(); // Get the total number of rows from first line
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?"); // Skip newlines
        // Store first names with gmail addresses
        ArrayList<String> gmNames = new ArrayList<String>();
        // For N rows, read standard input
        for (int NItr = 0; NItr < N; NItr++) {
            // Split first name and email into an array with 2 elements
            String[] firstNameEmailID = scanner.nextLine().split(" ");
            String firstName = firstNameEmailID[0];
            String emailID = firstNameEmailID[1];
            // If the email is gmail address, add it to gmNames ArrayList
            if (emailID.contains("@gmail.com"))
                gmNames.add(firstName);
        }
        // Sort first names in alphabetical order, using default String comparator
        // Note: all firstnames from input are lowercase
        Collections.sort(gmNames);
        for (String name : gmNames)
            System.out.println(name);

        scanner.close(); // Close, done
    }
}
