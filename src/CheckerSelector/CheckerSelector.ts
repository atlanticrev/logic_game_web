import styles from './styles.css?inline';

export default class CheckerSelector extends HTMLElement {

    static get observedAttributes() {
        return ['active-checker'];
    }

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        const style = document.createElement('style');
        style.textContent = styles;

        const template = document.createElement('div');
        template.innerHTML = `
            <button class='btn-some'>
                <span>Some</span>
                <span class='checker-icon checker-icon__some'></span>
            </button>
            
            <button class='btn-empty'>
                <span>Empty</span>
                <span class='checker-icon checker-icon__empty'></span>
            </button>
            
            <div class="active-checker-display">
                <span>Active: </span>
                <span class='checker-icon'></span>
            </div>
        `;

        this.shadowRoot!.append(style, ...Array.from(template.children));
    }

    onMouseDown() {
        const btnSome = this.shadowRoot!.querySelector('.btn-some') as HTMLButtonElement;
        const btnEmpty = this.shadowRoot!.querySelector('.btn-empty') as HTMLButtonElement;

        const self = this;

        btnSome.addEventListener('click', () => {
            self.dispatchEvent(new CustomEvent('CHECKER_TYPE_CHANGED', { detail: 'some' }));
        });

        btnEmpty.addEventListener('click', () => {
            self.dispatchEvent(new CustomEvent('CHECKER_TYPE_CHANGED', { detail: 'empty' }));
        });
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.code === 'Space') {
            if (this.getAttribute('active-checker') === 'some') {
                this.dispatchEvent(new CustomEvent('CHECKER_TYPE_CHANGED', { detail: 'empty' }));
            } else {
                this.dispatchEvent(new CustomEvent('CHECKER_TYPE_CHANGED', { detail: 'some' }));
            }
        }
    }

    connectedCallback() {
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('keydown', this.onKeyDown);
    }

    disconnectedCallback() {
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('keydown', this.onKeyDown);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === 'active-checker') {
                const checkerDisplay = this.shadowRoot!.querySelector('.active-checker-display') as HTMLDivElement;
                const checkerIcon = checkerDisplay.querySelector('.checker-icon') as HTMLSpanElement;
                checkerIcon.classList.toggle('checker-icon__some', newValue === 'some');
                checkerIcon.classList.toggle('checker-icon__empty', newValue === 'empty');
            }
        }
    }
}

customElements.define('ui-checker-selector', CheckerSelector);
