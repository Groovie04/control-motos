'use client';

import { useState, useEffect } from 'react';
import { Bike, Plus, Trash2, Search, CheckCircle2, ShieldCheck, Phone, User, Calendar, FileText } from 'lucide-react';

interface ContratoMoto {
  id: string;
  placa: string;
  modelo: string;
  conductor: string;
  telefono: string;
  cedula: string;
  cuota: number;
  frecuencia: 'Semanal' | 'Quincenal' | 'Mensual';
  cuotasTotales: number;
  cuotasPagadas: number;
  estado: 'Activo' | 'Completado' | 'En Mora';
  fechaInicio: string;
}

export default function Home() {
  const [contratos, setContratos] = useState<ContratoMoto[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);

  // Campos del Formulario de Formalización
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [conductor, setConductor] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cedula, setCedula] = useState('');
  const [cuota, setCuota] = useState('');
  const [frecuencia, setFrecuencia] = useState<'Semanal' | 'Quincenal' | 'Mensual'>('Semanal');
  const [cuotasTotales, setCuotasTotales] = useState('52');
  const [fechaInicio, setFechaInicio] = useState('');

  // Cargar datos locales al iniciar (Persistencia automática)
  useEffect(() => {
    const guardados = localStorage.getItem('ridery_motos_arriendo');
    if (guardados) {
      setContratos(JSON.parse(guardados));
    } else {
      const iniciales: ContratoMoto[] = [
        {
          id: '1',
          placa: 'AB9X2V',
          modelo: 'Bera SBR 150',
          conductor: 'Alejandro Pérez',
          telefono: '+58 412-5554321',
          cedula: 'V-26.432.112',
          cuota: 35,
          frecuencia: 'Semanal',
          cuotasTotales: 52,
          cuotasPagadas: 14,
          estado: 'Activo',
          fechaInicio: '2026-02-01',
        },
        {
          id: '2',
          placa: 'M73K1L',
          modelo: 'Empire Owen FK',
          conductor: 'Gabriel Soto',
          telefono: '+58 424-3338899',
          cedula: 'V-22.109.887',
          cuota: 30,
          frecuencia: 'Semanal',
          cuotasTotales: 52,
          cuotasPagadas: 52,
          estado: 'Completado',
          fechaInicio: '2025-01-15',
        },
      ];
      setContratos(iniciales);
      localStorage.setItem('ridery_motos_arriendo', JSON.stringify(iniciales));
    }
  }, []);

  const actualizarStorage = (nuevosDatos: ContratoMoto[]) => {
    setContratos(nuevosDatos);
    localStorage.setItem('ridery_motos_arriendo', JSON.stringify(nuevosDatos));
  };

  const registrarContrato = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placa || !modelo || !conductor || !cuota || !cuotasTotales) return;

    const nuevo: ContratoMoto = {
      id: Date.now().toString(),
      placa: placa.toUpperCase(),
      modelo,
      conductor,
      telefono,
      cedula,
      cuota: parseFloat(cuota),
      frecuencia,
      cuotasTotales: parseInt(cuotasTotales),
      cuotasPagadas: 0,
      estado: 'Activo',
      fechaInicio: fechaInicio || new Date().toISOString().split('T')[0],
    };

    actualizarStorage([nuevo, ...contratos]);
    setModalAbierto(false);
    
    // Limpiar formulario
    setPlaca('');
    setModelo('');
    setConductor('');
    setTelefono('');
    setCedula('');
    setCuota('');
    setCuotasTotales('52');
    setFechaInicio('');
  };

  const abonarCuota = (id: string) => {
    const actualizados = contratos.map((c) => {
      if (c.id === id) {
        const pagadasNuevas = c.cuotasPagadas + 1;
        const estadoNuevo = pagadasNuevas >= c.cuotasTotales ? 'Completado' : c.estado;
        return { ...c, cuotasPagadas: pagadasNuevas, estado: estadoNuevo as any };
      }
      return c;
    });
    actualizarStorage(actualizados);
  };

  const eliminarContrato = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este registro del sistema?')) {
      actualizarStorage(contratos.filter((c) => c.id !== id));
    }
  };

  const filtrados = contratos.filter(
    (c) =>
      c.placa.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.conductor.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.cedula.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.modelo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalActivos = contratos.filter((c) => c.estado === 'Activo').length;
  const totalCompletados = contratos.filter((c) => c.estado === 'Completado').length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Barra Superior / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-sm flex items-center justify-center">
              <Bike size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-800 leading-tight">Control de Arriendos & Opción a Compra</h1>
              <p className="text-xs text-slate-500">Gestión automatizada de flota y financiamiento</p>
            </div>
          </div>
          <button
            onClick={() => setModalAbierto(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} /> Formalizar Nueva Moto
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Tarjetas de Métricas Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Contratos Activos</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">{totalActivos}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Bike size={24} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Motos con Propiedad (Completadas)</p>
              <p className="text-2xl font-extrabold text-blue-600 mt-1">{totalCompletados}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <ShieldCheck size={24} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total de Flota Registrada</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">{contratos.length}</p>
            </div>
            <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
              <FileText size={24} />
            </div>
          </div>
        </div>

        {/* Buscador Rápido */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <Search className="text-slate-400 ml-2" size={20} />
          <input
            type="text"
            placeholder="Buscar por placa, cédula, nombre del conductor o modelo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full outline-none text-slate-700 bg-transparent text-sm placeholder:text-slate-400"
          />
        </div>

        {/* Tabla Estilizada */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Placa / Modelo</th>
                  <th className="p-4">Conductor / Cédula</th>
                  <th className="p-4">Cuota Acordada</th>
                  <th className="p-4">Progreso de Cuotas</th>
                  <th className="p-4">Estatus</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 font-medium">
                      No se encontraron contratos registrados con ese criterio.
                    </td>
                  </tr>
                ) : (
                  filtrados.map((item) => {
                    const porcentaje = Math.round((item.cuotasPagadas / item.cuotasTotales) * 100);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4">
                          <span className="inline-block font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md text-xs border border-slate-200 tracking-wide">
                            {item.placa}
                          </span>
                          <div className="text-xs font-medium text-slate-600 mt-1">{item.modelo}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-800">{item.conductor}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>{item.cedula}</span> • <span>{item.telefono}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-emerald-600">${item.cuota}</div>
                          <div className="text-xs text-slate-400 font-medium">Pago {item.frecuencia.toLowerCase()}</div>
                        </td>
                        <td className="p-4 w-64">
                          <div className="flex justify-between text-xs mb-1.5 font-semibold text-slate-600">
                            <span>{item.cuotasPagadas} de {item.cuotasTotales} cuotas</span>
                            <span className="text-emerald-600">{porcentaje}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${porcentaje}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                              item.estado === 'Activo'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : item.estado === 'Completado'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {item.estado}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1">
                          {item.estado !== 'Completado' && (
                            <button
                              onClick={() => abonarCuota(item.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
                              title="Registrar pago de siguiente cuota"
                            >
                              <CheckCircle2 size={14} /> Registrar Cuota
                            </button>
                          )}
                          <button
                            onClick={() => eliminarContrato(item.id)}
                            className="text-slate-400 hover:text-red-600 p-2 transition-colors inline-block rounded-lg hover:bg-red-50 cursor-pointer"
                            title="Eliminar contrato"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para Formalizar Nuevo Contrato */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150">
            <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
              <Bike className="text-emerald-600" /> Formalizar Opción a Compra
            </h2>
            <form onSubmit={registrarContrato} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Placa de la Moto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: AB9X2V"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 font-bold uppercase bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Modelo de la Moto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Bera SBR / Empire Owen"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nombre y Apellido del Conductor</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carlos Eduardo Martínez"
                  value={conductor}
                  onChange={(e) => setConductor(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Cédula de Identidad</label>
                  <input
                    type="text"
                    required
                    placeholder="V-28.123.456"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Teléfono de Contacto</label>
                  <input
                    type="text"
                    required
                    placeholder="+58 412..."
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Cuota ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="35"
                    value={cuota}
                    onChange={(e) => setCuota(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50 font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Frecuencia</label>
                  <select
                    value={frecuencia}
                    onChange={(e: any) => setFrecuencia(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50 font-medium"
                  >
                    <option value="Semanal">Semanal</option>
                    <option value="Quincenal">Quincenal</option>
                    <option value="Mensual">Mensual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Total Cuotas</label>
                  <input
                    type="number"
                    required
                    value={cuotasTotales}
                    onChange={(e) => setCuotasTotales(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Fecha de Inicio del Contrato</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 bg-slate-50/50"
                />
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                >
                  Guardar y Formalizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}