package com.example.sudokugame.Controller;

import com.example.sudokugame.Service.MainService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class MainController {
    @Value("${spring.application.name}")
    String appName;

    private MainService mainService;

    Logger log = LoggerFactory.getLogger(MainController.class);

    public MainController(MainService mainService){
        this.mainService = mainService;
    }

    @RequestMapping("/")
    public String mainMenu(Model model){
        model.addAttribute("appName", appName);
        return "mainPage";
    }

    @RequestMapping(value = "/getAnswers", method=RequestMethod.POST)
    public String redirectAnswers(Model model){
        if (model.getAttribute("answers") == null) {
            List<Integer> a = mainService.solveSudoku();
            model.addAttribute("answers", a);
        }
        return "mainPage :: #nav1";
    }
}
