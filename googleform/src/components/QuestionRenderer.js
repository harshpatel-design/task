import Checkboxes from "./Checkboxes";
import CheckboxGrid from "./CheckboxGrid";
import Dropdown from "./Dropdown";
import LinearScale from "./LinearScale";
import MultipleChoice from "./MultipleChoice";
import MultipleGrid from "./MultipleGrid";
import Paragraph from "./Paragraph";
import Rating from "./Rating";
import ShortAnswer from "./ShortAnswer";

function QuestionRenderer({
  q,
  updateOption,
  deleteOption,
  addOption,
  setQuestions,
  questions,
  handleCopyQuestion,
  isEditMode,
  setEditQ,
}) {
  if (!q) return null;

  const type = q.type?.toLowerCase();

  switch (type) {
    case "short answer":
      return <ShortAnswer q={q} handleCopyQuestion={handleCopyQuestion} />;

    case "paragraph":
      return <Paragraph q={q} handleCopyQuestion={handleCopyQuestion} />;

    case "multiple choice":
      return (
        <MultipleChoice
          q={q}
          updateOption={updateOption}
          deleteOption={deleteOption}
          addOption={addOption}
          handleCopyQuestion={handleCopyQuestion}
        />
      );

    case "checkboxes":
      return (
        <Checkboxes
          q={q}
          updateOption={updateOption}
          deleteOption={deleteOption}
          addOption={addOption}
          handleCopyQuestion={handleCopyQuestion}
        />
      );

    case "drop-down":
      return (
        <Dropdown
          q={q}
          updateOption={updateOption}
          deleteOption={deleteOption}
          addOption={addOption}
          handleCopyQuestion={handleCopyQuestion}
        />
      );

    case "multiple-choice grid":
      return (
        <MultipleGrid
          q={q}
          setQuestions={setQuestions}
          questions={questions}
          handleCopyQuestion={handleCopyQuestion}
          isEditMode={isEditMode}
          setEditQ={setEditQ}
        />
      );

    case "tick box grid":
      return (
        <CheckboxGrid
          q={q}
          setQuestions={setQuestions}
          questions={questions}
          handleCopyQuestion={handleCopyQuestion}
          isEditMode={isEditMode}
          setEditQ={setEditQ}
        />
      );

    case "rating":
      return (
        <Rating
          q={q}
          setQuestions={setQuestions}
          handleCopyQuestion={handleCopyQuestion}
           isEditMode={isEditMode}
          setEditQ={setEditQ}
        />
      );

    case "linear scale":
      return (
        <LinearScale
          q={q}
          setQuestions={setQuestions}
          handleCopyQuestion={handleCopyQuestion}
           isEditMode={isEditMode}
          setEditQ={setEditQ}
        />
      );

    case "date":
      return (
        <>
          <input type="date" className="date" disabled />
          <div className="footerBtn">
            <button className="btn copy" onClick={() => handleCopyQuestion(q)}>
              Copy
            </button>
          </div>
        </>
      );

    case "time":
      return (
        <>
          <input type="time" className="time" disabled />
          <div className="footerBtn">
            <button className="btn copy" onClick={() => handleCopyQuestion(q)}>
              Copy
            </button>
          </div>
        </>
      );

    default:
      return <div>Type not matched: {q.type}</div>;
  }
}

export default QuestionRenderer;
