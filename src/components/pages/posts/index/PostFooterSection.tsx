import { Dispatch } from "react";
import { Button } from "antd";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { Link, useNavigate, useParams } from "react-router-dom";
import useNotification from "src/contexts/notification/useNotfication";

interface Props {
  setIsEditing: Dispatch<boolean>;
}

function PostFooterSection({ setIsEditing }: Props) {
  const { slug, id } = useParams();
  const { api } = useNotification();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await clientAxios.delete(API_ROUTES.posts.bySlugAndId(String(slug), Number(id)));
      api.success({ message: "게시글이 삭제되었습니다." });
      navigate(`/${slug}`);
    } catch (error) {
      api.success({ message: "게시글이 삭제에 실패했습니다.", description: "다시 시도해주세요" });
    }
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
        <Button onClick={() => setIsEditing(true)}>수정</Button>
        <Button type="primary" danger onClick={() => handleDelete()}>
          삭제
        </Button>
      </div>
    </div>
  );
}

export default PostFooterSection;
