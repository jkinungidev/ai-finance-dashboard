import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const sampleData = [
  { category: "Groceries", total: 220 },
  { category: "Bills", total: 340 },
  { category: "Transport", total: 90 },
  { category: "Shopping", total: 150 },
];

function SpendingChart() {
  return (
    <section className="chart-panel">
      <h2>Spending by category</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default SpendingChart;
