package no.bjornadal.mytracks.controller;

import no.bjornadal.mytracks.healthgraph.HealthGraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.logging.Logger;

@RestController
@RequestMapping("/rest")
public class LoginController {

    private static final Logger log = Logger.getLogger(LoginController.class.getName());

    @Autowired
    private HealthGraph healthGraph;

    @RequestMapping("/login")
    public String login(@RequestParam("code") String code, HttpServletRequest req) throws Throwable {
        String port = (req.getServerPort() != 80) ? ":" + req.getServerPort() : "";
        String appUrl = req.getScheme() + "://" + req.getServerName() + port + req.getContextPath() + HealthGraph.REDIRECT_URI;
        String accessToken = healthGraph.getAccessToken(appUrl, code);

        HttpSession session = req.getSession(true);
        session.setAttribute("code", code);
        session.setAttribute("accessToken", accessToken);

        log.info("CODE: " + code);
        log.info("ACCESS_TOKEN: " + accessToken);
        log.info("REDIRECT_URI: " + appUrl);

        return "redirect:/";
    }

    @RequestMapping("/getAccessToken")
    @ResponseBody
    public String getAccessToken(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        Object token = session.getAttribute("accessToken");
        return (token != null) ? token.toString() : "";
    }

    @RequestMapping("/logout")
    public ResponseEntity logout(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        session.removeAttribute("accessToken");
        return new ResponseEntity(HttpStatus.OK);
    }
}