import { Pie } from "react-chartjs-2"
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js"
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJs.register(Tooltip, Title, ArcElement, Legend)

export const DeliveryReport = ({ labelsChart, dataChart }) => {

  const data = {
    labels: labelsChart,
    datasets: [
      {
        label: ' #',
        data: dataChart,
        backgroundColor: ["rgba(0,62,105,0.7)", "rgba(33,225,225,0.7)"],
      },
    ],
  }

  const options = {
    response: true,
    plugins: {
      legend: {
        display: true,
        position: "left",
      },
      title: {
        display: true,
        text: "Paquetes",
      },
      datalabels: {
        color: 'black',
      }
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="chart-container">
      <Pie data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  )
}
