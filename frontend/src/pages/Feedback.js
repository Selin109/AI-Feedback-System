import { useState } from "react";
import axios from "axios";

function Feedback() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [msg, setMsg] = useState("");
  const [sentiment, setSentiment] = useState("");

  const user_id = localStorage.getItem("user_id");

  const handleSubmit = async () => {

    if (!user_id) {
      setMsg("Please login first");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/feedback", {
        user_id,
        comment,
        rating
      });

      setMsg(res.data.msg);
      setSentiment(res.data.sentiment);

      setComment("");
      setRating("");

    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      } else {
        setMsg("Server error");
      }
    }
  };

return (
  <div className="card p-4 mx-auto" style={{maxWidth:500}}>
    <h2 className="text-center mb-3">Feedback</h2>

    <textarea
      className="form-control mb-3"
      placeholder="Write your feedback"
      value={comment}
      onChange={(e)=>setComment(e.target.value)}
    />

    <input
      className="form-control mb-3"
      type="number"
      placeholder="Rating (1-5)"
      value={rating}
      onChange={(e)=>setRating(e.target.value)}
    />

    <button className="btn btn-warning w-100" onClick={handleSubmit}>
      Submit Feedback
    </button>

    <p className="text-center mt-3">{msg}</p>

    {sentiment && (
      <div className="alert alert-info text-center mt-3">
        AI Sentiment: <b>{sentiment}</b>
      </div>
    )}
  </div>
);

}

export default Feedback;
