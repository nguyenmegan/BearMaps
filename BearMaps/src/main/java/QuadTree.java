/**
 * Created by megannguyen on 4/9/16.
 */


public class QuadTree {

    private QTreeNode root;
    private int depth = 1;

    public QuadTree(double ullon, double ullat, double lrlon, double lrlat) {
        Point rootUL = new Point(ullon, ullat);
        Point rootLR = new Point(lrlon, lrlat);
        root = new QTreeNode(rootLR, rootUL, depth, "");
    }

    public QTreeNode getRoot() {
        return this.root;
    }
}

