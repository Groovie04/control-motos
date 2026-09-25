'use client'
import React, { useState, useMemo } from 'react';

// Base de datos completa de la flota con los registros históricos integrados
const datosInicialesFlota = [
  { fecha: "10/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Alberto Rafael Salas Martinez", nroCliente: "584167171297", inicial: 440.00, diaCuota: "Lunes", canon: 109.27, pagoConcesionario: 1160.00 },
  { fecha: "11/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Freddy David Perez Peña", nroCliente: "584126034365", inicial: 277.75, diaCuota: "Martes", canon: 68.98, pagoConcesionario: 732.25 },
  { fecha: "11/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Jesus German Barrios Yecerra", nroCliente: "584241323953", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "12/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Darwin Alexander Contreras Vivenes", nroCliente: "584127001792", inicial: 269.50, diaCuota: "Miércoles", canon: 66.93, pagoConcesionario: 710.50 },
  { fecha: "13/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Henry Alberto Montes Paez", nroCliente: "584162472235", inicial: 261.25, diaCuota: "Jueves", canon: 64.88, pagoConcesionario: 688.75 },
  { fecha: "13/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Enderson Agustin Alvares Contreras", nroCliente: "584241741879", inicial: 261.25, diaCuota: "Jueves", canon: 64.88, pagoConcesionario: 688.75 },
  { fecha: "14/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Emilio Manuel Caballero Tovar", nroCliente: "584129006146", inicial: 250.25, diaCuota: "Viernes", canon: 62.15, pagoConcesionario: 659.75 },
  { fecha: "15/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Daniel Jose Medina Martinez", nroCliente: "584141785721", inicial: 412.50, diaCuota: "Sábado", canon: 102.44, pagoConcesionario: 1087.50 },
  { fecha: "17/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Miguel Angel Paraqueimo Barrera", nroCliente: "584166109994", inicial: 250.25, diaCuota: "Lunes", canon: 62.15, pagoConcesionario: 659.75 },
  { fecha: "18/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Javier Enrique Astudillo Rodriguez", nroCliente: "584123394266", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "18/08/2026", concesionario: "Urdaneta Motors 2025 C.A.", plan: "6 Meses - Semanal", cliente: "William Jose Isturiz Velazquez", nroCliente: "584125020646", inicial: 561.00, diaCuota: "Martes", canon: 139.32, pagoConcesionario: 1479.00 },
  { fecha: "18/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Diego Andres Osorio Salas", nroCliente: "584141849057", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "18/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Maryuri Coromoto Rodriguez Perdomo", nroCliente: "584128539992", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "18/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Eduardo Yohan Sanz Tovar", nroCliente: "584241434152", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "19/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Yonaiker Javier Tinedo Bolivar", nroCliente: "584127405631", inicial: 272.25, diaCuota: "Miércoles", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "19/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Gregori Jose Diaz Luces", nroCliente: "584144232419", inicial: 272.25, diaCuota: "Miércoles", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "19/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Enrique De Castro", nroCliente: "584144351121", inicial: 272.25, diaCuota: "Miércoles", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "20/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Alexis Youssethy Hernandez Medina", nroCliente: "584120723919", inicial: 272.25, diaCuota: "Jueves", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "20/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Eliezer Josue Valerio Fajardo", nroCliente: "584125891189", inicial: 272.25, diaCuota: "Jueves", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "20/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Jhonkleiver Alexander Gonzalez Guillen", nroCliente: "584246989736", inicial: 272.25, diaCuota: "Jueves", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "20/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Carlos Alfredo Castro Jaimes", nroCliente: "584221461800", inicial: 272.25, diaCuota: "Jueves", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "20/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Samuel Jesus Marcano Becerra", nroCliente: "584129186948", inicial: 250.25, diaCuota: "Jueves", canon: 62.15, pagoConcesionario: 659.75 },
  { fecha: "21/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Jorge Luis Graterol Balza", nroCliente: "584220503887", inicial: 275.25, diaCuota: "Viernes", canon: 67.61, pagoConcesionario: 714.75 },
  { fecha: "21/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Oswaldo Jesus Alvarez Gonzalez", nroCliente: "584242814005", inicial: 577.50, diaCuota: "Viernes", canon: 143.42, pagoConcesionario: 1522.50 },
  { fecha: "21/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Barbara Gonzalez", nroCliente: "584247618041", inicial: 250.25, diaCuota: "Viernes", canon: 62.15, pagoConcesionario: 659.75 },
  { fecha: "22/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Jesus Alexander Garcia Mujica", nroCliente: "584128693531", inicial: 272.25, diaCuota: "Sábado", canon: 62.15, pagoConcesionario: 717.75 },
  { fecha: "22/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Enderson Gabriel Moya", nroCliente: "584142514532", inicial: 272.25, diaCuota: "Sábado", canon: 62.15, pagoConcesionario: 717.75 },
  { fecha: "22/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Ramon Alexander Viera Palacios", nroCliente: "584122656253", inicial: 272.25, diaCuota: "Sábado", canon: 62.15, pagoConcesionario: 717.75 },
  { fecha: "22/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Joseph Eduardo Salinas Jaspe", nroCliente: "584127336304", inicial: 272.25, diaCuota: "Sábado", canon: 62.15, pagoConcesionario: 717.75 },
  { fecha: "18/08/2026", concesionario: "Turbo Motos C.A", plan: "6 Meses - Semanal", cliente: "Moises Roziel Lugo Ramos", nroCliente: "584129670328", inicial: 266.75, diaCuota: "Martes", canon: 66.25, pagoConcesionario: 703.25 },
  { fecha: "25/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Aiverson Jose Quevedo Vetancourt", nroCliente: "584241786003", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "25/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Reinaldo Antonio Ibarra Martinez", nroCliente: "584241668148", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "25/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Jorge Manuel Contreras Oviedo", nroCliente: "584122794664", inicial: 272.25, diaCuota: "Martes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "27/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Edgar Antonio Manrique Lopez", nroCliente: "584242555796", inicial: 272.25, diaCuota: "Jueves", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "28/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Dervin Yorman González Tirado", nroCliente: "584221762816", inicial: 272.25, diaCuota: "Viernes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "28/08/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Yeison Gabriel Figuera Rangel", nroCliente: "584128026317", inicial: 272.25, diaCuota: "Viernes", canon: 67.61, pagoConcesionario: 717.75 },
  { fecha: "29/08/2026", concesionario: "Urdaneta Motors 2025 C.A.", plan: "6 Meses - Semanal", cliente: "Juan Carlos Bravo Rosales", nroCliente: "584142543814", inicial: 508.75, diaCuota: "Sábado", canon: 126.35, pagoConcesionario: 1341.25 },
  { fecha: "04/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Elias Jose Cardona De La Hoz", nroCliente: "584143348308", inicial: 341.00, diaCuota: "Viernes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "07/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Robert Alejandro Palacios Silva", nroCliente: "584125922334", inicial: 341.00, diaCuota: "Lunes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "08/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Jesus Enrrique Mundo Perez", nroCliente: "584123434328", inicial: 341.00, diaCuota: "Martes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "08/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Gabriel Arturo Dominguez Moreno", nroCliente: "584242504140", inicial: 341.00, diaCuota: "Martes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "08/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Andrea De La Caridad Corrales Hernandez", nroCliente: "584123690720", inicial: 453.75, diaCuota: "Martes", canon: 112.69, pagoConcesionario: 1196.25 },
  { fecha: "11/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Angel Eduardo Hilarraza Marquez", nroCliente: "584129107146", inicial: 341.00, diaCuota: "Viernes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "11/09/2026", concesionario: "Velocity Motos. C.A", plan: "6 Meses - Semanal", cliente: "Marcos Sleyder Bozo Perez", nroCliente: "584243571388", inicial: 506.00, diaCuota: "Viernes", canon: 125.66, pagoConcesionario: 1334.00 },
  { fecha: "14/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses - Semanal", cliente: "Alexair Armando Marin Nuñez", nroCliente: "584142038890", inicial: 341.00, diaCuota: "Lunes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "15/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses - Semanal", cliente: "Jesús Alejandro Rivas Toledo", nroCliente: "584242659200", inicial: 341.00, diaCuota: "Martes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "15/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses - Semanal", cliente: "Luis Armando Hernandez Nuñez", nroCliente: "584142199621", inicial: 341.00, diaCuota: "Martes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "15/09/2026", concesionario: "AKOX, C.A", plan: "6 Meses - Semanal", cliente: "Jesus Antonio Mendoza Bustos", nroCliente: "584244637111", inicial: 370.98, diaCuota: "Martes", canon: 92.13, pagoConcesionario: 978.02 },
  { fecha: "16/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses - Semanal", cliente: "Renzo Rene Justo Lucena", nroCliente: "584128201063", inicial: 764.50, diaCuota: "Miércoles", canon: 189.86, pagoConcesionario: 2015.50 },
  { fecha: "16/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Derek Alexander Salcedo Da Silva", nroCliente: "584120204108", inicial: 341.00, diaCuota: "Miércoles", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "16/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Jose Alejandro Lanza Rangel", nroCliente: "584129007520", inicial: 341.00, diaCuota: "Miércoles", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "16/09/2026", concesionario: "NECATIX C.A", plan: "6 Meses - Semanal", cliente: "John Carvajal", nroCliente: "584242698653", inicial: 528.00, diaCuota: "Miércoles", canon: 131.13, pagoConcesionario: 1392.00 },
  { fecha: "17/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses - Semanal", cliente: "Anderson Samuel Vital Echarry", nroCliente: "584242115349", inicial: 764.50, diaCuota: "Jueves", canon: 189.86, pagoConcesionario: 2015.50 },
  { fecha: "17/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses - Semanal", cliente: "Freddy Alberto Adrian Martinez", nroCliente: "584127241244", inicial: 341.00, diaCuota: "Jueves", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "17/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses - Semanal", cliente: "Junior Jose Mijares Rebolledo", nroCliente: "584129835922", inicial: 327.25, diaCuota: "Jueves", canon: 81.27, pagoConcesionario: 862.75 },
  { fecha: "18/09/2026", concesionario: "NECATIX C.A", plan: "6 Meses - Semanal", cliente: "Rene Gil Davila Ceballos", nroCliente: "584125587761", inicial: 393.25, diaCuota: "Viernes", canon: 97.66, pagoConcesionario: 1036.75 },
  { fecha: "18/09/2026", concesionario: "NECATIX C.A", plan: "6 Meses Semanal", cliente: "Johanstne Enrique Contreras Suarez", nroCliente: "584242363518", inicial: 727.38, diaCuota: "Viernes", canon: 180.64, pagoConcesionario: 1917.62 },
  { fecha: "18/09/2026", concesionario: "AKOX, C.A", plan: "6 Meses Semanal", cliente: "Pedro Armando Zambrano Mejias", nroCliente: "584223340751", inicial: 357.23, diaCuota: "Viernes", canon: 88.72, pagoConcesionario: 937.77 },
  { fecha: "18/09/2026", concesionario: "NECATIX C.A", plan: "6 Meses Semanal", cliente: "Jesus Antonio Rodriguez Tovar", nroCliente: "584120416018", inicial: 341.00, diaCuota: "Viernes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "18/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses Semanal", cliente: "Maikel Enrique Hernandez", nroCliente: "584149204417", inicial: 327.25, diaCuota: "Viernes", canon: 81.27, pagoConcesionario: 862.75 },
  { fecha: "18/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses Semanal", cliente: "Arnaldo Rafael Lazo Azocar", nroCliente: "584122553002", inicial: 341.00, diaCuota: "Viernes", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "19/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses Semanal", cliente: "Joselin Valeria Ordoñez Bastidas", nroCliente: "584247681578", inicial: 341.00, diaCuota: "Sábado", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "19/09/2026", concesionario: "Motores Del Este VIP C.A.", plan: "6 Meses Semanal", cliente: "Juan Jose Pereira Viloria", nroCliente: "584121413638", inicial: 341.00, diaCuota: "Sábado", canon: 84.69, pagoConcesionario: 899.00 },
  { fecha: "21/09/2026", concesionario: "INVERSIONES CHT30, C.A", plan: "6 Meses Semanal", cliente: "Rosalba Angelica Lopez Cordovez", nroCliente: "584129188557", inicial: 998.25, diaCuota: "Lunes", canon: 247.91, pagoConcesionario: 2631.75 },
  { fecha: "22/09/2026", concesionario: "Turbo Motos C.A", plan: "6 Meses Semanal", cliente: "Robert Gerardo Palacios Molina", nroCliente: "584243113783", inicial: 316.25, diaCuota: "Martes", canon: 78.54, pagoConcesionario: 833.75 }
];

export default function ControlVentasFlota() {
  const [listaFlota, setListaFlota] = useState(datosInicialesFlota);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState("Corte 1: 10/08/2026 al 15/08/2026");
  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [filtroConcesionario, setFiltroConcesionario] = useState('TODOS');

  // Definición de los cortes semanales
  const cortesSemanales = [
    { label: "Corte 1: 10/08/2026 al 15/08/2026", inicio: "2026-08-10", fin: "2026-08-15" },
    { label: "Corte 2: 17/08/2026 al 22/08/2026", inicio: "2026-08-17", fin: "2026-08-22" },
    { label: "Corte 3: 24/08/2026 al 29/08/2026", inicio: "2026-08-24", fin: "2026-08-29" },
    { label: "Corte 4: 31/08/2026 al 05/09/2026", inicio: "2026-08-31", fin: "2026-09-05" },
    { label: "Corte 5: 07/09/2026 al 12/09/2026", inicio: "2026-09-07", fin: "2026-09-12" },
    { label: "Corte 6: 14/09/2026 al 19/09/2026", inicio: "2026-09-14", fin: "2026-09-19" },
    { label: "Corte 7: 21/09/2026 al 26/09/2026", inicio: "2026-09-21", fin: "2026-09-26" },
  ];

  // Función auxiliar para parsear fechas
  const parsearFecha = (strFecha: string) => {
    const [d, m, y] = strFecha.split('/');
    return new Date(Number(y), Number(m) - 1, Number(d));
  };

  // Concesionarios únicos para filtros adicionales si los requiere tu interfaz
  const listaConcesionarios = useMemo(() => {
    const setC = new Set(datosInicialesFlota.map(i => i.concesionario));
    return ['TODOS', ...Array.from(setC)];
  }, []);

  // Filtrado dinámico por semana, concesionario y buscador de cliente
  const datosFiltrados = useMemo(() => {
    const corteActualObj = cortesSemanales.find(c => c.label === semanaSeleccionada) || cortesSemanales[0];
    const fechaInicio = new Date(corteActualObj.inicio);
    const fechaFin = new Date(corteActualObj.fin);

    return listaFlota.filter(item => {
      const fItem = parsearFecha(item.fecha);
      const enRangoSemana = fItem >= fechaInicio && fItem <= fechaFin;
      const coincideConcesionario = filtroConcesionario === 'TODOS' || item.concesionario === filtroConcesionario;
      const coincideCliente = item.cliente.toLowerCase().includes(busquedaCliente.toLowerCase()) || item.nroCliente.includes(busquedaCliente);

      return enRangoSemana && coincideConcesionario && coincideCliente;
    });
  }, [listaFlota, semanaSeleccionada, filtroConcesionario, busquedaCliente]);

  // Cálculo del total de pago a concesionarios en base a lo filtrado
  const totalPagoConcesionarios = useMemo(() => {
    return datosFiltrados.reduce((acc, curr) => acc + curr.pagoConcesionario, 0);
  }, [datosFiltrados]);

  return (
    <div style={{ padding: '24px', backgroundColor: '#09090b', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Cabecera y Controles Superiores */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, margin: 0, color: '#fff' }}>
          Control de Ventas y Registro Maestro de Flota 🚗💨
        </h1>

        {/* Selector de Semana de Corte */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#18181b', padding: '8px 12px', borderRadius: '8px', border: '1px solid #27272a' }}>
          <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>Semana de Corte:</span>
          <select 
            value={semanaSeleccionada}
            onChange={(e) => setSemanaSeleccionada(e.target.value)}
            style={{ background: '#27272a', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', outline: 'none' }}
          >
            {cortesSemanales.map((corte, index) => (
              <option key={index} value={corte.label}>{corte.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Barra de Filtros Adicionales (Buscador y Concesionario) */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="🔍 Buscar por nombre de cliente o nro..." 
          value={busquedaCliente}
          onChange={(e) => setBusquedaCliente(e.target.value)}
          style={{ background: '#18181b', border: '1px solid #27272a', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', flex: 1, minWidth: '260px', outline: 'none' }}
        />

        <select 
          value={filtroConcesionario}
          onChange={(e) => setFiltroConcesionario(e.target.value)}
          style={{ background: '#18181b', border: '1px solid #27272a', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', outline: 'none' }}
        >
          {listaConcesionarios.map((c, i) => (
            <option key={i} value={c}>{c === 'TODOS' ? '🏢 Todos los Concesionarios' : c}</option>
          ))}
        </select>
      </div>

      {/* Contenedor Principal de la Tabla */}
      <div style={{ background: '#121215', border: '1px solid #27272a', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#18181b' }}>
          <span style={{ fontWeight: 700, color: '#D96B27', fontSize: '15px' }}>Matriz de Ventas y Unidades Registradas</span>
          <span style={{ fontSize: '13px', color: '#a1a1aa' }}>Total Registros Mostrados: <strong style={{ color: '#fff' }}>{datosFiltrados.length}</strong></span>
        </div>

        <div style={{ overflowX: 'auto', maxHeight: '480px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#D96B27', color: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
                <th style={{ padding: '12px 16px' }}>Fecha</th>
                <th style={{ padding: '12px 16px' }}>Concesionario</th>
                <th style={{ padding: '12px 16px' }}>Plan</th>
                <th style={{ padding: '12px 16px' }}>Nombre del Cliente</th>
                <th style={{ padding: '12px 16px' }}>Nro. Cliente</th>
                <th style={{ padding: '12px 16px' }}>Inicial ($)</th>
                <th style={{ padding: '12px 16px' }}>Día Cuota</th>
                <th style={{ padding: '12px 16px' }}>Canon Semanal ($)</th>
                <th style={{ padding: '12px 16px' }}>Pago Concesionario ($)</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.length > 0 ? (
                datosFiltrados.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #27272a', background: idx % 2 === 0 ? '#121215' : '#18181b' }}>
                    <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>{item.fecha}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{item.concesionario}</td>
                    <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>{item.plan}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#fff' }}>{item.cliente}</td>
                    <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>{item.nroCliente}</td>
                    <td style={{ padding: '12px 16px' }}>${item.inicial.toFixed(2)}</td>
                    <td style={{ padding: '12px 16px', color: '#D96B27', fontWeight: 600 }}>{item.diaCuota}</td>
                    <td style={{ padding: '12px 16px' }}>${item.canon.toFixed(2)}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981' }}>${item.pagoConcesionario.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#71717a' }}>
                    No se encontraron registros que coincidan con los filtros y la semana seleccionada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sub-cuadro: Total de Pago a Realizar */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '20px 30px', minWidth: '340px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', borderLeft: '4px solid #10b981' }}>
          <span style={{ fontSize: '13px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
            Total de pago a realizar (Corte Actual):
          </span>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981' }}>
            ${totalPagoConcesionarios.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span style={{ fontSize: '11px', color: '#71717a', marginTop: '4px', display: 'block' }}>
            Suma total automática basada en los filtros activos de la semana.
          </span>
        </div>
      </div>

    </div>
  );
}
