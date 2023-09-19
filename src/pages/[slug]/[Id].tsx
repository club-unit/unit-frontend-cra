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

function PostPage() {
  const { slug, id } = useParams();
  const { token } = useAuth();
  const { data: post } = useSWR<PostDetail>({
    url: API_ROUTES.posts.bySlugAndId(String(slug), Number(id)),
    token,
  });

  return post ? (
    <>
      <PostHeaderSection post={post} />
      <PostContentSection />
      <PostFooterSection />
      <PostCommentSection comments={post.comments} />
    </>
  ) : (
    <Spin />
  );
}

export default PostPage;
