import React from "react";
import "../../css/dashboard.css";
import "../../css/areatop.css";
import "../../css/areacard.css";
import AreaCard from "./AreaCard.jsx";
import AreaBarChart from "./AreaBarChart.jsx";
import AreaProgressChart from "./AreaProgressChart.jsx";

function FinanceDashboard() {
  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* New Add Area */}
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            {/* small box */}
            <section className="content-area-cards">
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#475be8"]}
                percentFillValue={80}
                cardInfo={{
                  title: "Todays Sales",
                  value: "$20.4K",
                  text: "We have sold 123 items.",
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#4ce13f"]}
                percentFillValue={50}
                cardInfo={{
                  title: "Todays Revenue",
                  value: "$8.2K",
                  text: "Available to payout",
                }}
              />
              <AreaCard
                className="area-card"
                colors={["#e4e8ef", "#f29a2e"]}
                percentFillValue={40}
                cardInfo={{
                  title: "In Escrow",
                  value: "$18.2K",
                  text: "Available to payout",
                }}
              />
            </section>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <section className="content-area-charts">
              <AreaBarChart />
              <AreaProgressChart />
            </section>
          </div>
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
}

export default FinanceDashboard;
