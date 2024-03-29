import { useEffect, useRef, useState } from "react";
import "../../css/dashboard.css";
import "../../css/areatop.css";
import "../../css/areacard.css";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import AreaCard from "./AreaCard";
import AreaBarChart from "./AreaBarChart";
import AreaProgressChart from "./AreaProgressChart.jsx";

function InventoryDashboard() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                  {/* <div className="area-top-r">
                    <div
                      ref={dateRangeRef}
                      className={`date-range-wrapper ${
                        !showDatePicker ? "hide-date-range" : ""
                      }`}
                      onClick={handleInputClick}
                    >
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        showMonthAndYearPickers={false}
                      />
                    </div>
                  </div> */}
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

export default InventoryDashboard;

{
  /* ./col */
}
{
  /* <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>100</h3>
                    <p>Packing Material</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>Suppliers</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>Stats</h3>
                    <p>All summary</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div> */
}
{
  /* ./col */
}
