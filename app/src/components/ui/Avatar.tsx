import React from 'react';

interface AvatarProps {
  children?: React.ReactNode;
  src?: string; // Add src prop
  alt?: string; // Add alt prop
  className?: string; // Add className prop
}

const Avatar: React.FC<AvatarProps> = ({ children, src, alt, className }) => {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : children}
    </div>
  );
};

export default Avatar;