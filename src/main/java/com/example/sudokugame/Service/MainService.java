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
        MainService.possibleNumbers = possibleNumbers;
        MainService.rows = rows;
        MainService.startFromZero = startFromZero;
    }
    public List<Integer> solveSudoku(){
        return getPossibleNumbers();
    }

    public List<Integer> getPossibleNumbers() {
        return possibleNumbers;
    }

    public List<Integer> getRows() {
        return rows;
    }

    public Boolean getStartFromZero() {
        return startFromZero;
    }
}
