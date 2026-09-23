import React, { useState } from 'react';
import './styles.css';

const MOTOS_DATA = [
  { id: 1, name: 'BMW R 1250 GS', price: '$ 24.990.000', priceNum: 24990000, category: 'Aventura', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80', rating: 5, views: 24 },
  { id: 2, name: 'Yamaha MT-07', price: '$ 36.500.000', priceNum: 36500000, category: 'Naked', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80', rating: 5, views: 18 },
  { id: 3, name: 'Honda CBR 600RR', price: '$ 48.990.000', priceNum: 48990000, category: 'Deportiva', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80', rating: 5, views: 15 },
  { id: 4, name: 'KTM 390 Duke', price: '$ 22.500.000', priceNum: 22500000, category: 'Naked', image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80', rating: 5, views: 12 },
  { id: 5, name: 'Ducati Multistrada V2', price: '$ 72.990.000', priceNum: 72990000, category: 'Touring', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80', rating: 5, views: 9 },
  { id: 6, name: 'Kawasaki Ninja 650', price: '$ 34.990.000', priceNum: 34990000, category: 'Deportiva', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80', rating: 5, views: 8 },
  { id: 7, name: 'Royal Enfield Scram 411', price: '$ 16.490.000', priceNum: 16490000, category: 'Clásica', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80', rating: 5, views: 6 },
  { id: 8, name: 'Triumph Street Twin', price: '$ 32.900.000', priceNum: 32900000, category: 'Clásica', image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80', rating: 5, views: 5 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [favorites, setFavorites] = useState([1, 2, 3]);
  const [comparing, setComparing] = useState([1, 2]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [user, setUser] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleComparing = (id) => {
    setComparing(prev => {
      if (prev.includes(id)) return prev.filter(item => item !== id);
      if (prev.length >= 3) {
        alert('Solo puedes comparar hasta 3 motos al tiempo.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const filteredMotos = MOTOS_DATA.filter(moto => {
    const matchesSearch = moto.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || moto.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <h2>Comotos</h2>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-btn ${activeTab === 'inicio' ? 'active' : ''}`}
            onClick={() => setActiveTab('inicio')}
          >
            <i className="icon">🏠</i> Inicio
          </button>
          <button 
            className={`nav-btn ${activeTab === 'motos' ? 'active' : ''}`}
            onClick={() => setActiveTab('motos')}
          >
            <i className="icon">🏍️</i> Motos
          </button>
          <button 
            className={`nav-btn ${activeTab === 'comparar' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparar')}
          >
            <i className="icon">⚖️</i> Comparar <span className="badge">{comparing.length}</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'favoritos' ? 'active' : ''}`}
            onClick={() => setActiveTab('favoritos')}
          >
            <i className="icon">🤍</i> Favoritos <span className="badge">{favorites.length}</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'estadisticas' ? 'active' : ''}`}
            onClick={() => setActiveTab('estadisticas')}
          >
            <i className="icon">📊</i> Estadísticas
          </button>
        </nav>

        <div className="sidebar-banner">
          <p>Encuentra tu próxima aventura.</p>
          <button onClick={() => setActiveTab('motos')} className="btn-gold-sm">Ver más</button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {/* HEADER TOPBAR */}
        <header className="topbar">
          <div className="search-bar">
            <i className="search-icon">🔍</i>
            <input 
              type="text" 
              placeholder="Buscar motocicletas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="top-actions">
            <button className="icon-btn" title="Favoritos" onClick={() => setActiveTab('favoritos')}>⭐</button>
            <button className="icon-btn" title="Notificaciones">🔔</button>
            {user ? (
              <div className="user-profile">
                <span>👤 {user.name}</span>
                <button className="btn-link" onClick={() => setUser(null)}>Salir</button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="btn-outline-sm" onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}>Ingresar</button>
                <button className="btn-gold-sm" onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}>Registro</button>
              </div>
            )}
          </div>
        </header>

        {/* TAB 1: INICIO */}
        {activeTab === 'inicio' && (
          <section className="tab-view">
            <div className="welcome-banner">
              <h1>¡Bienvenido, {user ? user.name : 'Juan'}! 👋</h1>
              <p>Encuentra y compara las mejores motocicletas.</p>
            </div>

            <div className="stats-cards-row">
              <div className="stat-card">
                <h3>12</h3>
                <p>Motos disponibles</p>
              </div>
              <div className="stat-card">
                <h3>{comparing.length}</h3>
                <p>En comparación</p>
              </div>
              <div className="stat-card">
                <h3>{favorites.length}</h3>
                <p>Favoritas</p>
              </div>
            </div>

            <div className="section-header">
              <h2>Motos destacadas</h2>
              <button className="btn-link" onClick={() => setActiveTab('motos')}>Ver todas</button>
            </div>

            <div className="motos-grid">
              {MOTOS_DATA.slice(0, 4).map((moto) => (
                <MotoCard 
                  key={moto.id} 
                  moto={moto} 
                  isFav={favorites.includes(moto.id)}
                  isComp={comparing.includes(moto.id)}
                  onToggleFav={() => toggleFavorite(moto.id)}
                  onToggleComp={() => toggleComparing(moto.id)}
                />
              ))}
            </div>

            <div className="section-header" style={{ marginTop: '2rem' }}>
              <h2>Categorías</h2>
            </div>
            <div className="categories-row">
              {['Todas', 'Aventura', 'Naked', 'Deportiva', 'Touring', 'Scooter', 'Clásica'].map(cat => (
                <button 
                  key={cat} 
                  className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory(cat); setActiveTab('motos'); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: MOTOS */}
        {activeTab === 'motos' && (
          <section className="tab-view">
            <h2>Motos</h2>
            <p className="subtitle">Explora todas las motocicletas disponibles.</p>

            <div className="filters-bar">
              <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                <option value="Todas">Todas las categorías</option>
                <option value="Aventura">Aventura</option>
                <option value="Naked">Naked</option>
                <option value="Deportiva">Deportiva</option>
                <option value="Touring">Touring</option>
                <option value="Clásica">Clásica</option>
              </select>
            </div>

            <div className="motos-grid">
              {filteredMotos.map((moto) => (
                <MotoCard 
                  key={moto.id} 
                  moto={moto} 
                  isFav={favorites.includes(moto.id)}
                  isComp={comparing.includes(moto.id)}
                  onToggleFav={() => toggleFavorite(moto.id)}
                  onToggleComp={() => toggleComparing(moto.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: COMPARAR */}
        {activeTab === 'comparar' && (
          <section className="tab-view">
            <h2>Comparador de Motos</h2>
            <p className="subtitle">Analiza y compara especificaciones lado a lado.</p>

            {comparing.length === 0 ? (
              <div className="empty-state">
                <p>No has seleccionado motos para comparar.</p>
                <button className="btn-gold" onClick={() => setActiveTab('motos')}>Ir al catálogo</button>
              </div>
            ) : (
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Especificación</th>
                      {comparing.map(id => {
                        const m = MOTOS_DATA.find(item => item.id === id);
                        return (
                          <th key={id}>
                            <img src={m.image} alt={m.name} className="table-img" />
                            <div>{m.name}</div>
                            <button className="btn-remove" onClick={() => toggleComparing(m.id)}>Quitar</button>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Precio</td>
                      {comparing.map(id => <td key={id}>{MOTOS_DATA.find(i => i.id === id).price}</td>)}
                    </tr>
                    <tr>
                      <td>Categoría</td>
                      {comparing.map(id => <td key={id}>{MOTOS_DATA.find(i => i.id === id).category}</td>)}
                    </tr>
                    <tr>
                      <td>Calificación</td>
                      {comparing.map(id => <td key={id}>⭐⭐⭐⭐⭐ (5/5)</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* TAB 4: FAVORITOS */}
        {activeTab === 'favoritos' && (
          <section className="tab-view">
            <h2>Favoritos</h2>
            <p className="subtitle">Aquí están las motocicletas que más te gustan.</p>

            {favorites.length === 0 ? (
              <div className="empty-state">
                <p>Aún no tienes motocicletas guardadas en favoritos.</p>
                <button className="btn-gold" onClick={() => setActiveTab('motos')}>Explorar Motos</button>
              </div>
            ) : (
              <div className="motos-grid">
                {MOTOS_DATA.filter(m => favorites.includes(m.id)).map((moto) => (
                  <MotoCard 
                    key={moto.id} 
                    moto={moto} 
                    isFav={true}
                    isComp={comparing.includes(moto.id)}
                    onToggleFav={() => toggleFavorite(moto.id)}
                    onToggleComp={() => toggleComparing(moto.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 5: ESTADÍSTICAS */}
        {activeTab === 'estadisticas' && (
          <section className="tab-view">
            <h2>Estadísticas</h2>
            <p className="subtitle">Resumen de tu actividad en Comotos.</p>

            <div className="stats-cards-row">
              <div className="stat-card">
                <h3>12</h3>
                <p>Motos vistas</p>
              </div>
              <div className="stat-card">
                <h3>{favorites.length}</h3>
                <p>Favoritas</p>
              </div>
              <div className="stat-card">
                <h3>{comparing.length}</h3>
                <p>Comparaciones</p>
              </div>
              <div className="stat-card">
                <h3>24</h3>
                <p>Búsquedas</p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stats-panel">
                <h3>Actividad reciente</h3>
                <ul className="activity-list">
                  <li>👁️ Viste BMW R 1250 GS - <i>Hace 2 horas</i></li>
                  <li>❤️ Agregaste Yamaha MT-07 a favoritos - <i>Hace 1 día</i></li>
                  <li>⚖️ Comparaste 3 motocicletas - <i>Hace 2 días</i></li>
                </ul>
              </div>

              <div className="stats-panel">
                <h3>Motos más vistas</h3>
                <ol className="top-motos-list">
                  {MOTOS_DATA.slice().sort((a,b) => b.views - a.views).slice(0,3).map(m => (
                    <li key={m.id}>
                      <span>{m.name}</span>
                      <span className="views-count">{m.views} vistas</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* MODAL AUTHENTICATION */}
      {authModal.isOpen && (
        <div className="modal-overlay" onClick={() => setAuthModal({ isOpen: false, mode: 'login' })}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{authModal.mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
              <button className="btn-close" onClick={() => setAuthModal({ isOpen: false, mode: 'login' })}>✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setUser({ name: authModal.mode === 'login' ? 'Usuario Comotos' : 'Nuevo Usuario' });
              setAuthModal({ isOpen: false, mode: 'login' });
            }}>
              {authModal.mode === 'register' && (
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" placeholder="Ej. Juan Pérez" required />
                </div>
              )}
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" placeholder="correo@ejemplo.com" required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="btn-gold-full">
                {authModal.mode === 'login' ? 'Ingresar' : 'Registrarme'}
              </button>
            </form>
            <div className="modal-footer">
              {authModal.mode === 'login' ? (
                <p>¿No tienes cuenta? <button onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}>Regístrate aquí</button></p>
              ) : (
                <p>¿Ya tienes cuenta? <button onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}>Ingresa aquí</button></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MotoCard({ moto, isFav, isComp, onToggleFav, onToggleComp }) {
  return (
    <div className="moto-card">
      <div className="moto-img-container">
        <img src={moto.image} alt={moto.name} />
        <button className={`fav-btn ${isFav ? 'active' : ''}`} onClick={onToggleFav}>
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="moto-details">
        <h3>{moto.name}</h3>
        <p className="moto-price">{moto.price}</p>
        <div className="stars">⭐⭐⭐⭐⭐</div>
        <button className={`btn-compare ${isComp ? 'active' : ''}`} onClick={onToggleComp}>
          {isComp ? 'En comparación' : '+ Comparar'}
        </button>
      </div>
    </div>
  );
}
