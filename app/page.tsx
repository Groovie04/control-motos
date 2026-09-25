export default function Home() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ededed', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #262626', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>RUEDDA <span style={{ fontSize: '12px', color: '#10b981', background: '#064e3b', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px' }}>TOOLS</span></h1>
          <p style={{ fontSize: '14px', color: '#a3a3a3', margin: '4px 0 0 0' }}>Gestión de Flota • Control de Motos</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>David (CX)</span>
          <div style={{ fontSize: '12px', color: '#10b981' }}>● Sistema Activo 💚</div>
        </div>
      </div>

      {/* Tarjetas de Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Cánones a Tiempo</p>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#10b981' }}>83,2%</h3>
        </div>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Pendientes</p>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#f59e0b' }}>6,5%</h3>
        </div>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Impago</p>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#ef4444' }}>10,3%</h3>
        </div>
        <div style={{ background: '#171717', border: '1px solid #262626', padding: '16px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#a3a3a3' }}>Modelo Estrella</p>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>CG-HERO 🚗💨</h3>
        </div>
      </div>
    </div>
  );
}
