'use client';
import { useState } from 'react';

export default function RueddaControlArrendamiento() {
  const [tema, setTema] = useState('Control de Flota Ruedda');

  return (
    <div style={{ padding: '40px', background: '#121212', color: '#fff', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <h1 style={{ color: '#D96B27' }}>RUEDDA* - Sistema de Arrendamiento 🏍️💨</h1>
      <p>El sistema se ha conectado y compilado correctamente.</p>
    </div>
  );
}
