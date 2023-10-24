import { PostDetail } from "src/types/api/post";
import { Dispatch, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";
import { CommonListResponse } from "src/types/api/common";
import { Category } from "src/types/api/category";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import { clientAxios } from "src/utils/clientAxios";
import useAuthSWR from "src/hooks/useAuthSWR";
import ContentEditor from "src/components/common/ContentEditor";
import extractFirstImage from "src/utils/extractFirstImage";

interface Props {
  post: PostDetail;
  setIsEditing: Dispatch<boolean>;
  mutate: () => void;
}

interface FormValues extends Pick<PostDetail, "title" | "category" | "isPinned"> {}

function PostEditSection({ post, setIsEditing, mutate }: Props) {
  const { slug, id } = useParams();
  const { user } = useAuth();
  const { data: categories } = useAuthSWR<CommonListResponse<Category>>(
    slug
      ? {
          url: API_ROUTES.categories.bySlug(slug),
        }
      : null
  );
  const categoryOptions = categories?.map((category) => ({
    value: category.name,
    label: category.name,
  }));
  const [content, setContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { api } = useNotification();
  const onFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    const thumbnail = extractFirstImage(content);
    const post = { ...values, author: user?.id, content, thumbnail };
    try {
      await clientAxios.patch(API_ROUTES.posts.bySlugAndId(String(slug), Number(id)), post);
      mutate();
      setIsEditing(false);
      localStorage.removeItem("content-autosave-draft");
      localStorage.removeItem("content-autosave-time");
      api.success({ message: "게시글이 수정되었습니다." });
    } catch (e) {
      api.error({ message: "게시글 수정에 실패하였습니다.", description: "다시 시도해주세요." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <div className="flex gap-4 flex-wrap">
        <Form.Item label="카테고리" name="category" initialValue={post.category} className="w-1/4">
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
      <ContentEditor setContent={setContent} initialValue={post.content} content={content} />
      <Form.Item className="flex mt-6 justify-end">
        <Button type="primary" htmlType="submit" className="bg-blue-600" disabled={isSubmitting}>
          저장하기
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PostEditSection;
