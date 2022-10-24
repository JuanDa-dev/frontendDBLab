import { useEffect, useState } from 'react';
import { getContinents, continentVariables } from '../components/data';
import RadarChart from '../graphics/radarChart';
import BarChart from '../graphics/barChart';
import '../css/home.css'


export default function Home() {
    const [datos, setDatos] = useState([])
    const [labels, setLabels] = useState([])

    const initValues = async () => {
        const { datos, labels } = await getContinents(continentVariables[1])
        setDatos(datos)
        setLabels(labels)
    }

    useEffect(() => {
        initValues()
    }, [])

    return (
        <>
            {datos.length !== 0 && labels.length !== 0 && (
                <div>
                    <RadarChart datasets={datos} labels={labels} />
                    <BarChart datasets={datos} labels={labels} />
                </div>
            )}
        </>
    );
}