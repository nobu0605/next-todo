import * as yup from "yup";

export const createCardValidation = yup.object().shape({
  title: yup.string().required("Please fill in the title."),
  description: yup.string().required("Please fill in the title."),
  status_id: yup.number().required("Please fill in the status."),
});
