import { Button, Input } from "antd";

function CommentInput() {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <Input.TextArea rows={4} placeholder="댓글을 입력하세요" />
      <div className="flex justify-end">
        <Button>등록</Button>
      </div>
    </div>
  );
}

export default CommentInput;
