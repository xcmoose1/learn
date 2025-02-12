import React from 'react';

interface PlayerImagePlaceholderProps {
  name: string;
  className?: string;
}

const PlayerImagePlaceholder: React.FC<PlayerImagePlaceholderProps> = ({ name, className = '' }) => {
  // Generate a color based on the player's name
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215));
    return '#' + color.toString(16).padStart(6, '0');
  };

  const backgroundColor = stringToColor(name);
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={className}
      style={{
        backgroundColor,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      }}
    >
      {initials}
    </div>
  );
};

export default PlayerImagePlaceholder;
