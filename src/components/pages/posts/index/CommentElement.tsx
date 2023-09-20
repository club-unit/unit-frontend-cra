import { Button, Image, Typography } from "antd";
import { Comment } from "src/types/api/comment";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface Props {
  comment: Comment;
  isChildren?: boolean;
}

function CommentElement({ comment, isChildren }: Props) {
  return (
    <div className={`${isChildren ? "w-[98%]" : "w-full"} items-end border-t-2 ml-auto`}>
      <div className="flex flex-col py-2 px-4 w-full gap-2">
        <div className="flex justify-between w-full">
          <div className="flex gap-1">
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
            <Typography.Text>{comment.author.profile.name}</Typography.Text>
            <div className="flex gap-2 ml-4">
              <ClockCircleOutlined />
              <Typography.Text>{dayjs(comment.created).format("MM/DD hh:mm")}</Typography.Text>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="small" type="text">
              답글
            </Button>
            <Button size="small" type="text">
              수정
            </Button>
            <Button size="small" type="text">
              삭제
            </Button>
          </div>
        </div>
        <Typography.Text>{comment.content}</Typography.Text>
      </div>
      {comment.children.length
        ? comment.children.map((child) => <CommentElement comment={child} isChildren />)
        : null}
    </div>
  );
}

export default CommentElement;
