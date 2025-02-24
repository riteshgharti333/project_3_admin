import { homeBannerData } from "../../assets/data";
import "./HomeBanner.scss";
import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { baseUrl } from "../../main";

const HomeBanner = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchHomeBanners = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/home-banner/all-home-banners`
        );
        
        setRowData(
          data.homeBanners.map((item) => ({
            id: item._id,
            bannerTitle: item.bannerTitle,
            bannerCount: item.bannerDetails.length,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching home banners:", error);
      }
    };

    fetchHomeBanners();
  }, []);

  const columnDefs = [
    {
      headerName: "Banner ID",
      field: "id",
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass: "header-center",
    },
    {
      headerName: "Banner Title",
      field: "bannerTitle",
      flex: 2,
      cellStyle: { textAlign: "center" },
      headerClass: "header-center",
    },
    {
      headerName: "Banner Count",
      field: "bannerCount",
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
    <div className="homeBanner">
      <div className="homeBanner-top">
        <h1>Home Banners</h1>
        <Link to={"/new-home-banner"}>
          <button>Add New Banners</button>
        </Link>
      </div>
      <Table rowData={rowData} columnDefs={columnDefs} tableLink="homeBanner" />
    </div>
  );
};

export default HomeBanner;
