import { PostDetail, PostWritten } from "src/types/api/post";
import { Dispatch, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import { clientAxios } from "src/utils/common/clientAxios";
import ContentEditor from "src/components/common/ContentEditor";
import extractFirstImage from "src/utils/[slug]/extractFirstImage";
import { AxiosError } from "axios";
import useCategories from "src/hooks/api/[slug]/useCategories";

interface Props {
  post: PostDetail;
  setIsEditing: Dispatch<boolean>;
  mutate: () => void;
}

interface FormValues extends PostWritten {}

function PostEditSection({ post, setIsEditing, mutate }: Props) {
  const { slug, id } = useParams();
  const { logout } = useAuth();
  const { data: categories } = useCategories(String(slug));
  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const [content, setContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { api } = useNotification();
  const onFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    const thumbnail = extractFirstImage(content);
    const post = { ...values, content, thumbnail };
    try {
      await clientAxios.patch(API_ROUTES.posts.bySlugAndId(String(slug), Number(id)), post);
      mutate();
      setIsEditing(false);
      localStorage.removeItem("content-autosave-draft");
      localStorage.removeItem("content-autosave-time");
      api.success({ message: "게시글이 수정되었습니다." });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.code === "token_not_valid") {
          api.error({
            message: "게시글 수정에 실패하였습니다.",
            description: "로그인이 만료되었습니다.",
            key: "token-expire",
          });
          logout();
        }
      } else {
        api.error({ message: "게시글 수정에 실패하였습니다.", description: "다시 시도해주세요." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  return (
    <Form onFinish={onFinish}>
      <div className="flex gap-4 flex-wrap">
        <Form.Item
          label="카테고리"
          name="categoryId"
          initialValue={post.category?.id}
          className="w-1/4"
          rules={
            categoryOptions?.length
              ? [{ required: true, message: "카테고리를 입력하세요!" }]
              : undefined
          }
        >
          <Select options={categoryOptions} disabled={!categoryOptions?.length} />
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
      <ContentEditor setContent={setContent} content={content} />
      <Form.Item className="flex mt-6 justify-end">
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          저장하기
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PostEditSection;
