import { Divider, Typography } from "antd";
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
    <div>
      <Divider orientation="left">
        <Typography.Title level={3}>Comments</Typography.Title>
      </Divider>
      <div className="px-2">
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
      </div>
    </div>
  );
}

export default PostCommentSection;
