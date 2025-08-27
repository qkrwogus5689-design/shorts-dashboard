import React, { useState } from "react";

const API_KEY = "AIzaSyBRuehII9HQjaYi3c92VAldt8V4P8f8Cis";

export default function ShortsDashboard() {
  const [videoId, setVideoId] = useState("");
  const [videoData, setVideoData] = useState(null);

  const fetchVideoData = async () => {
    if (!videoId) return;

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        setVideoData({
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails.high.url,
          views: video.statistics.viewCount,
          publishedAt: video.snippet.publishedAt,
        });
      } else {
        setVideoData(null);
        alert("해당 영상 정보를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("API 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}>
        📊 유튜브 영상 정보 불러오기
      </h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="video-id">유튜브 영상 ID</label>
        <input
          id="video-id"
          placeholder="예: dQw4w9WgXcQ"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={fetchVideoData}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          영상 정보 가져오기
        </button>
      </div>

      {videoData && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "12px" }}>
          <img
            src={videoData.thumbnail}
            alt="썸네일"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h2 style={{ marginTop: "1rem", fontWeight: "bold" }}>{videoData.title}</h2>
          <p>채널명: {videoData.channel}</p>
          <p>조회수: {Number(videoData.views).toLocaleString()}회</p>
          <p>업로드 날짜: {new Date(videoData.publishedAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
