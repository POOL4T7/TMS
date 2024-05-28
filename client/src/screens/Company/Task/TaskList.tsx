import { Box, Paper, Stack, Typography } from '@mui/material';
import TaskCard from '../../../components/Task/TaskCard';
import { useEffect, useState, useCallback } from 'react';
// import { TaskListData } from '../../../data';
import {
  useAssignedTaskQuery,
  useUpdateTaskMutation,
} from '../../../redux/services/task';
import { Task } from '../../../models/Task';

interface TaskListProps {
  pending: Task[];
  review: Task[];
  completed: Task[];
  inprogress: Task[];
}

const TaskList = () => {
  const [taskList, setTaskList] = useState<TaskListProps>({
    pending: [],
    review: [],
    completed: [],
    inprogress: [],
  });
  const [draggedTask, setDraggedTask] = useState({
    _id: '',
    status: '',
  });
  const { data } = useAssignedTaskQuery();
  const [updateTask, { isError, isLoading }] = useUpdateTaskMutation();
  console.log('{ isError, isLoading }', { isError, isLoading });
  useEffect(() => {
    if (data?.taskList) {
      const tempObj: TaskListProps = {
        pending: [],
        review: [],
        completed: [],
        inprogress: [],
      };
      data.taskList.forEach((task: { _id: string; taskList: Task[] }) => {
        if (task._id in tempObj) {
          tempObj[task._id as keyof TaskListProps] = task.taskList;
        }
      });
      setTaskList(tempObj);
    }
  }, [data]);
  // console.log(taskList);
  const handleDragStart = useCallback(
    (index: string, status: string) => {
      setDraggedTask({ ...draggedTask, _id: index, status });
    },
    [draggedTask]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    async (status: string) => {
      console.log(
        `Dragged Task ID: ${draggedTask._id}, Current Status: ${draggedTask.status}, New Status: ${status}`
      );
      if (draggedTask._id && status !== draggedTask.status) {
        setTaskList((prevTaskList) => {
          const updatedTaskList = { ...prevTaskList };

          // Create copies of the current and target status arrays
          const currentTaskList = [
            ...updatedTaskList[draggedTask.status as keyof TaskListProps],
          ];
          const targetTaskList = [
            ...updatedTaskList[status as keyof TaskListProps],
          ];

          // Find the index of the dragged task in its current status array
          const taskIndex = currentTaskList.findIndex(
            (task) => task._id === draggedTask._id
          );

          if (taskIndex !== -1) {
            // Remove the task from its current status array
            const [task] = currentTaskList.splice(taskIndex, 1);

            // Update the task list for the dragged task's current status
            updatedTaskList[draggedTask.status as keyof TaskListProps] =
              currentTaskList;
            console.log(task);
            // task.status = status;

            // Add the task to the target status array
            targetTaskList.push(task);

            // Update the task list for the target status
            updatedTaskList[status as keyof TaskListProps] = targetTaskList;
          }

          return updatedTaskList;
        });
        try {
          const d = await updateTask({
            status: status,
            _id: draggedTask._id,
          });
          console.log('d', d);
          // Clear dragged task after drop
          setDraggedTask({ _id: '', status: '' });
        } catch (e) {
          console.log(e);
        }
      }
    },
    [draggedTask._id, draggedTask.status, updateTask]
  );

  const renderTaskColumn = (title: string, status: string, tasks: Task[]) => (
    <Paper
      sx={{
        width: '24.4%',
        backgroundColor: 'secondary.light',
      }}
      component={'div'}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(status)}
    >
      <Typography variant="h5" align="center" bgcolor={getStatusColor(status)}>
        {title}
      </Typography>
      <Box sx={{ overflow: 'scroll', maxHeight: 'calc(100vh - 100px)' }}>
        {tasks.map((task) => (
          <TaskCard
            task={task}
            key={task._id}
            index={task._id}
            onDragStart={handleDragStart}
          />
        ))}
      </Box>
    </Paper>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'error.main';
      case 'inprogress':
        return 'warning.light';
      case 'review':
        return 'info.light';
      case 'completed':
        return 'success.light';
      default:
        return 'secondary.light';
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100vw',
      }}
    >
      <Stack
        component={'div'}
        direction={'row'}
        spacing={1}
        justifyContent={'space-between'}
        sx={{
          minHeight: '90vh',
          maxHeight: '100%',
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        {renderTaskColumn('Pending', 'pending', taskList.pending)}
        {renderTaskColumn('In progress', 'inprogress', taskList.inprogress)}
        {renderTaskColumn('In review', 'review', taskList.review)}
        {renderTaskColumn('Done', 'completed', taskList.completed)}
      </Stack>
    </Box>
  );
};

export default TaskList;
