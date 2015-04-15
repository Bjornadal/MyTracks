/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package no.bjornadal.mytracks.healthgraph;

import net.smartam.leeloo.client.OAuthClient;
import net.smartam.leeloo.client.URLConnectionClient;
import net.smartam.leeloo.client.request.OAuthClientRequest;
import net.smartam.leeloo.client.response.OAuthJSONAccessTokenResponse;
import net.smartam.leeloo.common.message.types.GrantType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 *
 * @author andreasb
 */
@Service
public class HealthGraph {

    private static final Logger log = Logger.getLogger(HealthGraph.class.getName());

    public static final String CLIENT_ID = "ba572e63f74b42c1a21e4206b83f3dd3";
    public static final String CLIENT_SECRET = "b5d1ab61f8eb4afab706423211521a4e";
    public static final String AUTH_URL = "https://runkeeper.com/apps/authorize";
    public static final String ACCESS_URL = "https://runkeeper.com/apps/token";
    public static final String REDIRECT_URI = "/rest/login";
    public static final String REST_URL = "https://api.runkeeper.com";
    public static final String AUTH_CODE = "75fe669b6c1b4486ae35ffb15768ed43";

    public String getAccessToken(String redirectUri, String code) {
        String accessToken = "";
        try {
            OAuthClientRequest request = OAuthClientRequest
                    .tokenLocation(ACCESS_URL)
                    .setGrantType(GrantType.AUTHORIZATION_CODE)
                    .setClientId(CLIENT_ID)
                    .setClientSecret(CLIENT_SECRET)
                    .setRedirectURI(redirectUri)
                    .setCode(code).buildBodyMessage();

            // create OAuth client that uses custom http client under the hood
            OAuthClient oAuthClient = new OAuthClient(new URLConnectionClient());

            OAuthJSONAccessTokenResponse response = oAuthClient.accessToken(request);

            accessToken = response.getAccessToken();
            String expiresIn = response.getExpiresIn();

            System.out.println("Access Token: " + accessToken + " will expire in " + expiresIn);
        }
        catch (Exception e) {
            e.printStackTrace();
            log.severe("Exception in getAccessToken: " + e.getMessage());
        }
        return accessToken;
    }

    public List<Activity> getActivites(String authToken, int pageSize, int page) {
        List<Activity> activites = new ArrayList<Activity>();

        // TODO: 
        return activites;
    }

    public ActivityDetail getActivityDetail(String authToken, int id) {

        // TODO:
        
        return null;
    }
}
