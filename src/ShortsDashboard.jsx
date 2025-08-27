import React, { useEffect, useState } from "react";

const API_KEY = "AIzaSyBRuehII9HQjaYi3c92VAldt8V4P8f8Cis"; // 
const MAX_RESULTS = 10;
const REGION_CODE = "KR"; // 또는 "US" 등 원하는 국가 코드

export default function ShortsDashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPopularShorts = async () => {
    setLoading(true);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=${MAX_RESULTS}&regionCode=${REGION_CODE}&videoCategoryId=0&key=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.items) {
        const shorts = data.items.filter(
          (item) => item.statistics.viewCount >= 10000000 && item.snippet.title.length <= 100
        );
        setVideos(shorts);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error("API 요청 실패", err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularShorts();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}>
        📈 인기 유튜브 쇼츠 (조회수 1천만 이상)
      </h1>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {videos.map((video) => (
            <div key={video.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "12px" }}>
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h3 style={{ marginTop: "0.5rem", fontSize: "16px", fontWeight: "bold" }}>{video.snippet.title}</h3>
              <p>채널: {video.snippet.channelTitle}</p>
              <p>조회수: {Number(video.statistics.viewCount).toLocaleString()}회</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2563eb", textDecoration: "underline" }}
              >
                ▶ 영상 보기
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
