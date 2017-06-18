import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import java.util.Set;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.HashSet;

/**
 *  Parses OSM XML files using an XML SAX parser. Used to construct the graph of roads for
 *  pathfinding, under some constraints.
 *  See OSM documentation on
 *  <a href="http://wiki.openstreetmap.org/wiki/Key:highway">the highway tag</a>,
 *  <a href="http://wiki.openstreetmap.org/wiki/Way">the way XML element</a>,
 *  <a href="http://wiki.openstreetmap.org/wiki/Node">the node XML element</a>,
 *  and the java
 *  <a href="https://docs.oracle.com/javase/tutorial/jaxp/sax/parsing.html">SAX parser tutorial</a>.
 *  @author Alan Yao
 */
public class MapDBHandler extends DefaultHandler {
    /**
     * Only allow for non-service roads; this prevents going on pedestrian streets as much as
     * possible. Note that in Berkeley, many of the campus roads are tagged as motor vehicle
     * roads, but in practice we walk all over them with such impunity that we forget cars can
     * actually drive on them.
     */
    private static final Set<String> ALLOWED_HIGHWAY_TYPES = new HashSet<>(Arrays.asList
            ("motorway", "trunk", "primary", "secondary", "tertiary", "unclassified",
                    "residential", "living_street", "motorway_link", "trunk_link", "primary_link",
                    "secondary_link", "tertiary_link"));
    private String activeState = "";
    private final GraphDB g;

    public MapDBHandler(GraphDB g) {
        this.g = g;
    }

    private static HashMap<Long, GraphNode> hash = new HashMap<>();

    public static HashMap<Long, GraphNode> getHash() {
        return hash;
    }

    private LinkedList<GraphNode> toBeConnected = new LinkedList<>();

    private boolean valid = false;

    /**
     * Called at the beginning of an element. Typically, you will want to handle each element in
     * here, and you may want to track the parent element.
     *
     * @param uri        The Namespace URI, or the empty string if the element has no Namespace
     *                   URI or if Namespace processing is not being performed.
     * @param localName  The local name (without prefix), or the empty string if Namespace
     *                   processing is not being performed.
     * @param qName      The qualified name (with prefix), or the empty string if qualified
     *                   names are not available. This tells us which element we're looking at.
     * @param attributes The attributes attached to the element. If there are no attributes, it
     *                   shall be an empty Attributes object.
     * @throws SAXException Any SAX exception, possibly wrapping another exception.
     * @see Attributes
     */
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes)
            throws SAXException {
        /* Some example code on how you might begin to parse XML files. */
        if (qName.equals("node")) {
            activeState = "node";
            hash.put(Long.parseLong(attributes.getValue("id")),
                    new GraphNode(Long.parseLong(attributes.getValue("id")),
                            Double.parseDouble(attributes.getValue("lat")),
                            Double.parseDouble(attributes.getValue("lon"))));
        } else if (qName.equals("way")) {
            activeState = "way";
        } else if (qName.equals("nd")) {
            Long ref = Long.parseLong(attributes.getValue("ref"));
            GraphNode nodee = hash.get(ref);
            toBeConnected.add(nodee);
        } else if (activeState.equals("way") && qName.equals("tag")) {
            String k = attributes.getValue("k");
            String v = attributes.getValue("v");
            if (k.equals("highway") && ALLOWED_HIGHWAY_TYPES.contains(v)) {
                valid = true;
            }
        }
    }

    /**
     * Receive notification of the end of an element. You may want to take specific terminating
     * actions here, like finalizing vertices or edges found.
     *
     * @param uri       The Namespace URI, or the empty string if the element has no Namespace URI
     *                  or if Namespace processing is not being performed.
     * @param localName The local name (without prefix), or the empty string if Namespace
     *                  processing is not being performed.
     * @param qName     The qualified name (with prefix), or the empty string if qualified names
     *                  are not available.
     * @throws SAXException Any SAX exception, possibly wrapping another exception.
     */
    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if (qName.equals("way")) {
            if (valid) {
                for (int i = 0; i < toBeConnected.size() - 1; i++) {
                    hash.get(toBeConnected.get(i).getId()).getConnectionSet().
                            add(toBeConnected.get(i + 1));
                }
                for (int i = toBeConnected.size() - 1; i > 0; i--) {
                    hash.get(toBeConnected.get(i).getId()).getConnectionSet().
                            add(toBeConnected.get(i - 1));
                }
            }
            toBeConnected = new LinkedList<>();
            valid = false;
        }
    }
}
