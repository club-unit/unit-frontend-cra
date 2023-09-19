import PostHeaderSection from "src/components/pages/posts/index/PostHeaderSection";
import PostContentSection from "src/components/pages/posts/index/PostContentSection";
import PostFooterSection from "src/components/pages/posts/index/PostFooterSection";
import PostCommentSection from "src/components/pages/posts/index/PostCommentSection";
import useSWR from "swr";
import { PostDetail } from "src/types/api/post";
import { API_ROUTES } from "src/constants/routes";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";
import { useState } from "react";
import PostEditSection from "src/components/pages/posts/index/PostEditSection";
import PostEditHeaderSection from "src/components/pages/posts/index/PostEditHeaderSection";

function PostPage() {
  const { slug, id } = useParams();
  const { token } = useAuth();
  const { data: post, mutate } = useSWR<PostDetail>({
    url: API_ROUTES.posts.bySlugAndId(String(slug), Number(id)),
    token,
  });
  const [isEditing, setIsEditing] = useState(false);

  return post ? (
    <>
      {isEditing ? (
        <>
          <PostEditHeaderSection />
          <PostEditSection post={post} setIsEditing={setIsEditing} mutate={mutate} />
        </>
      ) : (
        <>
          <PostHeaderSection post={post} />
          <PostContentSection post={post} />
          <PostFooterSection setIsEditing={setIsEditing} />
        </>
      )}
      <PostCommentSection comments={post.comments} />
    </>
  ) : (
    <Spin />
  );
}

export default PostPage;
