'use client';
import { useState, useMemo } from 'react';

export default function RueddaControlPanel() {
  // Estado para el tema visual ('dark' o 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Estado para la Tabla Principal de Flota
  const [flota, setFlota] = useState([
    { fecha: '07/09/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Albert Rafael Salas Martínez', telefono: '584167171297', inicial: 440.00, cuota: 'Lunes', canon: 109.27, pagoInicial: 'Mixto', marca: 'Escuda', moto: 'F16-EXTREME', fechaCorte: '', imei: '863874086467440', certificado: 'AA-1278490', costoConcesionario: 1600.00, pagoConcesionario: 1160.00, totalPago: 0.00, comisiones: 0.00, interes: 1462.56 },
    { fecha: '07/09/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Freddy David Perez Peña', telefono: '584126034365', inicial: 277.75, cuota: 'Martes', canon: 68.98, pagoInicial: 'Efectivo', marca: 'Escuda', moto: 'CG-HERO', fechaCorte: '', imei: '863874086280066', certificado: 'AA-1329061', costoConcesionario: 1010.00, pagoConcesionario: 732.25, totalPago: 0.00, comisiones: 0.00, interes: 923.24 },
    { fecha: '08/09/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Angel Eduardo Hilarraza Márquez', telefono: '584129107146', inicial: 341.00, cuota: 'Viernes', canon: 84.69, pagoInicial: 'Efectivo', marca: 'Escuda', moto: 'CG-HERO', fechaCorte: '', imei: '863874086466012', certificado: 'AA-1329364', costoConcesionario: 1240.00, pagoConcesionario: 899.00, totalPago: -6042.20, comisiones: 12.40, interes: 1133.48 },
    { fecha: '11/09/2026', concesionario: 'Velocity Motos C.A.', plan: '6 Meses - Semanal', cliente: 'Marcos Sleyder Bozo Perez', telefono: '584243571388', inicial: 506.00, cuota: 'Viernes', canon: 125.66, pagoInicial: 'Efectivo', marca: 'Escuda', moto: 'F16-EXTREME', fechaCorte: '', imei: '863874086467614', certificado: 'AA-1329414', costoConcesionario: 1840.00, pagoConcesionario: 1334.00, totalPago: 0.00, comisiones: 18.40, interes: 1681.94 }
  ]);

  // Lista base de Sedes / Concesionarios (Comisiones y Penalizaciones editables)
  const [sedesConfig, setSedesConfig] = useState([
    { sede: 'Motores Del Este VIP C.A.', comision: 37.20, pen: 0.00 },
    { sede: 'Urdaneta Motors 2025 C.A.', comision: 0.00, pen: 0.00 },
    { sede: 'Turbo Motos C.A', comision: 0.00, pen: 0.00 },
    { sede: 'Velocity Motos C.A.', comision: 18.40, pen: 0.00 },
    { sede: 'INVERSIONES CHT30, C.A', comision: 65.00, pen: 0.00 },
    { sede: 'AKOX C.A.', comision: 13.49, pen: 0.00 },
    { sede: 'NECATIX C.A', comision: 19.20, pen: 0.00 },
    { sede: 'SUPER MOTOS', comision: 0.00, pen: 0.00 }
  ]);

  // Manejador para actualizar datos de la flota en tiempo real
  const handleFlotaChange = (index: number, field: string, value: any) => {
    const nuevaFlota = [...flota];
    nuevaFlota[index] = { ...nuevaFlota[index], [field]: value };
    setFlota(nuevaFlota);
  };

  // Manejador para actualizar comisiones o penalizaciones de las sedes
  const handleSedeConfigChange = (index: number, field: string, value: string) => {
    const nuevas = [...sedesConfig];
    nuevas[index] = { ...nuevas[index], [field]: parseFloat(value) || 0 };
    setSedesConfig(nuevas);
  };

  // CÁLCULO AUTOMÁTICO: Sincroniza el "Pago Corte" sumando el "Pago Concesionario" de la tabla de flota por cada sede
  const sedesCalculadas = useMemo(() => {
    return sedesConfig.map((s) => {
      // Sumamos todos los pagos de concesionario en la flota que coincidan con la sede
      const totalPagoCorte = flota
        .filter((item) => item.concesionario.trim().toLowerCase() === s.sede.trim().toLowerCase())
        .reduce((sum, item) => sum + (Number(item.pagoConcesionario) || 0), 0);

      return {
        ...s,
        pagoCorte: totalPagoCorte
      };
    });
  }, [flota, sedesConfig]);

  // Totales generales de la tabla pequeña
  const totalPagoCorte = sedesCalculadas.reduce((acc, curr) => acc + curr.pagoCorte, 0);
  const totalComision = sedesCalculadas.reduce((acc, curr) => acc + curr.comision, 0);
  const totalPen = sedesCalculadas.reduce((acc, curr) => acc + curr.pen, 0);

  // Estilos dinámicos según el tema seleccionado
  const isDark = theme === 'dark';
  const bgMain = isDark ? '#121212' : '#f8fafc';
  const textMain = isDark ? '#f3f4f6' : '#1e293b';
  const cardBg = isDark ? '#1a1a1a' : '#ffffff';
  const borderColor = isDark ? '#333' : '#cbd5e1';
  const inputBg = isDark ? '#262626' : '#f1f5f9';
  const inputText = isDark ? '#fff' : '#0f172a';
  const inputBorder = isDark ? '#444' : '#94a3b8';

  return (
    <div style={{ backgroundColor: bgMain, color: textMain, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '20px', transition: 'background 0.3s, color 0.3s' }}>
      
      {/* Cabecera y Botón de Tema */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '3px solid #D96B27', paddingBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>
            RUEDDA <span style={{ color: '#D96B27' }}>*</span> CONTROL OPERATIVO Y SEDES
          </h1>
          <p style={{ fontSize: '13px', opacity: 0.7, margin: '4px 0 0 0' }}>Sincronización automática de pagos y gestión de flota</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Botón selector de tema Claro / Oscuro */}
          <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            style={{ background: isDark ? '#333' : '#e2e8f0', color: textMain, border: '1px solid ' + borderColor, padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
            {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
          <div style={{ background: '#D96B27', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
            R* 🚗💨
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

        {/* 1. TABLA PRINCIPAL DE FLOTA */}
        <div style={{ background: cardBg, border: '1px solid ' + borderColor, borderRadius: '8px', padding: '16px', overflowX: 'auto', boxShadow: isDark ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#D96B27' }}>Control de Flota y Clientes (Editable)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#D96B27', color: '#fff' }}>
                <th style={{ padding: '10px' }}>Fecha</th>
                <th style={{ padding: '10px' }}>Concesionario</th>
                <th style={{ padding: '10px' }}>Plan</th>
                <th style={{ padding: '10px' }}>Nombre del cliente</th>
                <th style={{ padding: '10px' }}>Nro. Cliente</th>
                <th style={{ padding: '10px' }}>Inicial</th>
                <th style={{ padding: '10px' }}>Día cuota</th>
                <th style={{ padding: '10px' }}>Canon semanal</th>
                <th style={{ padding: '10px' }}>Método pago inicial</th>
                <th style={{ padding: '10px' }}>Marca</th>
                <th style={{ padding: '10px' }}>Moto</th>
                <th style={{ padding: '10px' }}>IMEI GPS</th>
                <th style={{ padding: '10px' }}>N° Certificado</th>
                <th style={{ padding: '10px' }}>Costo Concesionario</th>
                <th style={{ padding: '10px' }}>Pago Concesionario</th>
                <th style={{ padding: '10px' }}>Total Pago a Realizar</th>
                <th style={{ padding: '10px' }}>Comisiones 1%</th>
                <th style={{ padding: '10px' }}>Proyección interés</th>
              </tr>
            </thead>
            <tbody>
              {flota.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid ' + borderColor, background: index % 2 === 0 ? (isDark ? '#1e1e1e' : '#ffffff') : (isDark ? '#161616' : '#f8fafc') }}>
                  <td style={{ padding: '6px' }}><input type="text" value={item.fecha} onChange={(e) => handleFlotaChange(index, 'fecha', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.concesionario} onChange={(e) => handleFlotaChange(index, 'concesionario', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '160px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.plan} onChange={(e) => handleFlotaChange(index, 'plan', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '120px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.cliente} onChange={(e) => handleFlotaChange(index, 'cliente', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '180px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.telefono} onChange={(e) => handleFlotaChange(index, 'telefono', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '110px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.inicial} onChange={(e) => handleFlotaChange(index, 'inicial', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.cuota} onChange={(e) => handleFlotaChange(index, 'cuota', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.canon} onChange={(e) => handleFlotaChange(index, 'canon', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.pagoInicial} onChange={(e) => handleFlotaChange(index, 'pagoInicial', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '130px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.marca} onChange={(e) => handleFlotaChange(index, 'marca', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.moto} onChange={(e) => handleFlotaChange(index, 'moto', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '100px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.imei} onChange={(e) => handleFlotaChange(index, 'imei', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '130px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.certificado} onChange={(e) => handleFlotaChange(index, 'certificado', e.target.value)} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '100px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.costoConcesionario} onChange={(e) => handleFlotaChange(index, 'costoConcesionario', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.pagoConcesionario} onChange={(e) => handleFlotaChange(index, 'pagoConcesionario', parseFloat(e.target.value))} style={{ background: inputBg, color: '#10b981', fontWeight: 'bold', border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.totalPago} onChange={(e) => handleFlotaChange(index, 'totalPago', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.comisiones} onChange={(e) => handleFlotaChange(index, 'comisiones', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.interes} onChange={(e) => handleFlotaChange(index, 'interes', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. TABLA DE SEDES CON PAGO CORTE SINCRONIZADO AUTOMÁTICAMENTE */}
        <div style={{ background: cardBg, border: '1px solid ' + borderColor, borderRadius: '8px', padding: '16px', maxWidth: '650px', boxShadow: isDark ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#D96B27' }}>Resumen por Sedes (Sincronizado Automáticamente)</h3>
          <p style={{ fontSize: '11px', opacity: 0.6, margin: '0 0 12px 0' }}>El "Pago Corte" refleja automáticamente la suma del "Pago Concesionario" de la tabla superior según la sede.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: isDark ? '#1c1c38' : '#e2e8f0', color: textMain, borderBottom: '2px solid #D96B27' }}>
                <th style={{ padding: '10px' }}>SEDE</th>
                <th style={{ padding: '10px' }}>Pago Corte (Auto)</th>
                <th style={{ padding: '10px' }}>Comisión</th>
                <th style={{ padding: '10px' }}>Pen</th>
              </tr>
            </thead>
            <tbody>
              {sedesCalculadas.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid ' + borderColor }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.sede}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#10b981', fontSize: '14px' }}>
                    ${item.pagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input 
                      type="number" 
                      value={item.comision} 
                      onChange={(e) => handleSedeConfigChange(index, 'comision', e.target.value)} 
                      style={{ background: inputBg, color: '#38bdf8', border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '90px', fontWeight: 'bold' }} 
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input 
                      type="number" 
                      value={item.pen} 
                      onChange={(e) => handleSedeConfigChange(index, 'pen', e.target.value)} 
                      style={{ background: inputBg, color: '#ef4444', border: '1px solid ' + inputBorder, padding: '4px', borderRadius: '4px', width: '80px', fontWeight: 'bold' }} 
                    />
                  </td>
                </tr>
              ))}
              {/* Fila de Totales Automáticos */}
              <tr style={{ background: isDark ? '#262626' : '#f1f5f9', borderTop: '2px solid #D96B27', fontWeight: 'bold' }}>
                <td style={{ padding: '10px', color: '#D96B27' }}>TOTALES GENERALES:</td>
                <td style={{ padding: '10px', color: '#10b981', fontSize: '14px' }}>${totalPagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                <td style={{ padding: '10px', color: '#38bdf8', fontSize: '14px' }}>${totalComision.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                <td style={{ padding: '10px', color: '#ef4444', fontSize: '14px' }}>${totalPen.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
