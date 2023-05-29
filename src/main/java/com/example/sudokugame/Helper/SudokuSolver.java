package com.example.sudokugame.Helper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SudokuSolver {

    public static List<Integer>  solveSudoku(){
        List<Integer>  a = new ArrayList<>();
        for (int i = 0; i < 64; i++) a.add(i);
        return a;
    }
}
