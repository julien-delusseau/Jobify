import {
  BarChart as BarChartContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChartContainer margin={{ top: 50 }} data={data}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="total" fill="#2cb1bc" barSize={75} />
      </BarChartContainer>
    </ResponsiveContainer>
  );
};
export default BarChart;
