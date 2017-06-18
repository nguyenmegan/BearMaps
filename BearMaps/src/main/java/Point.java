/**
 * Created by megannguyen on 4/9/16.
 */
public class Point {
    private double lat, lon;

    public Point(double lon, double lat) {
        this.lon = lon;
        this.lat = lat;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }
}
