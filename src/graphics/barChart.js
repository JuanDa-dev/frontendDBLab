import { Chart, CategoryScale, LinearScale, PointElement, BarElement, Title, Filler, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Filler, Legend)

export default function BarChart({ datasets, labels }) {
    const dataset = {
        label: "",
        data: [],
        tension: 0.3,
        borderColor: "",
        borderWidth: 1,
        pointBackgroundColor: "",
        backgroundColor: ""
    }

    const data = {
        labels: labels.map(label => label),
        datasets: datasets.map(dato => {
            dataset['label'] = dato['label']
            dataset['data'] = dato['data']
            const color = dato['color']
            dataset['borderColor'] = `rgb(${color})`
            dataset['pointBackgroundColor'] = `rgb(${color})`
            dataset['backgroundColor'] = `rgba(${color}, 0.3)`

            return dataset
        })
    }

    const options = {
        fill: true,
        indexAxis: 'y',
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


    return <Bar data={data} options={options} width={500} />
}