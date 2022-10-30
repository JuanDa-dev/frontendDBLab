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
        if (dataDropdown.type === 0) {
            change(data, optionSelected).then(res => setData(dataGraphic(res.data, res.labels, structure)))
        } else {
            const tempLabels = []
            change(data, optionSelected).then(res => {
                setData(dataGraphic(res.data.map(dato => dato['data'].filter(d => {
                    const indice = dato['data'].indexOf(d)
                    const condicion = labels[indice] >= getDate(MIN_DATE) && labels[indice] <= getDate(MAX_DATE)
                    if (condicion) {
                        tempLabels.push(labels[indice])
                    }
                    return condicion
                })), tempLabels, structure))
                setMIN_DATE(res.labels[0])
                setMAX_DATE(res.labels[labels.length - 1])
            })
        }
    }

    useEffect(() => {
        const element = document.getElementById('changeContinent')
        if(element) {
            element.addEventListener('click', () => {
                const select = document.querySelector('#carschangeContinent')
                update({}, select.value)
            })
        }
        const element2 = document.getElementById('changeCountry')
        if(element2) {
            element2.addEventListener('click', () => {
                const select = document.querySelector('#carschangeCountry')
                update({}, select.value)
            })
        }
    }, [])

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