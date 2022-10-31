import { Chart, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, ArcElement, Title, Filler, Legend, Tooltip } from "chart.js";
import { dataGraphic, getDate } from '../components/utils'
import { Radar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import Dropdown from '../components/dropdown'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, ArcElement, Title, Filler, Legend, Tooltip)

export default function RadarChart({ datasets, labels, variables, id, change, dataDropdown }) {
    const structure = {
        label: "",
        data: [],
        tension: 0.3,
        borderColor: "",
        pointRadius: 6,
        pointBackgroundColor: "",
        backgroundColor: ""
    }
    const options = {
        fill: true,
        //indexAxis: 'y',
        responsive: true,
        scales: {
            y: {
                min: 0,
            },
        },
        plugins: {
            legend: {
                display: true,
            },
        },
    }
    const [data, setData] = useState(dataGraphic(datasets, labels, structure))
    const [MIN_DATE, setMIN_DATE] = useState(labels[0])
    const [MAX_DATE, setMAX_DATE] = useState(labels[labels.length - 1])

    const update = (data, optionSelected) => {
        change({ graphic: data.graphic, type: data.type, MIN_DATE, MAX_DATE }, 
            optionSelected).then(res => {
                setData(dataGraphic(res.data, res.labels, structure))
                if(data.type === 1) {
                    setMIN_DATE(res.labels[0])
                    setMAX_DATE(res.labels[res.labels.length - 1])
                }
            })
    }

    useEffect(() => {
        setData(dataGraphic(datasets, labels, structure))
    }, [datasets, labels])

    return (
        <>
            <div className="options">
                {dataDropdown.type === 1 && (
                    <Flatpickr options={{
                        mode: "range",
                        dateFormat: "Y-m-d",
                        defaultValue: [MIN_DATE, MAX_DATE]
                    }} value={[MIN_DATE, MAX_DATE]} 
                      onChange={(selectedDates) => {
                          if (selectedDates.length === 2) {
                              setMIN_DATE(selectedDates[0])
                              setMAX_DATE(selectedDates[1])
                          }
                      }} />
                )}
                <Dropdown id={`dropdown${id}`} variables={variables} change={update} dataDropdown={dataDropdown} />
            </div>
            <div id={id} className="graphicShower">
                <Radar data={data} options={options} />
            </div>
        </>
    )
}