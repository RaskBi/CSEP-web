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

export const CostChart = ({ costLabel,costData }) => {
  
  const data = {
    
      labels : costLabel,
      datasets: costData
  };

  const options = {
    response: true,
    plugins: {
      
      title: {
        display: true,
        text: "Costos de paquetes",
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
