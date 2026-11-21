import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { Transaction } from "./types";
import { totalsByCategory } from "./chartData";

interface SpendingChartProps {
  transactions: Transaction[];
}

function SpendingChart({ transactions }: SpendingChartProps) {
  const data = totalsByCategory(transactions);

  return (
    <section className="chart-panel">
      <h2>Spending by category</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#818cf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default SpendingChart;
