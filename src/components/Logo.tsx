interface LogoProps {
  variant?: 'primary' | 'monogram';
  theme?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ variant = 'primary', theme = 'light', className = '' }: LogoProps) {
  const textColor = theme === 'light' ? '#5d534c' : '#faf8f5';

  if (variant === 'monogram') {
    return (
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Levente Stúdió"
      >
        <text
          x="30"
          y="40"
          fontSize="32"
          fontWeight="300"
          textAnchor="middle"
          fill={textColor}
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          LS
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Levente Stúdió"
    >
      <text
        x="0"
        y="42"
        fontSize="36"
        fontWeight="300"
        letterSpacing="-0.02em"
        fill={textColor}
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        Levente Stúdió
      </text>
    </svg>
  );
}
