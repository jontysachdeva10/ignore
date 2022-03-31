import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import data from "../data.json";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaSearch } from "react-icons/fa";

Chart.register(ChartDataLabels);

const Dashboard = () => {
  let result = [];

  const countData = () => {
    let recom = []; 
    recom = data.map((x) => x.recommendation.status);
    let good = 0,
      bad = 0;
    for (let i = 0; i < recom.length; i++) {
      if (recom[i] === "Good") {
        good++;
      } else {
        bad++;
      }
    }
    result.push(good, bad);
    return result;
  };

  let paymentApi = data.filter((x) => x.group === "payment").length;
  let gtrfApi = data.filter((x) => x.group === "gtrf").length;
  let treasuryApi = data.filter((x) => x.group === "treasury").length;

  let res = countData();

  const doughnutChartData = {
    labels: ["Recommended", "Non-Recommended"],
    datasets: [
      {
        label: "Curated APIs",
        data: res,
        backgroundColor: ["#a6d997", "#dfeedb"],
        borderColor: ["#a6d997", "#dfeedb"],
        borderWidth: 1,
        spacing: 0.7,
      },
    ],
  };

  const barChartData = {
    labels: ["Payment", "GTRF", "Treasury"],
    datasets: [
      {
        data: [paymentApi, gtrfApi, treasuryApi],
        backgroundColor: ["#ffbb4f", "#ffda93", "#ff7576"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="main-content">
      <header className="header">
        <div className="header__title">
          <p>Curated Dashboard</p>
        </div>

        <div className="header__search">
            <FaSearch className="header__search--icon" />
            <input
              placeholder="Search"
              className="header__search--input"
              // value={searchData}
              // onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
      </header>
      <section className="charts__card--count card">
      <span className="charts__count--title">Classification of APIs</span>
        <div className="row">
          <div className="col-1-of-4">
            <div className="count__title">
              <span className="count__title--heading">{paymentApi}</span>
              <p>Payment APIs</p>
            </div>
          </div>
          <div className="col-1-of-4">
            <div className="count__title">
              <span className="count__title--heading">{gtrfApi}</span>
              <p>GTRF APIs</p>
            </div>
          </div>
          <div className="col-1-of-4">
            <div className="count__title">
              <span className="count__title--heading">{treasuryApi}</span>
              <p>Treasury APIs</p>
            </div>
          </div>
          <div className="col-1-of-4">
            <div className="count__title" style={{color: "#ff7576"}}>
              <span className="count__title--heading">{data.length}</span>
              <p>Total APIs</p>
            </div>
          </div>
        </div>
      </section>
      <div className="charts__card--doughnut card">
        <span className="doughnut__title">Curated APIs</span>
        <div className="doughnut__canvas">
          <Doughnut
            data={doughnutChartData}
            options={{
              plugins: {
                datalabels: false,
                tooltip: false,
                legend: {
                  display: false,
                  position: "bottom",
                  align: "start",
                  labels: {
                    padding: 4,
                    boxWidth: 20,
                    boxHeight: 20,
                    boxPadding: 15,
                  },
                },
              },
              cutout: 65,
            }}
          />
        </div>
        <div className="doughnut__inner">
          <h5>{Math.floor((res.at(0) / (res.at(0) + res.at(1))) * 100)}%</h5>
        </div>
        <div className="doughnut__label">
          <div className="doughnut__label-1"></div>
          <div className="doughnut__label-2 "></div>
          <span className="doughnut__legend-1">Recommended APIs</span>
          <span className="doughnut__legend-2">Non-Recommended APIs</span>
          <span className="doughnut__label-1--data">{res.at(0)}</span>
          <span className="doughnut__label-2--data">{res.at(1)}</span>
        </div>
      </div>
      <br />
      <div className="charts__card--bar card">
        <span className="bar__title">Types of APIs</span>
        <div className="bar__canvas">
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                datalabels: {
                  anchor: "center",
                  align: "top",
                  color: "#fff",
                  font: {
                    size: 18,
                    weight: "normal",
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    color: "#fff",
                  },
                },
                y: {
                  grid: {
                    color: "#fff",
                    drawBorder: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
        <div className="bar__label">
          <div className="bar__label-1"></div>
          <span className="bar__legend-1">Payment</span>
          <div className="bar__label-2"></div>
          <span className="bar__legend-2">GTRF</span>
          <div className="bar__label-3"></div>
          <span className="bar__legend-3">Treasury</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
