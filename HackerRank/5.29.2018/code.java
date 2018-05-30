/* HackerRank challenge for Day 27: Testing, part of the 30 Days of Code */

static class TestDataEmptyArray {
    /* Returns empty array */
    public static int[] get_array() {
        int[] toRet = new int[0];
        return toRet;
    }

}

static class TestDataUniqueValues {
    /* Returns a 2 element array with 2 unique elements */
    public static int[] get_array() {
        int[] toRet = new int[2];
        toRet[0] = 0;
        toRet[1] = 1;
        return toRet;
    }

    /* Returns the minimum value element */
    public static int get_expected_result() {
        return 0;
    }
}

static class TestDataExactlyTwoDifferentMinimums {
    /* Returns an arrray where the minimum value has exactly 2 occurances */
    public static int[] get_array() {
        int[] toRet = new int[4];
        toRet[0]=10;
        toRet[1]=1;
        toRet[2]=3;
        toRet[3]=1;
        return toRet;
    }
    /* Returns the value of the two-different-minimum integer */
    public static int get_expected_result() {
        return 1;
    }
}
