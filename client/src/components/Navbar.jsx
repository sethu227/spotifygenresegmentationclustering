import React from "react";

export default () => (
  <div style={{
    position: 'relative',
    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.95) 0%, rgba(106, 13, 173, 0.95) 50%, rgba(75, 0, 130, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: '#fff',
    padding: '25px 30px',
    boxShadow: '0 8px 32px rgba(138, 43, 226, 0.4), 0 0 60px rgba(138, 43, 226, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
    marginBottom: '30px',
    overflow: 'hidden',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
  }}>
    <style>
      {`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes slideGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        .navbar-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }
      `}
    </style>
    
    {/* Animated background glow */}
    <div className="navbar-glow"></div>
    
    {/* Decorative sparkles */}
    <div style={{
      position: 'absolute',
      top: '15px',
      left: '5%',
      fontSize: '20px',
      opacity: 0.6,
      animation: 'sparkle 3s ease-in-out infinite',
      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
    }}>✦</div>
    
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '8%',
      fontSize: '16px',
      opacity: 0.5,
      animation: 'sparkle 2.5s ease-in-out infinite 0.5s',
      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
    }}>✧</div>
    
    <div style={{
      position: 'absolute',
      bottom: '15px',
      left: '15%',
      fontSize: '14px',
      opacity: 0.4,
      animation: 'sparkle 3.5s ease-in-out infinite 1s',
      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
    }}>✦</div>
    
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20%',
      fontSize: '18px',
      opacity: 0.5,
      animation: 'sparkle 2.8s ease-in-out infinite 1.5s',
      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
    }}>✧</div>
    
    {/* Sliding shine effect */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '30%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
      animation: 'slideGlow 3s ease-in-out infinite',
      pointerEvents: 'none'
    }}></div>
    
    {/* Content */}
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '8px'
      }}>
        <div style={{
          fontSize: '32px',
          animation: 'pulse 2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
        }}>
          ♛
        </div>
        
        <h1 style={{ 
          margin: 0, 
          fontSize: '32px', 
          fontWeight: '900',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0e6ff 50%, #ffffff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '2px',
          textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{
            fontSize: '28px',
            background: 'linear-gradient(135deg, #ffffff, #e0b3ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
          }}>🎵</span>
          Spotify Genre Segmentation
        </h1>
        
        <div style={{
          fontSize: '32px',
          animation: 'pulse 2s ease-in-out infinite 1s',
          filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
        }}>
          ♛
        </div>
      </div>
      
      <div style={{
        height: '3px',
        width: '300px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
        margin: '12px auto 15px',
        borderRadius: '2px',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
      }}></div>
      
      <p style={{ 
        margin: '0', 
        fontSize: '16px', 
        textAlign: 'center',
        opacity: 0.95,
        fontWeight: '500',
        letterSpacing: '0.5px',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <span style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          animation: 'pulse 2s ease-in-out infinite'
        }}></span>
        Discover music clusters based on audio features
        <span style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          animation: 'pulse 2s ease-in-out infinite 1s'
        }}></span>
      </p>
      
      {/* Decorative bottom elements */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '15px',
        opacity: 0.6
      }}>
        <span style={{
          fontSize: '10px',
          animation: 'sparkle 2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))'
        }}>✦</span>
        <span style={{
          fontSize: '8px',
          animation: 'sparkle 2.5s ease-in-out infinite 0.5s',
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))'
        }}>✧</span>
        <span style={{
          fontSize: '10px',
          animation: 'sparkle 2.2s ease-in-out infinite 1s',
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))'
        }}>✦</span>
      </div>
    </div>
  </div>
);