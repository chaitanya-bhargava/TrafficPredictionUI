import Junction1 from './output/junction1.csv';
import Papa from 'papaparse';
import './App.css'
import {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import DatePicker from './components/DatePicker.js'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)
 
function App() {
  const [chartData, setChartData] = useState({
    datasets: []
  });
  const [chartOptions, setChartOptions] = useState({})
  const [selectedDate, setSelectedDate] = useState('2016-01-01');


  useEffect(() => {
    Papa.parse(Junction1, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: ((result) => {
        const newData = result.data.filter((item)=>{
          return (item['Date'].substr(0,10))===selectedDate
        })
        console.log(newData);
        setChartData({
          labels: newData.map((item)=>{
            return item['Date'].substr(11,2);
          }),
          datasets: [
            {
              label: "Vehicles",
              data: newData.map((item)=>{
                return item['Vehicles'];
              }),
              borderColor: "black",
              backgroundColor: "orange"
            }
          ]
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: "NO. OF VEHICLES EACH HOUR"
            }
          }
        })
      })
    })
  }, [selectedDate])
 
  return (
    <div>
      <h1>Traffic Prediction</h1>
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      {
        chartData.datasets.length > 0 ? (
          <div className='graph'>
            <Bar options={chartOptions} data={chartData}/>
            </div>
        ) : (
          <div>
            Loading...
            </div>
        )
      }
    </div>
  );
}
 
export default App;