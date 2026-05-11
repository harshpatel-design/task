import React, { useState } from "react";
import QuestionBox from "./QuestionBox";
import { useSelector, useDispatch } from "react-redux";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  setQuestions,
  setEditQ,
  setActiveQuestion,
} from "../redux/questionSlice";

const SortableItem = ({ item, children, isEditMode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
  };

  return (
    <div ref={setNodeRef} style={style} className="sortableItem">
      {!isEditMode && (
        <div className="dragHandle" {...attributes} {...listeners}>
          ☰
        </div>
      )}

      {children}
    </div>
  );
};

const QuestionPreview = ({
  updateOption,
  deleteOption,
  addOption,
  handleCopyQuestion,
  handleAddQuestion,
  hasError,
  isAnyError,
  setHasError,
}) => {
  const [isedit, setIsedit] = useState(false);

  const dispatch = useDispatch();

  const { editQ, activeQuestion, questions } = useSelector(
    (state) => state.questions,
  );

  if (!Array.isArray(activeQuestion)) {
    return null;
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = activeQuestion.findIndex((q) => q.id === active.id);

    const newIndex = activeQuestion.findIndex((q) => q.id === over.id);

    const updated = arrayMove(activeQuestion, oldIndex, newIndex);

    dispatch(setActiveQuestion(updated));
  };
  const getEmptyIcon = (icon) => {
    switch (icon) {
      case "⭐":
        return "☆";

      case "❤️":
        return "🤍";

      case "👍":
        return "👍";

      default:
        return "☆";
    }
  };

  const handleEdit = (q) => {
    dispatch(setEditQ(q));
    setIsedit(true);
  };

  const handleConfirmEdit = () => {
    if (!editQ) return;

    const updatedQuestions = questions.map((q) =>
      q.id === editQ.id ? editQ : q,
    );

    dispatch(setQuestions(updatedQuestions));

    const updatedActiveQuestions = activeQuestion.map((q) =>
      q.id === editQ.id ? editQ : q,
    );

    dispatch(setActiveQuestion(updatedActiveQuestions));

    dispatch(setEditQ(null));

    setIsedit(false);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={activeQuestion}
        strategy={verticalListSortingStrategy}
      >
        <div className="previewContainer">
          {activeQuestion.map((item) => {
            const type = item.type;

            if (isedit && editQ?.id === item.id) {
              return (
                <QuestionBox
                  key={item.id}
                  q={editQ}
                  updateOption={updateOption}
                  deleteOption={deleteOption}
                  addOption={addOption}
                  handleCopyQuestion={handleCopyQuestion}
                  handleAddQuestion={handleAddQuestion}
                  isEditMode={isedit && editQ?.id === item.id}
                  onConfirm={handleConfirmEdit}
                  hasError={hasError}
                  isAnyError={isAnyError}
                  setHasError={setHasError}
                />
              );
            }

            return (
              <SortableItem key={item.id} item={item} isEditMode={false}>
                <div className="previewBox" onClick={() => handleEdit(item)}>
                  <h3>{item.question || "Untitled Question"}</h3>

                  {type === "Short answer" && (
                    <input
                      type="text"
                      disabled
                      placeholder="Short answer text"
                    />
                  )}

                  {type === "Paragraph" && (
                    <textarea disabled placeholder="Long answer text" />
                  )}

                  {type === "Multiple choice" &&
                    (item.options || []).map((opt, i) => (
                      <div key={i} className="PreQuestionChoice">
                        <input type="radio" disabled /> {opt}
                      </div>
                    ))}

                  {type === "Checkboxes" &&
                    (item.options || []).map((opt, i) => (
                      <div key={i} className="checkBoxOption">
                        <input type="checkbox" disabled /> {opt}
                      </div>
                    ))}

                  {type === "Drop-down" && (
                    <select disabled>
                      {(item.options || []).map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {type.toLowerCase().includes("grid") && (
                    <table className="previewGrid">
                      <thead>
                        <tr>
                          <th></th>

                          {(item.cols || []).map((col, i) => (
                            <th key={i}>{col}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {(item.rows || []).map((row, i) => (
                          <tr key={i}>
                            <td>{row}</td>

                            {(item.cols || []).map((_, j) => (
                              <td key={j}>
                                <input
                                  type={
                                    type === "Tick box grid"
                                      ? "checkbox"
                                      : "radio"
                                  }
                                  disabled
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {type === "Rating" && (
                    <div className="ratingContainer">
                      <div className="ratingScale">
                        {[...Array(item.ratingCount || 5)].map((_, i) => (
                          <div key={i} className="ratingItem">
                            <span className="ratingNumber">{i + 1}</span>

                            <span className="ratingIcon">
                              {getEmptyIcon(item.ratingIcon)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {type === "Linear scale" && (
                    <div className="linearWrapper">
                      <span className="linearLabel">
                        {item.leftLabel || "min"}
                      </span>

                      <div className="lineCon">
                        <div className="linearNumbers">
                          {Array.from(
                            {
                              length:
                                (item.scaleEnd || 5) -
                                (item.scaleStart || 1) +
                                1,
                            },
                            (_, i) => (item.scaleStart || 1) + i,
                          ).map((n) => (
                            <span key={n}>{n}</span>
                          ))}
                        </div>

                        <div className="linearRow">
                          {Array.from(
                            {
                              length:
                                (item.scaleEnd || 5) -
                                (item.scaleStart || 1) +
                                1,
                            },
                            (_, i) => (item.scaleStart || 1) + i,
                          ).map((n) => (
                            <input key={n} type="radio" disabled />
                          ))}
                        </div>
                      </div>

                      <span className="linearLabel">
                        {item.rightLabel || "max"}
                      </span>
                    </div>
                  )}

                  {type === "Date" && <input type="date" disabled />}

                  {type === "Time" && <input type="time" disabled />}
                </div>
              </SortableItem>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default QuestionPreview;
