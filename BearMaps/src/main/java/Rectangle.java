/**
 * Created by megannguyen on 4/12/16.
 */
public class Rectangle {

    private double ullat, ullon, lrlat, lrlon;

    public Rectangle(Point ul, Point lr) {
        this.ullat = ul.getLat();
        this.ullon = ul.getLon();
        this.lrlat = lr.getLat();
        this.lrlon = lr.getLon();
    }

    public boolean overlaps(Rectangle tile) {
        if ((this.ullon <= tile.ullon && tile.ullon <= this.lrlon)
                || (this.ullon <= tile.lrlon && tile.lrlon <= this.lrlon)) {
            if ((this.lrlat <= tile.ullat && tile.ullat <= this.ullat)
                    || (this.lrlat <= tile.lrlat && tile.lrlat <= this.ullat)) {
                return true;
            }
        }
        if ((tile.ullon <= this.ullon && this.ullon <= tile.lrlon)
                || (tile.ullon <= this.lrlon && this.lrlon <= tile.lrlon)) {
            if ((tile.lrlat <= this.ullat && this.ullat <= tile.ullat)
                    || (tile.lrlat <= this.lrlat && this.lrlat <= tile.ullat)) {
                return true;
            }
        }
        return false;
    }
}
