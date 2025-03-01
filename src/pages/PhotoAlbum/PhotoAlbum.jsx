import { homeBannerData } from "../../assets/data";
import "./PhotoAlbum.scss";
import Table from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { baseUrl } from "../../main";

const PhotoAlbum = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchHomeBanners = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/photoAlbum/all-photo-album`
        );
        console.log(data)

        setRowData(
          data.albums.map((item) => ({
            id: item._id,
            imageCount: item.images.length,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching photo album:", error);
      }
    };

    fetchHomeBanners();
  }, []);

 console.table(rowData)

  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass: "header-center",
    },
    {
      headerName: "Images Count",
      field: "imageCount",
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
    <div className="photoAlbum">
      <div className="photoAlbum-top">
        <h1>Photo Album</h1>
        <Link to={"/new-photo-album"}>
          <button>Add New Photo Album</button>
        </Link>
      </div>
      <Table rowData={rowData} columnDefs={columnDefs} tableLink="photoAlbum" />
    </div>
  );
};

export default PhotoAlbum;
