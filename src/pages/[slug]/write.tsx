import { Button, Card, Checkbox, Form, Input, Modal, Select, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CommonListResponse } from "src/types/api/common";
import { Category } from "src/types/api/category";
import { API_ROUTES } from "src/constants/routes";
import useAuth from "src/contexts/auth/useAuth";
import { useEffect, useState } from "react";
import { PostDetail, PostWritten } from "src/types/api/post";
import useNotification from "src/contexts/notification/useNotfication";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import useAuthSWR from "src/hooks/api/common/useAuthSWR";
import ContentEditor from "src/components/common/ContentEditor";
import { clientAxios } from "src/utils/common/clientAxios";
import { AxiosError } from "axios";
import extractFirstImage from "src/utils/[slug]/extractFirstImage";

interface FormValues extends PostWritten {}

function PostWritePage() {
  const { slug } = useParams();
  const { logout } = useAuth();
  const { data: categories } = useAuthSWR<CommonListResponse<Category>>(
    slug
      ? {
          url: API_ROUTES.categories.bySlug(slug),
        }
      : null
  );
  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const [content, setContent] = useState("");
  const [isOnPaste, setIsOnPaste] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { api } = useNotification();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    const thumbnail = extractFirstImage(content);
    const post = { ...values, content, thumbnail };
    try {
      const { data: newPost } = await clientAxios.post<PostDetail>(
        API_ROUTES.posts.bySlug(String(slug)),
        post
      );
      api.success({ message: "게시글이 등록되었습니다." });
      localStorage.removeItem("content-autosave-draft");
      localStorage.removeItem("content-autosave-time");
      navigate(`/${slug}/${newPost.id}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.code === "token_not_valid") {
          api.error({
            message: "게시글 등록에 실패하였습니다.",
            description: "로그인이 만료되었습니다.",
          });
        }
        logout();
      } else {
        api.error({ message: "게시글 등록에 실패하였습니다.", description: "다시 시도해주세요." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("copiedPost")) {
      setIsOnPaste(true);
    }
  }, []);

  const pastePost = () => {
    setContent(localStorage.getItem("copiedPost") || "");
    localStorage.removeItem("copiedPost");
    setIsOnPaste(false);
  };

  const deleteCopiedPost = () => {
    localStorage.removeItem("copiedPost");
    setIsOnPaste(false);
  };

  return (
    <Card>
      <ContentHeaderSection title="글쓰기" />
      <Form onFinish={onFinish}>
        <div className="flex gap-4 flex-wrap">
          <Form.Item
            label="카테고리"
            name="categoryId"
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
        <ContentEditor setContent={setContent} content={content} />
        <Form.Item className="flex mt-6 justify-end">
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            저장하기
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={isOnPaste}
        title="게시글 붙여넣기"
        onOk={() => pastePost()}
        onCancel={() => setIsOnPaste(false)}
        okText="붙여넣기"
        cancelText="취소"
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button danger onClick={() => deleteCopiedPost()}>
              지우기
            </Button>
            <OkBtn />
          </>
        )}
      >
        <div className="flex flex-col gap-2">
          <Typography.Text>복사한 게시글을 사용하시겠습니까?</Typography.Text>
        </div>
      </Modal>
    </Card>
  );
}

export default PostWritePage;
