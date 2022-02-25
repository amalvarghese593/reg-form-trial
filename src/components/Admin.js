import axios from "axios";
import React, { useEffect, useState } from "react";
// import "table2excel";
import { useDownload } from "./hooks/useDownload";

export const Admin = () => {
  // const Table2Excel = window.Table2Excel;
  // const table2excel = new Table2Excel();
  // const downloadHandler = () => {
  //   table2excel.export(document.querySelectorAll("table"));
  // };
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1337/admin");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = userData.slice(firstIndex, lastIndex);
  const no = Math.ceil(userData.length / postsPerPage);
  let numArr = [];
  for (let i = 1; i < no + 1; i++) {
    numArr.push(i);
  }
  const { fileDownloadHandler } = useDownload();
  return (
    <div>
      <h2>Admin</h2>
      <div className="container w-75">
        <div className="container d-flex align-items-center p-3 text-start">
          <label htmlFor="postsCount">Posts per page:</label>
          <select
            onChange={(e) => setPostsPerPage(e.target.value)}
            defaultValue="10"
            name="postsCount"
            id="postsCount"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <button
            className="btn btn-success ms-auto"
            onClick={() => fileDownloadHandler("report/report.csv", "report")}
          >
            Export Data to Excel
          </button>
        </div>
        <table className="table  table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Sl.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Company</th>
              <th scope="col">Role</th>
              <th scope="col">Location</th>
              <th scope="col">Resume</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{firstIndex + index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.primaryEmailId}</td>
                <td>{user.primaryContactNumber}</td>
                <td>{user.currentCompanyName}</td>
                <td>{user.currentDesignation}</td>
                <td>{user.currentLocation}</td>
                <td>
                  <button
                    className="btn btn-outline-dark"
                    data-resumepath={user.resumeFile}
                    onClick={(e) =>
                      fileDownloadHandler(e.target.dataset.resumepath, "resume")
                    }
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container p-3">
        {numArr.map((num) => (
          <a
            href="#!"
            key={num}
            onClick={() => setCurrentPage(num)}
            className="btn btn-outline-dark m-1"
          >
            {num}
          </a>
        ))}
      </div>
    </div>
  );
};
