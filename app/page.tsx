'use client';
import { useState, useMemo } from 'react';

export default function RueddaControlArrendamiento() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'ventas' | 'pagos' | 'metricas' | 'semanal'>('ventas');
  
  // Estado para controlar la visibilidad del modal / cuadro de nueva venta
  const [showModal, setShowModal] = useState<boolean>(false);

  // Estado del formulario de nueva venta
  const [nuevaVenta, setNuevaVenta] = useState({
    fecha: '',
    concesionario: 'Motores Del Este VIP C.A.',
    plan: '6 Meses - Semanal',
    cliente: '',
    telefono: '',
    cuota: 'Lunes',
    canon: 0,
    inicial: 0,
    moto: 'F16-EXTREME',
    imei: '',
    costoConcesionario: 0,
    pagoConcesionario: 0
  });

  // Estado del Registro Maestro de Flota / Ventas
  const [flota, setFlota] = useState([
    { fecha: '10/08/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Alberto Rafael Salas Martinez', telefono: '584167171297', cuota: 'Lunes', canon: 109.27, inicial: 440.00, marca: 'Escuda', moto: 'F16-EXTREME', fechaCorte: '13/08/2026', imei: '863874086467440', certificado: 'AA-1278490', costoConcesionario: 1600.00, pagoConcesionario: 1160.00 },
    { fecha: '11/08/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Freddy David Perez Peña', telefono: '584126034365', cuota: 'Martes', canon: 68.98, inicial: 277.75, marca: 'Escuda', moto: 'CG-HERO', fechaCorte: '', imei: '863874086280066', certificado: 'AA-1329061', costoConcesionario: 1010.00, pagoConcesionario: 732.25 },
    { fecha: '11/08/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Jesus German Barrios Yecerra', telefono: '584241323953', cuota: 'Martes', canon: 67.61, inicial: 272.25, marca: 'Escuda', moto: 'CG-HERO', fechaCorte: '', imei: '863874086325747', certificado: 'AA-1329049', costoConcesionario: 990.00, pagoConcesionario: 717.75 },
    { fecha: '11/08/2026', concesionario: 'INVERSIONES CHT30, C.A', plan: '6 Meses - Semanal', cliente: 'Marcos Sleyder Bozo Perez', telefono: '584243571388', cuota: 'Viernes', canon: 125.66, inicial: 506.00, marca: 'Escuda', moto: 'F16-EXTREME', fechaCorte: '', imei: '863874086467614', certificado: 'AA-1329414', costoConcesionario: 1840.00, pagoConcesionario: 1334.00 },
    { fecha: '12/08/2026', concesionario: 'NECATIX C.A', plan: '6 Meses - Semanal', cliente: 'Carlos Eduardo Gomez', telefono: '584129876543', cuota: 'Jueves', canon: 95.00, inicial: 380.00, marca: 'Escuda', moto: 'F16-EXTREME', fechaCorte: '', imei: '863874086499111', certificado: 'AA-1329500', costoConcesionario: 1400.00, pagoConcesionario: 1000.00 }
  ]);

  // Configuración base de Sedes / Concesionarios
  const [sedesConfig, setSedesConfig] = useState([
    { sede: 'Motores Del Este VIP C.A.', pen: 0.00 },
    { sede: 'Urdaneta Motors 2025 C.A.', pen: 0.00 },
    { sede: 'Turbo Motos C.A', pen: 0.00 },
    { sede: 'Velocity Motos C.A.', pen: 0.00 },
    { sede: 'INVERSIONES CHT30, C.A', pen: 0.00 },
    { sede: 'AKOX C.A.', pen: 0.00 },
    { sede: 'NECATIX C.A', pen: 0.00 },
    { sede: 'SUPER MOTOS TROPICAL C.A', pen: 0.00 }
  ]);

  const handleFlotaChange = (index: number, field: string, value: any) => {
    const nuevaFlota = [...flota];
    nuevaFlota[index] = { ...nuevaFlota[index], [field]: value };
    setFlota(nuevaFlota);
  };

  const handleSedeChange = (index: number, field: string, value: string) => {
    const nuevas = [...sedesConfig];
    nuevas[index] = { ...nuevas[index], [field]: parseFloat(value) || 0 };
    setSedesConfig(nuevas);
  };

  // Manejador para registrar la nueva venta desde el cuadro
  const handleAgregarVentaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaVenta.cliente || !nuevaVenta.imei) {
      alert('Por favor ingresa al menos el Nombre del Cliente y el IMEI GPS.');
      return;
    }

    const itemAAgregar = {
      fecha: nuevaVenta.fecha || new Date().toLocaleDateString(),
      concesionario: nuevaVenta.concesionario,
      plan: nuevaVenta.plan,
      cliente: nuevaVenta.cliente,
      telefono: nuevaVenta.telefono,
      cuota: nuevaVenta.cuota,
      canon: Number(nuevaVenta.canon) || 0,
      inicial: Number(nuevaVenta.inicial) || 0,
      marca: 'Escuda',
      moto: nuevaVenta.moto,
      fechaCorte: '',
      imei: nuevaVenta.imei,
      certificado: 'AA-' + Math.floor(100000 + Math.random() * 900000),
      costoConcesionario: Number(nuevaVenta.costoConcesionario) || 0,
      pagoConcesionario: Number(nuevaVenta.pagoConcesionario) || 0
    };

    // Asegurarse de que si la sede no está en sedesConfig, aparezca o se acumule
    setFlota([itemAAgregar, ...flota]);
    setShowModal(false);
    // Limpiar formulario o resetear valores básicos
    setNuevaVenta({
      fecha: '',
      concesionario: 'Motores Del Este VIP C.A.',
      plan: '6 Meses - Semanal',
      cliente: '',
      telefono: '',
      cuota: 'Lunes',
      canon: 0,
      inicial: 0,
      moto: 'F16-EXTREME',
      imei: '',
      costoConcesionario: 0,
      pagoConcesionario: 0
    });
  };

  // Interconexión y cálculo automático por Sede
  const sedesCalculadas = useMemo(() => {
    // Extraer todas las sedes únicas (incluyendo las añadidas dinámicamente)
    const sedesUnicas = Array.from(new Set([...sedesConfig.map(s => s.sede), ...flota.map(f => f.concesionario)]));

    return sedesUnicas.map((sedeNombre) => {
      const configExistente = sedesConfig.find(s => s.sede.trim().toLowerCase() === sedeNombre.trim().toLowerCase());
      const penVal = configExistente ? configExistente.pen : 0;

      const itemsSede = flota.filter((item) => item.concesionario.trim().toLowerCase() === sedeNombre.trim().toLowerCase());
      const totalPagoCorte = itemsSede.reduce((sum, item) => sum + (Number(item.pagoConcesionario) || 0), 0);
      const totalComision = itemsSede.reduce((sum, item) => sum + ((Number(item.costoConcesionario) || 0) * 0.01), 0);

      return {
        sede: sedeNombre,
        pen: penVal,
        pagoCorte: totalPagoCorte,
        comision: totalComision,
        ventasCount: itemsSede.length
      };
    });
  }, [flota, sedesConfig]);

  // Totales Generales interconectados
  const totalCostoConcesionario = flota.reduce((acc, curr) => acc + (Number(curr.costoConcesionario) || 0), 0);
  const totalPagoConcesionario = flota.reduce((acc, curr) => acc + (Number(curr.pagoConcesionario) || 0), 0);
  const totalPagoCorte = sedesCalculadas.reduce((acc, curr) => acc + curr.pagoCorte, 0);
  const totalComisionSedes = sedesCalculadas.reduce((acc, curr) => acc + curr.comision, 0);
  const totalPenSedes = sedesCalculadas.reduce((acc, curr) => acc + curr.pen, 0);

  // Estilos visuales
  const isDark = theme === 'dark';
  const bgMain = isDark ? '#121212' : '#f8fafc';
  const textMain = isDark ? '#f3f4f6' : '#1e293b';
  const cardBg = isDark ? '#1a1a1a' : '#ffffff';
  const borderColor = isDark ? '#333' : '#cbd5e1';
  const inputBg = isDark ? '#262626' : '#f1f5f9';
  const inputText = isDark ? '#fff' : '#0f172a';
  const inputBorder = isDark ? '#444' : '#94a3b8';
  const sidebarBg = isDark ? '#181b2a' : '#1e293b';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: bgMain, color: textMain, fontFamily: 'system-ui, sans-serif' }}>
      
      {/* PANEL LATERAL */}
      <div style={{ width: '270px', backgroundColor: sidebarBg, color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #333', flexShrink: 0 }}>
        <div style={{ marginBottom: '25px', borderBottom: '2px solid #D96B27', paddingBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0, letterSpacing: '1px' }}>
            RUEDDA <span style={{ color: '#D96B27' }}>*</span>
          </h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>CONTROL DE ARRENDAMIENTO</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button onClick={() => setActiveTab('ventas')} style={{ textAlign: 'left', background: activeTab === 'ventas' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <span>📊</span> Control de Ventas
          </button>
          <button onClick={() => setActiveTab('pagos')} style={{ textAlign: 'left', background: activeTab === 'pagos' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <span>💳</span> Reporte de Pago
          </button>
          <button onClick={() => setActiveTab('metricas')} style={{ textAlign: 'left', background: activeTab === 'metricas' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <span>📈</span> Métricas de Venta
          </button>
          <button onClick={() => setActiveTab('semanal')} style={{ textAlign: 'left', background: activeTab === 'semanal' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
            <span>📅</span> Reporte Semanal
          </button>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #334155' }}>
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ width: '100%', background: isDark ? '#334155' : '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
            {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: `2px solid ${isDark ? '#333' : '#e2e8f0'}`, paddingBottom: '12px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
            {activeTab === 'ventas' && 'Control de Ventas y Registro Maestro de Flota'}
            {activeTab === 'pagos' && 'Reporte de Pago y Liquidación por Sedes'}
            {activeTab === 'metricas' && 'Métricas de Venta y Distribución Ruedda'}
            {activeTab === 'semanal' && 'Reporte Semanal de Cánones y Cobranza'}
          </h1>
          <button 
            onClick={() => setShowModal(true)} 
            style={{ background: '#D96B27', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            ➕ Registrar Nueva Venta 🚗💨
          </button>
        </div>

        {/* MODAL / CUADRO PARA REGISTRAR NUEVA VENTA */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '25px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#D96B27', fontSize: '17px' }}>Registrar Nueva Venta de Flota</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: textMain, fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
              </div>

              <form onSubmit={handleAgregarVentaSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Fecha</label>
                  <input type="text" placeholder="Ej: 15/08/2026" value={nuevaVenta.fecha} onChange={e => setNuevaVenta({...nuevaVenta, fecha: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Concesionario</label>
                  <input type="text" placeholder="Ej: Motores Del Este VIP C.A." value={nuevaVenta.concesionario} onChange={e => setNuevaVenta({...nuevaVenta, concesionario: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Plan</label>
                  <input type="text" placeholder="Ej: 6 Meses - Semanal" value={nuevaVenta.plan} onChange={e => setNuevaVenta({...nuevaVenta, plan: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Nombre del Cliente</label>
                  <input type="text" placeholder="Nombre completo" value={nuevaVenta.cliente} onChange={e => setNuevaVenta({...nuevaVenta, cliente: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Nro. Cliente (Teléfono)</label>
                  <input type="text" placeholder="Ej: 584126000000" value={nuevaVenta.telefono} onChange={e => setNuevaVenta({...nuevaVenta, telefono: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Día de Cuota</label>
                  <input type="text" placeholder="Ej: Lunes" value={nuevaVenta.cuota} onChange={e => setNuevaVenta({...nuevaVenta, cuota: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Canon Semanal ($)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={nuevaVenta.canon || ''} onChange={e => setNuevaVenta({...nuevaVenta, canon: parseFloat(e.target.value)})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Inicial ($)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={nuevaVenta.inicial || ''} onChange={e => setNuevaVenta({...nuevaVenta, inicial: parseFloat(e.target.value)})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Modelo de Moto</label>
                  <input type="text" placeholder="Ej: CG-HERO o F16-EXTREME" value={nuevaVenta.moto} onChange={e => setNuevaVenta({...nuevaVenta, moto: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>IMEI GPS</label>
                  <input type="text" placeholder="Número de IMEI" value={nuevaVenta.imei} onChange={e => setNuevaVenta({...nuevaVenta, imei: e.target.value})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Costo Concesionario ($)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={nuevaVenta.costoConcesionario || ''} onChange={e => setNuevaVenta({...nuevaVenta, costoConcesionario: parseFloat(e.target.value)})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Pago Concesionario ($)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={nuevaVenta.pagoConcesionario || ''} onChange={e => setNuevaVenta({...nuevaVenta, pagoConcesionario: parseFloat(e.target.value)})} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                  <button type="submit" style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Guardar e Integrar Venta
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 1. VENTANA: CONTROL DE VENTAS */}
        {activeTab === 'ventas' && (
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '16px', overflowX: 'auto', boxShadow: isDark ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#D96B27' }}>Matriz de Ventas y Unidades Registradas</h3>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>Total Registros: {flota.length}</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#D96B27', color: '#fff' }}>
                  <th style={{ padding: '10px' }}>Fecha</th>
                  <th style={{ padding: '10px' }}>Concesionario</th>
                  <th style={{ padding: '10px' }}>Plan</th>
                  <th style={{ padding: '10px' }}>Nombre del Cliente</th>
                  <th style={{ padding: '10px' }}>Nro. Cliente</th>
                  <th style={{ padding: '10px' }}>Día Cuota</th>
                  <th style={{ padding: '10px' }}>Canon Semanal</th>
                  <th style={{ padding: '10px' }}>Inicial</th>
                  <th style={{ padding: '10px' }}>Moto</th>
                  <th style={{ padding: '10px' }}>IMEI GPS</th>
                  <th style={{ padding: '10px' }}>Costo Concesionario</th>
                  <th style={{ padding: '10px' }}>Pago Concesionario</th>
                  <th style={{ padding: '10px' }}>Comisión (1%)</th>
                </tr>
              </thead>
              <tbody>
                {flota.map((item, index) => {
                  const comision1Porc = (Number(item.costoConcesionario) || 0) * 0.01;
                  return (
                    <tr key={index} style={{ borderBottom: `1px solid ${borderColor}`, background: index % 2 === 0 ? (isDark ? '#1e1e1e' : '#ffffff') : (isDark ? '#161616' : '#f8fafc') }}>
                      <td style={{ padding: '6px' }}><input type="text" value={item.fecha} onChange={(e) => handleFlotaChange(index, 'fecha', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="text" value={item.concesionario} onChange={(e) => handleFlotaChange(index, 'concesionario', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '160px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="text" value={item.plan} onChange={(e) => handleFlotaChange(index, 'plan', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '110px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="text" value={item.cliente} onChange={(e) => handleFlotaChange(index, 'cliente', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '160px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="text" value={item.telefono} onChange={(e) => handleFlotaChange(index, 'telefono', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '100px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="text" value={item.cuota} onChange={(e) => handleFlotaChange(index, 'cuota', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '75px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="number" value={item.canon} onChange={(e) => handleFlotaChange(index, 'canon', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="number" value={item.inicial} onChange={(e) => handleFlotaChange(index, 'inicial', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="text" value={item.moto} onChange={(e) => handleFlotaChange(index, 'moto', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="text" value={item.imei} onChange={(e) => handleFlotaChange(index, 'imei', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '120px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="number" value={item.costoConcesionario} onChange={(e) => handleFlotaChange(index, 'costoConcesionario', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                      <td style={{ padding: '6px' }}><input type="number" value={item.pagoConcesionario} onChange={(e) => handleFlotaChange(index, 'pagoConcesionario', parseFloat(e.target.value))} style={{ background: inputBg, color: '#10b981', fontWeight: 'bold', border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                      <td style={{ padding: '6px', color: '#38bdf8', fontWeight: 'bold' }}>
                        ${comision1Porc.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. VENTANA: REPORTE DE PAGO */}
        {activeTab === 'pagos' && (
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '20px', maxWidth: '900px', boxShadow: isDark ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#D96B27' }}>Sincronización y Liquidación por Sede</h3>
            <p style={{ fontSize: '12px', opacity: 0.6, margin: '0 0 16px 0' }}>Los datos se agrupan y calculan dinámicamente según las ventas añadidas.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: isDark ? '#1c1c38' : '#e2e8f0', color: textMain, borderBottom: '2px solid #D96B27' }}>
                  <th style={{ padding: '10px' }}>SEDE / CONCESIONARIO</th>
                  <th style={{ padding: '10px' }}>Ventas</th>
                  <th style={{ padding: '10px' }}>Pago Corte (Auto)</th>
                  <th style={{ padding: '10px' }}>Comisión 1% (Auto)</th>
                  <th style={{ padding: '10px' }}>Penalización</th>
                </tr>
              </thead>
              <tbody>
                {sedesCalculadas.map((item, index) => (
                  <tr key={index} style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.sede}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ background: '#D96B27', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>
                        {item.ventasCount}
                      </span>
                    </td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#10b981', fontSize: '14px' }}>
                      ${item.pagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#38bdf8', fontSize: '14px' }}>
                      ${item.comision.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <input 
                        type="number" 
                        value={item.pen} 
                        onChange={(e) => {
                          const val = e.target.value;
                          const indexCfg = sedesConfig.findIndex(s => s.sede === item.sede);
                          if (indexCfg >= 0) {
                            handleSedeChange(indexCfg, 'pen', val);
                          } else {
                            setSedesConfig([...sedesConfig, { sede: item.sede, pen: parseFloat(val) || 0 }]);
                          }
                        }} 
                        style={{ background: inputBg, color: '#ef4444', border: `1px solid ${inputBorder}`, padding: '6px', borderRadius: '4px', width: '90px', fontWeight: 'bold' }} 
                      />
                    </td>
                  </tr>
                ))}
                <tr style={{ background: isDark ? '#262626' : '#f1f5f9', borderTop: '2px solid #D96B27', fontWeight: 'bold' }}>
                  <td style={{ padding: '12px', color: '#D96B27' }}>TOTALES GENERALES:</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#D96B27' }}>{flota.length}</td>
                  <td style={{ padding: '12px', color: '#10b981', fontSize: '14px' }}>${totalPagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: '12px', color: '#38bdf8', fontSize: '14px' }}>${totalComisionSedes.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: '12px', color: '#ef4444', fontSize: '14px' }}>${totalPenSedes.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 3. VENTANA: MÉTRICAS DE VENTA */}
        {activeTab === 'metricas' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '20px', borderRadius: '8px', borderLeft: '4px solid #D96B27' }}>
                <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Total Unidades Activas</p>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#D96B27' }}>{flota.length}</h2>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Costo Total Concesionario</p>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#10b981' }}>${totalCostoConcesionario.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</h2>
              </div>
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '20px', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
                <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Comisiones Totales (1%)</p>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#38bdf8' }}>${totalComisionSedes.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#D96B27' }}>Ventas por Concesionario</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sedesCalculadas.map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: `1px solid ${borderColor}` }}>
                      <span>{s.sede}</span>
                      <strong style={{ color: '#D96B27' }}>{s.ventasCount} un.</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#D96B27' }}>Modelo de Moto Destacado</h4>
                <div style={{ padding: '20px', background: isDark ? '#222' : '#f1f5f9', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Líder en Ventas:</p>
                  <h3 style={{ color: '#10b981', margin: '8px 0 0 0' }}>CG-HERO & F16-EXTREME</h3>
                  <span style={{ fontSize: '11px', background: '#D96B27', color: '#fff', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '8px' }}>Escuda (Stock Activo)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. VENTANA: REPORTE SEMANAL */}
        {activeTab === 'semanal' && (
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '20px', maxWidth: '850px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#D96B27' }}>RUEDDA* - Resumen Ejecutivo de Cánones y Cobranza</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', opacity: 0.9 }}>
              Período de análisis activo. Las nuevas incorporaciones alimentan el reporte semanal automáticamente.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '20px' }}>
              <div style={{ background: isDark ? '#222' : '#f1f5f9', padding: '15px', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '11px', opacity: 0.7 }}>Cánones Pagados a Tiempo</p>
                <h3 style={{ margin: 0, color: '#10b981' }}>83.18%</h3>
              </div>
              <div style={{ background: isDark ? '#222' : '#f1f5f9', padding: '15px', borderRadius: '6px', borderLeft: '3px solid #38bdf8' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '11px', opacity: 0.7 }}>Cánones Adelantados</p>
                <h3 style={{ margin: 0, color: '#38bdf8' }}>5.60%</h3>
              </div>
              <div style={{ background: isDark ? '#222' : '#f1f5f9', padding: '15px', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '11px', opacity: 0.7 }}>Índice de Impago</p>
                <h3 style={{ margin: 0, color: '#ef4444' }}>10.28%</h3>
              </div>
            </div>

            <div style={{ marginTop: '25px', padding: '14px', background: isDark ? '#1c1c38' : '#e0f2fe', borderRadius: '6px', borderLeft: '3px solid #0284c7' }}>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: isDark ? '#38bdf8' : '#0369a1' }}>
                💡 Estado del Sistema: Comisiones totales calculadas al 1% de la flota: <strong style={{ color: '#38bdf8' }}>${totalComisionSedes.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</strong> 🚗💨
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
