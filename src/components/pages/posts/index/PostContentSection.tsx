import { PostDetail } from "src/types/api/post";

interface Props {
  post: PostDetail;
}

function PostContentSection({ post }: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: post.content }} className="post-content-wrapper" />
  );
}

export default PostContentSection;
