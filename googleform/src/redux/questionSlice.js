import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: "",
  formDescription: "",
  questions: [
    {
      id: Date.now(),
      question: "",
      type: "Short answer",
      options: [],
    },
  ],
  titleStyle: {
    bold: false,
    italic: false,
    underline: false,
  },
  descStyle: {
    bold: false,
    italic: false,
    underline: false,
  },
  activeQuestion: [],
  editQ: null,
  questionLength: true,
  isedit: false,
  activeField: null,
  ques: "",
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },

    setFormDescription: (state, action) => {
      state.formDescription = action.payload;
    },

    setQuestions: (state, action) => {
      state.questions = Array.isArray(action.payload)
        ? action.payload
        : state.questions;
    },

    updateQuestionText: (state, action) => {
      const { qid, question } = action.payload;
      state.questions = state.questions.map((q) =>
        q.id === qid
          ? {
              ...q,
              question,
            }
          : q
      );
    },
    
    setActiveQuestion: (state, action) => {
      state.activeQuestion = Array.isArray(
        action.payload
      )
        ? action.payload
        : state.activeQuestion;
    },

    setEditQ: (state, action) => {
      state.editQ =
        typeof action.payload === "object" ||
        action.payload === null
          ? action.payload
          : state.editQ;
    },

    setQuestionLength: (state, action) => {
      state.questionLength = action.payload;
    },

    setIsEdit: (state, action) => {
      state.isedit = action.payload;
    },

    setQues: (state, action) => {
      state.ques = action.payload;
    },

    setActiveField: (state, action) => {
      state.activeField = action.payload;
    },

    setTitleStyle: (state, action) => {
      state.titleStyle = action.payload;
    },

    setDescStyle: (state, action) => {
      state.descStyle = action.payload;
    },
  },
});

export const {
  setForm,
  setFormDescription,
  setQuestions,
  setActiveQuestion,
  setEditQ,
  setQuestionLength,
  setIsEdit,
  setQues,
  setActiveField,
  setTitleStyle,
  setDescStyle,
  updateQuestionText,
} = questionSlice.actions;

export default questionSlice.reducer;