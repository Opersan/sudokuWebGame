package com.example.sudokugame.Controller;

import com.example.sudokugame.Service.MainService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MainRestController {

    private MainController mainController;
    private MainService mainService;


    Logger log = LoggerFactory.getLogger(MainRestController.class);

    public MainRestController(MainService mainService, MainController controller){
        this.mainService = mainService;
        this.mainController = controller;
    }

    @PostMapping("/setValues")
    public void setValues(@RequestBody String jsonEntry) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, ArrayList<Integer>> map = mapper.readValue(jsonEntry, Map.class);
        mainService.setValues(map.get("possibleNumber"), map.get("rows"), false);
    }
}
