import React from "react";
import ModuleCard from "../components/ModuleCard";
import Navbar from "../components/Navbar";
function ERPDashboard(){

return(
<div>
    
    <Navbar
        modulo="ERP"
        titulo="Enterprise Resource Planning"
        usuario="Administrador"
    />

<main className="page">

<div className="module-grid">

<ModuleCard
titulo="💰 Finanzas"
descripcion="Gestión financiera"
disabled={true}
/>

<ModuleCard
titulo="👥 RRHH"
descripcion="Empleados"
ruta="/hr"
/>

<ModuleCard
titulo="📦 Inventario"
descripcion="Productos"
ruta="/inventory"
/>

<ModuleCard
titulo="🤝 Ventas"
descripcion="Clientes y ventas"
ruta="/sales"
/>

<ModuleCard
titulo="🛒 Aprovisionamiento"
descripcion="Compras"
ruta="/compras"
/>

<ModuleCard
titulo="🏭 Producción"
descripcion="Manufactura"
disabled={true}
/>
</div>
</main>

</div>

)

}

export default ERPDashboard;