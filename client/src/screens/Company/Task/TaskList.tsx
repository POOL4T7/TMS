import { Box, Paper, Stack, Typography } from '@mui/material';
import TaskCard from '../../../components/Task/TaskCard';
import { useState } from 'react';
import { TaskListData } from '../../../data';

const TaskList = () => {
  const [tasks, setTasks] = useState(TaskListData);

  const [draggedTaskIndex, setDraggedTaskIndex] = useState<string | null>(null);

  const handleDragStart = (index: string) => {
    console.log('handleDragStart from parent', index);
    setDraggedTaskIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('handleDragOver');
    e.preventDefault();
  };
  const handleDrop = (status: string) => {
    console.log('handleDrop', status);
    if (draggedTaskIndex !== null) {
      const updatedTasks = [...tasks];
      const data = updatedTasks.map((task) => {
        if (task._id == draggedTaskIndex) {
          task.status = status;
        }
        return task;
      });
      setTasks(data);
      setDraggedTaskIndex(null);
    }
  };
  const filterTasks = (status: string) =>
    tasks.filter((task) => task.status === status);

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
        <Paper
          sx={{
            width: '24.4%',
            backgroundColor: 'secondary.light',
          }}
          component={'div'}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('pending')}
        >
          <Typography variant="h5" align="center" bgcolor={'error.main'}>
            Pending
          </Typography>
          <Box sx={{ overflow: 'scroll', maxHeight: 'calc(100vh - 100px)' }}>
            {filterTasks('pending').map((task, idx) => {
              return (
                <TaskCard
                  task={task}
                  key={idx}
                  index={task._id}
                  onDragStart={handleDragStart}
                />
              );
            })}
          </Box>
        </Paper>
        <Paper
          sx={{
            width: '24.4%',
            backgroundColor: 'secondary.light',
          }}
          component={'div'}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('inprogress')}
        >
          <Typography variant="h5" align="center" bgcolor={'warning.light'}>
            In progress
          </Typography>
          <Box sx={{ overflow: 'scroll', maxHeight: 'calc(100vh - 100px)' }}>
            {filterTasks('inprogress').map((task, idx) => {
              return (
                <TaskCard
                  task={task}
                  key={idx}
                  index={task._id}
                  onDragStart={handleDragStart}
                />
              );
            })}
          </Box>
        </Paper>
        <Paper
          sx={{
            width: '24.4%',
            backgroundColor: 'secondary.light',
          }}
          component={'div'}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('inreview')}
        >
          <Typography variant="h5" align="center" bgcolor={'info.light'}>
            In review
          </Typography>
          <Box sx={{ overflow: 'scroll', maxHeight: 'calc(100vh - 100px)' }}>
            {filterTasks('inreview').map((task, idx) => {
              return (
                <TaskCard
                  task={task}
                  key={idx}
                  index={task._id}
                  onDragStart={handleDragStart}
                />
              );
            })}
          </Box>
        </Paper>
        <Paper
          sx={{
            width: '24.4%',
            backgroundColor: 'secondary.light',
          }}
          component={'div'}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('completed')}
        >
          <Typography variant="h5" align="center" bgcolor={'success.light'}>
            Done
          </Typography>
          <Box sx={{ overflow: 'scroll', maxHeight: 'calc(100vh - 100px)' }}>
            {filterTasks('completed').map((task, idx) => {
              return (
                <TaskCard
                  task={task}
                  key={idx}
                  index={task._id}
                  onDragStart={handleDragStart}
                />
              );
            })}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default TaskList;
