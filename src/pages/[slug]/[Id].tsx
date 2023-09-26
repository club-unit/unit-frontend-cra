import PostHeaderSection from "src/components/pages/posts/index/PostHeaderSection";
import PostContentSection from "src/components/pages/posts/index/PostContentSection";
import PostFooterSection from "src/components/pages/posts/index/PostFooterSection";
import PostCommentSection from "src/components/pages/posts/index/PostCommentSection";
import { PostDetail } from "src/types/api/post";
import { API_ROUTES } from "src/constants/routes";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostEditSection from "src/components/pages/posts/index/PostEditSection";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import useAuthSWR from "src/hooks/useAuthSWR";

function PostPage() {
  const { slug, id } = useParams();
  const { data: post, mutate } = useAuthSWR<PostDetail>({
    url: API_ROUTES.posts.bySlugAndId(String(slug), Number(id)),
  });
  const [isEditing, setIsEditing] = useState(false);

  return post ? (
    <>
      {isEditing ? (
        <>
          <ContentHeaderSection title="글 수정" />
          <PostEditSection post={post} setIsEditing={setIsEditing} mutate={mutate} />
        </>
      ) : (
        <>
          <PostHeaderSection post={post} />
          <PostContentSection post={post} />
          <PostFooterSection setIsEditing={setIsEditing} />
        </>
      )}
      <PostCommentSection comments={post.comments} mutate={mutate} />
    </>
  ) : (
    <Spin />
  );
}

export default PostPage;
