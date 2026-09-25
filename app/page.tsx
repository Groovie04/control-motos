'use client';
import { useState } from 'react';

export default function RueddaDashboard() {
  const [vistaActual, setVistaActual] = useState<'flota' | 'sedes'>('flota');

  // Datos de ejemplo basados en tu estructura exacta
  const flotaData = [
    { fecha: '07/09/2026', concesionario: 'Motores Del Este VIP C.A.', cliente: 'Albert Rafael Salas Martínez', telefono: '584167171297', inicial: 440.00, cuota: 'Lunes', canon: 109.27, marca: 'Escuda', moto: 'F16-EXTREME', imei: '863874086467440', cert: 'AA-1278490', costoC: 1600.00, pagoC: 1160.00, totalPago: 0.00, comision: 0.00, interes: 1462.56 },
    { fecha: '07/09/2026', concesionario: 'Motores Del Este VIP C.A.', cliente: 'Freddy David Perez Peña', telefono: '584126034365', inicial: 277.75, cuota: 'Martes', canon: 68.98, marca: 'Escuda', moto: 'CG-HERO', imei: '863874086280066', cert: 'AA-1329061', costoC: 1010.00, pagoC: 732.25, totalPago: 0.00, comision: 0.00, interes: 923.24 },
    { fecha: '08/09/2026', concesionario: 'Motores Del Este VIP C.A.', cliente: 'Angel Eduardo Hilarraza Márquez', telefono: '584129107146', inicial: 341.00, cuota: 'Viernes', canon: 84.69, marca: 'Escuda', moto: 'CG-HERO', imei: '863874086466012', cert: 'AA-1329364', costoC: 1240.00, pagoC: 899.00, totalPago: -6042.20, comision: 12.40, interes: 1133.48 },
    { fecha: '11/09/2026', concesionario: 'Velocity Motos C.A.', cliente: 'Marcos Sleyder Bozo Perez', telefono: '584243571388', inicial: 506.00, cuota: 'Viernes', canon: 125.66, marca: 'Escuda', moto: 'F16-EXTREME', imei: '863874086467614', cert: 'AA-1329414', costoC: 1840.00, pagoC: 1334.00, totalPago: 0.00, comision: 18.40, interes: 1681.94 },
    { fecha: '14/09/2026', concesionario: 'INVERSIONES CHT30, C.A', cliente: 'Alexair Armando Marin Nuñez', telefono: '584142038890', inicial: 341.00, cuota: 'Lunes', canon: 84.69, marca: 'Escuda', moto: 'CG-HERO', imei: '863874086327164', cert: 'AA-1329455', costoC: 1240.00, pagoC: 899.00, totalPago: 0.00, comision: 12.40, interes: 1133.48 },
    { fecha: '15/09/2026', concesionario: 'AKOX, C.A', cliente: 'Jesús Antonio Mendoza Bustos', telefono: '584244637111', inicial: 370.98, cuota: 'Martes', canon: 92.13, marca: 'Bera', moto: 'BR LEON', imei: '863874086316563', cert: 'AA-2659175', costoC: 1349.00, pagoC: 978.02, totalPago: 0.00, comision: 13.49, interes: 1233.12 },
    { fecha: '18/09/2026', concesionario: 'NECATIX C.A', cliente: 'Rene Gil Davila Ceballos', telefono: '584125587761', inicial: 393.25, cuota: 'Viernes', canon: 97.66, marca: 'Toro', moto: 'LEON TR200', imei: '863874086344961', cert: 'AA-2570476', costoC: 1430.00, pagoC: 1036.75, totalPago: 0.00, comision: 14.30, interes: 1307.16 }
  ];

  const sedesData = [
    { sede: 'Motores Del Este VIP C.A.', pagoCorte: 2697.00, comision: 37.20, pen: 0.00 },
    { sede: 'Urdaneta Motors 2025 C.A.', pagoCorte: 0.00, comision: 0.00, pen: 0.00 },
    { sede: 'Turbo Motos C.A', pagoCorte: 0.00, comision: 0.00, pen: 0.00 },
    { sede: 'Velocity Motos C.A.', pagoCorte: 1334.00, comision: 18.40, pen: 0.00 },
    { sede: 'INVERSIONES CHT30, C.A', pagoCorte: 4712.50, comision: 65.00, pen: 0.00 },
    { sede: 'AKOX C.A.', pagoCorte: 978.02, comision: 13.49, pen: 0.00 },
    { sede: 'NECATIX C.A', pagoCorte: 1392.00, comision: 19.20, pen: 0.00 },
    { sede: 'SUPER MOTOS', pagoCorte: 0.00, comision: 0.00, pen: 0.00 }
  ];

  return (
    <div style={{ backgroundColor: '#121212', color: '#f3f4f6', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      {/* Cabecera Principal */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '3px solid #D96B27', paddingBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: '#ffffff' }}>
            RUEDDA <span style={{ color: '#D96B27' }}>*</span> REPORTE SEMANAL
          </h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0 0' }}>Control Semanal de Ventas y Cobranza</p>
        </div>
        <div style={{ background: '#D96B27', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px' }}>
          R* 🚗💨
        </div>
      </div>

      {/* Botones de Navegación de Vistas */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setVistaActual('flota')}
          style={{ background: vistaActual === 'flota' ? '#D96B27' : '#1e1e1e', color: '#fff', border: '1px solid #333', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Control de Flota (Detalle Clientes)
        </button>
        <button 
          onClick={() => setVistaActual('sedes')}
          style={{ background: vistaActual === 'sedes' ? '#D96B27' : '#1e1e1e', color: '#fff', border: '1px solid #333', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Resumen por Sedes / Concesionarios
        </button>
      </div>

      {/* Vista 1: Control de Flota */}
      {vistaActual === 'flota' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '12px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#D96B27', color: '#fff' }}>
                <th style={{ padding: '10px' }}>Fecha</th>
                <th style={{ padding: '10px' }}>Concesionario</th>
                <th style={{ padding: '10px' }}>Nombre del Cliente</th>
                <th style={{ padding: '10px' }}>Nro. Cliente</th>
                <th style={{ padding: '10px' }}>Inicial</th>
                <th style={{ padding: '10px' }}>Día Cuota</th>
                <th style={{ padding: '10px' }}>Canon Semanal</th>
                <th style={{ padding: '10px' }}>Moto</th>
                <th style={{ padding: '10px' }}>IMEI GPS</th>
                <th style={{ padding: '10px' }}>N° Certificado</th>
                <th style={{ padding: '10px' }}>Costo Concesionario</th>
                <th style={{ padding: '10px' }}>Pago Concesionario</th>
                <th style={{ padding: '10px' }}>Total a Realizar</th>
                <th style={{ padding: '10px' }}>Comisiones 1%</th>
                <th style={{ padding: '10px' }}>Proyección Interés</th>
              </tr>
            </thead>
            <tbody>
              {flotaData.map((row, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #2a2a2a', background: index % 2 === 0 ? '#1e1e1e' : '#161616' }}>
                  <td style={{ padding: '10px' }}>{row.fecha}</td>
                  <td style={{ padding: '10px', color: '#93c5fd' }}>{row.concesionario}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{row.cliente}</td>
                  <td style={{ padding: '10px' }}>{row.telefono}</td>
                  <td style={{ padding: '10px' }}>${row.inicial.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>{row.cuota}</td>
                  <td style={{ padding: '10px', color: '#10b981' }}>${row.canon.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>{row.moto}</td>
                  <td style={{ padding: '10px' }}>{row.imei}</td>
                  <td style={{ padding: '10px' }}>{row.cert}</td>
                  <td style={{ padding: '10px' }}>${row.costoC.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>${row.pagoC.toFixed(2)}</td>
                  <td style={{ padding: '10px', color: row.totalPago < 0 ? '#ef4444' : '#10b981' }}>${row.totalPago.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>${row.comision.toFixed(2)}</td>
                  <td style={{ padding: '10px', color: '#38bdf8' }}>${row.interes.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vista 2: Resumen por Sedes / Concesionarios */}
      {vistaActual === 'sedes' && (
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#D96B27', borderBottom: '1px solid #333', paddingBottom: '8px' }}>Control de Liquidación por Sede</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#262626', color: '#D96B27', borderBottom: '2px solid #D96B27' }}>
                <th style={{ padding: '12px' }}>SEDE / CONCESIONARIO</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Pago Corte</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Comisión</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Penalización</th>
              </tr>
            </thead>
            <tbody>
              {sedesData.map((sede, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{sede.sede}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981' }}>${sede.pagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#38bdf8' }}>${sede.comision.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#ef4444' }}>${sede.pen.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
