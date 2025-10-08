// Simple confetti animation - TypeScript compatible
export class SimpleConfetti {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: ConfettiParticle[] = [];
  private animationId: number | null = null;

  constructor(targetId: string) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '999999';
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    // Create particles
    for (let i = 0; i < 75; i++) {
      this.particles.push(new ConfettiParticle());
    }

    // Start animation
    this.animate();
    
    // Clean up after 5 seconds
    setTimeout(() => {
      this.destroy();
    }, 5000);
  }

  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update();
      particle.draw(this.ctx);
    });
    
    this.animationId = requestAnimationFrame(this.animate);
  };

  private destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas.parentNode) {
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

  constructor() {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    this.size = Math.random() * 4 + 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.3; // gravity
    this.rotation += this.rotationSpeed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}
