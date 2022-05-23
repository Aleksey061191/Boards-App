import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Button,
  Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ITask } from '../../store/reducers/taskReducer';
import { AppDispatch } from '../../store/store';

const cardStyle = { minWidth: 300, minHeight: 200, maxWidth: 500 };


function TaskItem(props: ITask): JSX.Element {
  const handleClick = () => {
    console.log(props);
  }
  return (
    <Card sx={cardStyle}>
        <CardHeader
          title={props.title}
          action={
            <IconButton aria-label="delete">
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
  );
}

export default TaskItem;