import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  setQuestions,
  setEditQ,
} from "../redux/questionSlice";

const LinearScale = ({
  q,
  isEditMode,
}) => {
  const { questions, editQ } =
    useSelector(
      (state) => state.questions
    );

  const dispatch = useDispatch();

  const updateField = (
    key,
    value
  ) => {
    let updatedData = {
      ...q,
      [key]: value,
    };

    // scaleStart change hone par
    // scaleEnd automatically adjust
    if (key === "scaleStart") {
      if (
        value >=
        (q.scaleEnd || 5)
      ) {
        updatedData.scaleEnd =
          value + 1;
      }
    }

    if (isEditMode) {
      dispatch(
        setEditQ({
          ...editQ,
          ...updatedData,
        })
      );
    } else {
      const updatedQuestions =
        questions.map((item) =>
          item.id === q.id
            ? updatedData
            : item
        );

      dispatch(
        setQuestions(updatedQuestions)
      );
    }
  };

  return (
    <div className="linearScale">
      <div className="scaleRange range">
        <select
          value={q.scaleStart || 0}
          onChange={(e) =>
            updateField(
              "scaleStart",
              Number(
                e.target.value
              )
            )
          }
        >
          {[0, 1, 2, 3, 4, 5].map(
            (n) => (
              <option
                key={n}
                value={n}
              >
                {n}
              </option>
            )
          )}
        </select>

        <span>to</span>

        <select
          value={q.scaleEnd || 5}
          onChange={(e) =>
            updateField(
              "scaleEnd",
              Number(
                e.target.value
              )
            )
          }
        >
          {Array.from(
            {
              length:
                10 -
                (q.scaleStart ||
                  0),
            },
            (_, i) =>
              (q.scaleStart ||
                0) +
              i +
              1
          ).map((n) => (
            <option
              key={n}
              value={n}
            >
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="scaleLabels">
        <div className="scaleLabelsBox">
          <span>
            {q.scaleStart || 1}
          </span>

          <input
            type="text"
            placeholder="Label (optional)"
            value={
              q.leftLabel || ""
            }
            onChange={(e) =>
              updateField(
                "leftLabel",
                e.target.value
              )
            }
          />
        </div>

        <div className="scaleLabelsBox">
          <span>
            {q.scaleEnd || 5}
          </span>

          <input
            type="text"
            placeholder="Label (optional)"
            value={
              q.rightLabel || ""
            }
            onChange={(e) =>
              updateField(
                "rightLabel",
                e.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LinearScale;