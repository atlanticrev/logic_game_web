import styles from './styles.css?inline';
import Point2 from '../Point2';
import type { TCheckerType, TRegionConfig, TRegionDirection, TRegionSize } from './types';

const MOBILE_WIDTH_THRESHOLD = 400;

const DEFAULT_MOBILE_CANVAS_SIZE = 320;
const DEFAULT_DESKTOP_CANVAS_SIZE = 500;

// todo Remove checkers on checker click, not line (?)
export default class GameBoard extends HTMLElement {

    static get observedAttributes() {
        return ['active-checker'];
    }

    private readonly canvas: HTMLCanvasElement;

    private readonly ctx: CanvasRenderingContext2D;

    private readonly center: Point2;

    private readonly bigFieldRectSize: number;

    private readonly smallFieldRectSize: number;

    private readonly checkerRadius: number;

    private readonly regions: Record<TRegionSize, Record<TRegionDirection, TRegionConfig>>;

    private activeCheckerType: TCheckerType;

    private readonly unitBlockSize: number;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        this.activeCheckerType = this.getAttribute('active-checker') as TCheckerType

        const style = document.createElement('style');
        style.textContent = styles;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;

        let CANVAS_SIZE;
        if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
            CANVAS_SIZE = DEFAULT_MOBILE_CANVAS_SIZE;
            // this.canvas.style.setProperty('--size', `${CANVAS_SIZE / window.devicePixelRatio}px`);
            this.canvas.style.setProperty('--size', `${CANVAS_SIZE}px`);
            this.canvas.width = CANVAS_SIZE;
            this.canvas.height = CANVAS_SIZE;
        } else {
            CANVAS_SIZE = DEFAULT_DESKTOP_CANVAS_SIZE;
            // this.canvas.style.setProperty('--size', `${CANVAS_SIZE / window.devicePixelRatio}px`);
            this.canvas.style.setProperty('--size', `${CANVAS_SIZE}px`);
            this.canvas.width = CANVAS_SIZE;
            this.canvas.height = CANVAS_SIZE;
        }

        this.center = Point2.create(this.canvas.width * 0.5, this.canvas.height * 0.5);

        this.bigFieldRectSize = CANVAS_SIZE - 2;
        this.smallFieldRectSize = this.bigFieldRectSize * 0.5;
        this.checkerRadius = this.smallFieldRectSize / 8;
        this.unitBlockSize = this.smallFieldRectSize * 0.5;

        const smallFieldDistFromCenter = 30;
        const smallFieldRegionSize = smallFieldDistFromCenter * 2;

        // todo use geometric reflections
        this.regions = {
            big: {
                W: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.bigFieldRectSize * 0.5 + this.smallFieldRectSize * 0.25,
                        this.center.y,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x - this.unitBlockSize} ${this.center.y - this.unitBlockSize * 0.5}
                            h ${-this.unitBlockSize}
                            v ${this.unitBlockSize}
                            h ${this.unitBlockSize}
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
                        M ${this.center.x - this.unitBlockSize * 0.5} ${this.center.y - this.unitBlockSize}
                        v ${-this.unitBlockSize}
                        h ${this.unitBlockSize}
                        v ${this.unitBlockSize}
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
                        M ${this.center.x + this.unitBlockSize} ${this.center.y - this.unitBlockSize * 0.5}
                        h ${this.unitBlockSize}
                        v ${this.unitBlockSize}
                        h ${-this.unitBlockSize}
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
                        M ${this.center.x - this.unitBlockSize * 0.5} ${this.center.y + this.unitBlockSize}
                        v ${this.unitBlockSize}
                        h ${this.unitBlockSize}
                        v ${-this.unitBlockSize}
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
                        M ${this.center.x - this.unitBlockSize} ${this.center.y - this.unitBlockSize * 0.5}
                        v ${-(this.unitBlockSize - this.unitBlockSize * 0.5)}
                        h ${this.unitBlockSize - this.unitBlockSize * 0.5}
                        v ${-this.unitBlockSize}
                        h ${-(this.unitBlockSize * 2 - this.unitBlockSize * 0.5)}
                        v ${this.unitBlockSize * 2 - this.unitBlockSize * 0.5}
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
                        M ${this.center.x + this.unitBlockSize} ${this.center.y - this.unitBlockSize * 0.5}
                        v ${-(this.unitBlockSize - this.unitBlockSize * 0.5)}
                        h ${-(this.unitBlockSize - this.unitBlockSize * 0.5)}
                        v ${-this.unitBlockSize}
                        h ${this.unitBlockSize * 2 - this.unitBlockSize * 0.5}
                        v ${this.unitBlockSize * 2 - this.unitBlockSize * 0.5}
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
                        M ${this.center.x + this.unitBlockSize} ${this.center.y + this.unitBlockSize * 0.5}
                        v ${this.unitBlockSize - this.unitBlockSize * 0.5}
                        h ${-(this.unitBlockSize - this.unitBlockSize * 0.5)}
                        v ${this.unitBlockSize}
                        h ${this.unitBlockSize * 2 - this.unitBlockSize * 0.5}
                        v ${-(this.unitBlockSize * 2 - this.unitBlockSize * 0.5)}
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
                        M ${this.center.x - this.unitBlockSize} ${this.center.y + this.unitBlockSize * 0.5}
                        v ${this.unitBlockSize - this.unitBlockSize * 0.5}
                        h ${this.unitBlockSize - this.unitBlockSize * 0.5}
                        v ${this.unitBlockSize}
                        h ${-(this.unitBlockSize * 2 - this.unitBlockSize * 0.5)}
                        v ${-(this.unitBlockSize * 2 - this.unitBlockSize * 0.5)}
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
                        this.center.x - this.unitBlockSize * 0.5,
                        this.center.y,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x - smallFieldDistFromCenter} ${this.center.y + smallFieldDistFromCenter}
                            h ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            v ${-smallFieldRegionSize}
                            h ${this.unitBlockSize - smallFieldDistFromCenter}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                N: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y - this.unitBlockSize * 0.5,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x - smallFieldDistFromCenter} ${this.center.y - smallFieldDistFromCenter}
                            v ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            h ${smallFieldRegionSize}
                            v ${this.unitBlockSize - smallFieldDistFromCenter}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                E: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.unitBlockSize - this.smallFieldRectSize * 0.25,
                        this.center.y,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x + smallFieldDistFromCenter} ${this.center.y - smallFieldDistFromCenter}
                            h ${this.unitBlockSize - smallFieldDistFromCenter}
                            v ${smallFieldRegionSize}
                            h ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                S: {
                    checkerCoordinate: Point2.create(
                        this.center.x,
                        this.center.y + this.unitBlockSize - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x - smallFieldDistFromCenter} ${this.center.y + smallFieldDistFromCenter}
                            v ${this.unitBlockSize - smallFieldDistFromCenter}
                            h ${smallFieldRegionSize}
                            v ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                NW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.unitBlockSize + this.smallFieldRectSize * 0.25,
                        this.center.y - this.unitBlockSize + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x - smallFieldDistFromCenter} ${this.center.y - smallFieldDistFromCenter}
                            h ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            v ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            h ${this.unitBlockSize - smallFieldDistFromCenter}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                NE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.unitBlockSize - this.smallFieldRectSize * 0.25,
                        this.center.y - this.unitBlockSize + this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x + smallFieldDistFromCenter} ${this.center.y - smallFieldDistFromCenter}
                            h ${(this.unitBlockSize - smallFieldDistFromCenter)}
                            v ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            h ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                SE: {
                    checkerCoordinate: Point2.create(
                        this.center.x + this.unitBlockSize - this.smallFieldRectSize * 0.25,
                        this.center.y + this.unitBlockSize - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x + smallFieldDistFromCenter} ${this.center.y + smallFieldDistFromCenter}
                            h ${(this.unitBlockSize - smallFieldDistFromCenter)}
                            v ${(this.unitBlockSize - smallFieldDistFromCenter)}
                            h ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
                SW: {
                    checkerCoordinate: Point2.create(
                        this.center.x - this.unitBlockSize + this.smallFieldRectSize * 0.25,
                        this.center.y + this.unitBlockSize - this.smallFieldRectSize * 0.25,
                    ),
                    regionSettings: {
                        path: new Path2D(`
                            M ${this.center.x - smallFieldDistFromCenter} ${this.center.y + smallFieldDistFromCenter}
                            h ${-(this.unitBlockSize - smallFieldDistFromCenter)}
                            v ${(this.unitBlockSize - smallFieldDistFromCenter)}
                            h ${(this.unitBlockSize - smallFieldDistFromCenter)}
                            Z
                        `),
                        color: '#0048BA',
                        isActive: false,
                    },
                },
            },
        };

        this.shadowRoot!.append(style, this.canvas);
    }

    onMouseMove(e: MouseEvent) {
        // todo in what coordinate space is it?
        const { offsetX, offsetY } = e;

        for (let regionSize of Object.values(this.regions)) {
            for (let regionType of Object.values(regionSize)) {
                // todo why it triggers outside ui-game-filed?
                if (e.target !== this) {
                    regionType.regionSettings.isActive = false;
                } else {
                    regionType.regionSettings.isActive = this.ctx.isPointInPath(regionType.regionSettings.path, offsetX, offsetY);
                }
            }
        }
    }

    onMouseDown(e: MouseEvent) {
        const { offsetX, offsetY } = e;

        for (let regionSize of Object.values(this.regions)) {
            for (let regionType of Object.values(regionSize)) {
                if (e.target !== this) {
                    return;
                }

                if (this.ctx.isPointInPath(regionType.regionSettings.path, offsetX, offsetY)) {
                    if (regionType.regionSettings.checker) {
                        regionType.regionSettings.checker = null;
                        return;
                    }

                    regionType.regionSettings.checker = this.activeCheckerType === 'some' ? { type: 'some' } : { type: 'empty' };
                }
            }
        }
    }

    connectedCallback() {
        this.draw();

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mousedown', this.onMouseDown);
    }

    disconnectedCallback() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mousedown', this.onMouseDown);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === 'active-checker') {
                this.activeCheckerType = newValue as TCheckerType;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // this.drawRegion();
        this.drawField();
        this.drawCheckers();
        this.drawTexts();

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    drawTexts() {
        this.ctx.font = 'italic 28px sans-serif';
        this.ctx.fillStyle = 'black';

        this.ctx.fillText('x', this.center.x - 18, this.center.y - this.unitBlockSize - 6);
        this.ctx.fillText('x\'', this.center.x - 24, this.center.y + this.unitBlockSize + 22);
        this.ctx.fillText('y', this.center.x - this.unitBlockSize - 21, this.center.y + 20);
        this.ctx.fillText('y\'', this.center.x + this.unitBlockSize + 6, this.center.y + 22);
        this.ctx.fillText('m', this.center.x - 28, this.center.y - 6);
        this.ctx.fillText('m\'', this.center.x - this.unitBlockSize * 2 + 4, this.center.y + this.unitBlockSize * 2 - 6);
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
        for (let regionSize of Object.values(this.regions)) {
            for (let regionType of Object.values(regionSize)) {
                if (!regionType.regionSettings.path) {
                    return;
                }

                this.ctx.fillStyle = regionType.regionSettings.isActive
                    ? regionType?.regionSettings.color ?? 'transparent'
                    : 'transparent';
                this.ctx.globalAlpha = 0.1;
                this.ctx.fill(regionType.regionSettings.path);
                this.ctx.globalAlpha = 1;
            }
        }
    }

    drawCheckers() {
        for (let region of Object.values(this.regions)) {
            for (let regionType of Object.values(region)) {
                if (regionType.regionSettings.checker) {
                    this.drawCircleAtPoint(
                        this.ctx,
                        regionType.checkerCoordinate,
                        this.checkerRadius,
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

    drawRectAtCenter(ctx: CanvasRenderingContext2D, { width, height }: { width: number; height: number }, { x, y }: Point2) {
        const startX = x - width * 0.5;
        const startY = y - height * 0.5;

        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }

    drawCircleAtPoint(ctx: CanvasRenderingContext2D, point: Point2, radius: number, paint?: { color: string }) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = paint?.color ?? 'black';
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.closePath();
    }
}

customElements.define('ui-game-board', GameBoard);
