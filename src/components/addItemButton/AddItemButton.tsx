import * as React from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Button from '@mui/material/Button';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard } from '../../store/reducers/boardReducer';
import { addColumn } from '../../store/reducers/columnReducer';
import { createTask } from '../../store/reducers/taskReducer';
import { AppDispatch, RootState } from '../../store/store';
import { ITasksParams } from '../../services/tasksApi';

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

interface AddItemProps {
  itemType: string;
  boardId?: string;
  className?: string;
  columnId?: string;
}
interface ISubmitObj {
  [index: string]: () => void;
}

interface IJwtDecode {
  iat: number;
  login: string;
  userId: string;
}

enum ItemType {
  Board = 'Board',
  Column = 'Column',
  Task = 'Task',
}

const AddItemButton: React.FC<AddItemProps> = ({
  itemType,
  boardId = '1',
  className,
  columnId = '1' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const columns = useSelector((state: RootState) => state.columns.columns);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),

    onSubmit: (values) => {
      const order = columns.length + 1;
      const submitObj: ISubmitObj = {
        Board: () => dispatch(addBoard(values)),
        Column: () => dispatch(addColumn({ ...values, boardId })),
        Task: () => {
          const token = localStorage.getItem('token');
          if (token) {
            const decoded = jwtDecode<IJwtDecode>(token);
            const task: ITasksParams = {
              title: values.title,
              description: values.description,
              userId: decoded.userId,
            }
            dispatch(createTask({ boardId, columnId, task }))
          }
        },
      };
      submitObj[itemType]();
      handleClose();
    },
  });

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddCircleSharpIcon />}
        size="large"
        onClick={handleOpen}
        className={className}
      >
        New {itemType}
      </Button>
      <Modal open={isModalOpen} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={style}>
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label={`${itemType} title`}
                defaultValue=""
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
            {ItemType.Column && (
              <div>
                <TextField
                  margin="normal"
                  fullWidth
                  id="description"
                  label={`${itemType} description`}
                  defaultValue=""
                  multiline
                  rows={4}
                  onChange={formik.handleChange}
                />
              </div>
            )}
            <Button type="submit" value="Submit" variant="contained">
              Create {itemType}
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default AddItemButton;
