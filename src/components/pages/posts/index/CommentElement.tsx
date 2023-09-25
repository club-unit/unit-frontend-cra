import { Button, Image, Typography } from "antd";
import { Comment } from "src/types/api/comment";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Dispatch } from "react";
import CommentInput from "src/components/pages/posts/index/CommentInput";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { useParams } from "react-router-dom";
import useNotification from "src/contexts/notification/useNotfication";

interface Props {
  comment: Comment;
  isChildren?: boolean;
  replyingParent: number | null;
  setReplyingParent: Dispatch<number | null>;
  mutate: () => void;
}

function CommentElement({ comment, isChildren, replyingParent, setReplyingParent, mutate }: Props) {
  const { slug, id } = useParams();
  const { api } = useNotification();

  const handleDelete = async () => {
    try {
      await clientAxios.delete(
        API_ROUTES.comments.bySlugAndPostIdAndId(String(slug), Number(id), comment.id)
      );
      mutate();
      api.success({ message: "댓글이 삭제되었습니다." });
    } catch (e) {
      api.error({ message: "댓글 삭제에 실패했습니다.", description: "다시 시도해주세요." });
    }
  };

  return (
    <div className={`${isChildren ? "w-[98%]" : "w-full"} items-end border-t-2 ml-auto`}>
      <div className="flex flex-col py-2 px-4 w-full gap-2">
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex gap-2 flex-wrap">
            <Image
              height={20}
              src={`/icons/rank/${comment.author.profile.rank}.png`}
              alt={String(comment.author.profile.rank)}
              preview={false}
            />
            {comment.author.profile.responsibility !== "NONE" &&
              comment.author.profile.responsibility !== "NORMAL" && (
                <Image
                  height={20}
                  src={`/icons/responsibility/${comment.author.profile.responsibility}.png`}
                  alt={String(comment.author?.profile.responsibility)}
                  preview={false}
                />
              )}
            <Typography.Text className="whitespace-nowrap">
              {comment.author.profile.name}
            </Typography.Text>
            <div className="flex gap-2">
              <ClockCircleOutlined />
              <Typography.Text className="whitespace-nowrap">
                {dayjs(comment.created).format("MM/DD hh:mm")}
              </Typography.Text>
            </div>
          </div>
          <div>
            <Button
              size="small"
              type="text"
              onClick={() => {
                setReplyingParent(replyingParent !== comment.id ? comment.id : null);
              }}
            >
              답글
            </Button>
            <Button size="small" type="text">
              수정
            </Button>
            <Button size="small" type="text" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
        <Typography.Text>{comment.content}</Typography.Text>
        {replyingParent === comment.id ? (
          <CommentInput parentId={comment.id} mutate={mutate} />
        ) : null}
      </div>
      {comment.children.length
        ? comment.children.map((child) => (
            <CommentElement
              key={child.id}
              comment={child}
              isChildren
              replyingParent={replyingParent}
              setReplyingParent={setReplyingParent}
              mutate={mutate}
            />
          ))
        : null}
    </div>
  );
}

export default CommentElement;
