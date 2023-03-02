import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import { TextField, Button, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { createCardValidation } from "@utils/validation";

interface IOption {
  id: number;
  name: string;
}

export default function CreateCard({ options }: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value as string);
  };

  console.log("options: ", options);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(createCardValidation),
    defaultValues: {
      title: "",
      description: "",
      status_id: "",
    },
  });

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
            label={"タイトルを入力"}
            // error={!!errors[form.name]}
            // helperText={errors[form.name] && errors[form.name]?.message}
          />
          <TextField
            sx={{ mb: 2 }}
            {...register("description")}
            label={"説明を入力"}
            // error={!!errors[form.name]}
            // helperText={errors[form.name] && errors[form.name]?.message}
          />

          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">ステータスを入力</InputLabel>
            <Select {...register("status_id")} onChange={(e: any) => handleChange(e)}>
              {items}
            </Select>
          </FormControl>
          <Button sx={{ background: "#1976d2", color: "white" }}>登録</Button>
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
