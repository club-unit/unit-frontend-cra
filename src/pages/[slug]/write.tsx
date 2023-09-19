import { Button, Checkbox, Form, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { CommonListResponse } from "src/types/api/common";
import { Category } from "src/types/api/category";
import { API_ROUTES } from "src/constants/routes";
import useAuth from "src/contexts/auth/useAuth";
import PostWriteHeaderSection from "src/components/pages/posts/write/PostWriteHeaderSection";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { PostDetail } from "src/types/api/post";
import useNotification from "src/contexts/notification/useNotfication";
import { clientAxios } from "src/utils/clientAxios";

interface FormValues extends Pick<PostDetail, "title" | "category" | "isPinned"> {}

function PostWritePage() {
  const { slug } = useParams();
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
  const [content, setContent] = useState("");
  const { api } = useNotification();
  const navigate = useNavigate();
  const onFinish = async (values: FormValues) => {
    const post = { ...values, author: user?.id, content };
    try {
      await clientAxios.post(API_ROUTES.posts.bySlug(String(slug)), post);
      api.success({ message: "게시글이 등록되었습니다." });
      navigate(`/${slug}`);
    } catch (e) {
      api.error({ message: "게시글 등록에 실패하였습니다.", description: "다시 시도해주세요." });
    }
  };

  return (
    <>
      <PostWriteHeaderSection />
      <Form onFinish={onFinish}>
        <div className="flex gap-4">
          <Form.Item
            label="카테고리"
            name="category"
            rules={[{ required: true, message: "카테고리를 선택하세요!" }]}
            className="w-1/4"
          >
            <Select options={categoryOptions} />
          </Form.Item>
          <Form.Item label="고정글 여부" name="isPinned">
            <Checkbox />
          </Form.Item>
        </div>
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "제목을 입력하세요!" }]}
          className="w-full"
        >
          <Input />
        </Form.Item>
        <Editor
          apiKey={process.env.REACT_APP_EDITOR_API_KEY}
          onEditorChange={setContent}
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
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "lists table link charmap searchreplace | " +
              "image media codesample emoticons fullscreen preview | " +
              "removeformat | help ",
          }}
        />
        <Form.Item className="flex mt-6 justify-end">
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            저장하기
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default PostWritePage;
