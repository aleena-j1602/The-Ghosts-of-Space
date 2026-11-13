import { Game } from './core/Game.ts';

window.addEventListener('DOMContentLoaded', () => {
  try {
    const game = new Game('renderCanvas');
    game.start();
    (window as unknown as { __GAME_INSTANCE__: Game }).__GAME_INSTANCE__ = game;
  } catch (err) {
    console.error('Failed to initialize Ghosts of Space engine:', err);
    const statusEl = document.getElementById('engine-status');
    if (statusEl) {
      statusEl.textContent = 'INITIALIZATION ERROR';
      statusEl.style.color = '#ef4444';
    }
  }
});
