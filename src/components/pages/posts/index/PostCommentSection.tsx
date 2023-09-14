import { Divider, Typography } from "antd";
import { Comment } from "src/types/api/comment";
import CommentInput from "src/components/pages/posts/index/CommentInput";
import CommentElement from "src/components/pages/posts/index/CommentElement";

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
