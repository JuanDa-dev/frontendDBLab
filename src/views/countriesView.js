import { useEffect, useState } from 'react';
import { getRequest } from '../components/requests';
import { getCountries, getDataCountry } from '../components/data';
import { countryVariables, dataVariables } from '../components/utils';
import Graphic from '../graphics/graphic'
import Template from './template'
import Dropdown from '../components/dropdown'

const graphicType = {
    BarChart: [],
    DoughnutChart: [],
    LineChart: []
}

const graphicDataType = {
    LineChart: [],
    BarChart: []
}

export default function CountriesView() {
    //Valores de los datos de los paises
    const [countries, setCountries] = useState([])
    const [dataGC, setDataGC] = useState(Object.assign({}, graphicType))
    const [labelsGC, setLabelsGC] = useState(Object.assign({}, graphicType))
    const options = ["Data from all countries", "Data from a country"]
    const [showCountries, setShowCountries] = useState(options[1])
    
    //Valores de los datos del pais seleccionado
    const [countrySelected, setCountrySelected] = useState({})
    const [dataCountrySelected, setDataCountrySelected] = useState([])
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
        for (const key in graphicType) {
            dataGC[key] = data[key]
            labelsGC[key] = labels
        }
        setDataGC(dataGC)
        setLabelsGC(labelsGC)
    }

    //Actualizo los datos de las graficas
    const updateGraphicsGDC = (data, labels) => {
        for (const key in graphicDataType) {
            dataGDC[key] = data[key]
            labelsGDC[key] = labels
        }
        setDataGDC(dataGDC)
        setLabelsGDC(labelsGDC)
    }

    //Inicializacion de las graficas y valores
    const initValues = async () => {
        if(countries.length === 0) {
            //datos
            const tempCountries = (await getRequest('countries')).map(dato => dato)
            const country = tempCountries[0]
            const dataCountry = await getRequest(`dataCountry/${country.isoCode}`)
            const tempDataCountries = getDataCountry(dataCountry, country, dataVariables[0])
            setCountries(tempCountries)
            setCountrySelected(country)
            setDataCountrySelected(dataCountry)
    
            //Establecer datos
            const { data, labels } = getCountries(tempCountries, countryVariables[0])

            //Graficas
            updateGraphicsGC(getData({ data, elements: graphicType }), labels)
            updateGraphicsGDC(getData({ data: tempDataCountries.data, elements: graphicDataType }), 
                              tempDataCountries.labels)

            return "Datos cargados"
        }
    }

    //Variable a mostrar
    const changeVariable = async ({ graphic, type, MIN_DATE, MAX_DATE }, variable) => {
        if (type === 0) {
            const { data, labels } = getCountries(countries, variable)
            updateGraphicsGC(getData({ data: dataGC, newData: data, graphic, elements: graphicType }), labels)
            return { data, labels, type }
        } else {
            const dataCountry = await getRequest(`dataCountryByDate/${countrySelected.isoCode}/${MIN_DATE}/${MAX_DATE}`); 
            const { data, labels } = getDataCountry(dataCountry, countrySelected, variable)
            updateGraphicsGDC(getData({ data: dataGDC, newData: data, graphic, elements: graphicDataType }), labels)
            return { data, labels, type }
        }
    }

    //pais a mostrar
    const changeCountry = async (dataD, variable) => {
        const newCountry = countries.find(country => {
            if(variable === "Unknown") {
                return country.name === null || country.name === undefined
            }
            return country.name === variable
        })
        const dataCountry = await getRequest(`dataCountry/${newCountry.isoCode}`)
        const { data, labels } = getDataCountry(dataCountry, newCountry, variable)
        setCountrySelected(newCountry)
        setDataCountrySelected(dataCountry)
        updateGraphicsGDC(getData({ data }), labels)

        return "country change"
    }

    useEffect(() => {
        initValues().then(res => {
            console.log(res)
            document.getElementById('dataSelected').click()
        })
    }, [])

    return (
        <>
            <Template title={"COVID-19 GRAPHICS"} options={options} setData={setShowCountries} />
            <div className="graphics-container">
                {showCountries === options[0] ? (
                    Object.keys(dataGC).map((graphic, index) => {
                        return (
                            <Graphic id={`C${graphic}`} key={index} datasets={dataGC[graphic]} 
                              labels={labelsGC[graphic]} variables={countryVariables} 
                              type={graphic} change={changeVariable} dataDropdown={{ graphic, type: 0 }} />
                        )
                    })
                ) : (
                    <>
                        <Dropdown id={`changeCountry`} variables={countries.map(d => d.location ? d.location : "Unknown")} 
                          change={changeCountry} />
                        {Object.keys(dataGDC).map((graphic, index) => {
                            return (
                                <Graphic id={`dataC${graphic}`} key={index} datasets={dataGDC[graphic]} 
                                labels={labelsGDC[graphic]} variables={dataVariables} 
                                type={graphic} change={changeVariable} option={countrySelected} 
                                dataDropdown={{ graphic, type: 1 }} />
                            )
                        })}
                    </>
                )}
            </div>
        </>
    );
}