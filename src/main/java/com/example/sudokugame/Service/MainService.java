package com.example.sudokugame.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MainService {

    Logger log = LoggerFactory.getLogger(MainService.class);

    private static List<Integer> possibleNumbers;

    private static List<Integer> rows;

    private static Boolean startFromZero;

    public void setValues(List<Integer> possibleNumbers, ArrayList<Integer> rows, Boolean startFromZero){
        System.out.println(rows);
        MainService.possibleNumbers = possibleNumbers;
        MainService.rows = rows;
        MainService.startFromZero = startFromZero;
    }
    public List<Integer> solveSudoku(String algorithm){
        List<Integer> a = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            a.add(123123123);
            a.add(456456456);
            a.add(789789789);
        }
        return a;
    }

    public List<Integer> getPossibleNumbers(String algorithm) {
        return possibleNumbers;
    }

    public List<Integer> getRows() {
        return rows;
    }

    public Boolean getStartFromZero() {
        return startFromZero;
    }
}
