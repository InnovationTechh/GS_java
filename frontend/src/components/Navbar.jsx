import { Link, useLocation } from "react-router-dom";

export default function Navbar(){
  const { pathname } = useLocation();
  const is = (p) => pathname === p ? "active" : "";
  return (
    <header className="navbar">
      <div className="navbar-inner spread">
        <div className="brand">
          <span className="brand-badge">IT</span>
          <span>innovationTech • Saúde Mental</span>
        </div>
        <nav className="nav-links cluster">
          <Link className={is("/")} to="/">Home</Link>
          <Link className={is("/pacientes")} to="/pacientes">Pacientes</Link>
          <Link className={is("/registros")} to="/registros">Registros</Link>
          <Link className={is("/profissionais")} to="/profissionais">Profissionais</Link>
          <Link className={is("/consultas")} to="/consultas">Consultas</Link>
          <Link className={is("/recursos")} to="/recursos">Recursos</Link>
        </nav>
      </div>
    </header>
  );
}
