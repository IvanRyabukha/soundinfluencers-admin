import React from "react";
import {LoaderPreview} from "@/shared/ui/loader-preview/loader.tsx";
import {getVideoBlobUrl} from "@/entities/campaign-managment/api/preview-video.ts";




interface VideoPreviewProps {
  videoUrl?: string | null;
  pathLower?: string;
  className?: string;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  pathLower,
  className,
}) => {
  const [url, setUrl] = React.useState<string | null>(videoUrl ?? null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (videoUrl) return;
    if (!pathLower) return;

    const loadVideo = async () => {
      try {
        setLoading(true);

        const fetchedUrl = await getVideoBlobUrl({
          provider: "dropbox",
          pathLower,
        });

        setUrl(fetchedUrl);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void loadVideo();
  }, [videoUrl, pathLower]);

  return (
    <div className={`video-url ${className}`}>
      {loading ? (
        <LoaderPreview />
      ) : (
        url && !error && <video src={url} controls preload="metadata" />
      )}
    </div>
  );
};
