import * as React from 'react';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import Button from '@mui/material/Button';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createTask, getAllTasks } from '../../store/reducers/helpers/tasksHelper';
import { AppDispatch } from '../../store/store';
import { ITasksParams } from '../../services/tasksApi';
import { addBoard } from '../../store/reducers/helpers/boardHelpers';
import BasicModal from '../basicModal/BasicModal';
import { useModal } from '../../hooks/appHooks';
import { addColumn } from '../../store/reducers/helpers/columnHelpers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
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
export interface ISubmitObj {
  [index: string]: () => void;
}

interface IJwtDecode {
  iat: number;
  login: string;
  userId: string;
}

export enum ItemType {
  Board = 'Board',
  Column = 'Column',
  Task = 'Task',
}

const AddItemButton: React.FC<AddItemProps> = ({
  itemType,
  boardId = '1',
  className,
  columnId = '1',
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { open, toggle } = useModal();
  const { t } = useTranslation();

  let schema;
  if (itemType === ItemType.Column) {
    schema = Yup.object({
      title: Yup.string().required('Title is required'),
    });
  } else if (itemType === ItemType.Board || itemType === ItemType.Task) {
    schema = Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    });
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const submitObj: ISubmitObj = {
        Board: () => dispatch(addBoard(values)),
        Column: () => dispatch(addColumn({ ...values, boardId })),
        Task: async () => {
          const token = localStorage.getItem('token');
          if (token) {
            const decoded = jwtDecode<IJwtDecode>(token);
            const task: ITasksParams = {
              title: values.title,
              description: values.description,
              userId: decoded.userId,
            };
            await dispatch(createTask({ boardId, columnId, task }));
            dispatch(getAllTasks(boardId));
          }
        },
      };
      submitObj[itemType]();
      toggle();
    },
  });

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddCircleSharpIcon />}
        size="large"
        onClick={toggle}
        className={className}
      >
        {t('New')} {t(itemType)}
      </Button>
      <BasicModal open={open} handleClose={toggle}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={style}>
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label={t(`title_${itemType}`)}
                defaultValue=""
                onChange={formik.handleChange}
                sx={{ minWidth: '100px' }}
              />
            </div>
            {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
            {itemType !== ItemType.Column && (
              <div>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="description"
                  label={t(`description_${itemType}`)}
                  defaultValue=""
                  multiline
                  rows={4}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description && (
                  <div>{formik.errors.description}</div>
                )}
              </div>
            )}
            <Button type="submit" value="Submit" variant="contained">
              {t('Create')} {t(itemType)}
            </Button>
            <Button variant="outlined" sx={{ margin: '10px' }} onClick={toggle}>
              {t('cancel')}
            </Button>
          </Box>
        </form>
      </BasicModal>
    </>
  );
};

export default AddItemButton;
