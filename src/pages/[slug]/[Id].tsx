import PostContentSection from "src/components/pages/posts/index/PostContentSection";
import PostFooterSection from "src/components/pages/posts/index/PostFooterSection";
import PostCommentSection from "src/components/pages/posts/index/PostCommentSection";
import { Card, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostEditSection from "src/components/pages/posts/index/PostEditSection";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import useAuth from "src/contexts/auth/useAuth";
import PostHeaderSection from "src/components/pages/posts/index/PostHeaderSection";
import useNotification from "src/contexts/notification/useNotfication";
import usePost from "src/hooks/api/[slug]/usePost";

function PostPage() {
  const { slug, id } = useParams();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { api } = useNotification();

  const { data: post, mutate, error } = usePost(String(slug), Number(id));

  useEffect(() => {
    if (error?.response?.status === 404) {
      api.error({ message: "존재하지 않는 게시글입니다." });
      navigate(`/${slug}`);
    }
  }, [api, error, navigate, slug]);

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
          <PostFooterSection
            setIsEditing={setIsEditing}
            isMine={post?.author?.id === user?.id || user?.id === 2 || user?.id === 1}
            /**
             * @TODO isAdmin 사용하도록 수정해야 함!
             */
            content={post.content}
          />
        </Card>
      )}
      <PostCommentSection comments={post.comments} mutate={mutate} />
    </div>
  ) : (
    <Spin />
  );
}

export default PostPage;
