import React from "react"
import { FaNewspaper } from "react-icons/fa"
import { FaArrowsToDot } from "react-icons/fa6"
import { LuClipboardEdit } from "react-icons/lu"
import { MdAdminPanelSettings } from "react-icons/md"
import { Chart } from "../components/Chart"
import Loading from "../components/Loading"
import StatCard from "../components/dashboard/StatCard" // Import new component
import TaskTable from "../components/dashboard/TaskTable" // Import extracted component
import UserTable from "../components/dashboard/UserTable" // Import extracted component
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice"

const Dashboard = () => {
  // 1. Get ALL the states
  const { data, isLoading, isError, error } = useGetDashboardStatsQuery();

  // 2. Handle Loading
  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  // 3. Handle Error (THIS IS THE FIX)
  // This will render an error message INSTEAD of a blank page
  if (isError) {
    return (
      <div className="h-full py-4 text-center text-red-500">
        <h1>An Error Occurred</h1>
        <p>Could not load dashboard data.</p>
        <p>{error?.data?.message || error.message || "Unknown error"}</p>
      </div>
    );
  }

  // 4. Handle No Data
  if (!data) {
    return (
      <div className="py-10 text-center">
        <p>No dashboard data found.</p>
      </div>
    );
  }

  // --- If we get here, data EXISTS ---

  // --- If we get here, 'data' is guaranteed to exist ---
  const totals = data?.tasks || {} // Add default object to prevent errors

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS", // Fixed typo
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0, // Corrected typo (|| 0 was on 'bg')
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ]

  return (
    <div className="h-full py-4">
      {/* Grid for Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <StatCard
            key={item._id || index} // Use _id for key
            icon={item.icon}
            bg={item.bg}
            label={item.label}
            count={item.total}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">
          Chart by Priority
        </h4>
        <Chart data={data?.graphData} />
      </div>

      {/* Tables Section */}
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TaskTable tasks={data?.last10Task} />
        <UserTable users={data?.users} />
      </div>
    </div>
  )
}

export default Dashboard