import { useState } from "react";

export default function ShortsDashboard() {
  const [videoId, setVideoId] = useState("");
  const [results, setResults] = useState(null);

  const handleFetch = async () => {
    setResults({
      original: `https://example.com/original/${videoId}.mp4`,
      edited: `https://example.com/edited/${videoId}.mp4`,
      title: "예시 영상 제목",
      views: 12000000,
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}>
        📊 쇼츠 영상 통계 대시보드
      </h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="video-id">유튜브 영상 ID 입력</label>
        <input
          id="video-id"
          placeholder="예: dQw4w9WgXcQ"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        <button
          onClick={handleFetch}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          영상 불러오기
        </button>
      </div>

      {results && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>🎬 {results.title}</h2>
          <p>조회수: {results.views.toLocaleString()}회</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <div style={{ flex: "1 1 45%" }}>
              <p>원본 영상</p>
              <video src={results.original} controls style={{ width: "100%" }} />
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <p>편집된 영상</p>
              <video src={results.edited} controls style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
