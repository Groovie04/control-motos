'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('flota');

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ededed', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #262626', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            RUEDDA 
            <span style={{ fontSize: '12px', color: '#10b981', background: '#064e3b', padding: '2px 8px', borderRadius: '4px' }}>TOOLS</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#a3a3a3', margin: '4px 0 0 0' }}>Gestión de Flota • Control de Motos</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>David (CX)</span>
          <div style={{ fontSize: '12px', color: '#10b981' }}>● Sistema Activo 💚</div>
        </div>
      </div>

      {/* Tarjetas de Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Cánones a Tiempo</p>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#10b981' }}>83,2%</h3>
        </div>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Pendientes</p>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#f59e0b' }}>6,5%</h3>
        </div>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Impago</p>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#ef4444' }}>10,3%</h3>
        </div>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Modelo Estrella</p>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>CG-HERO 🚗💨</h3>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('flota')}
          style={{ background: activeTab === 'flota' ? '#10b981' : '#171717', color: activeTab === 'flota' ? '#000' : '#ededed', border: '1px solid #262626', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Control de Flota
        </button>
        <button 
          onClick={() => setActiveTab('incidencias')}
          style={{ background: activeTab === 'incidencias' ? '#10b981' : '#171717', color: activeTab === 'incidencias' ? '#000' : '#ededed', border: '1px solid #262626', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Calculadora de Liquidaciones
        </button>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'flota' ? (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Últimas Unidades y Estatus de Pago</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #262626', color: '#a3a3a3' }}>
                  <th style={{ padding: '10px' }}>Conductor</th>
                  <th style={{ padding: '10px' }}>Modelo</th>
                  <th style={{ padding: '10px' }}>Estatus Canon</th>
                  <th style={{ padding: '10px' }}>Acción CX</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #262626' }}>
                  <td style={{ padding: '10px' }}>Alejandro R.</td>
                  <td style={{ padding: '10px' }}>CG-HERO</td>
                  <td style={{ padding: '10px'}}><span style={{ background: '#064e3b', color: '#10b981', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Al día 💚</span></td>
                  <td style={{ padding: '10px' }}><button style={{ background: '#262626', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Ver ticket</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #262626' }}>
                  <td style={{ padding: '10px' }}>Daniela M.</td>
                  <td style={{ padding: '10px' }}>Encava Express</td>
                  <td style={{ padding: '10px'}}><span style={{ background: '#78350f', color: '#f59e0b', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Pendiente ⚠️</span></td>
                  <td style={{ padding: '10px' }}><button style={{ background: '#262626', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Ver ticket</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Asistente de Recálculos y Ajustes</h3>
          <p style={{ color: '#a3a3a3', fontSize: '14px', marginBottom: '16px' }}>Herramienta rápida para el ajuste de liquidación de conductores y notas de crédito de viajes.</p>
          <div style={{ display: 'grid', gap: '12px', maxWidth: '400px' }}>
            <input type="text" placeholder="ID del Conductor / Cédula" style={{ background: '#0a0a0a', border: '1px solid #262626', padding: '10px', borderRadius: '6px', color: '#fff' }} />
            <input type="number" placeholder="Monto del recálculo ($)" style={{ background: '#0a0a0a', border: '1px solid #262626', padding: '10px', borderRadius: '6px', color: '#fff' }} />
            <button style={{ background: '#10b981', color: '#000', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Generar Incidencia 🚗💨</button>
          </div>
        </div>
      )}

    </div>
  );
}
