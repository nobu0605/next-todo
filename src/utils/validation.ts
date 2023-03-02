import * as yup from "yup";

export const createCardValidation = yup.object().shape({
  _id: yup.string(),
  imageFileId: yup.string(),
  nickname: yup.string().trim().required("ニックネームを入力してください"),
  prefecture: yup.string().trim().required("住んでいるところを選択してください"),
  sex: yup.string().trim().required("性別を選択してください"),
  preferredSex: yup.string().trim().required("恋愛対象を選択してください"),
  birthDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(new Date(1900, 0, 1), "日付に間違いがないか確認してください") // 1900/1/1からOK
    .max(new Date(), "現在までの日付を入力してください")
    .required("生年月日を入力してください")
    .typeError("日付に間違いがないか確認してください"),
  tags: yup.array(),
});
