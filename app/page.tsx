'use client';

import React, { useState } from 'react';

// Datos iniciales basados en tu estructura de Ruedda / Control de Motos
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
  estado: 'Activo' | 'Completado' | 'Impago';
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
    proyeccionInteres: 1133.48,
    estado: 'Activo'
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
    proyeccionInteres: 1681.94,
    estado: 'Activo'
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
    proyeccionInteres: 1133.48,
    estado: 'Activo'
  },
  {
    id: 4,
    fecha: '16/09/2026',
    concesionario: 'NECATIX C.A',
    plan: '6 Meses - Semanal',
    cliente: 'John Carvajal',
    numeroCliente: '584242698653',
    inicial: 528.00,
    diaCuota: 'Miércoles',
    canonSemanal: 131.13,
    metodoPago: 'Efectivo',
    marca: 'Empire',
    moto: 'RK 200',
    fechaCorte: '',
    imeiGps: '863874086406570',
    certificado: 'AA-2411251',
    costoConcesionario: 1920.00,
    pagoConcesionario: 1392.00,
    comisionVendedor: 19.20,
    proyeccionInteres: 1755.07,
    estado: 'Activo'
  }
];

export default function ControlMotosDashboard() {
  const [contratos, setContratos] = useState<Contrato[]>(datosIniciales);
  const [filtroConcesionario, setFiltroConcesionario] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');

  // Filtrado de contratos
  const contratosFiltrados = contratos.filter(c => {
    const coincideConcesionario = filtroConcesionario === 'TODOS' || c.concesionario === filtroConcesionario;
    const coincideBusqueda = c.cliente.toLowerCase().includes(busqueda.toLowerCase()) || c.numeroCliente.includes(busqueda) || c.moto.toLowerCase().includes(busqueda);
    return coincideConcesionario && coincideBusqueda;
  });

  // Resumen por Concesionario (Estilo cuadro lateral de la imagen)
  const listaConcesionarios = [
    'Motores Del Este VIP C.A.',
    'Urdaneta Motors 2025 C.A.',
    'Turbo Motos C.A',
    'Velocity Motos. C.A',
    'INVERSIONES CHT30, C.A',
    'AKOX C.A',
    'NECATIX C.A'
  ];

  const resumenSedes = listaConcesionarios.map(sede => {
    const itemsSede = contratos.filter(c => c.concesionario === sede);
    const pagoCorte = itemsSede.reduce((acc, curr) => acc + curr.pagoConcesionario, 0);
    const comision = itemsSede.reduce((acc, curr) => acc + curr.comisionVendedor, 0);
    return { sede, pagoCorte, comision, pendientes: 0 };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Encabezado Principal */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-600 text-white text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider">RUEDDA*</span>
            <span className="text-emerald-400 font-semibold text-sm">💚 Sistema Automatizado de Flota</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Control de Arriendos & Opción a Compra</h1>
          <p className="text-slate-400 text-sm">Gestión semanal de cobros, concesionarios y comisiones de vendedores al 1%</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Módulo de Nuevo Contrato activado')}
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-lg text-sm shadow-lg transition flex items-center gap-2">
            🚗💨 + Formalizar Nueva Moto
          </button>
        </div>
      </header>

      {/* Métricas Principales / Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
          <p className="text-slate-400 text-xs font-semibold uppercase">Cánones Pagados a Tiempo</p>
          <p className="text-3xl font-black text-emerald-400 mt-2">83,2%</p>
          <span className="text-xs text-slate-500 mt-1 block">89 cánones al día</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
          <p className="text-slate-400 text-xs font-semibold uppercase">Cánones Pendientes</p>
          <p className="text-3xl font-black text-amber-400 mt-2">6,5%</p>
          <span className="text-xs text-slate-500 mt-1 block">7 pendientes por cobrar</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
          <p className="text-slate-400 text-xs font-semibold uppercase">Porcentaje de Impago</p>
          <p className="text-3xl font-black text-rose-500 mt-2">10,3%</p>
          <span className="text-xs text-slate-500 mt-1 block">11 cánones en impago</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow">
          <p className="text-slate-400 text-xs font-semibold uppercase">Modelo Estrella</p>
          <p className="text-2xl font-black text-orange-400 mt-2">CG-HERO</p>
          <span className="text-xs text-slate-500 mt-1 block">Moto más vendida</span>
        </div>
      </div>

      {/* Sección central: Tabla y Cuadro Resumen Lateral */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Tabla principal (3 columnas en pantallas grandes) */}
        <div className="xl:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 bg-orange-600/10 border-b border-orange-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-orange-400">Contratos Activos y Registro de Flota</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <input 
                type="text" 
                placeholder="Buscar cliente, moto..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-sm px-3 py-1.5 rounded-lg text-white w-full sm:w-60 focus:outline-none focus:border-orange-500"
              />
              <select 
                value={filtroConcesionario}
                onChange={(e) => setFiltroConcesionario(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-sm px-3 py-1.5 rounded-lg text-white">
                <option value="TODOS">Todos los Concesionarios</option>
                {listaConcesionarios.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-orange-700 text-white uppercase tracking-wider">
                <tr>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Concesionario</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">N° Cliente</th>
                  <th className="p-3">Inicial</th>
                  <th className="p-3">Día</th>
                  <th className="p-3">Canon</th>
                  <th className="p-3">Moto</th>
                  <th className="p-3">IMEI GPS</th>
                  <th className="p-3">Certificado</th>
                  <th className="p-3">Pago Concesionario</th>
                  <th className="p-3">Comisión 1%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {contratosFiltrados.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/50 transition">
                    <td className="p-3 whitespace-nowrap">{c.fecha}</td>
                    <td className="p-3 font-medium text-orange-300">{c.concesionario}</td>
                    <td className="p-3 whitespace-nowrap">{c.plan}</td>
                    <td className="p-3 font-bold text-white">{c.cliente}</td>
                    <td className="p-3 whitespace-nowrap">{c.numeroCliente}</td>
                    <td className="p-3 text-emerald-400 font-semibold">${c.inicial.toFixed(2)}</td>
                    <td className="p-3 whitespace-nowrap">{c.diaCuota}</td>
                    <td className="p-3 text-amber-300">${c.canonSemanal.toFixed(2)}</td>
                    <td className="p-3">{c.moto}</td>
                    <td className="p-3 font-mono text-slate-400">{c.imeiGps}</td>
                    <td className="p-3 font-mono text-orange-300">{c.certificado}</td>
                    <td className="p-3 text-rose-300 font-semibold">${c.pagoConcesionario.toFixed(2)}</td>
                    <td className="p-3 text-emerald-400 font-bold">${c.comisionVendedor.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cuadro Lateral Resumen de Concesionarios y Comisiones (Estilo Excel) */}
        <div className="xl:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wide mb-3 border-b border-slate-800 pb-2">
              📊 Resumen por Sede / Concesionario
            </h3>
            <div className="space-y-3">
              {resumenSedes.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-xs font-bold text-slate-200 truncate">{item.sede}</p>
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-slate-400">Pago Corte:</span>
                    <span className="text-rose-400 font-bold">${item.pagoCorte.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs">
                    <span className="text-slate-400">Comisión (1%):</span>
                    <span className="text-emerald-400 font-bold">${item.comision.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <span className="text-xs text-slate-500">Ruedda System • Sincronizado OK 💚</span>
          </div>
        </div>

      </div>
    </div>
  );
}
