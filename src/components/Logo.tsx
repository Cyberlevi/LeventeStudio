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
        <rect x="2" y="2" width="56" height="56" stroke={textColor} strokeWidth="1.2" opacity="0.3" fill="none" />
        <text
          x="30"
          y="38"
          fontSize="20"
          fontWeight="400"
          textAnchor="middle"
          letterSpacing="0.1em"
          fill={textColor}
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          [LS]
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Levente Stúdió"
    >
      <path d="M 0 0 L 12 0 M 0 0 L 0 12" stroke={textColor} strokeWidth="0.8" opacity="0.5" strokeLinecap="square"/>
      <text
        x="0"
        y="38"
        fontSize="32"
        fontWeight="400"
        letterSpacing="0.02em"
        fill={textColor}
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        LEVENTE
      </text>
      <text
        x="0"
        y="60"
        fontSize="16"
        fontWeight="300"
        letterSpacing="0.05em"
        fill={textColor}
        opacity="0.7"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        stúdió
      </text>
    </svg>
  );
}
