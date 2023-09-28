import PostContentSection from "src/components/pages/posts/index/PostContentSection";
import PostFooterSection from "src/components/pages/posts/index/PostFooterSection";
import PostCommentSection from "src/components/pages/posts/index/PostCommentSection";
import { PostDetail } from "src/types/api/post";
import { API_ROUTES } from "src/constants/routes";
import { Card, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostEditSection from "src/components/pages/posts/index/PostEditSection";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import useAuthSWR from "src/hooks/useAuthSWR";
import useAuth from "src/contexts/auth/useAuth";
import PostHeaderSection from "src/components/pages/posts/index/PostHeaderSection";

function PostPage() {
  const { slug, id } = useParams();
  const { user } = useAuth();
  const { data: post, mutate } = useAuthSWR<PostDetail>({
    url: API_ROUTES.posts.bySlugAndId(String(slug), Number(id)),
  });
  const [isEditing, setIsEditing] = useState(false);

  return post ? (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <Card>
          <ContentHeaderSection title="글 수정" />
          <PostEditSection post={post} setIsEditing={setIsEditing} mutate={mutate} />
        </Card>
      ) : (
        <Card title={<PostHeaderSection post={post} />}>
          <PostContentSection post={post} />
          <PostFooterSection setIsEditing={setIsEditing} isMine={post?.author?.id === user?.id} />
        </Card>
      )}
      <PostCommentSection comments={post.comments} mutate={mutate} />
    </div>
  ) : (
    <Spin />
  );
}

export default PostPage;
