import styles from './styles.css?inline'
import Point2 from "./Point2";
import {randIndex} from "../utils";

const CANVAS_SIZE = 600;

type TRegionSize = 'big' | 'small';

type TRegionDirection = 'N' | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SE' | 'SW';

type TRegionConfig = {
    checkerCoordinate: Point2;
    dropRegion: Path2D;
};

export default class GameBoard extends HTMLElement {
    canvas: HTMLCanvasElement;

    ctx: CanvasRenderingContext2D;

    center: Point2;

    bigFieldRectSize: number;

    smallFieldRectSize: number;

    checkerSize: number;

    regions: Record<TRegionSize, Record<TRegionDirection, TRegionConfig>>

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = styles

        this.canvas = document.createElement('canvas');
        this.canvas.width = CANVAS_SIZE;
        this.canvas.height = CANVAS_SIZE;
        this.canvas.style.setProperty('--size', `${CANVAS_SIZE}px`);
        this.ctx = this.canvas.getContext('2d')!;

        this.center = Point2.create(this.canvas.width * 0.5, this.canvas.height * 0.5);
        this.bigFieldRectSize = 580;
        this.smallFieldRectSize = this.bigFieldRectSize * 0.5;
        this.checkerSize = this.smallFieldRectSize / 8;

        const unitBlockSize = this.smallFieldRectSize * 0.5;

        // todo use reflections
        this.regions = {
            big: {
                W: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x - this.smallFieldRectSize * 0.5} ${this.center.y - this.checkerSize}
                        h ${-unitBlockSize}
                        v ${this.checkerSize * 2}
                        h ${unitBlockSize}
                        Z
                    `)
                },
                N: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x - this.checkerSize} ${this.center.y - unitBlockSize}
                        v ${-unitBlockSize}
                        h ${this.checkerSize * 2}
                        v ${unitBlockSize}
                        Z
                    `)
                },
                S: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x + this.smallFieldRectSize * 0.5} ${this.center.y - this.checkerSize}
                        h ${unitBlockSize}
                        v ${this.checkerSize * 2}
                        h ${-unitBlockSize}
                        Z
                    `)
                },
                E: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x - this.checkerSize} ${this.center.y + unitBlockSize}
                        v ${unitBlockSize}
                        h ${this.checkerSize * 2}
                        v ${-unitBlockSize}
                        Z
                    `)
                },
                NW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x - unitBlockSize} ${this.center.y - this.checkerSize}
                        v ${-(unitBlockSize - this.checkerSize)}
                        h ${(unitBlockSize - this.checkerSize)}
                        v ${-unitBlockSize}
                        h ${-(unitBlockSize * 2 - this.checkerSize)}
                        v ${(unitBlockSize * 2 - this.checkerSize)}
                        Z
                    `)
                },
                NE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x + unitBlockSize} ${this.center.y - this.checkerSize}
                        v ${-(unitBlockSize - this.checkerSize)}
                        h ${-(unitBlockSize - this.checkerSize)}
                        v ${-unitBlockSize}
                        h ${(unitBlockSize * 2 - this.checkerSize)}
                        v ${(unitBlockSize * 2 - this.checkerSize)}
                        Z
                    `)
                },
                SE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x + unitBlockSize} ${this.center.y + this.checkerSize}
                        v ${(unitBlockSize - this.checkerSize)}
                        h ${-(unitBlockSize - this.checkerSize)}
                        v ${unitBlockSize}
                        h ${(unitBlockSize * 2 - this.checkerSize)}
                        v ${-(unitBlockSize * 2 - this.checkerSize)}
                        Z
                    `)
                },
                SW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D(`
                        M ${this.center.x - unitBlockSize} ${this.center.y + this.checkerSize}
                        v ${(unitBlockSize - this.checkerSize)}
                        h ${(unitBlockSize - this.checkerSize)}
                        v ${unitBlockSize}
                        h ${-(unitBlockSize * 2 - this.checkerSize)}
                        v ${-(unitBlockSize * 2 - this.checkerSize)}
                        Z
                    `)
                }
            },
            small: {
                W: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.smallFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y
                    ),
                    dropRegion: new Path2D()
                },
                N: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y - this.smallFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D()
                },
                E: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.smallFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y
                    ),
                    dropRegion: new Path2D()
                },
                S: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y + this.smallFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D()
                },
                NW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.smallFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y - this.smallFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D()
                },
                NE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.smallFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y - this.smallFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D()
                },
                SE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.smallFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y + this.smallFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D()
                },
                SW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.smallFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y + this.smallFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25
                    ),
                    dropRegion: new Path2D()
                },
            }
        };

        this.shadowRoot!.append(style, this.canvas);
    }

    connectedCallback() {
        this.draw();
    }

    draw() {
        this.drawField();
        this.drawRegion();
        this.drawCheckers();
    }

    drawField() {
        this.drawRectAtCenter(
            this.ctx,
            { width: this.bigFieldRectSize, height: this.bigFieldRectSize },
            this.center
        );

        this.drawRectAtCenter(
            this.ctx,
            { width: this.smallFieldRectSize, height: this.smallFieldRectSize },
            this.center
        );

        this.drawLine(
            this.ctx,
            Point2.create(this.center.x , this.center.y - this.bigFieldRectSize * 0.5),
            Point2.create(this.center.x , this.center.y + this.bigFieldRectSize * 0.5)
        );

        this.drawLine(
            this.ctx,
            Point2.create(this.center.x - this.bigFieldRectSize * 0.5, this.center.y),
            Point2.create(this.center.y + this.bigFieldRectSize * 0.5 , this.center.y)
        );
    }

    drawRegion() {
        const colors = ['#0048BA', '#B0BF1A', '#7CB9E8', '#B284BE', '#DB2D43', '#FFBF00', '#3B7A57', '#3DDC84', '#00FFFF'];
        const usedColors = new Set();

        for (let regionType of Object.values(this.regions.big)) {
            if (!regionType.dropRegion) {
                return;
            }

            let color = colors[randIndex(colors)];
            while (usedColors.has(color)) {
                if (usedColors.size >= colors.length) {
                    break;
                }

                color = colors[randIndex(colors)];
            }

            usedColors.add(color);

            console.log(usedColors);

            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = 0.75;
            this.ctx.fill(regionType.dropRegion);
            this.ctx.globalAlpha = 1;
        }

        // for (let region of Object.values(this.regions)) {
        //     for (let regionType of Object.values(region)) {
        //         if (!regionType.dropRegion) {
        //             return;
        //         }
        //
        //         let color = colors[randIndex(colors)];
        //         while (usedColors.has(color)) {
        //             if (usedColors.size >= colors.length) {
        //                 break;
        //             }
        //
        //             color = colors[randIndex(colors)];
        //         }
        //
        //         usedColors.add(color);
        //
        //         console.log(usedColors);
        //
        //         this.ctx.fillStyle = color;
        //         this.ctx.globalAlpha = 0.75;
        //         this.ctx.fill(regionType.dropRegion);
        //         this.ctx.globalAlpha = 1;
        //     }
        // }
    }

    drawCheckers() {
        for (let region of Object.values(this.regions)) {
            for (let regionType of Object.values(region)) {
                this.drawCircleAtPoint(this.ctx, regionType.checkerCoordinate, this.checkerSize);
            }
        }
    }

    drawLine(ctx: CanvasRenderingContext2D, point1: Point2, point2: Point2) {
        ctx.beginPath();

        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);

        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.closePath();
    }

    drawRectAtCenter(
        ctx: CanvasRenderingContext2D,
        { width, height }: { width: number, height: number },
        { x, y }: Point2
    ) {
        ctx.beginPath();

        const startX = x - width * 0.5;
        const startY = y - height * 0.5;

        ctx.rect(
            startX,
            startY,
            width,
            height
        );

        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.closePath();
    }

    drawCircleAtPoint(
        ctx: CanvasRenderingContext2D,
        point: Point2,
        radius: number = 10
    ) {
        ctx.beginPath();

        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, false);

        // ctx.globalAlpha = 0.75;
        ctx.fillStyle = 'black';
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.closePath();
    }
}

customElements.define('ui-game-board', GameBoard);
