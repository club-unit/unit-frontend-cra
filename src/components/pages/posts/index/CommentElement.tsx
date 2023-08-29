import { Comment } from "@/types/api/comment";
import { Typography } from "antd";

interface Props {
  comment: Comment;
}

function CommentElement({ comment }: Props) {
  return (
    <div className="flex flex-col border-y-2 py-2 px-4 items-start w-full gap-2">
      <div>
        <Typography.Text strong>{comment.author.profile.name}</Typography.Text>
      </div>
      <Typography.Text>{comment.content}</Typography.Text>
    </div>
  );
}

export default CommentElement;
