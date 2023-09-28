import { Card } from "antd";
import { Comment } from "src/types/api/comment";
import CommentInput from "src/components/pages/posts/index/CommentInput";
import CommentElement from "src/components/pages/posts/index/CommentElement";
import { useState } from "react";

interface Props {
  comments: Comment[];
  mutate: () => void;
}

function PostCommentSection({ comments, mutate }: Props) {
  const [replyingParent, setReplyingParent] = useState<number | null>(null);

  return (
    <Card title="댓글">
      <CommentInput mutate={mutate} />
      {comments.map((comment) => (
        <CommentElement
          key={comment.id}
          comment={comment}
          replyingParent={replyingParent}
          setReplyingParent={setReplyingParent}
          mutate={mutate}
        />
      ))}
    </Card>
  );
}

export default PostCommentSection;
