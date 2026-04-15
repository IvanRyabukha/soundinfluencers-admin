import React from "react";
import previewFallback from "./assets/video (2).png";
import play from "./assets/play.svg";
import {getFilePreview} from "@/entities/campaign-managment/api/preview-video.ts";
import {LoaderPreview} from "@/shared/ui/loader-preview/loader.tsx";
interface PreviewVideoProps {
  previewUrl?: string | null; // если уже есть url
  pathLower?: string;
  fileId?: string;
  urlInsight?: string
}

export const PreviewPhoto: React.FC<PreviewVideoProps> = ({
  previewUrl,
  pathLower,
  fileId,urlInsight
}) => {
  const [url, setUrl] = React.useState<string | null>(previewUrl ?? null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (previewUrl) return;
    if (!pathLower || !fileId) return;

    let objectUrl: string;

    const loadPreview = async () => {
      try {
        setLoading(true);

        const blob = await getFilePreview({
          provider: "dropbox",
          pathLower,
          fileId,
          sizeTag: "w960h640",
        });

        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void loadPreview();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [previewUrl, pathLower, fileId]);

  return (
    <div className="video">
      {url && (
        <div className="video-play">
          <div className="video-play__play">
            <img src={play} alt="" />
          </div>
        </div>
      )}
      {loading ? (
        <LoaderPreview />
      ) : url && !error ? (
        <img src={url} alt="preview" />
      ) : (
        <img src={urlInsight || previewFallback} alt="no preview" />
      )}
    </div>
  );
};
