import { useEffect, useState } from "react";
import "./Portfolio.scss";
import { portfolio } from "../../assets/data";
import Table from "../../components/Table/Table";

import { Link } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../../main";

const Portfolio = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/portfolio/all-portfolios`);

        setRowData(
          data.portfolios.map((item) => ({
            id: item._id,
            title: item.title,
            name: item.name,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching home banners:", error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    {
      headerName: "Portfolio ID",
      field: "id",
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass: "header-center",
    },
    {
      headerName: "Title",
      field: "title",
      flex: 2,
      cellStyle: { textAlign: "center" },
      headerClass: "header-center",
    },
    {
      headerName: "Name",
      field: "name",
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass: "header-center",
    },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass: "header-center",
    },
  ];

  return (
    <div className="portfolio">
      <div className="portfolio-top">
        <h1>Portfolio</h1>
        <Link to={"/new-portfolio"}>
          <button>Add New Portfolio</button>
        </Link>
      </div>

      <Table rowData={rowData} columnDefs={columnDefs} tableLink="portfolio" />
    </div>
  );
};

export default Portfolio;
