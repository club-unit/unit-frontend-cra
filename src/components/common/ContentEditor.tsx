import { Editor } from "@tinymce/tinymce-react";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { useParams } from "react-router-dom";
import useNotification from "src/contexts/notification/useNotfication";
import Resizer from "react-image-file-resizer";

interface Props {
  initialValue?: string;
  setContent: (value: string) => void;
  content: string;
}

function ContentEditor({ setContent, content }: Props) {
  const { slug } = useParams();
  const { api } = useNotification();

  const resizeImage = (file: Blob): Promise<Blob> => {
    return new Promise((resolve, _) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "JPEG",
        95,
        0,
        (resizedFile) => {
          resolve(resizedFile as Blob);
        },
        "blob"
      );
    });
  };

  const handleImage = async (blobInfo: {
    id: () => string;
    name: () => string;
    filename: () => string;
    blob: () => Blob;
    base64: () => string;
    blobUri: () => string;
    uri: () => string | undefined;
  }) => {
    const originalBlob = blobInfo.blob();
    const fileExtension = blobInfo.filename().split(".").pop() || "jpeg";
    const fileName = blobInfo.filename();

    if (originalBlob.size > 15 * 1024 * 1024) {
      return Promise.reject({ message: "15MB 이하의 이미지만 업로드 가능합니다.", remove: true });
    }

    try {
      let blobToUpload: Blob;

      if (fileExtension === "jpg" || fileExtension === "jpeg") {
        blobToUpload = await resizeImage(originalBlob);
      } else {
        blobToUpload = originalBlob;
      }

      const formData = new FormData();
      formData.append("image", blobToUpload, fileName);

      const response = await clientAxios.post<{ url: string }>(
        API_ROUTES.posts.uploadImage(slug ? slug : ""),
        formData
      );

      return response.data.url;
    } catch (error) {
      // api.error("이미지 업로드 중 오류가 발생했습니다.");
      return Promise.reject({ message: "이미지 업로드 실패", remove: true });
    }
  };

  return (
    <Editor
      apiKey={process.env.REACT_APP_EDITOR_API_KEY}
      onEditorChange={setContent}
      value={content}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "searchreplace",
          "fullscreen",
          "media",
          "table",
          "code",
          "help",
          "emoticons",
          "codesample",
          "quickbars",
          "autosave",
        ],
        autosave_interval: "1s",
        autosave_restore_when_empty: true,
        autosave_prefix: "content-autosave-",
        toolbar:
          "restoredraft undo | fontsizeinput | " +
          "bold italic underline strikethrough forecolor backcolor alignleft aligncenter " +
          "alignright | bullist numlist outdent indent | " +
          "lists table link charmap searchreplace | " +
          "image fullscreen preview | " +
          "removeformat | help ",
        images_upload_handler: handleImage,
        paste_as_text: true,
      }}
    />
  );
}

export default ContentEditor;
