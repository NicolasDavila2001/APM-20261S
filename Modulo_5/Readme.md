# Simulación en Plant Simulation

## Descripción
Modelo de una planta de bebidas con tres etapas:
1. Tratamiento de aguas
<img width="1086" height="644" alt="PlantaTratamientoAguaPotable" src="https://github.com/user-attachments/assets/b61d8745-53c5-4071-ab9e-1c1c98919e00" />


2. Preparación de jarabes
<img width="1190" height="509" alt="Jarabe" src="https://github.com/user-attachments/assets/d3589503-f110-46de-915c-f382eea356b3" />

3. Líneas de envasado
<img width="801" height="541" alt="Line350" src="https://github.com/user-attachments/assets/c994582f-3a67-4b87-a843-b2938016b095" />

### Estadísticas
<img width="520" height="470" alt="Chart" src="https://github.com/user-attachments/assets/3da69887-73b1-4378-b068-c51f074b2a15" />


## Software
Siemens Tecnomatix Plant Simulation

## Contenido
- modelo principal
- imágenes del layout

## Supuestos
- 3 productos
- fallas por MTTR

Simulación y optimización de un **Gemelo Digital** de una línea de envasado de botellas de vidrio de 330 mL utilizando **Siemens Tecnomatix Plant Simulation**. El objetivo principal es modelar el comportamiento dinámico de la planta y validar un **OEE global competitivo y superior** al estimado en la visita tecnica mediante la simulación de eventos discretos.

<img src="tu_primera_imagen_3d.png" width="450" alt="Vista General de la Línea 3D - Ángulo 1">
<img src="tu_segunda_imagen_3d.png" width="450" alt="Vista General de la Línea 3D - Ángulo 2">

**Características del Modelo:**
* **Visualización 3D Realista:** Integración y escalado de archivos CAD importados de GrabCAD para representar las botellas reales sin afectar el rendimiento de la simulación.
* **Control de Cuello de Botella:** La Llenadora (`Fill_600`) actúa como la máquina restrictiva de la línea, regulando el flujo de producción.
* **Gestión de Mermas (Calidad):** Estación de inspección automatizada para el descarte y conteo del producto defectuoso.
* **Empaque y Paletizado:** Simulación del proceso de paletizado final para transporte al almacén.

**Parámetros de Diseño y OEE:**
El modelo se configuró bajo la métrica industrial estándar:

$$\text{OEE} = \text{Disponibilidad} \times \text{Rendimiento} \times \text{Calidad}$$

| Indicador | Valor Configurado | Método de Simulación |
| :--- | :--- | :--- |
| **Disponibilidad** | **85.9%** | Configuración de fallas (MTTR de 1 min) en la Llenadora. |
| **Rendimiento** | **100.0%** | Tasa de entrada (`Source Interval = 0`) para eliminar esperas. |
| **Calidad** | **98.5%** | Descarte automático del 1.5% de botellas en Inspección. |
| **OEE Global** | **84.6%** | Resultado del sistema integrado. |

<img src="tu_imagen_del_chart_y_displays.png" width="500" alt="Gráfico de Torta OEE y Resultados">

**Monitoreo en Tiempo Real (Dashboards):**
El modelo cuenta con una interfaz interactiva integrada en el entorno 3D. Incluye gráficos de recursos (Pie Charts) para monitorear los estados de la Llenadora (Trabajando vs. Fallo) y Displays digitales que funcionan como contadores en tiempo real de botellas aprobadas (antes del paletizado) y botellas rechazadas.

**Requisitos para Correr la Simulación:**
Requiere Siemens Tecnomatix Plant Simulation (versión de estudiante o comercial). Para ejecutarlo, abrir el archivo `.spp`, resetear la simulación y presionar **Play**. Se recomienda aumentar la velocidad de simulación para observar la estabilización de los indicadores al final del turno virtual.

## Gemelo digital robotizado: integración NX MCD ↔ RSLinx ↔ Studio 5000

Además de la simulación de flujo en Plant Simulation, la llenadora rotativa de 20 boquillas
(programa ladder detallado en el [Módulo 6](../Modulo_6/Readme.md)) se validó como gemelo
digital físico en **NX Mechatronics Concept Designer (MCD)**, comunicado con el controlador
virtual **Studio 5000 (Emulate 5570)** a través de un servidor OPC DA en **RSLinx**.

**Arquitectura de comunicación:**

`Studio 5000 (Emulate 5570)` → `RSLinx OPC Server (OPC DA)` → `Signal Mapping (NX MCD)` → `Physics Navigator (modelo físico)`

**Resumen del Signal Mapping en MCD:**

| Elemento | Cantidad |
|---|---|
| Señales MCD (lado simulación física) | 31 |
| Señales externas (lado RSLinx / PLC) | 26 |
| Señales mapeadas activas | 28 |

**Tabla de señales (extracto representativo):**

| Señal MCD | Dirección | Tag externo (RSLinx / Studio 5000) | Función |
|---|---|---|---|
| MCD_TS1_Speed | PLC → MCD | O_Conv_Speed | Velocidad transportador de entrada (TS1) |
| MCD_TS2_Speed | PLC → MCD | O_Conv_Speed | Velocidad transportador intermedio (TS2) |
| MCD_TS3_Speed | PLC → MCD | O_Conv_Speed | Velocidad transportador de salida (TS3) |
| MCD_Swiv_Speed | PLC → MCD | O_Swiv_Speed | Velocidad de giro del carrusel de llenado |
| MCD_Rej_Pos | PLC → MCD | O_Rej_Pos | Posición del actuador de la estación de rechazo |
| Signal_1 | MCD → PLC | I_Inf_Cnt... | Conteo de botellas en el infeed |
| Signal_2 | MCD → PLC | I_Rej_Sens | Sensor de la estación de rechazo |
| Signal_3 | MCD → PLC | I_Swv_Fill... | Sensor de llenado en boquilla del carrusel |

> Las señales con dirección **PLC → MCD** son setpoints que Studio 5000 escribe y que MCD
> aplica sobre los actuadores del modelo físico (velocidades, posiciones). Las señales
> **MCD → PLC** son sensores virtuales generados por la física simulada (colisiones, presencia
> de botella) que se envían al programa ladder como entradas.

**Correspondencia con los objetos del Physics Navigator:**

| Grupo de objetos | Elementos | Señal asociada |
|---|---|---|
| Transportadores | TS(1), TS(2), TS(3) | MCD_TS1/2/3_Speed ← O_Conv_Speed |
| Carrusel de llenado | Swivel_HJ(1)_SC(1) (junta de revolución, control de velocidad) | MCD_Swiv_Speed ← O_Swiv_Speed |
| Boquillas de llenado | Nozzle1…Nozzle20_Swivel_SJ(1)_PC(1) (20 juntas prismáticas, control de posición) | una por cada una de las 20 boquillas de la llenadora |
| Estación de rechazo | Rejector_SJ(1)_PC(1) (junta prismática, control de posición) | MCD_Rej_Pos ← O_Rej_Pos |
| Sensores de colisión | CollisionSensor(1), (2), (3) | Signal_1/2/3 → PLC (conteo, rechazo, llenado) |

**Capturas de referencia:**

![Signal Mapping en NX MCD](Images/SignalMapping.png)
![Physics Navigator – Sensores y actuadores](Images/PhysicsNavigator_Sensores.png)
![Physics Navigator – Transportadores](Images/PhysicsNavigator_TS.png)

> Esta sección documenta el mapeo de señales tal como quedó configurado en la simulación NX MCD
> del equipo; no es un tutorial de configuración paso a paso, sino el resultado final validado
> de la comunicación entre el modelo físico del gemelo digital y las tags del programa ladder
> de Studio 5000 descrito en el Módulo 6.
