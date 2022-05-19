import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addBoard } from '../../store/reducers/boardReducer';
import { addColumn, createColumn } from '../../store/reducers/columnReducer';

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
}

const AddItem: React.FC<AddItemProps> = ({ itemType, boardId }) => {
  const dispatch = useDispatch();
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
      itemType === 'Board' && dispatch(addBoard(values));
      itemType === 'Column' && dispatch(addColumn({...values, boardId}));
      handleClose();
    },
  });

  return (
    <>
      <Button variant="outlined" startIcon={<AddCircleSharpIcon />} onClick={handleOpen}>
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
                // label="Board title"
                label={`${itemType} title`}
                defaultValue=""
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
            {itemType !== 'Column' && (
              <div>
                <TextField
                  margin="normal"
                  fullWidth
                  id="description"
                  // label="Board description"
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

export default AddItem;
