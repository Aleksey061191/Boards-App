import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchColumns, updateColumn } from '../../store/reducers/helpers/columnHelpers';

interface TitleInputProps {
  title: string;
  id: string;
  inputClosed: () => void;
  itemType: string;
  boardId: string;
  order: number;
}

const TitleInput: React.FunctionComponent<TitleInputProps> = ({
  title,
  inputClosed,
  boardId,
  id,
  order,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),

    onSubmit: async (values) => {
      const column = {
        boardId,
        columnId: id,
        order,
        title: values.title,
      };
      await dispatch(updateColumn(column));
      await dispatch(fetchColumns(boardId));
      inputClosed();
    },
  });

  const cancel = () => {
    inputClosed();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        required
        id="title"
        defaultValue={title}
        size="small"
        onChange={formik.handleChange}
        InputLabelProps={{ shrink: true }}
      />
      {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
      <Button sx={{ marginLeft: '10px' }} variant="outlined" onClick={cancel} size="small">
        {t('cancel')}
      </Button>
      <Button
        sx={{ marginLeft: '10px' }}
        variant="contained"
        value="Submit"
        type="submit"
        size="small"
      >
        {t('save')}
      </Button>
    </form>
  );
};

export default TitleInput;
