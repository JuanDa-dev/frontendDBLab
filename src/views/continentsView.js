import { useEffect, useState, useCallback } from 'react';
import { getRequest } from '../components/requests';
import { getContinents, getDataContinent } from '../components/data';
import { continentVariables, dataVariables } from '../components/utils';
import Graphic from '../graphics/graphic'
import Template from './template'
import Dropdown from '../components/dropdown'

//comando: npm install rollup@3.0.0-8

//EStructura de los datos
const graphicType = {
    BarChart: [],
    DoughnutChart: [],
    LineChart: [],
    PolarAreaChart: [],
    RadarChart: []
}

const graphicDataType = {
    LineChart: []
}

export default function ContinentsView() {
    //Valores de los datos de los continentes
    const [continents, setContinents] = useState([])
    const [dataGC, setDataGC] = useState(Object.assign({}, graphicType))
    const [labelsGC, setLabelsGC] = useState(Object.assign({}, graphicType))
    const options = ["Data from all contients", "Data from a continent"]
    const [showContinents, setShowContinents] = useState(options[1])
    
    //Valores de los datos del continente seleccionado
    const [continentSelected, setContinentSelected] = useState({})
    const [dataContinentSelected, setDataContinentSelected] = useState([])
    const [dataGDC, setDataGDC] = useState(Object.assign({}, graphicDataType))
    const [labelsGDC, setLabelsGDC] = useState(Object.assign({}, graphicDataType))

    //Obtengo los datos
    const getData = ({ data, newData, graphic, elements }) => {
        const dict = {}
      
        Object.keys(elements).forEach(key => {
            dict[key] = (newData !== undefined) ? ((key === graphic) ? newData : data) : data
        })

        return dict
    }

    //Actualizo los datos de las graficas
    const updateGraphicsGC = (data, labels) => {
        for (const key in data) {
            dataGC[key] = data[key]
            labelsGC[key] = labels
        }
        setDataGC(dataGC)
        setLabelsGC(labelsGC)
    }

    //Actualizo los datos de las graficas
    const updateGraphicsGDC = (data, labels) => {
        for (const key in data) {
            dataGDC[key] = data[key]
            labelsGDC[key] = labels
        }
        setDataGDC(dataGDC)
        setLabelsGDC(labelsGDC)
    }

    //Inicializacion de las graficas y valores
    const initValues = async () => {
        if(continents.length === 0) {
            //datos
            const tempContinents = (await getRequest('continents')).map(dato => dato)
            const continent = tempContinents[0]
            const dataContinent = await getRequest(`dataContinent/${continent.name}`)
            const tempDataContinents = await getDataContinent(dataContinent, dataVariables[0])
            setContinents(tempContinents)
            setContinentSelected(continent)
            setDataContinentSelected(dataContinent)
    
            //Establecer datos
            const { data, labels } = getContinents(tempContinents, continentVariables[0])

            //Graficas
            updateGraphicsGC(getData({ data, elements: graphicType }), labels)
            updateGraphicsGDC(getData({ data: tempDataContinents.data, elements: graphicDataType }),
                              tempDataContinents.labels)

            return "Datos cargados"
        }
    }

    //Variable a mostrar
    const changeVariable = async ({ graphic, type, MIN_DATE, MAX_DATE }, variable) => {
        if (type === 0) {
            const { data, labels } = getContinents(continents, variable)
            updateGraphicsGC(getData({ data: dataGC[graphic], newData: data, graphic, elements: graphicType }), 
                             labels)
            return { data, labels, type }
        } else {
            const dataContinent = await getRequest(`dataContinentByDate/${continentSelected.name}/${MIN_DATE}/${MAX_DATE}`);
            const { data, labels } = await getDataContinent(dataContinent, variable)
            updateGraphicsGDC(getData({ data: dataGDC[graphic], newData: data, graphic, elements: graphicDataType }), 
                              labels)
            return { data, labels, type }
        }
    }

    //Continente a mostrar
    const changeContinent = async (dataD,  variable) => {
        const newContinent = continents.find(continent => {
            if(variable === "Unknown") {
                return continent.name === null || continent.name === undefined
            }
            return continent.name === variable
        })
        const dataContinent = await getRequest(`dataContinent/${newContinent.name}`)
        const { data, labels } = await getDataContinent(dataContinent, variable)
        setContinentSelected(newContinent)
        setDataContinentSelected(dataContinent)
        updateGraphicsGDC(getData({ data, elements: graphicDataType }), labels)

        return "continent change"
    }

    useEffect(() => {
        initValues().then(res => {
            console.log(res)
            document.getElementById('dataSelected').click()
        })
    }, [])

    return (
        <>
            <Template title={"COVID-19 GRAPHICS"} options={options} setData={setShowContinents} />
            <div className="graphics-container">
                {showContinents === options[0] ? (
                    Object.keys(dataGC).map((graphic, index) => {
                        return (
                            <Graphic id={graphic} key={index} datasets={dataGC[graphic]} 
                              labels={labelsGC[graphic]} variables={continentVariables} 
                              type={graphic} change={changeVariable} dataDropdown={{ graphic, type: 0 }} />
                        )
                    })
                ) : (
                    <>
                        <Dropdown id={`changeContinent`} variables={continents.map(d => d.name ? d.name : "Unknown")} 
                          change={changeContinent} />
                        {Object.keys(dataGDC).map((graphic, index) => {
                            return (
                                <Graphic id={`data${graphic}`} key={index} datasets={dataGDC[graphic]} 
                                  labels={labelsGDC[graphic]} variables={dataVariables} 
                                  type={graphic} change={changeVariable} option={continentSelected} 
                                  dataDropdown={{ graphic, type: 1 }} />
                            )
                        })}
                    </>
                )}
            </div>
        </>
    );
}