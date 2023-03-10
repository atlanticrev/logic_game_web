import GameBoard from './GameBoard/GameBoard';

export { GameBoard };

import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <img style="position: absolute; top: 10px; right: 10px;" width="200" height="200" src="directions.svg" />
 <ui-game-board></ui-game-board>
`;
