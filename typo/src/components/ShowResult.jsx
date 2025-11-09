import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function ShowResult({ stats, onRestart }) {
  const data = [
    { name: "WPM", value: stats.wpm },
    { name: "Raw", value: stats.raw },
    { name: "Accuracy", value: parseFloat(stats.accuracy) },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/60 backdrop-blur-md shadow-xl rounded-2xl p-8 mt-20 text-center space-y-6">
      <h2 className="text-3xl font-semibold text-teal-600 dark:text-cyan-400">
        Test Results
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#14b8a6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="text-gray-700 dark:text-gray-300 space-y-2">
        <p>Accuracy: <b>{stats.accuracy}%</b></p>
        <p>Characters: <b>{stats.correct}</b> / {stats.total}</p>
        <p>Time: <b>{stats.elapsed}s</b></p>
      </div>

      <button
        onClick={onRestart}
        className="px-6 py-2 w-full h-full text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full hover:opacity-90 transition-all"
      >
        Restart Test
      </button>
    </div>
  );
}
