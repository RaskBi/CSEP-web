import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const PackageType = ({ typeData, valorData }) => {
  
  const data = {
    labels: typeData,
    datasets: [
      {
        label: "",
        data: valorData,
        fill: true,
        backgroundColor: ["rgba(0,62,105,0.7)", "rgba(33,225,225,0.7)", "rgba(33,225,25,0.7)", "rgba(100,100,225,0.7)"],
      },
    ],
  }

  const options = {
    response: true,
    plugins: {
      legend: {
        display: false,
        position: "left",
      },
      title: {
        display: true,
        text: "Tipos de paquetes",
      },
      datalabels: {
        color: 'black',
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="chart-container">
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  )
}
