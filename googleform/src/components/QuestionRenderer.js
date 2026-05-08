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
  isEditMode,
  setHasError,
}) {

  if (!q) return null;

  const type = q.type?.toLowerCase();

  switch (type) {
    case "short answer":
      return <ShortAnswer />;

    case "paragraph":
      return <Paragraph />;

    case "multiple choice":
      return (
        <MultipleChoice
          q={q}
          updateOption={updateOption}
          deleteOption={deleteOption}
          addOption={addOption}
          setHasError={setHasError}
        />
      );

    case "checkboxes":
      return (
        <Checkboxes
          q={q}
          updateOption={updateOption}
          deleteOption={deleteOption}
          addOption={addOption}
          setHasError={setHasError}
        />
      );

    case "drop-down":
      return (
        <Dropdown
          q={q}
          updateOption={updateOption}
          deleteOption={deleteOption}
          addOption={addOption}
          setHasError={setHasError}
        />
      );

    case "multiple-choice grid":
      return <MultipleGrid q={q} isEditMode={isEditMode} setHasError={setHasError} />;

    case "tick box grid":
      return <CheckboxGrid q={q} isEditMode={isEditMode} setHasError={setHasError} />;

    case "rating":
      return <Rating q={q} isEditMode={isEditMode} />;

    case "linear scale":
      return <LinearScale q={q} isEditMode={isEditMode} />;

    case "date":
      return (
        <>
          <input type="date" className="date" disabled />
        </>
      );

    case "time":
      return (
        <>
          <input type="time" className="time" disabled />
        </>
      );

    default:
      return <div>Type not matched: {q.type}</div>;
  }
}

export default QuestionRenderer;
