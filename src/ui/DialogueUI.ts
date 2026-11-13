import { DialogueLine } from '../data/dialogue.ts';
import { LunaCharacter } from '../companion/LunaCharacter.ts';

export class DialogueUI {
  private container: HTMLElement;
  private speakerEl!: HTMLElement;
  private textEl!: HTMLElement;
  private promptEl!: HTMLElement;
  private avatarEl!: HTMLElement;

  private currentLines: DialogueLine[] = [];
  private currentIndex: number = 0;
  private isTyping: boolean = false;
  private typeTimer: number | null = null;
  private currentFullText: string = '';
  private onCompleteCallback: (() => void) | null = null;
  private lunaRef: LunaCharacter | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'dialogue-container';
    this.container.className = 'dialogue-overlay hidden';

    this.container.innerHTML = `
      <div class="dialogue-box glass-card">
        <div class="dialogue-header">
          <div class="speaker-tag" id="dialogue-speaker">LUNA</div>
          <div class="speaker-status">LINK ENCRYPTED // RELAY ACTIVE</div>
        </div>
        <div class="dialogue-body">
          <div class="speaker-avatar" id="dialogue-avatar">
            <div class="avatar-eye left"></div>
            <div class="avatar-eye right"></div>
          </div>
          <div class="dialogue-text-wrapper">
            <p id="dialogue-text" class="dialogue-text"></p>
          </div>
        </div>
        <div class="dialogue-footer">
          <span class="dialogue-prompt" id="dialogue-prompt">PRESS [SPACE] OR CLICK TO CONTINUE ▶</span>
        </div>
      </div>
    `;

    document.getElementById('ui-container')?.appendChild(this.container);

    this.speakerEl = this.container.querySelector('#dialogue-speaker') as HTMLElement;
    this.textEl = this.container.querySelector('#dialogue-text') as HTMLElement;
    this.promptEl = this.container.querySelector('#dialogue-prompt') as HTMLElement;
    this.avatarEl = this.container.querySelector('#dialogue-avatar') as HTMLElement;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Click to advance
    this.container.addEventListener('click', () => {
      this.advance();
    });

    // Space or Enter to advance
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!this.container.classList.contains('hidden')) {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          this.advance();
        }
      }
    });
  }

  private initAudio(): void {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playChirp(isLuna: boolean): void {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (isLuna) {
        // High, cheerful electronic chirp
        osc.type = 'sine';
        const now = this.audioCtx.currentTime;
        const freq = 600 + Math.random() * 300;
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq + 200, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.05);
      } else {
        // Lower suit radio click
        osc.type = 'triangle';
        const now = this.audioCtx.currentTime;
        osc.frequency.setValueAtTime(280, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.035);
      }
    } catch {
      // Audio playback failed silently
    }
  }

  public setLuna(luna: LunaCharacter | null): void {
    this.lunaRef = luna;
  }

  public startDialogue(lines: DialogueLine[], onComplete?: () => void): void {
    if (lines.length === 0) return;
    this.currentLines = lines;
    this.currentIndex = 0;
    this.onCompleteCallback = onComplete || null;

    this.container.classList.remove('hidden');
    this.renderCurrentLine();
  }

  private renderCurrentLine(): void {
    if (this.currentIndex >= this.currentLines.length) {
      this.finishDialogue();
      return;
    }

    const line = this.currentLines[this.currentIndex];
    this.speakerEl.textContent = line.speaker;
    this.currentFullText = line.text;
    this.textEl.textContent = '';
    this.isTyping = true;
    this.promptEl.style.opacity = '0.3';

    // Update avatar and color accents depending on speaker
    if (line.speaker === 'LUNA') {
      this.speakerEl.style.color = '#46d9e8';
      this.avatarEl.className = 'speaker-avatar luna-avatar';
      if (this.lunaRef && line.lunaExpression) {
        this.lunaRef.setExpression(line.lunaExpression);
      }
    } else if (line.speaker === 'PLAYER') {
      this.speakerEl.style.color = '#f5b942';
      this.avatarEl.className = 'speaker-avatar player-avatar';
      if (this.lunaRef) {
        this.lunaRef.setExpression('neutral');
      }
    } else {
      this.speakerEl.style.color = '#eaf1f8';
      this.avatarEl.className = 'speaker-avatar system-avatar';
    }

    // Typewriter effect
    let charIdx = 0;
    if (this.typeTimer !== null) {
      clearInterval(this.typeTimer);
    }

    this.typeTimer = window.setInterval(() => {
      if (charIdx < this.currentFullText.length) {
        this.textEl.textContent += this.currentFullText.charAt(charIdx);
        if (charIdx % 3 === 0) {
          this.playChirp(line.speaker === 'LUNA');
        }
        charIdx++;
      } else {
        this.stopTyping();
      }
    }, 24);
  }

  private stopTyping(): void {
    if (this.typeTimer !== null) {
      clearInterval(this.typeTimer);
      this.typeTimer = null;
    }
    this.isTyping = false;
    this.textEl.textContent = this.currentFullText;
    this.promptEl.style.opacity = '1.0';
  }

  public advance(): void {
    if (this.isTyping) {
      // Instantly finish line
      this.stopTyping();
    } else {
      // Next line
      this.currentIndex++;
      this.renderCurrentLine();
    }
  }

  private finishDialogue(): void {
    this.container.classList.add('hidden');
    if (this.typeTimer !== null) {
      clearInterval(this.typeTimer);
      this.typeTimer = null;
    }
    if (this.onCompleteCallback) {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb();
    }
  }
}
