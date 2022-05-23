import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBoard } from '../../store/reducers/boardReducer';
import './boardItem.css';
import { AppDispatch } from '../../store/store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const cardStyle = { minWidth: 300, minHeight: 200, maxWidth: 500 };

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

const BoardItem = ({ title, description, id }: IBoard) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isTitleChanged, setIsTitleChanged] = React.useState(false);
  const [value, setValue] = React.useState(title);

  const handleClick = () => {
    navigate(`/board/${id}`);
  };

  const changeTitle = () => {
    setIsTitleChanged(true);
  };

  const formik = useFormik({
    initialValues: {
      title,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),

    onSubmit: (values) => {
      setValue(values.title);
      setIsTitleChanged(false);
    },
  });

  return (
    <div className="board-item">
      <Card sx={cardStyle}>
        {!isTitleChanged ? (
          <CardHeader
            title={value}
            action={
              <IconButton aria-label="delete" onClick={handleOpen}>
                <HighlightOffIcon />
              </IconButton>
            }
            onClick={changeTitle}
          />
        ) : (
          <CardHeader
            title={
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  required
                  id="title"
                  defaultValue={value}
                  size="small"
                  onChange={formik.handleChange}
                />
                {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
                <Button
                  sx={{ marginLeft: '10px' }}
                  variant="outlined"
                  onClick={() => setIsTitleChanged(false)}
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  sx={{ marginLeft: '10px' }}
                  variant="contained"
                  value="Submit"
                  type="submit"
                  size="small"
                >
                  Submit
                </Button>
              </form>
            }
          />
        )}

        <CardContent onClick={handleClick}>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5"> Are you sure you want to delete this board?</Typography>
          <Button sx={{ margin: '10px' }} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ margin: '10px' }}
            variant="contained"
            color="error"
            onClick={() => dispatch(deleteBoard(id))}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BoardItem;
