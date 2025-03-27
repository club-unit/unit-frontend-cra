import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import { Dispatch, useState } from "react";
import { Comment } from "src/types/api/comment";
import { AxiosError } from "axios";
import useAuth from "src/contexts/auth/useAuth";

interface Props {
  parentId?: number;
  mutate: () => void;
  initialComment?: Comment;
  setIsOnEdit?: Dispatch<boolean>;
  setReplyingParent?: Dispatch<number | null>;
}

interface FormValues {
  content: string;
}

function CommentInput({ parentId, mutate, initialComment, setIsOnEdit, setReplyingParent }: Props) {
  const { logout } = useAuth();
  const { slug, id } = useParams();
  const { api } = useNotification();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onPostFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    const comment = { content: values.content, parentCommentId: parentId };
    try {
      await clientAxios.post(
        API_ROUTES.comments.bySlugAndPostId(String(slug), Number(id)),
        comment
      );
      mutate();
      form.resetFields();
      api.success({ message: "댓글이 등록되었습니다." });
      setReplyingParent && setReplyingParent(null);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.code === "token_not_valid") {
          api.error({
            message: "댓글 등록에 실패하였습니다.",
            description: "로그인이 만료되었습니다.",
            key: "token-expire",
          });
          logout();
        }
      } else {
        api.error({ message: "댓글 등록에 실패하였습니다.", description: "다시 시도해주세요." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEditFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    const comment = { content: values.content, parentComment: parentId, post: id };
    try {
      await clientAxios.patch(
        API_ROUTES.comments.bySlugAndPostIdAndId(
          String(slug),
          Number(id),
          Number(initialComment?.id)
        ),
        comment
      );
      mutate();
      form.resetFields();
      api.success({ message: "댓글이 수정되었습니다." });
      if (setIsOnEdit) {
        setIsOnEdit(false);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.code === "token_not_valid") {
          api.error({
            message: "댓글 수정에 실패하였습니다.",
            description: "로그인이 만료되었습니다.",
            key: "token-expire",
          });
          logout();
        }
      } else {
        api.error({ message: "댓글 수정에 실패하였습니다.", description: "다시 시도해주세요." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={initialComment ? onEditFinish : onPostFinish}
      className="flex flex-col"
    >
      <Form.Item
        name="content"
        rules={[{ required: true, message: "댓글을 입력하세요!" }]}
        initialValue={initialComment?.content}
        className="w-full"
      >
        <Input.TextArea rows={4} placeholder="댓글을 입력하세요" />
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          등록
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CommentInput;
