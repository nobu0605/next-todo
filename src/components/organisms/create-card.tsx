import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import { TextField, Button, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { AuthContext } from "@contexts/AuthContext";
import axios from "@utils/axios";
import { createCardValidation } from "@utils/validation";

interface IOption {
  id: number;
  name: string;
}

interface IProps {
  options: IOption[];
  statusId: number;
  getTodos: () => any;
}

export default function CreateCard({ options, statusId, getTodos }: IProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { authState } = useContext(AuthContext);

  console.log("statusId: ", statusId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(createCardValidation),
    defaultValues: {
      title: "",
      description: "",
      status_id: statusId,
      user_id: authState?.user?.id,
    },
  });

  const createCard = async () => {
    const values = getValues();

    console.log("values: ", values);
    await axios
      .post(`/createTodo`, {
        ...values,
      })
      .then(async (response: any) => {
        handleClose();
        await getTodos();
        reset();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const items = options.map((option: IOption) => (
    <MenuItem value={option.id} key={option.id}>
      {option.name}
    </MenuItem>
  ));

  return (
    <>
      <CreateCardWrapper onClick={handleOpen}>
        Add Card
        <AddIcon />
      </CreateCardWrapper>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ mb: 2 }}
            {...register("title")}
            label={"title"}
            error={!!errors["title"]}
            helperText={errors["title"] && errors["title"]?.message}
          />
          <TextField
            sx={{ mb: 2 }}
            {...register("description")}
            label={"description"}
            error={!!errors["description"]}
            helperText={errors["description"] && errors["description"]?.message}
          />
          <Controller
            control={control}
            name="status_id"
            render={({ field: { onChange, value } }) => (
              <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel>status</InputLabel>
                <Select value={value || ""} onChange={onChange}>
                  {items}
                </Select>
              </FormControl>
            )}
          />
          <Button onClick={handleSubmit(createCard)} sx={{ background: "#1976d2", color: "white" }}>
            Add Card
          </Button>
        </Box>
      </Modal>
    </>
  );
}

const CreateCardWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #1976d2;
  color: white;
  padding: 7px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
