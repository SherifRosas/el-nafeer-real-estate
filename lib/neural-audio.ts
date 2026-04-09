/**
 * NEURAL_AUDIO_ENGINE (v505.1)
 * Proprietary Synthetic UI Sounds for EL_NAFEER Ecosystem
 * Bypasses mobile asset throttles using Web Audio API legacy
 */

class NeuralAudioEngine {
  private ctx: AudioContext | null = null;

  constructor() {
    // Context is initialized on first user interaction to satisfy iOS/Android policies
  }

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * PLAY_NODE_SYNCHRONIZE
   * Subtle robotic beep for node selection / activation
   */
  public async playNodeSync() {
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // High pitch robotic blip
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  /**
   * PLAY_STATUS_PULSE
   * Deep digital pulse for "Sold" / "Still Listed" status toggle
   */
  public async playStatusPulse() {
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(110, this.ctx.currentTime); // Low bass pulse
    osc.frequency.linearRampToValueAtTime(55, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  /**
   * PLAY_GRID_INITIALIZE
   * Sequential sweeping blip for grid layout loading
   */
  public async playGridInit() {
    this.initCtx();
    if (!this.ctx) return;

    const notes = [440, 554, 659, 880];
    notes.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + index * 0.1);
      
      gain.gain.setValueAtTime(0.05, this.ctx!.currentTime + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + index * 0.1 + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(this.ctx!.currentTime + index * 0.1);
      osc.stop(this.ctx!.currentTime + index * 0.1 + 0.08);
    });
  }
}

export const neuralAudio = new NeuralAudioEngine();
