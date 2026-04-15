import { useMutation } from "@tanstack/react-query";
import { uploadImageApi } from "@/entities/file/api/upload-file.api.ts";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: uploadImageApi,
  });
};
