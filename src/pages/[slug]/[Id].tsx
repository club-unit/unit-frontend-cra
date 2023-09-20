import PostHeaderSection from "src/components/pages/posts/index/PostHeaderSection";
import PostContentSection from "src/components/pages/posts/index/PostContentSection";
import PostFooterSection from "src/components/pages/posts/index/PostFooterSection";
import PostCommentSection from "src/components/pages/posts/index/PostCommentSection";
import { MOCKUP_POST_DETAIL } from "src/mockups/post";

function PostPage() {
  const post = MOCKUP_POST_DETAIL;

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
