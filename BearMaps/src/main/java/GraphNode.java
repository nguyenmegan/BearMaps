/**
 * Created by megannguyen on 4/15/16.
 */
import java.util.HashSet;

public class GraphNode implements Comparable<GraphNode> {

    long id;
    double lat, lon;
    HashSet<GraphNode> connectionSet;
    double priority;

    public GraphNode(long id, double lat, double lon) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.connectionSet = new HashSet<>();
    }

    public long getId() {
        return id;
    }

    public HashSet<GraphNode> getConnectionSet() {
        return connectionSet;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GraphNode node = (GraphNode) o;

        if (id != node.id) {
            return false;
        }
        if (Double.compare(node.lat, lat) != 0) {
            return false;
        }
        return Double.compare(node.lon, lon) == 0;

    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = (int) (id ^ (id >>> 32));
        temp = Double.doubleToLongBits(lat);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(lon);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return "Node{"
                + "id=" + id
                + ", lat=" + lat
                + ", lon=" + lon
                + '}';
    }

    public static double distance(GraphNode n1, GraphNode n2) {
        double distance = Math.sqrt(Math.pow((n1.getLat() - n2.getLat()), 2)
                + Math.pow((n1.getLon() - n2.getLon()), 2));
        return distance;
    }

    public int compareTo(GraphNode node) {
        if (this.priority < node.priority) {
            return -1;
        } else if (this.priority == node.priority) {
            return 0;
        } else {
            return 1;
        }
    }
}




