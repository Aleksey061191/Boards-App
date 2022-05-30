import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box, TextField, Stack } from '@mui/material';
import Assignment from '@mui/icons-material/Assignment';
import Description from '@mui/icons-material/Description';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  updateTask,
  IUpdateTaskApi,
  ITask,
  getAllTasks,
} from '../../store/reducers/helpers/tasksHelper';
import { AppDispatch } from '../../store/store';
import cl from './Task.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50%',
  p: 4,
};

interface ITaskProps extends ITask {
  boardId: string;
  columnId: string;
  handleClose: () => void;
}

const Task = (props: ITaskProps) => {
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleCancel = () => {
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: {
      title: props.title,
      description: props.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),

    onSubmit: async (values) => {
      const task: IUpdateTaskApi = {
        boardId: props.boardId,
        columnId: props.columnId,
        taskId: props.id,
        task: {
          order: props.order,
          title: values.title,
          description: values.description,
          userId: props.userId,
          boardId: props.boardId,
          columnId: props.columnId,
        },
      };
      await dispatch(updateTask(task));
      await dispatch(getAllTasks(props.boardId));
      setEditMode(false);
    },
  });

  return (
    <div className={cl.wrapper}>
      {!isEditMode && (
        <>
          <h2 className={cl.title}>
            <Assignment className={cl.ikon} />
            {props.title}
          </h2>
          <p className={cl.descritpionTitle}>
            <Description className={cl.ikon} />
            {t('description')}:
          </p>
          <p className={cl.description}>{props.description}</p>
          <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
              sx={{ marginBottom: '5px' }}
            >
              {t('edit')}
            </Button>
            <Button variant="outlined" onClick={props.handleClose}>
              {t('cancel')}
            </Button>
          </Stack>
        </>
      )}
      {isEditMode && (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={style}>
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  defaultValue={props.title}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  defaultValue={props.description}
                  multiline
                  rows={10}
                  onChange={formik.handleChange}
                />
              </div>
              <Button type="submit" value="Submit" variant="contained">
                {t('save')}
              </Button>
              <Button onClick={handleCancel} autoFocus>
                {t('cancel')}
              </Button>
            </Box>
          </form>
        </>
      )}
    </div>
  );
};

export default Task;
