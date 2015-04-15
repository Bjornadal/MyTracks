<%--
    Document   : index
    Created on : Oct 1, 2013, 8:46:01 AM
    Author     : andreasb
--%>

<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Mine spor</title>
        <link rel="shortcut icon" type="image/x-icon" href="<spring:url value="/resources/images/favicon.ico" />" />
        <link href="resources/stylesheets/map.css" rel="stylesheet" type="text/css" />

        <meta name="viewport" content="width=device-width" />
        <script src="http://maps.google.com/maps/api/js?sensor=false&libraries=panoramio,geometry"></script>
        <script src="http://static1.runkeeper.com/script/runkeeper_assets.js"></script>
        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script src="resources/scripts/jquery/jquery-ui-1.10.3.custom.min.js"></script>
        <script src="resources/scripts/jquery/jquery-cookie.js"></script>
        <script src="resources/scripts/jquery/jquery.soap.js"></script>

        <script src="resources/scripts/external/arcgislink_compiled.js"></script>
        <script src="resources/scripts/external/moment-with-langs.min.js"></script>
        <script src="resources/scripts/map.js"></script>
        <script src="resources/scripts/runkeeper.js"></script>
        <script src="resources/scripts/layers.js"></script>
        <script src="resources/scripts/login.js"></script>
        <script src="resources/scripts/loader.js"></script>
        <script src="resources/scripts/helpers.js"></script>
        <script src="resources/scripts/moment-with-locales.js"></script>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="resources/scripts/bootstrap/css/bootstrap.min.css">

        <!-- Optional theme -->
        <link rel="stylesheet" href="resources/scripts/bootstrap/css/bootstrap-theme.min.css">

        <!-- Latest compiled and minified JavaScript -->
        <script src="resources/scripts/bootstrap/js/bootstrap.min.js"></script>

        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-61929566-1', 'auto');
            ga('send', 'pageview');

        </script>
    </head>
    <body>
        <div id="bodyContainer">
            <section id="rightMenu">
                <h2>Mine spor</h2>
                <div id="commands">
                    <ul class="Menu">
                        <li id="login">
                            <p>
                                Logg inn med RunKeeper for å liste opp dine aktiviteter.
                            </p>
                            <a id="rk_login-blue-black" class="rk_webButtonWithText200" href="" title="Login with RunKeeper, powered by the Health Graph"></a>
                        </li>
                        <li id="logout">
                            <a id="btnLogoutRunkeeper" href="#" class="MenuItem">Logg ut</a>
                        </li>
                        <li><a id="btnPanoramio" href="javascript:LoadPanoramio();" class="MenuItem">Vis Panoramio</a></li>
                        <li><a id="btnHelning" href="javascript:LoadHelning();" class="MenuItem">Vis Helning</a></li>
                        <li><a id="btnAktsomhet" href="javascript:LoadAktsomhet();" class="MenuItem">Vis Aktsomhet</a></li>
                        <%--<li>Last inn GPX-filer til kart<input id="fileUploadButton" type='file' name='files[]' multiple /></li>--%>
                    </ul>
                </div>
                <%--<div style="margin-left: 20px; font-size: 10px;">--%>
                    <%--<span>Kart: </span>--%>
                    <%--<a href="http://www.statkart.no/" target="_blank">© Kartverket</a>--%>
                <%--</div>--%>
                <div id="routeList">

                </div>
            </section>
            <section id="mainContent">
                <div id="map"></div>
                <div class="mapFooter">
                    Kartgrunnlag <a href="http://www.statkart.no/">©Kartverket</a>
                    <%--<a href="http://www.statkart.no/nor/Land/Fagomrader/Geovekst/">--%>
                    <%--Geovekst</a> og <a href="http://www.statkart.no/?module=Articles;action=Article.publicShow;ID=14194">--%>
                    <%--kommuner</a>--%>
                </div>
            </section>
        </div>
        <%--<footer>--%>
            <%--<div class="content-wrapper">--%>
                <%--<div class="float-left">--%>
                    <%--<p>--%>
                        <%--Kartgrunnlag <a href="http://www.statkart.no/">Kartverket</a>, <a href="http://www.statkart.no/nor/Land/Fagomrader/Geovekst/">--%>
                        <%--Geovekst</a> og <a href="http://www.statkart.no/?module=Articles;action=Article.publicShow;ID=14194">--%>
                        <%--kommuner</a>--%>
                    <%--</p>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</footer>--%>
    </body>
</html>