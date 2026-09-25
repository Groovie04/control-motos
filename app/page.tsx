'use client';

import React, { useState } from 'react';

interface Contrato {
  id: number;
  fecha: string;
  concesionario: string;
  cliente: string;
  numeroCliente: string;
  inicial: number;
  canonSemanal: number;
  moto: string;
  certificado: string;
  pagoConcesionario: number;
  comisionVendedor: number;
}

const datosIniciales: Contrato[] = [
  {
    id: 1,
    fecha: '07/09/2026',
    concesionario: 'Motores Del Este VIP C.A.',
    cliente: 'Robert Alejandro Palacios Silva',
    numeroCliente: '584125922334',
    inicial: 341.00,
    canonSemanal: 84.69,
    moto: 'CG-HERO',
    certificado: 'AA-1329369',
    pagoConcesionario: 899.00,
    comisionVendedor: 12.40
  },
  {
    id: 2,
    fecha: '11/09/2026',
    concesionario: 'Velocity Motos. C.A',
    cliente: 'Marcos Sleyder Bozo Perez',
    numeroCliente: '584243571388',
    inicial: 506.00,
    canonSemanal: 125.66,
    moto: 'F16-EXTREME',
    certificado: 'AA-1329414',
    pagoConcesionario: 1334.00,
    comisionVendedor: 18.40
  },
  {
    id: 3,
    fecha: '14/09/2026',
    concesionario: 'INVERSIONES CHT30, C.A',
    cliente: 'Alexair Armando Marin Nuñez',
    numeroCliente: '584142038890',
    inicial: 341.00,
    canonSemanal: 84.69,
    moto: 'CG-HERO',
    certificado: 'AA-1329455',
    pagoConcesionario: 899.00,
    comisionVendedor: 12.40
  }
];

export default function RueddaApp() {
  const [contratos] = useState<Contrato[]>(datosIniciales);
  const [filtro, setFiltro] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');

  const listaConcesionarios = [
    'Motores Del Este VIP C.A.',
    'Urdaneta Motors 2025 C.A.',
    'Turbo Motos C.A',
    'Velocity Motos. C.A',
    'INVERSIONES CHT30, C.A',
    'AKOX C.A',
    'NECATIX C.A'
  ];

  const filtrados = contratos.filter(c => {
    const matchConces = filtro === 'TODOS' || c.concesionario === filtro;
    const matchBusq = c.cliente.toLowerCase().includes(busqueda.toLowerCase());
    return matchConces && matchBusq;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#090d16', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* BARRA LATERAL */}
      <div style={{ width: '260px', backgroundColor: '#0f172a', borderRight: '1px solid #1e293b', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px' }}>RUEDDA</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', marginBottom: '24px' }}>VENEZUELA • TOOLS</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Gestión de Flota</span>
            <button style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', background: '#3b82f6', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🏍️ Control de Arriendos</button>
            <button style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>📊 Resumen y Sedes</button>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px', fontSize: '12px', color: '#94a3b8' }}>
          <p style={{ fontWeight: 'bold', color: '#fff' }}>David (CX)</p>
          <p style={{ color: '#10b981', marginTop: '2px' }}>● Sistema Activo 💚</p>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 32px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Control de Arriendos & Opción a Compra</h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>Panel unificado de arriendos, pagos y comisiones al 1%</p>
          </div>
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
            ⚡ ACTIVO
          </span>
        </div>

        {/* Cuerpo */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Métricas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Cánones a Tiempo</p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: '#10b981', margin: '8px 0 0 0' }}>83,2%</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Pendientes</p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: '#f59e0b', margin: '8px 0 0 0' }}>6,5%</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Impago</p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: '#ef4444', margin: '8px 0 0 0' }}>10,3%</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
              <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Modelo Estrella</p>
              <p style={{ fontSize: '28px', fontWeight: '900', color: '#f97316', margin: '8px 0 0 0' }}>CG-HERO</p>
            </div>
          </div>

          {/* Tabla y Filtros */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Registro de Flota Activa</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Buscar cliente..." 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{ backgroundColor: '#020617', border: '1px solid #334155', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}
                />
                <select 
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  style={{ backgroundColor: '#020617', border: '1px solid #334155', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                  <option value="TODOS">Todos los Concesionarios</option>
                  {listaConcesionarios.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e293b', color: '#cbd5e1' }}>
                    <th style={{ padding: '12px 16px' }}>Fecha</th>
                    <th style={{ padding: '12px 16px' }}>Concesionario</th>
                    <th style={{ padding: '12px 16px' }}>Cliente</th>
                    <th style={{ padding: '12px 16px' }}>Teléfono</th>
                    <th style={{ padding: '12px 16px' }}>Inicial</th>
                    <th style={{ padding: '12px 16px' }}>Canon</th>
                    <th style={{ padding: '12px 16px' }}>Moto</th>
                    <th style={{ padding: '12px 16px' }}>Certificado</th>
                    <th style={{ padding: '12px 16px' }}>Pago Concesionario</th>
                    <th style={{ padding: '12px 16px' }}>Comisión 1%</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{c.fecha}</td>
                      <td style={{ padding: '12px 16px', color: '#38bdf8', fontWeight: '500' }}>{c.concesionario}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#fff' }}>{c.cliente}</td>
                      <td style={{ padding: '12px 16px' }}>{c.numeroCliente}</td>
                      <td style={{ padding: '12px 16px', color: '#10b981' }}>${c.inicial.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', color: '#f59e0b' }}>${c.canonSemanal.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px' }}>{c.moto}</td>
                      <td style={{ padding: '12px 16px', color: '#fb923c', fontFamily: 'monospace' }}>{c.certificado}</td>
                      <td style={{ padding: '12px 16px', color: '#f43f5e', fontWeight: '600' }}>${c.pagoConcesionario.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 'bold' }}>${c.comisionVendedor.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
