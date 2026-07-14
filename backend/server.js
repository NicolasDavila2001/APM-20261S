const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const solicitudesRoutes=require("./routes/solicitudes");
const loginRoutes = require("./routes/login");
const employeeRoutes=require("./routes/employees");
const inventoryRoutes = require("./routes/inventory");
const salesRoutes = require("./routes/sales");
const linea1Routes=require("./routes/linea1");
const linea2Routes=require("./routes/linea2");
const linea3Routes=require("./routes/linea3");
const dashboardRoutes=require("./routes/dashboard");
const purchaseRoutes=require("./routes/purchase");
const oeeRoutes = require("./routes/oee");

app.use("/api/oee", oeeRoutes);
app.use("/api/purchase",purchaseRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/solicitudes",solicitudesRoutes);
app.use("/api/employees",employeeRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/linea1", linea1Routes);
app.use("/api/linea2", linea2Routes);
app.use("/api/linea3", linea3Routes);
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/fotos", express.static("public/fotos"));
app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor corriendo");
});
