import { Button, Card, Checkbox, Form, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CommonListResponse } from "src/types/api/common";
import { Category } from "src/types/api/category";
import { API_ROUTES } from "src/constants/routes";
import useAuth from "src/contexts/auth/useAuth";
import { useState } from "react";
import { PostDetail } from "src/types/api/post";
import useNotification from "src/contexts/notification/useNotfication";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import useAuthSWR from "src/hooks/useAuthSWR";
import ContentEditor from "src/components/common/ContentEditor";
import { clientAxios } from "src/utils/clientAxios";
import extractFirstImage from "src/utils/extractFirstImage";

interface FormValues extends Pick<PostDetail, "title" | "category" | "isPinned"> {}

function PostWritePage() {
  const { slug } = useParams();
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
  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { api } = useNotification();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    const thumbnail = extractFirstImage(content);
    const post = { ...values, author: user?.id, content, thumbnail };
    try {
      const { data: newPost } = await clientAxios.post<PostDetail>(
        API_ROUTES.posts.bySlug(String(slug)),
        post
      );
      api.success({ message: "게시글이 등록되었습니다." });
      navigate(`/${slug}/${newPost.id}`);
    } catch (e) {
      api.error({ message: "게시글 등록에 실패하였습니다.", description: "다시 시도해주세요." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <ContentHeaderSection title="글쓰기" />
      <Form onFinish={onFinish}>
        <div className="flex gap-4 flex-wrap">
          <Form.Item
            label="카테고리"
            name="category"
            className="w-1/2"
            rules={
              categoryOptions?.length
                ? [{ required: true, message: "카테고리를 입력하세요!" }]
                : undefined
            }
          >
            <Select options={categoryOptions} disabled={!categoryOptions?.length} />
          </Form.Item>
          <Form.Item label="고정글 여부" name="isPinned" valuePropName="checked">
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
        <ContentEditor setContent={setContent} />
        <Form.Item className="flex mt-6 justify-end">
          <Button type="primary" htmlType="submit" className="bg-blue-600" disabled={isSubmitting}>
            저장하기
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default PostWritePage;
