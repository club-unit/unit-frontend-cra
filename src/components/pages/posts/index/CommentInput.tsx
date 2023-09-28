import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";
import { useState } from "react";

interface Props {
  parentId?: number;
  mutate: () => void;
}

interface FormValues {
  content: string;
}

function CommentInput({ parentId, mutate }: Props) {
  const { slug, id } = useParams();
  const { api } = useNotification();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    const comment = { content: values.content, parentComment: parentId, post: id };
    try {
      await clientAxios.post(
        API_ROUTES.comments.bySlugAndPostId(String(slug), Number(id)),
        comment
      );
      mutate();
      form.resetFields();
      api.success({ message: "댓글이 등록되었습니다." });
    } catch (e) {
      api.error({ message: "댓글 등록에 실패하였습니다.", description: "다시 시도해주세요." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} className="flex flex-col">
      <Form.Item
        name="content"
        rules={[{ required: true, message: "댓글을 입력하세요!" }]}
        className="w-full"
      >
        <Input.TextArea rows={4} placeholder="댓글을 입력하세요" />
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button type="primary" htmlType="submit" className="bg-blue-600" disabled={isSubmitting}>
          등록
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CommentInput;
