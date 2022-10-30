//Graficas
import BarChart from '../graphics/barChart';
import DoughnutChart from '../graphics/doughnutChart';
import LineChart from '../graphics/lineChart';
import PolarAreaChart from '../graphics/polarAreaChart';
import RadarChart from '../graphics/radarChart';
import '../css/graphic.css'
import { useState } from 'react'

export default function Graphic({ id, datasets, labels, variables, option, type, change, dataDropdown }) {
    const graphics = {
        BarChart        : <BarChart id={id} variables={variables} option={option} dataDropdown={dataDropdown} 
                            change={change} datasets={datasets} labels={labels} />,
        DoughnutChart   : <DoughnutChart id={id} variables={variables} option={option} dataDropdown={dataDropdown} 
                            change={change} datasets={datasets} labels={labels} />,
        LineChart       : <LineChart id={id} variables={variables} option={option} dataDropdown={dataDropdown} 
                            change={change} datasets={datasets} labels={labels} />,
        PolarAreaChart  : <PolarAreaChart id={id} variables={variables} option={option} dataDropdown={dataDropdown} 
                            change={change} datasets={datasets} labels={labels} />,
        RadarChart      : <RadarChart id={id} variables={variables} option={option} dataDropdown={dataDropdown} 
                            change={change} datasets={datasets} labels={labels} />
    }
  
    return <div className="Graphic">{graphics[type]}</div>
}