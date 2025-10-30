import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Loading, Table, Tabs, Title } from "../components";
import { AddTask, BoardView, TaskTitle } from "../components/tasks";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import { TASK_TYPE } from "../utils";
import { useSelector } from "react-redux";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Tasks = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(searchParams.get("search") || "");

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";

  // 1. Get ALL states from the hook
  const { data, isLoading, isError, error, refetch } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: searchTerm,
  });

  useEffect(() => {
    refetch();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [open, refetch]); // Added refetch to dependency array

  // 2. Handle Loading state
  if (isLoading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );
  }

  // 3. Handle Error state (NEW)
  if (isError) {
    return (
      <div className='py-10 text-center text-red-500'>
        <p>Error loading tasks.</p>
        <p>{error?.data?.message || error.message}</p>
      </div>
    );
  }

  // 4. Handle No Data state (NEW)
  // We check this *after* loading and error
  if (!data) {
    return (
      <div className='py-10 text-center text-gray-500'>
        <p>No tasks found.</p>
      </div>
    );
  }

  // --- If we get here, 'data' is guaranteed to exist ---

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && user?.isAdmin && (
          <Button
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
            onClick={() => setOpen(true)}
          />
        )}
      </div>

      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
              <TaskTitle label='To Do' className={TASK_TYPE.todo} />
              <TaskTitle
                label='In Progress'
                className={TASK_TYPE["in progress"]}
              />
              <TaskTitle label='Completed' className={TASK_TYPE.completed} />
            </div>
          )}

          {selected === 0 ? (
            <BoardView tasks={data?.tasks} /> 
          ) : (
            <Table tasks={data?.tasks} />
          )}
        </Tabs>
      </div>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;