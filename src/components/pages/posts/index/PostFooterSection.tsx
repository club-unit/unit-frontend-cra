import { Dispatch, useState } from "react";
import { Button, Modal } from "antd";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { Link, useNavigate, useParams } from "react-router-dom";
import useNotification from "src/contexts/notification/useNotfication";

interface Props {
  setIsEditing: Dispatch<boolean>;
  content: string;
  isMine: boolean;
}

function PostFooterSection({ setIsEditing, isMine, content }: Props) {
  const { slug, id } = useParams();
  const { api } = useNotification();
  const [isOnDelete, setIsOnDelete] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await clientAxios.delete(API_ROUTES.posts.bySlugAndId(String(slug), Number(id)));
      api.success({ message: "게시글이 삭제되었습니다." });
      navigate(`/${slug}`);
    } catch (error) {
      api.success({ message: "게시글 삭제에 실패했습니다.", description: "다시 시도해주세요" });
    }
  };

  const copyPost = () => {
    localStorage.setItem("copiedPost", content);
    api.success({ message: "게시글이 복사되었습니다." });
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 justify-end">
        <Link to={`/${slug}`}>
          <Button type="primary" className="bg-blue-600">
            목록으로
          </Button>
        </Link>
      </div>
      <div className="flex gap-2 justify-end">
        <Button onClick={() => copyPost()}>글 복사</Button>
        {isMine && (
          <>
            <Button onClick={() => setIsEditing(true)}>수정</Button>
            <Button type="primary" danger onClick={() => setIsOnDelete(true)}>
              삭제
            </Button>
          </>
        )}
      </div>
      <Modal
        open={isOnDelete}
        title="게시글 삭제 확인"
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
        <p>게시글을 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
}

export default PostFooterSection;
