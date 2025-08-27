import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 유튜브 영상 정보 불러오기</h1>

      <div className="space-y-2 mb-4">
        <Label htmlFor="video-id">유튜브 영상 ID</Label>
        <Input
          id="video-id"
          placeholder="예: dQw4w9WgXcQ"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <Button onClick={fetchVideoData}>영상 정보 가져오기</Button>
      </div>

      {videoData && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <img
              src={videoData.thumbnail}
              alt="썸네일"
              className="rounded-xl w-full"
            />
            <h2 className="text-xl font-semibold">🎬 {videoData.title}</h2>
            <p>채널명: {videoData.channel}</p>
            <p>조회수: {Number(videoData.views).toLocaleString()}회</p>
            <p>업로드 날짜: {new Date(videoData.publishedAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
