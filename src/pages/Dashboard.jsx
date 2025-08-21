import { ClipboardList, CheckCircle2 } from "lucide-react";

function Dashboard({ tasks }) {
  const completedCount = tasks.filter((t) => t.status === "Done").length;

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ClipboardList,
      gradient: "from-orange-400 to-yellow-400",
    },
    {
      title: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      gradient: "from-green-400 to-teal-500",
    },
  ];

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="mb-6">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h2> */}
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Here is the summary of your tasks
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`bg-gradient-to-r ${stat.gradient} text-white rounded-2xl p-5 shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform`}
            >
              <div>
                <p className="text-sm opacity-80">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <Icon size={32} className="text-white opacity-80" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
