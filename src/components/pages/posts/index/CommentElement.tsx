import { Avatar, Button, Modal, Typography } from "antd";
import { Comment } from "src/types/api/comment";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Dispatch, useState } from "react";
import CommentInput from "src/components/pages/posts/index/CommentInput";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { useParams } from "react-router-dom";
import useNotification from "src/contexts/notification/useNotfication";
import useAuth from "src/contexts/auth/useAuth";
import BadgeSet from "src/components/common/BadgeSet";
import formatDateString from "src/utils/dateToString";
import { AxiosError } from "axios";

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
  const { user, logout } = useAuth();
  const [isOnDelete, setIsOnDelete] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);

  const handleDelete = async () => {
    try {
      await clientAxios.delete(
        API_ROUTES.comments.bySlugAndPostIdAndId(String(slug), Number(id), comment.id)
      );
      mutate();
      api.success({ message: "댓글이 삭제되었습니다." });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.code === "token_not_valid") {
          api.error({
            message: "댓글 삭제에 실패했습니다.",
            description: "로그인이 만료되었습니다.",
          });
          logout();
        }
      } else {
        api.error({ message: "댓글 삭제에 실패했습니다.", description: "다시 시도해주세요." });
      }
    }
  };

  return (
    <div className={`${isChildren ? "w-[98%]" : "w-full"} items-end border-t-2 ml-auto`}>
      <div className="flex flex-col py-2 px-4 w-full gap-2">
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex gap-2">
            <Avatar icon={<UserOutlined />} src={comment.author.profile.profilePhoto} />
            <div className="flex gap-1 items-center">
              <BadgeSet user={comment.author} height={20} />
              <Typography.Text className="whitespace-nowrap">
                {comment.author.profile.name}
              </Typography.Text>
              <div className="flex gap-1 ml-2">
                <ClockCircleOutlined />
                <Typography.Text className="whitespace-nowrap">
                  {formatDateString(comment.created)}
                </Typography.Text>
              </div>
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
            {comment.author.id === user?.id && (
              <>
                <Button size="small" type="text" onClick={() => setIsOnEdit(true)}>
                  수정
                </Button>
                <Button size="small" type="text" onClick={() => setIsOnDelete(true)}>
                  삭제
                </Button>
              </>
            )}
          </div>
        </div>
        {isOnEdit ? (
          <CommentInput initialComment={comment} setIsOnEdit={setIsOnEdit} mutate={mutate} />
        ) : (
          <div className="flex flex-col">
            {comment.content.split("\n").map((line, index) => (
              <Typography.Text className="my-0" key={index}>
                {line}
              </Typography.Text>
            ))}
          </div>
        )}
        {replyingParent === comment.id ? (
          <CommentInput parentId={comment.id} mutate={mutate} />
        ) : null}
        <Modal
          open={isOnDelete}
          title="댓글 삭제 확인"
          onOk={handleDelete}
          onCancel={() => setIsOnDelete(false)}
          okText="삭제"
          cancelText="취소"
          okType="danger"
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          )}
        >
          <p>댓글을 삭제하시겠습니까?</p>
        </Modal>
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
