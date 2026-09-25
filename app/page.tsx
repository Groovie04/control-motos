'use client';
import { useState } from 'react';

export default function RueddaControlPanel() {
  // Estado para la Tabla Principal de Flota
  const [flota, setFlota] = useState([
    { fecha: '07/09/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Albert Rafael Salas Martínez', telefono: '584167171297', inicial: 440.00, cuota: 'Lunes', canon: 109.27, pagoInicial: 'Mixto (Efectivo y Pago Móvil)', marca: 'Escuda', moto: 'F16-EXTREME', fechaCorte: '', imei: '863874086467440', certificado: 'AA-1278490', costoConcesionario: 1600.00, pagoConcesionario: 1160.00, totalPago: 0.00, comisiones: 0.00, interes: 1462.56 },
    { fecha: '07/09/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Freddy David Perez Peña', telefono: '584126034365', inicial: 277.75, cuota: 'Martes', canon: 68.98, pagoInicial: 'Efectivo', marca: 'Escuda', moto: 'CG-HERO', fechaCorte: '', imei: '863874086280066', certificado: 'AA-1329061', costoConcesionario: 1010.00, pagoConcesionario: 732.25, totalPago: 0.00, comisiones: 0.00, interes: 923.24 },
    { fecha: '08/09/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Angel Eduardo Hilarraza Márquez', telefono: '584129107146', inicial: 341.00, cuota: 'Viernes', canon: 84.69, pagoInicial: 'Efectivo', marca: 'Escuda', moto: 'CG-HERO', fechaCorte: '', imei: '863874086466012', certificado: 'AA-1329364', costoConcesionario: 1240.00, pagoConcesionario: 899.00, totalPago: -6042.20, comisiones: 12.40, interes: 1133.48 },
    { fecha: '11/09/2026', concesionario: 'Velocity Motos C.A.', plan: '6 Meses - Semanal', cliente: 'Marcos Sleyder Bozo Perez', telefono: '584243571388', inicial: 506.00, cuota: 'Viernes', canon: 125.66, pagoInicial: 'Efectivo', marca: 'Escuda', moto: 'F16-EXTREME', fechaCorte: '', imei: '863874086467614', certificado: 'AA-1329414', costoConcesionario: 1840.00, pagoConcesionario: 1334.00, totalPago: 0.00, comisiones: 18.40, interes: 1681.94 }
  ]);

  // Lista base de Sedes/Concesionarios
  const listaSedesBase = [
    'Motores Del Este VIP C.A.',
    'Urdaneta Motors 2025 C.A.',
    'Turbo Motos C.A',
    'Velocity Motos C.A.',
    'INVERSIONES CHT30, C.A',
    'AKOX C.A.',
    'NECATIX C.A',
    'SUPER MOTOS'
  ];

  // Estado independiente para penalizaciones (Pen) que sí se pueden editar a mano en la tabla pequeña
  const [penalizaciones, setPenalizaciones] = useState<{ [key: string]: number }>({});

  // Manejador para actualizar datos de la flota en tiempo real
  const handleFlotaChange = (index: number, field: string, value: any) => {
    const nuevaFlota = [...flota];
    nuevaFlota[index] = { ...nuevaFlota[index], [field]: value };
    setFlota(nuevaFlota);
  };

  // Manejador para editar la penalización de una sede específica
  const handlePenChange = (sede: string, value: string) => {
    setPenalizaciones({
      ...penalizaciones,
      [sede]: parseFloat(value) || 0
    });
  };

  // CÁLCULO AUTOMÁTICO: Sincroniza el Pago Corte y la Comisión (1%) directo desde la tabla de flota
  const sedesCalculadas = listaSedesBase.map((sede) => {
    // Filtramos los registros de flota que pertenecen a esta sede
    const itemsSede = flota.filter(f => f.concesionario.trim().toLowerCase() === sede.trim().toLowerCase());
    
    // Sumamos el pago concesionario total para el Pago Corte
    const pagoCorte = itemsSede.reduce((acc, curr) => acc + (curr.pagoConcesionario || 0), 0);
    
    // Sumamos las comisiones correspondientes
    const comision = itemsSede.reduce((acc, curr) => acc + (curr.comisiones || 0), 0);
    
    const pen = penalizaciones[sede] || 0;

    return { sede, pagoCorte, comision, pen };
  });

  // Totales generales automáticos de la tabla de sedes
  const totalPagoCorte = sedesCalculadas.reduce((acc, curr) => acc + curr.pagoCorte, 0);
  const totalComision = sedesCalculadas.reduce((acc, curr) => acc + curr.comision, 0);
  const totalPen = sedesCalculadas.reduce((acc, curr) => acc + curr.pen, 0);

  return (
    <div style={{ backgroundColor: '#121212', color: '#f3f4f6', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '3px solid #D96B27', paddingBottom: '12px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '900', margin: 0, color: '#ffffff' }}>
          RUEDDA <span style={{ color: '#D96B27' }}>*</span> CONTROL OPERATIVO Y SEDES
        </h1>
        <div style={{ background: '#D96B27', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
          R* 🚗💨
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

        {/* 1. TABLA PRINCIPAL DE FLOTA (Editable) */}
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '16px', overflowX: 'auto' }}>
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
                <tr key={index} style={{ borderBottom: '1px solid #2a2a2a', background: index % 2 === 0 ? '#1e1e1e' : '#161616' }}>
                  <td style={{ padding: '6px' }}><input type="text" value={item.fecha} onChange={(e) => handleFlotaChange(index, 'fecha', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.concesionario} onChange={(e) => handleFlotaChange(index, 'concesionario', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '160px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.plan} onChange={(e) => handleFlotaChange(index, 'plan', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '120px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.cliente} onChange={(e) => handleFlotaChange(index, 'cliente', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '180px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.telefono} onChange={(e) => handleFlotaChange(index, 'telefono', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '110px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.inicial} onChange={(e) => handleFlotaChange(index, 'inicial', parseFloat(e.target.value))} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.cuota} onChange={(e) => handleFlotaChange(index, 'cuota', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.canon} onChange={(e) => handleFlotaChange(index, 'canon', parseFloat(e.target.value))} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.pagoInicial} onChange={(e) => handleFlotaChange(index, 'pagoInicial', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '130px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.marca} onChange={(e) => handleFlotaChange(index, 'marca', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.moto} onChange={(e) => handleFlotaChange(index, 'moto', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '100px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.imei} onChange={(e) => handleFlotaChange(index, 'imei', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '130px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="text" value={item.certificado} onChange={(e) => handleFlotaChange(index, 'certificado', e.target.value)} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '100px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.costoConcesionario} onChange={(e) => handleFlotaChange(index, 'costoConcesionario', parseFloat(e.target.value))} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.pagoConcesionario} onChange={(e) => handleFlotaChange(index, 'pagoConcesionario', parseFloat(e.target.value))} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.totalPago} onChange={(e) => handleFlotaChange(index, 'totalPago', parseFloat(e.target.value))} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.comisiones} onChange={(e) => handleFlotaChange(index, 'comisiones', parseFloat(e.target.value))} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                  <td style={{ padding: '6px' }}><input type="number" value={item.interes} onChange={(e) => handleFlotaChange(index, 'interes', parseFloat(e.target.value))} style={{ background: '#262626', color: '#fff', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. TABLA PEQUEÑA DE SEDES (Sincronización Automática con la Flota) */}
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '16px', maxWidth: '650px' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#D96B27' }}>Resumen por Sedes (Sincronizado Automáticamente)</h3>
          <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 12px 0' }}>El "Pago Corte" y la "Comisión" se calculan sumando los pagos de la tabla superior según el concesionario.</p>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#1c1c38', color: '#fff', borderBottom: '2px solid #D96B27' }}>
                <th style={{ padding: '10px' }}>SEDE</th>
                <th style={{ padding: '10px' }}>Pago Corte (Auto)</th>
                <th style={{ padding: '10px' }}>Comisión (Auto)</th>
                <th style={{ padding: '10px' }}>Penalización</th>
              </tr>
            </thead>
            <tbody>
              {sedesCalculadas.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold', color: '#93c5fd' }}>{item.sede}</td>
                  
                  {/* Pago Corte automático calculado desde arriba */}
                  <td style={{ padding: '8px', color: '#10b981', fontWeight: 'bold' }}>
                    ${item.pagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                  </td>
                  
                  {/* Comisión automática calculada desde arriba */}
                  <td style={{ padding: '8px', color: '#38bdf8', fontWeight: 'bold' }}>
                    ${item.comision.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Penalización editable a mano */}
                  <td style={{ padding: '8px' }}>
                    <input 
                      type="number" 
                      value={penalizaciones[item.sede] || 0} 
                      onChange={(e) => handlePenChange(item.sede, e.target.value)} 
                      style={{ background: '#262626', color: '#ef4444', border: '1px solid #444', padding: '4px', borderRadius: '4px', width: '80px', fontWeight: 'bold' }} 
                    />
                  </td>
                </tr>
              ))}

              {/* Fila de Totales Automáticos */}
              <tr style={{ background: '#262626', borderTop: '2px solid #D96B27', fontWeight: 'bold' }}>
                <td style={{ padding: '10px', color: '#D96B27' }}>TOTALES:</td>
                <td style={{ padding: '10px', color: '#10b981' }}>${totalPagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                <td style={{ padding: '10px', color: '#38bdf8' }}>${totalComision.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                <td style={{ padding: '10px', color: '#ef4444' }}>${totalPen.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
