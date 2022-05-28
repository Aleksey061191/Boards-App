import * as React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchBoards, updateBoard } from '../../store/reducers/helpers/boardHelpers';

interface TitleInputProps {
  title: string;
  id: string;
  inputClosed: () => void;
  description: string;
}

const TitleInput: React.FunctionComponent<TitleInputProps> = ({
  title,
  inputClosed,
  id,
  description,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      title,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),

    onSubmit: async (values) => {
      const { title } = values;
      await dispatch(updateBoard({ id, title, description }));
      await dispatch(fetchBoards());
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
      />
      {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
      <Button sx={{ marginLeft: '10px' }} variant="outlined" onClick={cancel} size="small">
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
  );
};

export default TitleInput;
