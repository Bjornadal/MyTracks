/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package no.bjornadal.mytracks.healthgraph;

import com.google.appengine.repackaged.org.joda.time.DateTime;
import java.util.List;

/**
 *
 * @author andreasb
 */
public class ActivityDetail {

    private String type;
    private DateTime startTime;
    private double totalDistance;
    private double duration;
    private double totalCalories;
    private double climb;
    private List<Coordinate> path;

    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the startTime
     */
    public DateTime getStartTime() {
        return startTime;
    }

    /**
     * @param startTime the startTime to set
     */
    public void setStartTime(DateTime startTime) {
        this.startTime = startTime;
    }

    /**
     * @return the totalDistance
     */
    public double getTotalDistance() {
        return totalDistance;
    }

    /**
     * @param totalDistance the totalDistance to set
     */
    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    /**
     * @return the duration
     */
    public double getDuration() {
        return duration;
    }

    /**
     * @param duration the duration to set
     */
    public void setDuration(double duration) {
        this.duration = duration;
    }

    /**
     * @return the totalCalories
     */
    public double getTotalCalories() {
        return totalCalories;
    }

    /**
     * @param totalCalories the totalCalories to set
     */
    public void setTotalCalories(double totalCalories) {
        this.totalCalories = totalCalories;
    }

    /**
     * @return the climb
     */
    public double getClimb() {
        return climb;
    }

    /**
     * @param climb the climb to set
     */
    public void setClimb(double climb) {
        this.climb = climb;
    }

    /**
     * @return the path
     */
    public List<Coordinate> getPath() {
        return path;
    }

    /**
     * @param path the path to set
     */
    public void setPath(List<Coordinate> path) {
        this.path = path;
    }
}
