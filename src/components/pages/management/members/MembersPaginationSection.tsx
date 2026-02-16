import { Pagination, Typography } from "antd";
import { PAGE_SIZE } from "src/constants/pagination";

interface Props {
  page: number;
  pageSize: number;
  total?: number;
  onPageChange: (page: number, pageSize: number) => void;
}

function MembersPaginationSection({ page, pageSize, total, onPageChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 mt-2">
      <Typography.Text type="secondary" className="text-xs">
        총 {total ?? 0}명
      </Typography.Text>
      <Pagination
        current={page}
        pageSize={pageSize}
        onChange={onPageChange}
        defaultPageSize={PAGE_SIZE}
        total={total}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
        size="small"
      />
    </div>
  );
}

export default MembersPaginationSection;
