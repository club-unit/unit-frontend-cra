import PostHeaderSection from "@/components/pages/posts/index/PostHeaderSection";
import { posts } from "@/mockups/post";
import PostContentSection from "@/components/pages/posts/index/PostContentSection";
import PostFooterSection from "@/components/pages/posts/index/PostFooterSection";
import PostCommentSection from "@/components/pages/posts/index/PostCommentSection";

function PostPage() {
  const post = posts[0];

  return (
    <>
      <PostHeaderSection post={post} />
      <PostContentSection />
      <PostFooterSection />
      <PostCommentSection comments={post.comments} />
    </>
  );
}

export default PostPage;
