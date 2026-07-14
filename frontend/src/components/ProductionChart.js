import React from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

function ProductionChart({ productos }) {

    const data = productos.map(item => ({

        producto: `${item.nombre}\n${item.tamano}`,

        cantidad: item.cantidad

    }));

    return (

        <div className="chart-container">

            <h2>Inventario de Productos Terminados</h2>

            <ResponsiveContainer width="100%" height={360}>

                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 45
                    }}
                >

                    <CartesianGrid
                        stroke="#555"
                        strokeDasharray="4 4"
                    />

                    <XAxis
                        dataKey="producto"
                        interval={0}
                        tick={{
                            fill:"#d9d9d9",
                            fontSize:12
                        }}
                    />

                    <YAxis
                        tick={{
                            fill:"#d9d9d9"
                        }}
                    />

<Tooltip
    contentStyle={{
        backgroundColor:"#2f2f2f",
        border:"1px solid #e74c3c",
        borderRadius:"8px"
    }}
    labelStyle={{
        color:"#ffffff",
        fontWeight:"bold"
    }}
    itemStyle={{
        color:"#e74c3c",
        fontWeight:"bold"
    }}
    cursor={{
        fill:"rgba(231,76,60,0.15)"
    }}
/>

                    <Bar
                        dataKey="cantidad"
                        radius={[8,8,0,0]}
                    >

                        {

                            data.map((item,index)=>(

                                <Cell
                                    key={index}
                                    fill="#e74c3c"
                                />

                            ))

                        }

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ProductionChart;