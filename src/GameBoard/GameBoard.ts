import styles from './styles.css?inline';
import Point2 from './Point2';
import type { TRegionConfig, TRegionDirection, TRegionSize } from './types';

export default class GameBoard extends HTMLElement {
    canvas: HTMLCanvasElement;

    ctx: CanvasRenderingContext2D;

    center: Point2;

    bigFieldRectSize: number;

    smallFieldRectSize: number;

    checkerSize: number;

    regions: Record<TRegionSize, Record<TRegionDirection, TRegionConfig>>;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        const style = document.createElement('style');
        style.textContent = styles;

        this.canvas = document.createElement('canvas');

        let CANVAS_SIZE;

        if (window.innerWidth < 400) {
            CANVAS_SIZE = 320;
            this.canvas.style.setProperty('--size', `${CANVAS_SIZE}px`);
            this.canvas.width = CANVAS_SIZE;
            this.canvas.height = CANVAS_SIZE;
        } else {
            CANVAS_SIZE = 700;
            this.canvas.style.setProperty('--size', `${CANVAS_SIZE}px`);
            this.canvas.width = CANVAS_SIZE;
            this.canvas.height = CANVAS_SIZE;
        }

        this.ctx = this.canvas.getContext('2d')!;

        this.center = Point2.create(this.canvas.width * 0.5, this.canvas.height * 0.5);
        this.bigFieldRectSize = CANVAS_SIZE - 2;
        this.smallFieldRectSize = this.bigFieldRectSize * 0.5;
        this.checkerSize = this.smallFieldRectSize / 8;

        const unitBlockSize = this.smallFieldRectSize * 0.5;

        // todo use reflections
        this.regions = {
            big: {
                W: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x - unitBlockSize} ${this.center.y - unitBlockSize * 0.5}
                            h ${-unitBlockSize}
                            v ${unitBlockSize}
                            h ${unitBlockSize}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                N: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                        M ${this.center.x - unitBlockSize * 0.5} ${this.center.y - unitBlockSize}
                        v ${-unitBlockSize}
                        h ${unitBlockSize}
                        v ${unitBlockSize}
                        Z
                    `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                S: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                        M ${this.center.x + unitBlockSize} ${this.center.y - unitBlockSize * 0.5}
                        h ${unitBlockSize}
                        v ${unitBlockSize}
                        h ${-unitBlockSize}
                        Z
                    `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                E: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                        M ${this.center.x - unitBlockSize * 0.5} ${this.center.y + unitBlockSize}
                        v ${unitBlockSize}
                        h ${unitBlockSize}
                        v ${-unitBlockSize}
                        Z
                    `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                NW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                        M ${this.center.x - unitBlockSize} ${this.center.y - unitBlockSize * 0.5}
                        v ${-(unitBlockSize - unitBlockSize * 0.5)}
                        h ${unitBlockSize - unitBlockSize * 0.5}
                        v ${-unitBlockSize}
                        h ${-(unitBlockSize * 2 - unitBlockSize * 0.5)}
                        v ${unitBlockSize * 2 - unitBlockSize * 0.5}
                        Z
                    `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                NE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                        M ${this.center.x + unitBlockSize} ${this.center.y - unitBlockSize * 0.5}
                        v ${-(unitBlockSize - unitBlockSize * 0.5)}
                        h ${-(unitBlockSize - unitBlockSize * 0.5)}
                        v ${-unitBlockSize}
                        h ${unitBlockSize * 2 - unitBlockSize * 0.5}
                        v ${unitBlockSize * 2 - unitBlockSize * 0.5}
                        Z
                    `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                SE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                        this.center.y + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                        M ${this.center.x + unitBlockSize} ${this.center.y + unitBlockSize * 0.5}
                        v ${unitBlockSize - unitBlockSize * 0.5}
                        h ${-(unitBlockSize - unitBlockSize * 0.5)}
                        v ${unitBlockSize}
                        h ${unitBlockSize * 2 - unitBlockSize * 0.5}
                        v ${-(unitBlockSize * 2 - unitBlockSize * 0.5)}
                        Z
                    `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                SW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y + this.bigFieldRectSize * 0.5 - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                        M ${this.center.x - unitBlockSize} ${this.center.y + unitBlockSize * 0.5}
                        v ${unitBlockSize - unitBlockSize * 0.5}
                        h ${unitBlockSize - unitBlockSize * 0.5}
                        v ${unitBlockSize}
                        h ${-(unitBlockSize * 2 - unitBlockSize * 0.5)}
                        v ${-(unitBlockSize * 2 - unitBlockSize * 0.5)}
                        Z
                    `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
            },
            small: {
                W: {
                    checkerCoordinate: Point2.create(
                        this.center.x - unitBlockSize + this.smallFieldRectSize * 0.25,
                        this.center.y,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
                N: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y - unitBlockSize + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
                E: {
                    checkerCoordinate: Point2.create(
                        this.center.x + unitBlockSize - this.smallFieldRectSize * 0.25,
                        this.center.y,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
                S: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y + unitBlockSize - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
                NW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - unitBlockSize + this.smallFieldRectSize * 0.25,
                        this.center.y - unitBlockSize + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
                NE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + unitBlockSize - this.smallFieldRectSize * 0.25,
                        this.center.y - unitBlockSize + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
                SE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + unitBlockSize - this.smallFieldRectSize * 0.25,
                        this.center.y + unitBlockSize - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
                SW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - unitBlockSize + this.smallFieldRectSize * 0.25,
                        this.center.y + unitBlockSize - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(),
                        color: '#000000',
                        isActive: false,
                    },
                },
            },
        };

        this.shadowRoot!.append(style, this.canvas);
    }

    onMouseMove(e: MouseEvent) {
        const { offsetX, offsetY } = e;

        for (let region of Object.values(this.regions)) {
            for (let regionType of Object.values(region)) {
                regionType.regionSettings.isActive = this.ctx.isPointInPath(regionType.regionSettings.path, offsetX, offsetY);
            }
        }
    }

    onMouseDown(e: MouseEvent) {
        const { offsetX, offsetY } = e;

        for (let region of Object.values(this.regions)) {
            for (let regionType of Object.values(region)) {
                if (this.ctx.isPointInPath(regionType.regionSettings.path, offsetX, offsetY)) {
                    regionType.regionSettings.checker = regionType.regionSettings.checker ? null : { type: 'some' };
                }
            }
        }
    }

    connectedCallback() {
        this.drawOnce();
        this.draw();

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mousedown', this.onMouseDown);
    }

    disconnectedCallback() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mousedown', this.onMouseDown);
    }

    drawOnce() {

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawRegion();
        this.drawField();
        this.drawCheckers();

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    drawField() {
        this.drawRectAtCenter(this.ctx, { width: this.bigFieldRectSize, height: this.bigFieldRectSize }, this.center);

        this.drawRectAtCenter(
            this.ctx,
            { width: this.smallFieldRectSize, height: this.smallFieldRectSize },
            this.center,
        );

        this.drawLine(
            this.ctx,
            Point2.create(this.center.x, this.center.y - this.bigFieldRectSize * 0.5),
            Point2.create(this.center.x, this.center.y + this.bigFieldRectSize * 0.5),
        );

        this.drawLine(
            this.ctx,
            Point2.create(this.center.x - this.bigFieldRectSize * 0.5, this.center.y),
            Point2.create(this.center.y + this.bigFieldRectSize * 0.5, this.center.y),
        );
    }

    drawRegion() {
        for (let regionType of Object.values(this.regions.big)) {
            if (!regionType.regionSettings.path) {
                return;
            }

            this.ctx.fillStyle = regionType.regionSettings.isActive
                ? regionType?.regionSettings.color ?? 'transparent'
                : 'transparent';
            this.ctx.globalAlpha = 0.15;
            this.ctx.fill(regionType.regionSettings.path);
            this.ctx.globalAlpha = 1;
        }
    }

    drawCheckers() {
        for (let region of Object.values(this.regions)) {
            for (let regionType of Object.values(region)) {
                if (regionType.regionSettings.checker) {
                    this.drawCircleAtPoint(
                        this.ctx,
                        regionType.checkerCoordinate,
                        this.checkerSize,
                        { color: regionType.regionSettings?.checker?.type === 'some' ? 'red' : 'black' }
                    );
                }
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
        { width, height }: { width: number; height: number },
        { x, y }: Point2,
    ) {
        ctx.beginPath();

        const startX = x - width * 0.5;
        const startY = y - height * 0.5;

        ctx.rect(startX, startY, width, height);

        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.closePath();
    }

    drawCircleAtPoint(ctx: CanvasRenderingContext2D, point: Point2, radius, paint?: { color: string }) {
        ctx.beginPath();

        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, false);

        // ctx.globalAlpha = 0.75;
        ctx.fillStyle = paint?.color ?? 'black';
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.closePath();
    }
}

customElements.define('ui-game-board', GameBoard);
