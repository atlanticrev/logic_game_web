import styles from './styles.css?inline';
import Point2 from '../GameBoard/Point2';

export default class CheckerSelector extends HTMLElement {
    canvas: HTMLCanvasElement;

    ctx: CanvasRenderingContext2D;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

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

        this.shadowRoot!.append(style, this.canvas);
    }

    onMouseDown(e: MouseEvent) {
        const { offsetX, offsetY } = e;


    }

    connectedCallback() {
        this.draw();

        document.addEventListener('mousedown', this.onMouseDown);
    }

    disconnectedCallback() {
        document.removeEventListener('mousedown', this.onMouseDown);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


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

customElements.define('ui-checker-selector', CheckerSelector);
