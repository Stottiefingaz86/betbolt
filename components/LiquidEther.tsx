import './LiquidEther.css';

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6
}) {
  return (
    <div 
      className={`liquid-ether-container ${className || ''}`} 
      style={{
        ...style,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}
    />
  );
}
