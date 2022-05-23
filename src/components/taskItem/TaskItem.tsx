import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ITask } from '../../store/reducers/taskReducer';
import BasicDialog from '../basicDialog/BasicDIalog';
import { useDialog } from '../../hooks/appHooks';
import { AppDispatch } from '../../store/store';

const cardStyle = { minWidth: 300, minHeight: 100, maxWidth: 300 };

function TaskItem(props: ITask): JSX.Element {
  const { openD, toggleD } = useDialog();
  const handleClick = () => {
    console.log(props);
  };

  const handleDeleteTask = () => {
    console.log('task');
  };
  return (
    <>
      <Card sx={cardStyle}>
        <CardHeader
          title={props.title}
          action={
            <IconButton aria-label="delete" onClick={toggleD}>
              <HighlightOffIcon />
            </IconButton>
          }
        ></CardHeader>
        <CardContent onClick={handleClick}>
          {props.description && (
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          )}
        </CardContent>
      </Card>
      <BasicDialog
        open={openD}
        title="Delete task?"
        message="Do you want delete task permanently?"
        handleCancel={toggleD}
        handleOk={handleDeleteTask}
        children={null}
      />
    </>
  );
}

export default TaskItem;
