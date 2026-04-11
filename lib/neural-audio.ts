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
  /**
   * PLAY_NODE_DECRYPT
   * Complex glitchy sweep for real-world visual manifestation
   */
  public async playNodeDecrypt() {
    this.initCtx();
    if (!this.ctx) return;

    const timestamp = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(440 + i * 220, timestamp + i * 0.05);
        osc.frequency.exponentialRampToValueAtTime(1760, timestamp + i * 0.05 + 0.15);
        
        gain.gain.setValueAtTime(0.05, timestamp + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, timestamp + i * 0.05 + 0.15);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(timestamp + i * 0.05);
        osc.stop(timestamp + i * 0.05 + 0.15);
    }
  }

  /**
   * PLAY_HEAVY_MACHINERY
   * Low-frequency rumble for excavation / foundation status
   */
  public async playHeavyMachinery() {
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(40, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(30, this.ctx.currentTime + 1.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.5);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  /**
   * PLAY_BRIDGE_SYNC
   * Subtle high-frequency hum with traffic-like noise floor
   */
  public async playBridgeSync() {
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // High hum
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 1);

    // Synthetic Noise
    const bufferSize = this.ctx.sampleRate * 1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;
    noise.loop = true;

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);

    osc.connect(gain);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    noise.start();
    osc.stop(this.ctx.currentTime + 1);
    noise.stop(this.ctx.currentTime + 1);
  }

  /**
   * PLAY_CENTRAL_SYNC
   * Glitchy digital data-burst sound for telecom-proximate nodes
   */
  public async playCentralSync() {
    this.initCtx();
    if (!this.ctx) return;

    const timestamp = this.ctx.currentTime;
    for (let i = 0; i < 8; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(2000 + Math.random() * 1000, timestamp + i * 0.02);
        
        gain.gain.setValueAtTime(0.05, timestamp + i * 0.02);
        gain.gain.linearRampToValueAtTime(0, timestamp + i * 0.02 + 0.01);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(timestamp + i * 0.02);
        osc.stop(timestamp + i * 0.02 + 0.01);
    }
  }
}

export const neuralAudio = new NeuralAudioEngine();
