import { Editor } from "@tinymce/tinymce-react";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { useParams } from "react-router-dom";

interface Props {
  initialValue?: string;
  setContent: (value: string) => void;
  content: string;
}

function ContentEditor({ initialValue, setContent, content }: Props) {
  const { slug } = useParams();

  const handleImage = (blobInfo: {
    id: () => string;
    name: () => string;
    filename: () => string;
    blob: () => Blob;
    base64: () => string;
    blobUri: () => string;
    uri: () => string | undefined;
  }) => {
    const formData = new FormData();
    formData.append("image", blobInfo.blob());
    return clientAxios
      .post<{ url: string }>(API_ROUTES.posts.uploadImage(slug ? slug : ""), formData)
      .then((res) => res.data.url);
  };

  return (
    <Editor
      apiKey={process.env.REACT_APP_EDITOR_API_KEY}
      onEditorChange={setContent}
      initialValue={initialValue || ""}
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
