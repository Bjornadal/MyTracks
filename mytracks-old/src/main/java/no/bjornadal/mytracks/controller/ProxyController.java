package no.bjornadal.mytracks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Enumeration;

/**
 * Created by Andreas on 25.06.2014.
 */
@Controller
public class ProxyController {

    @Autowired
    private RestTemplate restTemplate;

    private String server = "api.runkeeper.com";
    private int port = 80;


    @RequestMapping("/proxy/**")
    @ResponseBody
    public ResponseEntity<String> proxy(HttpServletRequest request, HttpServletResponse response) throws URISyntaxException {

        try {
            //String schema = request.getScheme();

            URI uri = new URI("http", null, server, port, request.getRequestURI().replace("/proxy", ""), request.getQueryString(), null);
            //URI uri = new URI("https://" + server + request.getRequestURI().replace("/proxy", ""));

            HttpHeaders headers = new HttpHeaders();
            Enumeration headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String key = (String) headerNames.nextElement();
                String value = request.getHeader(key);

                if (!key.equalsIgnoreCase("accept-encoding")) {
                    headers.set(key, value);
                }

//                if (key.equalsIgnoreCase("Authorization") || key.equalsIgnoreCase("Accept")) {
//                    headers.set(key, value);
//                }
            }

            ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<String>(headers), String.class);

            return responseEntity;
        } catch (HttpStatusCodeException e) {
            e.printStackTrace();
            String body = e.getResponseBodyAsString();
            System.err.println(body);

            return new ResponseEntity(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}