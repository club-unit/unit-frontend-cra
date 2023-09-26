import { Editor } from "@tinymce/tinymce-react";
import { PostDetail } from "src/types/api/post";
import { Dispatch, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";
import useSWR from "swr";
import { CommonListResponse } from "src/types/api/common";
import { Category } from "src/types/api/category";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import { clientAxios } from "src/utils/clientAxios";

interface Props {
  post: PostDetail;
  setIsEditing: Dispatch<boolean>;
  mutate: () => void;
}

interface FormValues extends Pick<PostDetail, "title" | "category" | "isPinned"> {}

function PostEditSection({ post, setIsEditing, mutate }: Props) {
  const { slug, id } = useParams();
  const { token, user } = useAuth();
  const { data: categories } = useSWR<CommonListResponse<Category>>(
    slug
      ? {
          url: API_ROUTES.categories.bySlug(slug),
          token,
        }
      : null
  );
  const categoryOptions = categories?.map((category) => ({
    value: category.name,
    label: category.name,
  }));
  const [content, setContent] = useState(post.content);
  const { api } = useNotification();
  const onFinish = async (values: FormValues) => {
    const post = { ...values, author: user?.id, content };
    try {
      await clientAxios.patch(API_ROUTES.posts.bySlugAndId(String(slug), Number(id)), post);
      mutate();
      setIsEditing(false);
      api.success({ message: "게시글이 수정되었습니다." });
    } catch (e) {
      api.error({ message: "게시글 수정에 실패하였습니다.", description: "다시 시도해주세요." });
    }
  };
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
    <Form onFinish={onFinish}>
      <div className="flex gap-4 flex-wrap">
        <Form.Item
          label="카테고리"
          name="category"
          initialValue={post.category}
          rules={[{ required: true, message: "카테고리를 선택하세요!" }]}
          className="w-1/4"
        >
          <Select options={categoryOptions} />
        </Form.Item>
        <Form.Item
          label="고정글 여부"
          name="isPinned"
          initialValue={post.isPinned}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </div>
      <Form.Item
        label="제목"
        name="title"
        initialValue={post.title}
        rules={[{ required: true, message: "제목을 입력하세요!" }]}
        className="w-full"
      >
        <Input />
      </Form.Item>
      <Editor
        apiKey={process.env.REACT_APP_EDITOR_API_KEY}
        onEditorChange={setContent}
        initialValue={post.content}
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
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "lists table link charmap searchreplace | " +
            "image fullscreen preview | " +
            "removeformat | help ",
          images_upload_handler: handleImage,
        }}
      />
      <Form.Item className="flex mt-6 justify-end">
        <Button type="primary" htmlType="submit" className="bg-blue-600">
          저장하기
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PostEditSection;
