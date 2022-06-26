import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function EditApplication() {
  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;
  const [showapp, setShowallapp] = useState([]);
  const [description, setDescription] = useState("");
  const [startdate, setStartdate] = useState(date);
  const [enddate, setEnddate] = useState(date);
  const { appname } = useParams();
  console.log(appname);

  const edit_description = () => {
    axios
      .post("/edit_application", {
        app_description: description,
        appname: appname,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const edit_startdate = () => {
    axios
      .post("/edit_application", {
        app_start_date: startdate,
        appname: appname,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const edit_enddate = () => {
    axios
      .post("/edit_application", {
        app_end_date: enddate,
        appname: appname,
      })
      .then(() => {
        console.log("success");
        alert("success");
      });
  };

  const showallapplication = async () => {
    await axios.get(`/showallapplication/${appname}`).then((response) => {
      console.log(response.data);
      setShowallapp(response.data);
    });
  };

  useEffect(() => {
    showallapplication();
  }, []);
  return (
    <div>
      <div id="create-application" className="container py-md-5">
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label>
                <h3>Application:</h3>
              </label>
              <h3>{appname}</h3>
            </div>

            <div className="form-group">
              <label htmlFor="appdescription" className="text-muted mb-1">
                <small>Description</small>
              </label>
              <input
                id="app-description"
                className="form-control"
                type="text"
                placeholder={showapp.App_Description}
                defaultValue={showapp.App_Description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <button
              onClick={edit_description}
              className="py-3 mt-4 btn btn-m btn-success btn-block"
            >
              Edit Description
            </button>
            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Start Date</small>
              </label>
              <p>{moment(showapp.App_startDate).format("DD-MM-YYYY")}</p>
              <label htmlFor="enddate" className="text-muted mb-1">
                <small>End Date</small>
              </label>
              <p>{moment(showapp.App_endDate).format("DD-MM-YYYY")}</p>
             </div>

            
            <div className="form-group">
              <label htmlFor="startdate" className="text-muted mb-1">
                <small>Edit Start Date</small>
              </label>
              <input
                id="start-date"
                className="form-control"
                type="date"
                placeholder={moment(showapp.App_startDate).format("YYYY-MM-DD")}
                onChange={(event) => {
                  setStartdate(event.target.value);
                }}
              />
            </div>
            <button
              onClick={edit_startdate}
              className="py-3 mt-4 btn btn-success btn-block"
            >
              Edit Start Date
            </button>

            <div className="form-group">
              <label htmlFor="enddate" className="text-muted mb-1">
                <small>Edit End Date</small>
              </label>
              <input
                id="end-date"
                className="form-control"
                type="date"
                placeholder={moment(showapp.App_endDate).format("YYYY-MM-DD")}
                onChange={(event) => {
                  setEnddate(event.target.value);
                }}
              />
            </div>

            <button
              onClick={edit_enddate}
              className="py-3 mt-4 btn btn-m btn-success btn-block"
            >
              Edit End Date
            </button>
          </form>
        </div>
      </div>
      <div>
        {/* <button className="button" onClick={}>
          Back
        </button> */}
      </div>
    </div>
  );
}

export default EditApplication;
