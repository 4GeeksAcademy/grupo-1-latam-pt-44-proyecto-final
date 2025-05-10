import React from "react";

export const Footer = () => (
  <footer className="footer position-relative w-100 mt-auto">
    <div 
      className="py-4 position-relative"
      style={{
        backgroundColor: '#000000',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Elementos decorativos */}
      <div className="position-absolute" style={{ top: '20%', left: '5%', color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>✦</div>
      <div className="position-absolute" style={{ top: '30%', right: '10%', color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>✦</div>
      <div className="position-absolute" style={{ bottom: '20%', left: '15%', color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>✦</div>
      <div className="position-absolute" style={{ bottom: '30%', right: '5%', color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>✦</div>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="text-center">
              <h5 className="text-white mb-3">
                <span className="me-2">Dormiré</span>
                <i className="fa-solid fa-moon text-info"></i>
                <span className="ms-2">by Team 1</span>
              </h5>
              
              <div className="d-flex flex-wrap justify-content-center gap-4 mb-4">
                <div className="creator-card px-3 py-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">🇲🇽</span>
                    <span className="text-white">Pedro Issac</span>
                  </div>
                </div>
                
                <div className="creator-card px-3 py-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">🇵🇪</span>
                    <span className="text-white">Leonardo Rospigliosi</span>
                  </div>
                </div>
                
                <div className="creator-card px-3 py-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">🇲🇽</span>
                    <span className="text-white">Any Mendez</span>
                  </div>
                </div>
              </div>
              
              <div className="academy-info d-flex align-items-center justify-content-center flex-wrap mb-3">
                <span className="text-white-50 me-2">Desarrollado con</span>
                <i className="fa-solid fa-heart text-danger mx-1"></i>
                <span className="text-white-50 mx-1">en</span>
                <a 
                  href="https://4geeksacademy.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <span 
                    className="badge px-2 py-1 ms-1" 
                    style={{ 
                      background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <i className="fa-solid fa-code me-1"></i>
                    4Geeks Academy
                  </span>
                </a>
              </div>
              
              <div className="social-links mb-3">
                <a href="#" className="text-white-50 text-decoration-none mx-2 hover-effect">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="#" className="text-white-50 text-decoration-none mx-2 hover-effect">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="text-white-50 text-decoration-none mx-2 hover-effect">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
              
              <p className="text-white-50 mb-0">
                <small>&copy; {new Date().getFullYear()} Dormiré. Todos los derechos reservados.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos CSS para efectos hover */}
      <style jsx>{`
        .hover-effect {
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .hover-effect:hover {
          color: #60A5FA !important;
          transform: translateY(-2px);
        }
        .creator-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .creator-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  </footer>
);