import GameBoard from './GameBoard/GameBoard';
import CheckerSelector from './CheckerSelector';

export { GameBoard, CheckerSelector };

import './style.css';
import { TCheckerType } from './GameBoard/types';

// const FOR_ALL_CHAR = '&#8704;';
// const EXISTS_CHAR = '&#8707;';
// const EXISTS_AND_SINGLE_CHAR = '&#8707;';
// const IMPLIES_CHAR = '&#8594;';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
    <ui-checker-selector active-checker='some'></ui-checker-selector>
    <ui-game-board active-checker='some'></ui-game-board>
`;

const gameBoard = app.querySelector('ui-game-board') as GameBoard;
const checkerSelector = app.querySelector('ui-checker-selector') as CheckerSelector;

checkerSelector.addEventListener('CHECKER_TYPE_CHANGED', (e: CustomEvent<TCheckerType>) => {
    gameBoard.setAttribute('active-checker', e.detail);
    checkerSelector.setAttribute('active-checker', e.detail);
});
