import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import {
  Container,
  Title,
  StatCardContainer,
  StatCard,
  ChartContainer,
  ErrorText,
  LoadingText,
} from "./styledComponents";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Home = () => {
  const [stats, setStats] = useState([]);
  const [paymentStats, setPaymentStats] = useState([]);
  const [orderStatusStats, setOrderStatusStats] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDay, setTotalDay] = useState(0);
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalYear, setTotalYear] = useState(0);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const token = Cookies.get("adminToken");
        const year = new Date().getFullYear();

        const [monthlyRes, paymentRes, statusRes, dailyRes] = await Promise.all(
          [
            axios.post(
              "https://magictreebackend.onrender.com/admin/orders/monthly-stats",
              { year },
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              "https://magictreebackend.onrender.com/admin/analytics/revenue/payment-method",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              "https://magictreebackend.onrender.com/admin/analytics/orders/status",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              "https://magictreebackend.onrender.com/admin/analytics/revenue/daily",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
          ]
        );

        const monthlyData = monthlyRes.data.data || [];
        console.log("Monthly Data:", monthlyData);

        setStats(monthlyData);
        setPaymentStats(paymentRes.data.data || []);
        setOrderStatusStats(statusRes.data.data || []);
        console.log("Payment Stats:", paymentRes.data.data);
        console.log("Order Status Stats:", statusRes.data.data);
        setDailyRevenue(dailyRes.data.data || []);

        const now = new Date();
        let monthRevenue = 0;
        let yearRevenue = 0;

        for (let i = 0; i < monthlyData.length; i++) {
          const entryDate = new Date(monthlyData[i].month);
          if (entryDate.getFullYear() === now.getFullYear()) {
            yearRevenue += Number(monthlyData[i].totalRevenue);
            if (entryDate.getMonth() === now.getMonth()) {
              monthRevenue += Number(monthlyData[i].totalRevenue);
            }
          }
        }

        const todayEntry = dailyRes.data.data.find(
          (entry) =>
            new Date(entry.date).toDateString() === new Date().toDateString()
        );

        setTotalYear(yearRevenue.toFixed(2));
        setTotalMonth(monthRevenue.toFixed(2));
        setTotalDay(
          todayEntry ? Number(todayEntry.totalRevenue).toFixed(2) : "0.00"
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  return (
    <Container>
      <Title>📊 Admin Dashboard</Title>

      {loading && <LoadingText>Loading stats...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <>
          <StatCardContainer>
            <StatCard>
              <h3>Today</h3>
              <p>₹ {totalDay}</p>
            </StatCard>
            <StatCard>
              <h3>This Month</h3>
              <p>₹ {totalMonth}</p>
            </StatCard>
            <StatCard>
              <h3>This Year</h3>
              <p>₹ {totalYear}</p>
            </StatCard>
          </StatCardContainer>

          <ChartContainer>
            <h2>📈 Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalRevenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer>
            <h2>📊 Order Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusStats}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {orderStatusStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer>
            <h2>💳 Revenue by Payment Method</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentStats}
                  dataKey="totalRevenue"
                  nameKey="method"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {paymentStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer>
            <h2>📅 Daily Revenue (Current Month)</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalRevenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </>
      )}
    </Container>
  );
};

export default Home;
