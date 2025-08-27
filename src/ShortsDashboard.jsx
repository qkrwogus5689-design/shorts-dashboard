import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 쇼츠 영상 통계 대시보드</h1>
      <div className="space-y-2 mb-4">
        <Label htmlFor="video-id">유튜브 영상 ID 입력</Label>
        <Input
          id="video-id"
          placeholder="예: dQw4w9WgXcQ"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <Button onClick={handleFetch}>영상 불러오기</Button>
      </div>
      {results && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">🎬 {results.title}</h2>
            <p>조회수: {results.views.toLocaleString()}회</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>원본 영상</Label>
                <video src={results.original} controls className="w-full rounded-xl" />
              </div>
              <div>
                <Label>편집된 영상</Label>
                <video src={results.edited} controls className="w-full rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
