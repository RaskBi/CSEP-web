import { Pie } from 'react-chartjs-2'
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js'
import "../pages/Home.css"


ChartJs.register(
    Tooltip,
    Title,
    ArcElement,
    Legend
);



export const DeliveryReport = () => {

    const packageData = [10,5]

    const data = {
        datasets: [{
            data: packageData,
            backgroundColor: [
                '#A5C9CA',
                '#21E1E1',
            ],
        },
    ],
    labels:[
            'Entregados',
            'No entregados',
        ]
    };
    
    const options= {
        response:true,
        plugins:{
            legend: {
                display:true,
                position:'left'
            },
        },
        maintainAspectRatio:false
    }



  return (
    <div className="chart-container">
        <Pie data={data} options={options} />
    </div>

  )
}
