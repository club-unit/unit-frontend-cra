import { Divider, Typography } from "antd";
import CommentElement from "@/components/pages/posts/index/CommentElement";
import { Comment } from "@/types/api/comment";
import CommentInput from "@/components/pages/posts/index/CommentInput";

interface Props {
  comments: Comment[];
}

function PostCommentSection({ comments }: Props) {
  return (
    <div>
      <Divider orientation="left">
        <Typography.Title level={3}>Comments</Typography.Title>
      </Divider>

      <div className="px-2">
        <CommentInput />
        {comments.map((comment) => (
          <CommentElement key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default PostCommentSection;
