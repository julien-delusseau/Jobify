import {
  AreaChart as AreaChartContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChartContainer margin={{ top: 50 }} data={data}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area dataKey="total" type="monotone" fill="#bef8fd" stroke="#2cb1bc" />
      </AreaChartContainer>
    </ResponsiveContainer>
  );
};
export default AreaChart;
