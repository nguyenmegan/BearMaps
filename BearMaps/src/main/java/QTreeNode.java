
/**
 * Created by megannguyen on 4/9/16.
 */
public class QTreeNode implements Comparable<QTreeNode> {
    private Point ul, lr;
    private QTreeNode nw, ne, sw, se;
    private int depth;
    private String name;

    public QTreeNode(Point lr, Point ul, int depth, String name) {
        this.lr = lr;
        this.ul = ul;
        this.depth = depth;
        this.name = name;

        if (depth > 7) {
            return;
        } else {
            Point nwul = new Point(this.getUl().getLon(), this.getUl().getLat());
            Point nwlr = new Point((this.getUl().getLon() + this.getLr().getLon()) / 2,
                    (this.getUl().getLat() + this.getLr().getLat()) / 2);
            this.nw = (new QTreeNode(nwlr, nwul, depth + 1, this.name + "1"));

            Point neul = new Point((this.getUl().getLon() + this.getLr().getLon()) / 2,
                    this.getUl().getLat());
            Point nelr = new Point(this.getLr().getLon(),
                    (this.getUl().getLat() + this.getLr().getLat()) / 2);
            this.ne = (new QTreeNode(nelr, neul, depth + 1, this.name + "2"));

            Point swul = new Point(this.getUl().getLon(),
                    (this.getUl().getLat() + this.getLr().getLat()) / 2);
            Point swlr = new Point((this.getUl().getLon() + this.getLr().getLon()) / 2,
                    this.getLr().getLat());
            this.sw = (new QTreeNode(swlr, swul, depth + 1, this.name + "3"));

            Point seul = new Point((this.getUl().getLon() + this.getLr().getLon()) / 2,
                    (this.getUl().getLat() + this.getLr().getLat()) / 2);
            Point selr = new Point(this.getLr().getLon(), this.getLr().getLat());
            this.se = (new QTreeNode(selr, seul, depth + 1, this.name + "4"));
        }
    }

    public Point getLr() {
        return lr;
    }

    public Point getUl() {
        return ul;
    }

    public QTreeNode getNe() {
        return ne;
    }

    public QTreeNode getNw() {
        return nw;
    }

    public QTreeNode getSe() {
        return se;
    }

    public QTreeNode getSw() {
        return sw;
    }

    public String getName() {
        return name;
    }

    public int compareTo(QTreeNode q) {
        if (this.getUl().getLat() > q.getUl().getLat()) {
            return -1;
        } else if (this.getUl().getLat() < q.getUl().getLat()) {
            return 1;
        } else {
            if (this.getUl().getLon() < q.getUl().getLon()) {
                return -1;
            } else if (this.getUl().getLon() > q.getUl().getLon()) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}
