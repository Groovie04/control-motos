'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('flota');

  return (
    <div style={{ backgroundColor: '#121212', color: '#f3f4f6', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px' }}>
      
      {/* Cabecera Principal */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #ea580c', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, color: '#ffffff', letterSpacing: '0.5px' }}>
            RUEDDA <span style={{ color: '#ea580c' }}>*</span> REPORTE SEMANAL
          </h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0 0' }}>Período de Análisis: Control Semanal de Ventas y Cobranza</p>
        </div>
        <div style={{ background: '#ea580c', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          R* 🚗💨
        </div>
      </div>

      {/* 1. ESTADO DE CÁNONES DE ARRENDAMIENTO (Métricas Superiores) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#1e1e1e', border: '1px solid #2d2d2d', borderTop: '4px solid #10b981', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>% Cánones Pagados a Tiempo</p>
          <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>83,2%</h3>
        </div>
        <div style={{ background: '#1e1e1e', border: '1px solid #2d2d2d', borderTop: '4px solid #f59e0b', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>% Cánones Pendientes</p>
          <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>6,5%</h3>
        </div>
        <div style={{ background: '#1e1e1e', border: '1px solid #2d2d2d', borderTop: '4px solid #ef4444', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>% de Impago</p>
          <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>10,3%</h3>
        </div>
      </div>

      {/* Selector de Vistas / Pestañas */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('flota')}
          style={{ background: activeTab === 'flota' ? '#ea580c' : '#1e1e1e', color: '#fff', border: '1px solid #2d2d2d', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
          Control de Flota y Clientes
        </button>
        <button 
          onClick={() => setActiveTab('concesionarios')}
          style={{ background: activeTab === 'concesionarios' ? '#ea580c' : '#1e1e1e', color: '#fff', border: '1px solid #2d2d2d', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
          Ventas por Concesionario
        </button>
      </div>

      {/* Contenido Dinámico */}
      {activeTab === 'flota' ? (
        <div style={{ background: '#1e1e1e', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '16px', overflowX: 'auto' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#ea580c' }}>Detalle de Clientes y Asignación de Motos</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', whiteSpace: 'nowrap' }}>
            <thead>
              <tr style={{ background: '#262626', color: '#d1d5db', borderBottom: '2px solid #ea580c' }}>
                <th style={{ padding: '12px' }}>Fecha</th>
                <th style={{ padding: '12px' }}>Concesionario</th>
                <th style={{ padding: '12px' }}>Nombre del Cliente</th>
                <th style={{ padding: '12px' }}>Nro. Cliente</th>
                <th style={{ padding: '12px' }}>Día Cuota</th>
                <th style={{ padding: '12px' }}>Canon Semanal</th>
                <th style={{ padding: '12px' }}>Moto / Modelo</th>
                <th style={{ padding: '12px' }}>Costo Concesionario</th>
                <th style={{ padding: '12px' }}>Pago Realizar</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #2d2d2d' }}>
                <td style={{ padding: '12px' }}>07/09/2026</td>
                <td style={{ padding: '12px', color: '#93c5fd' }}>Motores Del Este VIP C.A.</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>Albert Rafael Salas Martínez</td>
                <td style={{ padding: '12px' }}>584167171297</td>
                <td style={{ padding: '12px' }}>Lunes</td>
                <td style={{ padding: '12px', color: '#10b981' }}>$109,27</td>
                <td style={{ padding: '12px' }}>CG-HERO 🚗💨</td>
                <td style={{ padding: '12px' }}>$1.600,00</td>
                <td style={{ padding: '12px', color: '#10b981' }}>$0,00 💚</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #2d2d2d' }}>
                <td style={{ padding: '12px' }}>08/09/2026</td>
                <td style={{ padding: '12px', color: '#93c5fd' }}>Motores Del Este VIP C.A.</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>Angel Eduardo Hilarraza</td>
                <td style={{ padding: '12px' }}>584129107146</td>
                <td style={{ padding: '12px' }}>Viernes</td>
                <td style={{ padding: '12px', color: '#10b981' }}>$84,69</td>
                <td style={{ padding: '12px' }}>CG-HERO 🚗💨</td>
                <td style={{ padding: '12px' }}>$1.240,00</td>
                <td style={{ padding: '12px', color: '#ef4444' }}>-$6.042,20</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #2d2d2d' }}>
                <td style={{ padding: '12px' }}>11/09/2026</td>
                <td style={{ padding: '12px', color: '#93c5fd' }}>Velocity Motos C.A.</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>Marcos Sleyder Bozo</td>
                <td style={{ padding: '12px' }}>584243571388</td>
                <td style={{ padding: '12px' }}>Viernes</td>
                <td style={{ padding: '12px', color: '#10b981' }}>$125,66</td>
                <td style={{ padding: '12px' }}>F16-EXTREME</td>
                <td style={{ padding: '12px' }}>$1.840,00</td>
                <td style={{ padding: '12px', color: '#10b981' }}>$0,00 💚</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #2d2d2d' }}>
                <td style={{ padding: '12px' }}>14/09/2026</td>
                <td style={{ padding: '12px', color: '#93c5fd' }}>INVERSIONES CHT30, C.A</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>Alexair Armando Marin</td>
                <td style={{ padding: '12px' }}>584142038890</td>
                <td style={{ padding: '12px' }}>Lunes</td>
                <td style={{ padding: '12px', color: '#10b981' }}>$84,69</td>
                <td style={{ padding: '12px' }}>CG-HERO 🚗💨</td>
                <td style={{ padding: '12px' }}>$1.240,00</td>
                <td style={{ padding: '12px', color: '#10b981' }}>$0,00 💚</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1e1e1e', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#ea580c' }}>Ventas por Concesionario</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2d2d2d' }}>
                <span>Motors Del Este VIP C.A.</span> <strong style={{ color: '#ea580c' }}>46 (70,8%)</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2d2d2d' }}>
                <span>Inversiones CHT30, C.A.</span> <strong style={{ color: '#ea580c' }}>8 (12,3%)</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2d2d2d' }}>
                <span>Necatix C.A.</span> <strong style={{ color: '#ea580c' }}>4 (6,2%)</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2d2d2d' }}>
                <span>Urdaneta / Turbo / Akox</span> <strong style={{ color: '#ea580c' }}>7 (10,7%)</strong>
              </li>
            </ul>
          </div>
          
          <div style={{ background: '#1e1e1e', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase' }}>Modelo de Moto Más Vendido</p>
            <h2 style={{ margin: 0, fontSize: '28px', color: '#ea580c', fontWeight: '800' }}>CG-HERO 🚗💨</h2>
            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#10b981' }}>Alta rotación y preferencia en flota 💚</p>
          </div>
        </div>
      )}

    </div>
  );
}
