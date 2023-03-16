export default class Point2 {
    static create(x: number, y: number) {
        return new Point2(x, y);
    }

    x: number;

    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
