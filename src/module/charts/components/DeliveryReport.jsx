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
      tooltip: {
        enabled: false
      },
      datalabels: {
        color: 'black',
        formatter: (value, context) =>{
          const datapoints = context.chart.data.datasets[0].data;
          function totalSum(total, datapoint) {
            return total + datapoint;
          }
          const totalvalue = datapoints.reduce(totalSum, 0);
          const percentageValue = (value / totalvalue * 100).toFixed(1);
          const display = [`${value}`,`${percentageValue}%`]
          return display;
        }
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
