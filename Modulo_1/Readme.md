# Modulo 1 : Introducción a la automatización de manufactura

El presente módulo aborda el análisis de una arquitectura de automatización industrial estructurada bajo el estándar ISA-95, mediante la evaluación de la línea de producción a partir de la pirámide de automatización, con el propósito de determinar qué capas se encuentran cubiertas y qué elementos componen cada una de ellas. Posteriormente, se establecen las etapas del proceso de producción, construyendo un esquema conceptual que servirá como base para el planteamiento de los diagramas a desarrollar en el [Módulo 2](https://github.com/NicolasDavila2001/APM-20261S/tree/main/Modulo_2). El módulo concluye con la presentación de los datos iniciales recopilados durante la visita técnica realizada a la planta de FEMSA Coca-Cola, los cuales constituyen el punto de partida para el análisis y desarrollo de los módulos subsiguientes y la propuesta de automatizacion final.
<p align="center">
  <img src="piramideisa.png" width="45%"/>
</p>

## Etapas del Proceso de Produccion de bebidas

Se presenta un diagrama de flujo superfical sobre el proceso de embotellamiento de bebidas el cual muestra el orden de las etapas identificadas en la visita tecnica y complementada con investigacion por parte del equipo.

```mermaid
flowchart TD
    A[Inicio] --> B[Tratar Agua]
    B --> C[Limpiar Botellas Recuperadas]
    C --> D[Embotellar Producto]
    D --> E[Empacar Producto]
    E --> F[Embalar para Distribución]
    F --> G[Fin]
```

Para ver el desarrollo del VSM , Diagrama DOP,layaouts y calculo de indicadores dirigirse al [Modulo 2](https://github.com/NicolasDavila2001/APM-20261S/tree/main/Modulo_2)

## Datos Establecidos segun investigación y visita Técnica 

<div align="center">

## Datos Importantes de la Visita Técnica

### Líneas y Productos

| Linea | Producto |
| :--- | :--- |
| 1 | Coca Cola 237 mL (retornable) |
| 2 | 350 mL distintos productos (retornable) |
| 3 | 2L (retornable) |
| 5 | No retornables (distintos tamaños) |
| 6 | Latas |
| 7 | Agua saborizada (Brisa) |

---

### Velocidades de Líneas

| Línea | Velocidad |
| :--- | :--- |
| Línea 1 | 15k/h |
| Línea 2 | 60k/h |
| Línea 3 | 52k/h |

---

### Tiempo Total de Proceso

| Descripción | Tiempo |
| :--- | :--- |
| Tiempo total del proceso | 90 - 105 minutos |
| Tiempo falla promedio|  21 minutos |
| Tiempo mantenimiento promedio|  17 - 30 minutos |

### Tiempos Estimados por Etapa de Proceso (Línea 3)

| Etapa del Proceso | Tiempo Estimado (min) |
| :--- | :--- |
| **Lavado y preparación** | 25 |
| **Llenado y sellado** | 40 |
| **Etiquetado e inspección** | 15 |
| **Empaque y paletizado** | 25 |
| **Tiempo Total Aproximado** | **105** |

"Llenado y sellado" con 40 minutos representa el cuello de botella del sistema y determina la velocidad de la operación
## Referencias de Busqueda 
- 
