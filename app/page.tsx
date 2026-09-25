'use client';
import { useState, useMemo } from 'react';

export default function RueddaControlArrendamiento() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'ventas' | 'pagos' | 'metricas' | 'semanal' | 'tabulador'>('ventas');
  const [menuRetraido, setMenuRetraido] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Control Dinámico de Semanas de Corte
  const [semanasCortas, setSemanasCortas] = useState([
    { id: 1, label: 'Semana de corte: 1', fechaRango: '10/08/2026 - 13/08/2026' },
    { id: 2, label: 'Semana de corte: 2', fechaRango: '14/08/2026 - 20/08/2026' },
    { id: 3, label: 'Semana de corte: 3', fechaRango: '21/08/2026 - 27/08/2026' },
    { id: 4, label: 'Semana de corte: 4', fechaRango: '28/08/2026 - 03/09/2026' },
    { id: 5, label: 'Semana de corte: 5', fechaRango: '04/09/2026 - 10/09/2026' },
    { id: 6, label: 'Semana de corte: 6', fechaRango: '11/09/2026 - 17/09/2026' },
    { id: 7, label: 'Semana de corte: 7', fechaRango: '18/09/2026 - 24/09/2026 (Corte de Ayer)' },
    { id: 8, label: 'Semana de corte: 8', fechaRango: '25/09/2026 - 01/10/2026 (Próximo Pago Jueves)' }
  ]);

  const [semanaSeleccionadaId, setSemanaSeleccionadaId] = useState<number>(1);
  const semanaActualObj = semanasCortas.find(s => s.id === semanaSeleccionadaId) || semanasCortas[0];

  const agregarNuevaSemana = () => {
    const nuevoId = semanasCortas.length + 1;
    const nuevaSemana = {
      id: nuevoId,
      label: `Semana de corte: ${nuevoId}`,
      fechaRango: `Nueva Semana ${nuevoId} (En Curso)`
    };
    setSemanasCortas([...semanasCortas, nuevaSemana]);
    setSemanaSeleccionadaId(nuevoId);
  };

  const [listaConcesionarios, setListaConcesionarios] = useState([
    'Motores Del Este VIP C.A.',
    'Urdaneta Motors 2025 C.A.',
    'Turbo Motos C.A',
    'Velocity Motos C.A.',
    'INVERSIONES CHT30, C.A',
    'AKOX C.A.',
    'NECATIX C.A',
    'SUPER MOTOS TROPICAL C.A'
  ]);

  const [listaMotos, setListaMotos] = useState(['F16-EXTREME', 'CG-HERO', 'EXPRESS-150', 'WORKER-200']);
  const [listaMarcas, setListaMarcas] = useState(['Escuda', 'Keeway', 'Empire', 'Bera']);
  const [listaPlanes, setListaPlanes] = useState(['6 Meses - Semanal', '3 Meses - Semanal', '1 Año - Semanal', 'Contado']);
  const [listaDias] = useState(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']);

  const [modoNuevoConcesionario, setModoNuevoConcesionario] = useState(false);
  const [nuevoConcesionarioInput, setNuevoConcesionarioInput] = useState('');
  const [modoNuevoPlan, setModoNuevoPlan] = useState(false);
  const [nuevoPlanInput, setNuevoPlanInput] = useState('');
  const [modoNuevaMarca, setModoNuevaMarca] = useState(false);
  const [nuevaMarcaInput, setNuevaMarcaInput] = useState('');
  const [modoNuevaMoto, setModoNuevaMoto] = useState(false);
  const [nuevaMotoInput, setNuevaMotoInput] = useState('');

  // Estados para el Tabulador Interactivo Ruedda*
  const [tabuladorPrecioContado, setTabuladorPrecioContado] = useState<number>(1240);

  const obtenerFechaInput = () => {
    const d = new Date();
    const anio = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };

  const obtenerDiaSemanaEsp = (fechaIso: string) => {
    if (!fechaIso) return 'Lunes';
    const partes = fechaIso.split('-');
    if (partes.length === 3) {
      const d = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
      const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return dias[d.getDay()];
    }
    return 'Lunes';
  };

  const formatearFechaDisplay = (fechaIso: string) => {
    if (!fechaIso) return '';
    const partes = fechaIso.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return fechaIso;
  };

  const [nuevaVenta, setNuevaVenta] = useState({
    fecha: obtenerFechaInput(),
    concesionario: 'Motores Del Este VIP C.A.',
    plan: '6 Meses - Semanal',
    cliente: '',
    telefono: '',
    inicial: 0,
    cuota: obtenerDiaSemanaEsp(obtenerFechaInput()),
    canon: 0,
    marca: 'Escuda',
    moto: 'F16-EXTREME',
    imei: '',
    certificado: '',
    costoConcesionario: 0,
    pagoConcesionario: 0,
    proyeccionInteres: 0
  });

  const [flota, setFlota] = useState([
    { fecha: '10/08/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Alberto Rafael Salas Martinez', telefono: '584167171297', inicial: 440.00, cuota: 'Lunes', canon: 109.27, marca: 'Escuda', moto: 'F16-EXTREME', semanaId: 1, imei: '863874086467440', certificado: 'AA-1278490', costoConcesionario: 1600.00, pagoConcesionario: 1160.00, proyeccionInteres: 1462.56 },
    { fecha: '11/08/2026', concesionario: 'Motores Del Este VIP C.A.', plan: '6 Meses - Semanal', cliente: 'Freddy David Perez Peña', telefono: '584126034365', inicial: 277.75, cuota: 'Martes', canon: 68.98, marca: 'Escuda', moto: 'CG-HERO', semanaId: 1, imei: '863874086280066', certificado: 'AA-1329061', costoConcesionario: 1010.00, pagoConcesionario: 732.25, proyeccionInteres: 923.15 },
    { fecha: '11/08/2026', concesionario: 'INVERSIONES CHT30, C.A', plan: '6 Meses - Semanal', cliente: 'Marcos Sleyder Bozo Perez', telefono: '584243571388', inicial: 506.00, cuota: 'Viernes', canon: 125.66, marca: 'Escuda', moto: 'F16-EXTREME', semanaId: 1, imei: '-', certificado: '-', costoConcesionario: 1840.00, pagoConcesionario: 1334.00, proyeccionInteres: 1681.94 }
  ]);

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

  const actualizarCalculosFinancieros = (datosParciales: any) => {
    let costo = Number(datosParciales.costoConcesionario ?? nuevaVenta.costoConcesionario) || 0;
    let cuotaActual = datosParciales.cuota ?? nuevaVenta.cuota;
    if (datosParciales.fecha) {
      cuotaActual = obtenerDiaSemanaEsp(datosParciales.fecha);
    }

    const inicial = Math.round((costo * 0.275) * 100) / 100;
    const pagoConcesionario = Math.round(Math.max(0, costo - inicial) * 100) / 100;
    const canon = Math.round((costo > 0 ? ((costo * (1 + 0.914096774)) - inicial) / 24 : 0) * 100) / 100;
    const proyeccionInteres = Math.round(((costo * 0.9141) + costo - inicial - pagoConcesionario) * 100) / 100;

    setNuevaVenta({
      ...nuevaVenta,
      ...datosParciales,
      cuota: cuotaActual,
      inicial,
      pagoConcesionario,
      canon,
      proyeccionInteres
    });
  };

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

  const handleAgregarVentaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaVenta.cliente) {
      alert('Por favor completa al menos el Nombre del Cliente.');
      return;
    }

    let concesionarioFinal = nuevaVenta.concesionario;
    if (modoNuevoConcesionario && nuevoConcesionarioInput.trim()) {
      concesionarioFinal = nuevoConcesionarioInput.trim();
      if (!listaConcesionarios.includes(concesionarioFinal)) {
        setListaConcesionarios([...listaConcesionarios, concesionarioFinal]);
      }
    }

    let planFinal = nuevaVenta.plan;
    if (modoNuevoPlan && nuevoPlanInput.trim()) {
      planFinal = nuevoPlanInput.trim();
      if (!listaPlanes.includes(planFinal)) {
        setListaPlanes([...listaPlanes, planFinal]);
      }
    }

    let marcaFinal = nuevaVenta.marca;
    if (modoNuevaMarca && nuevaMarcaInput.trim()) {
      marcaFinal = nuevaMarcaInput.trim();
      if (!listaMarcas.includes(marcaFinal)) {
        setListaMarcas([...listaMarcas, marcaFinal]);
      }
    }

    let motoFinal = nuevaVenta.moto;
    if (modoNuevaMoto && nuevaMotoInput.trim()) {
      motoFinal = nuevaMotoInput.trim();
      if (!listaMotos.includes(motoFinal)) {
        setListaMotos([...listaMotos, motoFinal]);
      }
    }

    const itemAAgregar = {
      fecha: formatearFechaDisplay(nuevaVenta.fecha) || '25/09/2026',
      concesionario: concesionarioFinal,
      plan: planFinal,
      cliente: nuevaVenta.cliente,
      telefono: nuevaVenta.telefono,
      inicial: Number(nuevaVenta.inicial) || 0,
      cuota: nuevaVenta.cuota,
      canon: Number(nuevaVenta.canon) || 0,
      marca: marcaFinal,
      moto: motoFinal,
      semanaId: semanaSeleccionadaId,
      imei: nuevaVenta.imei.trim() ? nuevaVenta.imei.trim() : '-',
      certificado: nuevaVenta.certificado.trim() ? nuevaVenta.certificado.trim() : '-',
      costoConcesionario: Number(nuevaVenta.costoConcesionario) || 0,
      pagoConcesionario: Number(nuevaVenta.pagoConcesionario) || 0,
      proyeccionInteres: Number(nuevaVenta.proyeccionInteres) || 0
    };

    setFlota([itemAAgregar, ...flota]);
    setShowModal(false);
    setModoNuevoConcesionario(false);
    setModoNuevoPlan(false);
    setModoNuevaMarca(false);
    setModoNuevaMoto(false);
  };

  // Filtrar la flota según la semana seleccionada
  const flotaFiltradaSemana = useMemo(() => {
    return flota.filter(item => (item.semanaId ?? 1) === semanaSeleccionadaId);
  }, [flota, semanaSeleccionadaId]);

  const sedesCalculadas = useMemo(() => {
    const sedesUnicas = Array.from(new Set([...sedesConfig.map(s => s.sede), ...flotaFiltradaSemana.map(f => f.concesionario)]));
    return sedesUnicas.map((sedeNombre) => {
      const configExistente = sedesConfig.find(s => s.sede.trim().toLowerCase() === sedeNombre.trim().toLowerCase());
      const penVal = configExistente ? configExistente.pen : 0;
      const itemsSede = flotaFiltradaSemana.filter((item) => item.concesionario.trim().toLowerCase() === sedeNombre.trim().toLowerCase());
      const totalPagoCorte = itemsSede.reduce((sum, item) => sum + (Number(item.pagoConcesionario) || 0), 0);
      const totalComision = itemsSede.reduce((sum, item) => sum + ((Number(item.costoConcesionario) || 0) * 0.01), 0);

      return { sede: sedeNombre, pen: penVal, pagoCorte: totalPagoCorte, comision: totalComision, ventasCount: itemsSede.length };
    });
  }, [flotaFiltradaSemana, sedesConfig]);

  // Cálculos dinámicos del Tabulador Ruedda*
  const tabuladorCalculado = useMemo(() => {
    const precio = Math.max(0, tabuladorPrecioContado);
    const inicial = precio * 0.275;
    const totalSistema = precio * (1 + 0.914096774);
    const canonSemanal = (totalSistema - inicial) / 24;
    return {
      inicial: Math.round(inicial * 100) / 100,
      canonSemanal: Math.round(canonSemanal * 100) / 100
    };
  }, [tabuladorPrecioContado]);

  const totalCostoConcesionario = flotaFiltradaSemana.reduce((acc, curr) => acc + (Number(curr.costoConcesionario) || 0), 0);
  const totalPagoConcesionario = flotaFiltradaSemana.reduce((acc, curr) => acc + (Number(curr.pagoConcesionario) || 0), 0);
  const totalProyeccionInteres = flotaFiltradaSemana.reduce((acc, curr) => acc + (Number(curr.proyeccionInteres) || 0), 0);
  const totalPagoCorte = sedesCalculadas.reduce((acc, curr) => acc + curr.pagoCorte, 0);
  const totalComisionSedes = sedesCalculadas.reduce((acc, curr) => acc + curr.comision, 0);
  const totalPenSedes = sedesCalculadas.reduce((acc, curr) => acc + curr.pen, 0);

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
      <div style={{ width: menuRetraido ? '70px' : '270px', backgroundColor: sidebarBg, color: '#fff', padding: menuRetraido ? '20px 10px' : '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #333', flexShrink: 0, transition: 'width 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #D96B27', paddingBottom: '12px' }}>
          {!menuRetraido && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0, letterSpacing: '1px' }}>RUEDDA <span style={{ color: '#D96B27' }}>*</span></h2>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>CONTROL DE ARRENDAMIENTO</p>
            </div>
          )}
          <button onClick={() => setMenuRetraido(!menuRetraido)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', margin: menuRetraido ? '0 auto' : 0 }}>
            {menuRetraido ? '▶' : '◀'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button onClick={() => setActiveTab('ventas')} style={{ textAlign: menuRetraido ? 'center' : 'left', background: activeTab === 'ventas' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: menuRetraido ? 'center' : 'flex-start', gap: '10px', fontSize: '13px' }}>
            <span>📊</span> {!menuRetraido && 'Control de Ventas'}
          </button>
          <button onClick={() => setActiveTab('pagos')} style={{ textAlign: menuRetraido ? 'center' : 'left', background: activeTab === 'pagos' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: menuRetraido ? 'center' : 'flex-start', gap: '10px', fontSize: '13px' }}>
            <span>💳</span> {!menuRetraido && 'Reporte de Pago'}
          </button>
          <button onClick={() => setActiveTab('metricas')} style={{ textAlign: menuRetraido ? 'center' : 'left', background: activeTab === 'metricas' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: menuRetraido ? 'center' : 'flex-start', gap: '10px', fontSize: '13px' }}>
            <span>📈</span> {!menuRetraido && 'Métricas de Venta'}
          </button>
          <button onClick={() => setActiveTab('semanal')} style={{ textAlign: menuRetraido ? 'center' : 'left', background: activeTab === 'semanal' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: menuRetraido ? 'center' : 'flex-start', gap: '10px', fontSize: '13px' }}>
            <span>📅</span> {!menuRetraido && 'Reporte Semanal'}
          </button>
          <button onClick={() => setActiveTab('tabulador')} style={{ textAlign: menuRetraido ? 'center' : 'left', background: activeTab === 'tabulador' ? '#D96B27' : 'transparent', color: '#fff', border: 'none', padding: '12px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: menuRetraido ? 'center' : 'flex-start', gap: '10px', fontSize: '13px' }}>
            <span>🧮</span> {!menuRetraido && 'Tabulador Ruedda*'}
          </button>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #334155' }}>
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ width: '100%', background: isDark ? '#334155' : '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
            {menuRetraido ? (isDark ? '☀️' : '🌙') : (isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro')}
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* ENCABEZADO SUPERIOR: TÍTULO Y BOTÓN NUEVA VENTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
            {activeTab === 'ventas' && 'Control de Ventas y Registro Maestro de Flota'}
            {activeTab === 'pagos' && 'Reporte de Pago y Liquidación por Sedes'}
            {activeTab === 'metricas' && 'Métricas de Venta y Distribución Ruedda'}
            {activeTab === 'semanal' && 'Reporte Semanal de Cánones y Cobranza'}
            {activeTab === 'tabulador' && 'Tabulador Interactivo — Inicial y Cánones Semanales'}
          </h1>

          {activeTab !== 'tabulador' && (
            <button onClick={() => setShowModal(true)} style={{ background: '#D96B27', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              ➕ Registrar Nueva Venta 🏍️💨
            </button>
          )}
        </div>

        {/* SEGUNDA LÍNEA: SELECTOR DE SEMANA DE CORTE (Solo si aplica) */}
        {activeTab !== 'tabulador' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', borderBottom: `2px solid ${isDark ? '#333' : '#e2e8f0'}`, paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: cardBg, padding: '4px 10px', borderRadius: '6px', border: `1px solid ${borderColor}` }}>
              <select 
                value={semanaSeleccionadaId} 
                onChange={(e) => setSemanaSeleccionadaId(Number(e.target.value))} 
                style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                {semanasCortas.map((s) => (
                  <option key={s.id} value={s.id}>
                    Semana de corte: {s.id} ({s.fechaRango})
                  </option>
                ))}
              </select>
              <button 
                onClick={agregarNuevaSemana}
                title="Crear nueva semana de corte"
                style={{ background: '#D96B27', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                + Nueva semana
              </button>
            </div>
          </div>
        )}

        {/* MODAL NUEVA VENTA */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '25px', width: '680px', maxWidth: '92%', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#D96B27', fontSize: '17px' }}>Registrar Nueva Venta para {semanaActualObj.label} 💚</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: textMain, fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
              </div>

              <form onSubmit={handleAgregarVentaSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Fecha (Calendario)</label>
                  <input type="date" value={nuevaVenta.fecha} onChange={e => actualizarCalculosFinancieros({ fecha: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} required />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Concesionario</label>
                  {!modoNuevoConcesionario ? (
                    <select value={nuevaVenta.concesionario} onChange={e => e.target.value === '___NUEVO___' ? setModoNuevoConcesionario(true) : actualizarCalculosFinancieros({ concesionario: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }}>
                      {listaConcesionarios.map((c, i) => <option key={i} value={c}>{c}</option>)}
                      <option value="___NUEVO___" style={{ color: '#D96B27', fontWeight: 'bold' }}>+ Agregar nuevo concesionario...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input type="text" placeholder="Nombre nuevo concesionario" value={nuevoConcesionarioInput} onChange={e => setNuevoConcesionarioInput(e.target.value)} style={{ flex: 1, background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} autoFocus />
                      <button type="button" onClick={() => setModoNuevoConcesionario(false)} style={{ background: '#475569', color: '#fff', border: 'none', padding: '0 10px', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Plan</label>
                  {!modoNuevoPlan ? (
                    <select value={nuevaVenta.plan} onChange={e => e.target.value === '___NUEVO___' ? setModoNuevoPlan(true) : actualizarCalculosFinancieros({ plan: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }}>
                      {listaPlanes.map((p, i) => <option key={i} value={p}>{p}</option>)}
                      <option value="___NUEVO___" style={{ color: '#D96B27', fontWeight: 'bold' }}>+ Agregar nuevo plan...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input type="text" placeholder="Ej: 12 Meses - Semanal" value={nuevoPlanInput} onChange={e => setNuevoPlanInput(e.target.value)} style={{ flex: 1, background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} autoFocus />
                      <button type="button" onClick={() => setModoNuevoPlan(false)} style={{ background: '#475569', color: '#fff', border: 'none', padding: '0 10px', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Nombre del cliente</label>
                  <input type="text" placeholder="Nombre completo" value={nuevaVenta.cliente} onChange={e => actualizarCalculosFinancieros({ cliente: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} required />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Número del cliente</label>
                  <input type="text" placeholder="Ej: 584126000000" value={nuevaVenta.telefono} onChange={e => actualizarCalculosFinancieros({ telefono: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Día de cuota</label>
                  <select value={nuevaVenta.cuota} onChange={e => actualizarCalculosFinancieros({ cuota: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }}>
                    {listaDias.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Costo concesionario ($)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={nuevaVenta.costoConcesionario || ''} onChange={e => actualizarCalculosFinancieros({ costoConcesionario: parseFloat(e.target.value) || 0 })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8, color: '#38bdf8', fontWeight: 'bold' }}>Inicial ($)</label>
                  <input type="number" step="0.01" value={nuevaVenta.inicial || 0} onChange={e => actualizarCalculosFinancieros({ inicial: parseFloat(e.target.value) || 0 })} style={{ width: '100%', background: isDark ? '#162235' : '#e0f2fe', color: '#38bdf8', border: `1px solid #38bdf8`, padding: '8px', borderRadius: '4px', fontWeight: 'bold' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8, color: '#38bdf8', fontWeight: 'bold' }}>Canon semanal ($)</label>
                  <input type="number" step="0.01" value={nuevaVenta.canon || 0} onChange={e => actualizarCalculosFinancieros({ canon: parseFloat(e.target.value) || 0 })} style={{ width: '100%', background: isDark ? '#162235' : '#e0f2fe', color: '#38bdf8', border: `1px solid #38bdf8`, padding: '8px', borderRadius: '4px', fontWeight: 'bold' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Marca</label>
                  {!modoNuevaMarca ? (
                    <select value={nuevaVenta.marca} onChange={e => e.target.value === '___NUEVO___' ? setModoNuevaMarca(true) : actualizarCalculosFinancieros({ marca: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }}>
                      {listaMarcas.map((m, i) => <option key={i} value={m}>{m}</option>)}
                      <option value="___NUEVO___" style={{ color: '#D96B27', fontWeight: 'bold' }}>+ Agregar nueva marca...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input type="text" placeholder="Nombre nueva marca" value={nuevaMarcaInput} onChange={e => setNuevaMarcaInput(e.target.value)} style={{ flex: 1, background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} autoFocus />
                      <button type="button" onClick={() => setModoNuevaMarca(false)} style={{ background: '#475569', color: '#fff', border: 'none', padding: '0 10px', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>Moto</label>
                  {!modoNuevaMoto ? (
                    <select value={nuevaVenta.moto} onChange={e => e.target.value === '___NUEVO___' ? setModoNuevaMoto(true) : actualizarCalculosFinancieros({ moto: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }}>
                      {listaMotos.map((m, i) => <option key={i} value={m}>{m}</option>)}
                      <option value="___NUEVO___" style={{ color: '#D96B27', fontWeight: 'bold' }}>+ Agregar nueva moto...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input type="text" placeholder="Modelo de moto" value={nuevaMotoInput} onChange={e => setNuevaMotoInput(e.target.value)} style={{ flex: 1, background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} autoFocus />
                      <button type="button" onClick={() => setModoNuevaMoto(false)} style={{ background: '#475569', color: '#fff', border: 'none', padding: '0 10px', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>IMEI GPS <span style={{ fontSize: '11px', opacity: 0.6 }}>(Opcional)</span></label>
                  <input type="text" placeholder="IMEI" value={nuevaVenta.imei} onChange={e => actualizarCalculosFinancieros({ imei: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8 }}>N° de certificado <span style={{ fontSize: '11px', opacity: 0.6 }}>(Opcional)</span></label>
                  <input type="text" placeholder="Certificado" value={nuevaVenta.certificado} onChange={e => actualizarCalculosFinancieros({ certificado: e.target.value })} style={{ width: '100%', background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '8px', borderRadius: '4px' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8, color: '#10b981', fontWeight: 'bold' }}>Pago a concesionario ($)</label>
                  <input type="number" step="0.01" value={nuevaVenta.pagoConcesionario || 0} readOnly style={{ width: '100%', background: isDark ? '#11221c' : '#d1fae5', color: '#10b981', border: `1px solid #10b981`, padding: '8px', borderRadius: '4px', fontWeight: 'bold' }} />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '4px', opacity: 0.8, color: '#38bdf8', fontWeight: 'bold' }}>Proyección del interés ($)</label>
                  <input type="number" step="0.01" value={nuevaVenta.proyeccionInteres || 0} readOnly style={{ width: '100%', background: isDark ? '#162235' : '#e0f2fe', color: '#38bdf8', border: `1px solid #38bdf8`, padding: '8px', borderRadius: '4px', fontWeight: 'bold' }} />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
                  <button type="submit" style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Guardar e Integrar Venta 🏍️💨</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 1. VENTANA: CONTROL DE VENTAS */}
        {activeTab === 'ventas' && (
          <div>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '16px', overflowX: 'auto', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', color: '#D96B27' }}>Matriz de Ventas — {semanaActualObj.label} ({semanaActualObj.fechaRango})</h3>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>Registros en esta semana: {flotaFiltradaSemana.length}</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#D96B27', color: '#fff' }}>
                    <th style={{ padding: '10px' }}>Fecha</th>
                    <th style={{ padding: '10px' }}>Concesionario</th>
                    <th style={{ padding: '10px' }}>Plan</th>
                    <th style={{ padding: '10px' }}>Nombre del Cliente</th>
                    <th style={{ padding: '10px' }}>Nro. Cliente</th>
                    <th style={{ padding: '10px' }}>Inicial</th>
                    <th style={{ padding: '10px' }}>Día Cuota</th>
                    <th style={{ padding: '10px' }}>Canon Semanal</th>
                    <th style={{ padding: '10px' }}>Marca</th>
                    <th style={{ padding: '10px' }}>Moto</th>
                    <th style={{ padding: '10px' }}>IMEI GPS</th>
                    <th style={{ padding: '10px' }}>N° Certificado</th>
                    <th style={{ padding: '10px' }}>Costo Concesionario</th>
                    <th style={{ padding: '10px' }}>Pago a Concesionario</th>
                    <th style={{ padding: '10px' }}>Proyección Interés</th>
                  </tr>
                </thead>
                <tbody>
                  {flotaFiltradaSemana.length === 0 ? (
                    <tr>
                      <td colSpan={15} style={{ textAlign: 'center', padding: '30px', opacity: 0.6 }}>
                        No hay ventas registradas para esta semana todavía. Haz clic en "Registrar Nueva Venta" para empezar. 🏍️💨
                      </td>
                    </tr>
                  ) : (
                    flotaFiltradaSemana.map((item, index) => {
                      const realIndex = flota.findIndex(f => f === item);
                      return (
                        <tr key={index} style={{ borderBottom: `1px solid ${borderColor}`, background: index % 2 === 0 ? (isDark ? '#1e1e1e' : '#ffffff') : (isDark ? '#161616' : '#f8fafc') }}>
                          <td style={{ padding: '6px' }}><input type="text" value={item.fecha} onChange={(e) => handleFlotaChange(realIndex, 'fecha', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.concesionario} onChange={(e) => handleFlotaChange(realIndex, 'concesionario', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '150px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.plan} onChange={(e) => handleFlotaChange(realIndex, 'plan', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '110px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.cliente} onChange={(e) => handleFlotaChange(realIndex, 'cliente', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '150px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.telefono} onChange={(e) => handleFlotaChange(realIndex, 'telefono', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '100px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="number" value={Number(item.inicial || 0).toFixed(2)} onChange={(e) => handleFlotaChange(realIndex, 'inicial', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.cuota} onChange={(e) => handleFlotaChange(realIndex, 'cuota', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '75px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="number" value={Number(item.canon || 0).toFixed(2)} onChange={(e) => handleFlotaChange(realIndex, 'canon', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '80px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.marca} onChange={(e) => handleFlotaChange(realIndex, 'marca', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.moto} onChange={(e) => handleFlotaChange(realIndex, 'moto', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.imei} onChange={(e) => handleFlotaChange(realIndex, 'imei', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '110px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="text" value={item.certificado} onChange={(e) => handleFlotaChange(realIndex, 'certificado', e.target.value)} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="number" value={item.costoConcesionario} onChange={(e) => handleFlotaChange(realIndex, 'costoConcesionario', parseFloat(e.target.value))} style={{ background: inputBg, color: inputText, border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                          <td style={{ padding: '6px' }}><input type="number" value={Number(item.pagoConcesionario || 0).toFixed(2)} onChange={(e) => handleFlotaChange(realIndex, 'pagoConcesionario', parseFloat(e.target.value))} style={{ background: inputBg, color: '#10b981', fontWeight: 'bold', border: `1px solid ${inputBorder}`, padding: '4px', borderRadius: '4px', width: '90px' }} /></td>
                          <td style={{ padding: '6px', color: '#38bdf8', fontWeight: 'bold' }}>${(Number(item.proyeccionInteres) || 0).toFixed(2)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* SUBCUADRO: TOTAL DE PAGO A REALIZAR */}
            <div style={{ background: cardBg, border: `2px solid #10b981`, borderRadius: '8px', padding: '20px', maxWidth: '420px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.8, fontWeight: 'bold' }}>TOTAL DE PAGO A REALIZAR:</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#10b981' }}>{semanaActualObj.label} ({semanaActualObj.fechaRango})</p>
                </div>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#10b981' }}>
                  ${totalPagoConcesionario.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* 2. VENTANA: REPORTE DE PAGO */}
        {activeTab === 'pagos' && (
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '20px', maxWidth: '900px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#D96B27' }}>Sincronización y Liquidación por Sede — {semanaActualObj.label}</h3>
            <p style={{ fontSize: '12px', opacity: 0.6, margin: '0 0 16px 0' }}>Cálculos consolidados por concesionario en tiempo real para este periodo.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: isDark ? '#1c1c38' : '#e2e8f0', color: textMain, borderBottom: '2px solid #D96B27' }}>
                  <th style={{ padding: '10px' }}>SEDE / CONCESIONARIO</th>
                  <th style={{ padding: '10px' }}>Ventas</th>
                  <th style={{ padding: '10px' }}>Pago Corte (Auto)</th>
                  <th style={{ padding: '10px' }}>Comisión 1%</th>
                  <th style={{ padding: '10px' }}>Penalización</th>
                </tr>
              </thead>
              <tbody>
                {sedesCalculadas.map((item, index) => (
                  <tr key={index} style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.sede}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ background: '#D96B27', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>{item.ventasCount}</span>
                    </td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#10b981', fontSize: '14px' }}>${item.pagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#38bdf8', fontSize: '14px' }}>${item.comision.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ padding: '10px' }}>
                      <input type="number" value={item.pen} onChange={(e) => {
                        const val = e.target.value;
                        const indexCfg = sedesConfig.findIndex(s => s.sede === item.sede);
                        if (indexCfg >= 0) handleSedeChange(indexCfg, 'pen', val);
                        else setSedesConfig([...sedesConfig, { sede: item.sede, pen: parseFloat(val) || 0 }]);
                      }} style={{ background: inputBg, color: '#ef4444', border: `1px solid ${inputBorder}`, padding: '6px', borderRadius: '4px', width: '90px', fontWeight: 'bold' }} />
                    </td>
                  </tr>
                ))}
                <tr style={{ background: isDark ? '#262626' : '#f1f5f9', borderTop: '2px solid #D96B27', fontWeight: 'bold' }}>
                  <td style={{ padding: '12px', color: '#D96B27' }}>TOTALES GENERALES:</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#D96B27' }}>{flotaFiltradaSemana.length}</td>
                  <td style={{ padding: '12px', color: '#10b981', fontSize: '14px' }}>${totalPagoCorte.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td style={{ padding: '12px', color: '#38bdf8', fontSize: '14px' }}>${totalComisionSedes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td style={{ padding: '12px', color: '#ef4444', fontSize: '14px' }}>${totalPenSedes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 3. VENTANA: MÉTRICAS DE VENTA */}
        {activeTab === 'metricas' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '20px', borderRadius: '8px', borderLeft: '4px solid #D96B27' }}>
              <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Unidades en {semanaActualObj.label}</p>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#D96B27' }}>{flotaFiltradaSemana.length}</h2>
            </div>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Costo Total Concesionario</p>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#10b981' }}>${totalCostoConcesionario.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            </div>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: '20px', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
              <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Proyección Total Interés</p>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#38bdf8' }}>${totalProyeccionInteres.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            </div>
          </div>
        )}

        {/* 4. VENTANA: REPORTE SEMANAL */}
        {activeTab === 'semanal' && (
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '20px', maxWidth: '850px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#D96B27' }}>RUEDDA* — Resumen Ejecutivo de Cánones y Cobranza</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', opacity: 0.9 }}>
              Seguimiento semanal de cobranzas y proyecciones financieras automatizadas para <strong>{semanaActualObj.label} ({semanaActualObj.fechaRango})</strong>.
            </p>
            <div style={{ marginTop: '20px', padding: '14px', background: isDark ? '#1c1c38' : '#e0f2fe', borderRadius: '6px', borderLeft: '3px solid #0284c7' }}>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: isDark ? '#38bdf8' : '#0369a1' }}>
                💡 Proyección de Interés Acumulada en esta semana: <strong style={{ color: '#38bdf8' }}>${totalProyeccionInteres.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> 🏍️💨
              </p>
            </div>
          </div>
        )}

        {/* 5. VENTANA: TABULADOR RUEDDA* */}
        {activeTab === 'tabulador' && (
          <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Selector rápido de precios frecuentes */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#D96B27' }}>Precios Frecuentes de Contado</h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', opacity: 0.7 }}>Selecciona un monto rápido o escribe el valor deseado</p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[1000, 1240, 1500, 2000, 2500].map((val) => (
                  <button 
                    key={val} 
                    onClick={() => setTabuladorPrecioContado(val)}
                    style={{ background: tabuladorPrecioContado === val ? '#D96B27' : inputBg, color: tabuladorPrecioContado === val ? '#fff' : textMain, border: `1px solid ${borderColor}`, padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ${val} {val === 1240 ? '★' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Panel Izquierdo: Input */}
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#D96B27' }}>Valor del Vehículo</h3>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', opacity: 0.8, fontWeight: 'bold' }}>Precio Contado ($)</label>
                  <input 
                    type="number" 
                    value={tabuladorPrecioContado} 
                    onChange={(e) => setTabuladorPrecioContado(parseFloat(e.target.value) || 0)} 
                    style={{ width: '100%', background: inputBg, color: inputText, border: '2px solid #D96B27', padding: '12px', borderRadius: '6px', fontSize: '20px', fontWeight: '900' }} 
                  />
                  <input 
                    type="range" 
                    min="300" 
                    max="5000" 
                    step="10" 
                    value={tabuladorPrecioContado} 
                    onChange={(e) => setTabuladorPrecioContado(parseFloat(e.target.value) || 0)}
                    style={{ width: '100%', marginTop: '16px', accentColor: '#D96B27', cursor: 'pointer' }} 
                  />
                </div>
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${borderColor}`, fontSize: '12px', opacity: 0.8 }}>
                  <p style={{ margin: '0 0 4px 0' }}>• Porcentaje Inicial: <strong>27.5%</strong></p>
                  <p style={{ margin: 0 }}>• Plazo de Financiamiento: <strong>24 Semanas</strong></p>
                </div>
              </div>

              {/* Panel Derecho: Resultados */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ background: isDark ? '#162235' : '#e0f2fe', border: '2px solid #38bdf8', borderRadius: '8px', padding: '20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#38bdf8' }}>Inicial Requerida</span>
                  <h2 style={{ fontSize: '32px', fontWeight: '900', margin: '6px 0 0 0', color: '#38bdf8' }}>
                    ${tabuladorCalculado.inicial.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                  <span style={{ fontSize: '11px', opacity: 0.7, display: 'block', marginTop: '4px' }}>Pago único de contado a la firma</span>
                </div>

                <div style={{ background: isDark ? '#231812' : '#ffedd5', border: '2px solid #D96B27', borderRadius: '8px', padding: '20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#D96B27' }}>Cánon Semanal</span>
                  <h2 style={{ fontSize: '32px', fontWeight: '900', margin: '6px 0 0 0', color: '#D96B27' }}>
                    ${tabuladorCalculado.canonSemanal.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                  <span style={{ fontSize: '11px', opacity: 0.7, display: 'block', marginTop: '4px' }}>Durante 24 semanas consecutivas</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
