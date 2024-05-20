import { Box, Paper, Stack, Typography } from '@mui/material';
import TaskCard from '../../../components/Task/TaskCard';
import { useState } from 'react';

interface Task {
  name: string;
  status: string;
  description: string;
  id: string;
}
const taskData: Task[] = [
  {
    id: 'scsbcsdbc1',
    name: 'bxjas',
    status: 'pending',
    description: 'sdbc wuhc wnc cn sdcnl s',
  },
  {
    id: 'scsbcssdcsdcdbc2',
    name: 'bxjas',
    status: 'pending',
    description: 'sdbc wuhc wnc cn sdcnl s',
  },
  {
    id: 'scsbdcdccsdbc3',
    name: 'bxjas',
    status: 'pending',
    description: 'sdbc wuhc wnc cn sdcnl s',
  },
  {
    id: 'scsbrtrtcsdbc4',
    name: 'bxjas',
    status: 'active',
    description: 'sdbc wuhc wnc cn sdcnl s',
  },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(taskData);

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
      // updatedTasks[draggedTaskIndex].status = status;
      const data = updatedTasks.map((task) => {
        if (task.id == draggedTaskIndex) {
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
    <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <Stack
        direction={'row'}
        spacing={1}
        justifyContent={'space-between'}
        sx={{ minHeight: '90vh', maxHeight: '100%', width: '100%' }}
      >
        <Paper
          sx={{
            width: '33%',
            backgroundColor: 'secondary.light',
          }}
          component={'div'}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('pending')}
        >
          <Typography
            variant="h5"
            align="center"
            color={'error.main'}
            bgcolor={'secondary.dark'}
            borderRadius={'7px'}
          >
            Pending
          </Typography>
          {filterTasks('pending').map((task, idx) => {
            return (
              <TaskCard
                task={task}
                key={idx}
                index={task.id}
                onDragStart={handleDragStart}
              />
            );
          })}
        </Paper>
        <Paper
          sx={{
            width: '33%',
            backgroundColor: 'secondary.light',
          }}
          component={'div'}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('active')}
        >
          <Typography
            variant="h5"
            align="center"
            color={'warning.main'}
            bgcolor={'secondary.dark'}
            borderRadius={'7px'}
          >
            In-Progress
          </Typography>
          {filterTasks('active').map((task, idx) => {
            return (
              <TaskCard
                task={task}
                key={idx}
                index={task.id}
                onDragStart={handleDragStart}
              />
            );
          })}
        </Paper>
        <Paper
          sx={{
            width: '33%',
            backgroundColor: 'secondary.light',
          }}
          component={'div'}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('completed')}
        >
          <Typography
            variant="h5"
            align="center"
            color={'success.main'}
            bgcolor={'secondary.dark'}
            borderRadius={'7px'}
          >
            Completed
          </Typography>
          {filterTasks('completed').map((task, idx) => {
            return (
              <TaskCard
                task={task}
                key={idx}
                index={task.id}
                onDragStart={handleDragStart}
              />
            );
          })}
        </Paper>
      </Stack>
    </Box>
  );
};

export default TaskList;
