import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

export interface IncomeTrendDatum {
  month: string;
  [source: string]: number | string;
}

interface IncomeTrendChartProps {
  data: IncomeTrendDatum[];
  sources: string[];
  chartType?: 'line' | 'area';
}

export const IncomeTrendChart: React.FC<IncomeTrendChartProps> = ({
  data,
  sources,
  chartType = 'line',
}) => {
  const colors = [
    '#2563eb', // blue-600
    '#16a34a', // green-600
    '#f59e42', // orange-400
    '#e11d48', // rose-600
    '#a21caf', // purple-700
    '#0ea5e9', // sky-500
    '#facc15', // yellow-400
  ];

  return (
    <div className="w-full h-80 bg-background text-foreground rounded shadow p-4">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'area' ? (
          <AreaChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {sources.map((source, idx) => (
              <Area
                key={source}
                type="monotone"
                dataKey={source}
                stackId="1"
                stroke={colors[idx % colors.length]}
                fill={colors[idx % colors.length]}
                fillOpacity={0.2}
              />
            ))}
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {sources.map((source, idx) => (
              <Line
                key={source}
                type="monotone"
                dataKey={source}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                dot={{ r: 3, stroke: colors[idx % colors.length], strokeWidth: 2, fill: 'white' }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
