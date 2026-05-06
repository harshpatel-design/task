import { useDispatch, useSelector } from "react-redux";
import {
  setQuestions,
  setEditQ,
} from "../redux/questionSlice";

const Rating = ({ q, isEditMode }) => {
  const dispatch = useDispatch();

  const { questions, editQ } = useSelector(
    (state) => state.questions
  );

  const handleCountChange = (value) => {
    if (isEditMode) {
      dispatch(
        setEditQ({
          ...editQ,
          ratingCount: value,
        })
      );
    } else {
      const updatedQuestions = questions.map(
        (item) =>
          item.id === q.id
            ? {
                ...item,
                ratingCount: value,
              }
            : item
      );

      dispatch(
        setQuestions(updatedQuestions)
      );
    }
  };

  const handleIconChange = (icon) => {
    if (isEditMode) {
      dispatch(
        setEditQ({
          ...editQ,
          ratingIcon: icon,
        })
      );
    } else {
      const updatedQuestions = questions.map(
        (item) =>
          item.id === q.id
            ? {
                ...item,
                ratingIcon: icon,
              }
            : item
      );

      dispatch(
        setQuestions(updatedQuestions)
      );
    }
  };

  const iconsMap = {
    "⭐": "☆",
    "❤️": "🤍",
    "👍": "👍🏻",
  };

  const filled = q.ratingIcon || "⭐";
  const empty = iconsMap[filled] || "☆";

  return (
    <div className="ratingContainer">
      <div className="ratingControls">
        <select
          value={q.ratingCount || 5}
          onChange={(e) =>
            handleCountChange(
              Number(e.target.value)
            )
          }
        >
          {[3, 4, 5, 6, 7, 8, 9, 10].map(
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

        <select
          value={q.ratingIcon || "⭐"}
          onChange={(e) =>
            handleIconChange(
              e.target.value
            )
          }
        >
          <option value="⭐">
            ⭐ Star
          </option>

          <option value="❤️">
            ❤️ Heart
          </option>

          <option value="👍">
            👍 Thumb
          </option>
        </select>
      </div>

      <div className="ratingScale">
        {[
          ...Array(q.ratingCount || 5),
        ].map((_, i) => (
          <div
            key={i}
            className="ratingItem"
          >
            <span className="ratingNumber">
              {i + 1}
            </span>

            <span className="ratingIcon">
              {empty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;