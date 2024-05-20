import { Box } from '@mui/material';

interface Task {
  name: string;
  status: string;
  description: string;
}

interface PropType {
  task: Task;
  index: string;
  onDragStart: (index: string) => void;
}

const TaskCard = ({ task, index, onDragStart }: PropType) => {

  const handleDragStart = () => {
    onDragStart(index);
  };
  return (
    <Box
      component={'div'}
      draggable
      onDragStart={handleDragStart}
      sx={{
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        backgroundColor: 'primary.light',
        '&:hover': {
          transform: 'scale(1.04)',
          transition: 'width 2s, height 2s, transform 0.5s',
        },
      }}
    >
      {task.name}
      <div>{index}</div>
      <div className="bsj"> {task.status}</div>
      <p>{task.description}</p>
    </Box>
  );
};

export default TaskCard;
