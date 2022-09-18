import { NavLink } from "react-router-dom";
import "./ReportChart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import notify from "../../../Services/NotifyService";
import followersService from "../../../Services/FollowersService";
import JoinedFollowersModel from "../../../Models/JoinedFollowersModel";
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function ReportChart(): JSX.Element {

    const [chartData, setChartData] = useState<JoinedFollowersModel[]>([]);

    useEffect(() => {
       followersService.getAllFollowersByVacations()
          .then(allFollowers => setChartData(allFollowers))
          .catch(err => notify.error(err))
    }, []);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    precision: 0
                }
            }
        }
    };

    const labels = chartData.map(v => v.destination);
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Followers',
                data: chartData.map(v => v.amountOfFollowers),
                backgroundColor: 'rgb(4, 23, 59)',
            }
        ],
    };

    return (
        <div className="ReportChart">
            <h2 className="OurVacations">Followers Report</h2>
            <NavLink to="/vacations-admin">
                <button className="ReportButton">Back To Vacations </button>
            </NavLink>
            <div className="Chart" style={{height:"35vh", width:"80vw"}}>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}

export default ReportChart;
