'use client';

import React, { useState } from 'react';

interface Contrato {
  id: number;
  fecha: string;
  concesionario: string;
  plan: string;
  cliente: string;
  numeroCliente: string;
  inicial: number;
  diaCuota: string;
  canonSemanal: number;
  metodoPago: string;
  marca: string;
  moto: string;
  fechaCorte: string;
  imeiGps: string;
  certificado: string;
  costoConcesionario: number;
  pagoConcesionario: number;
  comisionVendedor: number;
  proyeccionInteres: number;
}

const datosIniciales: Contrato[] = [
  {
    id: 1,
    fecha: '07/09/2026',
    concesionario: 'Motores Del Este VIP C.A.',
    plan: '6 Meses - Semanal',
    cliente: 'Robert Alejandro Palacios Silva',
    numeroCliente: '584125922334',
    inicial: 341.00,
    diaCuota: 'Lunes',
    canonSemanal: 84.69,
    metodoPago: 'Efectivo',
    marca: 'Escuda',
    moto: 'CG-HERO',
    fechaCorte: '',
    imeiGps: '863874086270265',
    certificado: 'AA-1329369',
    costoConcesionario: 1240.00,
    pagoConcesionario: 899.00,
    comisionVendedor: 12.40,
    proyeccionInteres: 1133.48
  },
  {
    id: 2,
    fecha: '11/09/2026',
    concesionario: 'Velocity Motos. C.A',
    plan: '6 Meses - Semanal',
    cliente: 'Marcos Sleyder Bozo Perez',
    numeroCliente: '584243571388',
    inicial: 506.00,
    diaCuota: 'Viernes',
    canonSemanal: 125.66,
    metodoPago: 'Efectivo',
    marca: 'Escuda',
    moto: 'F16-EXTREME',
    fechaCorte: '',
    imeiGps: '863874086467614',
    certificado: 'AA-1329414',
    costoConcesionario: 1840.00,
    pagoConcesionario: 1334.00,
    comisionVendedor: 18.40,
    proyeccionInteres: 1681.94
  },
  {
    id: 3,
    fecha: '14/09/2026',
    concesionario: 'INVERSIONES CHT30, C.A',
    plan: '6 Meses - Semanal',
    cliente: 'Alexair Armando Marin Nuñez',
    numeroCliente: '584142038890',
    inicial: 341.00,
    diaCuota: 'Lunes',
    canonSemanal: 84.69,
    metodoPago: 'Efectivo',
    marca: 'Escuda',
    moto: 'CG-HERO',
    fechaCorte: '',
    imeiGps: '863874086327164',
    certificado: 'AA-1329455',
    costoConcesionario: 1240.00,
    pagoConcesionario: 899.00,
    comisionVendedor: 12.40,
    proyeccionInteres: 1133.48
  }
];

export default function RueddaToolsDashboard() {
  const [contratos] = useState<Contrato[]>(datosIniciales);
  const [menuActivo, setMenuActivo] = useState('control');
  const [filtroConcesionario, setFiltroConcesionario] = useState('TODOS');
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

  const contratosFiltrados = contratos.filter(c => {
    const coincideConces = filtroConcesionario === 'TODOS' || c.concesionario === filtroConcesionario;
    const coincideBusq = c.cliente.toLowerCase().includes(busqueda.toLowerCase()) || c.numeroCliente.includes(busqueda);
    return coincideConces && coincideBusq;
  });

  const resumenSedes = listaConcesionarios.map(sede => {
    const itemsSede = contratos.filter(c => c.concesionario === sede);
    const pagoCorte = itemsSede.reduce((acc, curr) => acc + curr.pagoConcesionario, 0);
    const comision = itemsSede.reduce((acc, curr) => acc + curr.comisionVendedor, 0);
    return { sede, pagoCorte, comision };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      
      {/* BARRA LATERAL ESTILO RIDERY */}
      <aside className="w-64 bg-indigo-950 border-r border-indigo-900/50 flex flex-col justify-between hidden md:flex shadow-2xl">
        <div>
          {/* Logo / Encabezado Sidebar */}
          <div className="p-6 border-b border-indigo-900/50">
            <h1 className="text-white font-black text-xl tracking-wider">RUEDDA</h1>
            <p className="text-indigo-400 text-xs mt-0.5 font-medium">VENEZUELA • TOOLS</p>
          </div>

          {/* Menú de Navegación */}
          <div className="p-4 space-y-2">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider px-3 mb-2">Gestión de Flota</p>
            
            <button 
              onClick={() => setMenuActivo('control')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition ${menuActivo === 'control' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-300 hover:bg-indigo-900/50'}`}>
              🏍️ Control de Arriendos
            </button>
            <button 
              onClick={() => setMenuActivo('resumen')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition ${menuActivo === 'resumen' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-300 hover:bg-indigo-900/50'}`}>
              📊 Resumen y Comisiones
            </button>
            <button 
              onClick={() => setMenuActivo('nuevo')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition ${menuActivo === 'nuevo' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-300 hover:bg-indigo-900/50'}`}>
              ➕ Formalizar Contrato
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-indigo-900/50 text-xs text-indigo-400">
          <p className="font-semibold text-white">David (CX)</p>
          <p className="text-[10px] text-emerald-400 mt-0.5">● Sistema Activo 💚</p>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Barra Superior */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-md">
          <div>
            <h2 className="text-xl font-bold text-white">Ruedda Tools - Control de Motos</h2>
            <p className="text-xs text-slate-400">Panel unificado de arriendos, pagos a concesionarios y comisiones al 1%</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-bold">
              ⚡ ACTIVO
            </span>
          </div>
        </header>

        {/* Cuerpo Dinámico */}
        <div className="p-6 space-y-6">

          {/* Tarjetas de Estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
              <p className="text-slate-400 text-xs font-semibold uppercase">Cánones a Tiempo</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">83,2%</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
              <p className="text-slate-400 text-xs font-semibold uppercase">Pendientes</p>
              <p className="text-2xl font-black text-amber-400 mt-1">6,5%</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
              <p className="text-slate-400 text-xs font-semibold uppercase">Impago</p>
              <p className="text-2xl font-black text-rose-500 mt-1">10,3%</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
              <p className="text-slate-400 text-xs font-semibold uppercase">Modelo Estrella</p>
              <p className="text-2xl font-black text-orange-400 mt-1">CG-HERO</p>
            </div>
          </div>

          {/* Contenido principal según vista */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Tabla Principal de Contratos */}
            <div className="xl:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                <h3 className="font-bold text-sm text-white">Registro de Arriendos & Flota Activa</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input 
                    type="text" 
                    placeholder="Buscar cliente..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-xs px-3 py-1.5 rounded-lg text-white w-full sm:w-48"
                  />
                  <select 
                    value={filtroConcesionario}
                    onChange={(e) => setFiltroConcesionario(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-xs px-3 py-1.5 rounded-lg text-white">
                    <option value="TODOS">Todos</option>
                    {listaConcesionarios.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-indigo-900/60 text-indigo-200 uppercase">
                    <tr>
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Concesionario</th>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Teléfono</th>
                      <th className="p-3">Inicial</th>
                      <th className="p-3">Canon</th>
                      <th className="p-3">Moto</th>
                      <th className="p-3">Certificado</th>
                      <th className="p-3">Pago Concesionario</th>
                      <th className="p-3">Comisión 1%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {contratosFiltrados.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 whitespace-nowrap">{c.fecha}</td>
                        <td className="p-3 font-medium text-indigo-300">{c.concesionario}</td>
                        <td className="p-3 font-bold text-white">{c.cliente}</td>
                        <td className="p-3 whitespace-nowrap">{c.numeroCliente}</td>
                        <td className="p-3 text-emerald-400">${c.inicial.toFixed(2)}</td>
                        <td className="p-3 text-amber-300">${c.canonSemanal.toFixed(2)}</td>
                        <td className="p-3">{c.moto}</td>
                        <td className="p-3 font-mono text-orange-300">{c.certificado}</td>
                        <td className="p-3 text-rose-300 font-semibold">${c.pagoConcesionario.toFixed(2)}</td>
                        <td className="p-3 text-emerald-400 font-bold">${c.comisionVendedor.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cuadro Lateral de Concesionarios y Comisiones */}
            <div className="xl:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-2">
                  📊 Resumen de Sedes
                </h3>
                <div className="space-y-2.5">
                  {resumenSedes.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/60 text-xs">
                      <p className="font-bold text-slate-200 truncate">{item.sede}</p>
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="text-slate-400">Pago Corte:</span>
                        <span className="text-rose-400 font-semibold">${item.pagoCorte.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-slate-400">Comisión (1%):</span>
                        <span className="text-emerald-400 font-bold">${item.comision.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-500">Ruedda System 💚</span>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
