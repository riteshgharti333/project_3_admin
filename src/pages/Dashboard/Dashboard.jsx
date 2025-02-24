import { useEffect, useState } from "react";
import "./Dashboard.scss";
import axios from "axios";
import { baseUrl } from "../../main";

const Dashboard = () => {
  const [totalMember, setTotalMember] = useState("");
  const [totalMessages, setTotalMessages] = useState("");
 
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [teamResponse, contactResponse] = await Promise.all([
          axios.get(`${baseUrl}/team/all-teams`),
          axios.get(`${baseUrl}/contact/all-contacts`),
        ]);
  
        setTotalMember(teamResponse.data.teams.length);
        setTotalMessages(contactResponse.data.contacts.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    fetchDashboardData();
  }, []);
  


  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-top-cards">
          <div className="dashboard-top-card">
            <h3>Total Visitors</h3>

            <div className="dashboard-top-card-desc">
              <h1>150,00</h1>
              <span>
                <span className="line-break">/</span>Visitors
              </span>
            </div>
          </div>

          <div className="dashboard-top-card">
            <h3>Total Contact Messages</h3>

            <div className="dashboard-top-card-desc">
              <h1>{totalMessages}</h1>
              <span>
                <span className="line-break">/</span>Messages
              </span>
            </div>
          </div>

          <div className="dashboard-top-card">
            <h3>Total Team Members</h3>

            <div className="dashboard-top-card-desc">
              <h1>{totalMember}</h1>
              <span>
                <span className="line-break">/</span>Members
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
