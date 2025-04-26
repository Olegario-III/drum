import React, { useEffect, useState } from 'react';
import './App.css';

const drumPads = [
  { key: 'Q', sound: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', sound: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', sound: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', sound: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', sound: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', sound: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', sound: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', sound: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', sound: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

function App() {
  const [display, setDisplay] = useState('');

  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      const pad = drumPads.find(p => p.key === key);
      setDisplay(pad ? pad.sound : '');
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    playSound(key);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="drum-machine" style={{ textAlign: 'center', marginTop: '50px' }}>
      <div id="display" style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        {display || "Play a Sound"}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '20px', justifyContent: 'center' }}>
        {drumPads.map((pad) => (
          <div
            key={pad.key}
            id={pad.sound}
            className="drum-pad"
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={() => playSound(pad.key)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.url}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;