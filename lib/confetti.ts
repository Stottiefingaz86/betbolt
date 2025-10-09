// Simple confetti animation - TypeScript compatible
export class SimpleConfetti {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: ConfettiParticle[] = [];
  private animationId: number | null = null;
  private startTime: number;

  constructor(targetId: string) {
    this.startTime = Date.now();
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '999999';
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    // Create particles - MASSIVE explosion
    for (let i = 0; i < 250; i++) {
      this.particles.push(new ConfettiParticle());
    }

    // Start animation
    this.animate();
    
    // Clean up after 7 seconds for longer animation
    setTimeout(() => {
      this.destroy();
    }, 7000);
  }

  private animate = (): void => {
    const currentTime = Date.now();
    const elapsed = currentTime - this.startTime;
    
    // Stop animation after 6.5 seconds to allow particles to fade
    if (elapsed > 6500) {
      this.destroy();
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Filter out particles that are off-screen and update/draw remaining ones
    this.particles = this.particles.filter(particle => {
      particle.update();
      if (particle.isAlive()) {
        particle.draw(this.ctx);
        return true;
      }
      return false;
    });
    
    // Continue animation if we still have particles or haven't reached time limit
    if (this.particles.length > 0 || elapsed < 6500) {
      this.animationId = requestAnimationFrame(this.animate);
    } else {
      this.destroy();
    }
  };

  private destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

class ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;

  constructor() {
    // MASSIVE center explosion that covers full screen
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.vx = (Math.random() - 0.5) * 24; // HUGE horizontal spread
    this.vy = (Math.random() - 0.5) * 24; // HUGE vertical spread
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    this.size = Math.random() * 12 + 6; // Much bigger confetti
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 8;
    this.life = 0;
    this.maxLife = 6000; // 6 seconds for longer fall
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // gravity
    this.vx *= 0.998; // air resistance
    this.vy *= 0.998; // air resistance
    this.rotation += this.rotationSpeed;
    this.life += 16; // Assuming ~60fps
  }

  isAlive(): boolean {
    return this.life < this.maxLife && 
           this.x > -50 && 
           this.x < window.innerWidth + 50 && 
           this.y > -50 && 
           this.y < window.innerHeight + 50;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Fade out as particle ages
    const alpha = Math.max(0, 1 - (this.life / this.maxLife));
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    
    // Draw different shapes for variety
    const shapeType = Math.floor(this.x / 100) % 3; // Vary shape based on position
    
    if (shapeType === 0) {
      // Rectangle confetti
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    } else if (shapeType === 1) {
      // Circle confetti
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Diamond confetti
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);
      ctx.lineTo(this.size / 2, 0);
      ctx.lineTo(0, this.size / 2);
      ctx.lineTo(-this.size / 2, 0);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  }
}
