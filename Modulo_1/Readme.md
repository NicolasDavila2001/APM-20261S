# Modulo 1 : Introducción a la automatización de manufactura

El presente módulo aborda el análisis de una arquitectura de automatización industrial estructurada bajo el estándar ISA-95, mediante la evaluación de la línea de producción a partir de la pirámide de automatización, con el propósito de determinar qué capas se encuentran cubiertas y qué elementos componen cada una de ellas. Posteriormente, se establecen las etapas del proceso de producción, construyendo un esquema conceptual que servirá como base para el planteamiento de los diagramas a desarrollar en el [Módulo 2](https://github.com/NicolasDavila2001/APM-20261S/tree/main/Modulo_2). El módulo concluye con la presentación de los datos iniciales recopilados durante la visita técnica realizada a la planta de FEMSA Coca-Cola, los cuales constituyen el punto de partida para el análisis y desarrollo de los módulos subsiguientes y la propuesta de automatizacion final.

### Indicadores y Parámetros de Producción (Línea 3 - Envase retornable 2L)

| Indicador | Definición / Fórmula | Valor Calculado |
| :--- | :--- | :--- |
| **Takt Time** | Tiempo requerido para producir una unidad y satisfacer la demanda. | **0.069 s/botella** |
| **Tiempo de ciclo (Tc)** | Tiempo de operación por unidad producida. | **0.069 s** |
| **Tiempo de alistamiento (Tsu)**| Tiempo requerido para preparar la línea (cambio de referencia, limpieza). | **20 min** |
| **Tasa de producción (Rp)** | Número de unidades producidas por hora. | **52.000 botellas/h** |
| **Capacidad (PC)** | Capacidad total (turnos × horas × estaciones × tasa de producción). | **11.648.000 botellas/sem** |
| **Lead Time (MLT)** | Tiempo total desde el inicio hasta la finalización de la fabricación. | **98 min** |
| **OEE** | Efectividad Total de los Equipos (Disponibilidad × Eficiencia × Calidad). | **84.6 %** |

se estima un valor de 0.95 para una línea de producción automatizada y se toma un valor de 0.99 como valor típico de embotellado. Seria lo ideal y se deconocen estos valores reales. 

### Tiempos Estimados por Etapa de Proceso (Línea 3)

| Etapa del Proceso | Tiempo Estimado (min) |
| :--- | :--- |
| **Lavado y preparación** | 25 |
| **Llenado y sellado** | 40 |
| **Etiquetado e inspección** | 15 |
| **Empaque y paletizado** | 25 |
| **Tiempo Total Aproximado** | **105** |

"Llenado y sellado" con 40 minutos representa el cuello de botella del sistema y determina la velocidad de la operación


### Distribución de Planta (Layout)

Esta sección vincula los indicadores de producción con la organización física de la maquinaria. El diseño permite visualizar cómo el espacio disponible en la planta de FEMSA condiciona los tiempos y el flujo de los materiales.

#### 1. Línea 3: Envase Retornable (Vidrio)
La distribución de esta línea sigue un **flujo circular**. El proceso comienza con la recepción de envases vacíos que deben pasar por una limpieza profunda antes de ser reutilizados. 

* **Lavado y Preparación:** Es la etapa inicial de desinfección.
* **Llenado y Sellado:** Es el núcleo de la planta y el punto que determina la velocidad de toda la línea (cuello de botella).
* **Inspección:** Se realiza de forma electrónica tras el lavado y el llenado para garantizar la inocuidad.

#### 2. Planta de Tratamiento de Agua Potable (PTAP)
Es el sistema de soporte encargado de procesar el insumo principal. Su diseño es **lineal**, transformando el agua cruda en agua tratada mediante filtración y desinfección, enviándola directamente a la línea de envasado para la mezcla del jarabe.

![Layout Línea 3 y PTAP](./Modulo_1/Layout.png)

> **Nota:** La imagen superior integra la vista de planta de la Línea 3 y la infraestructura de la PTAP, facilitando la comprensión del flujo de materiales desde el tratamiento del recurso hídrico hasta el paletizado final.
