import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      alert("Admin login required");
      return;
    }

    axios
      .get("http://127.0.0.1:5000/admin/feedbacks")
      .then((res) => setData(res.data))
      .catch(() => alert("Error loading dashboard"));
  }, []);

  if (!data) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div>
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row text-center mb-4">
        <div className="col">
          <div className="card p-3">
            <h5>Total Feedback</h5>
            <h3>{data.total_feedback}</h3>
          </div>
        </div>

        <div className="col">
          <div className="card p-3">
            <h5 className="text-success">Positive</h5>
            <h3>{data.positive}</h3>
          </div>
        </div>

        <div className="col">
          <div className="card p-3">
            <h5 className="text-danger">Negative</h5>
            <h3>{data.negative}</h3>
          </div>
        </div>
      </div>

      <h4 className="mb-3">All Reviews</h4>

      {data.feedbacks.map((f) => (
        <div key={f.id} className="card p-3 mb-3">
          <p><b>Comment:</b> {f.comment}</p>
          <p><b>Rating:</b> {f.rating}</p>
          <p>
            <b>Sentiment:</b>{" "}
            <span className={
              f.sentiment === "positive"
                ? "text-success fw-bold"
                : "text-danger fw-bold"
            }>
              {f.sentiment}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
