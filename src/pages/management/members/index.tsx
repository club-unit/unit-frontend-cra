import { useCallback, useEffect, useState } from "react";
import { Button, Card, Spin, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { withAuth } from "src/components/common/withAuth";
import useUsers from "src/hooks/api/users/useUsers";
import useGenerations from "src/hooks/api/generations/useGenerations";
import MembersFilterSection, {
  MembersFilterValues,
} from "src/components/pages/management/members/MembersFilterSection";
import MembersTableSection from "src/components/pages/management/members/MembersTableSection";
import MembersPaginationSection from "src/components/pages/management/members/MembersPaginationSection";
import { Branch, Responsibility } from "src/types/api/profile";
import { PAGE_SIZE } from "src/constants/pagination";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { UsersListUser } from "src/types/api/user";
import { CommonPagedResponse } from "src/types/api/common";
import { exportMembersToExcel } from "src/utils/users/exportMembersToExcel";
import useNotification from "src/contexts/notification/useNotfication";

const EXPORT_PAGE_SIZE = 100;

function ManageMembersMain() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExporting, setIsExporting] = useState(false);
  const { api } = useNotification();

  const filters: MembersFilterValues = {
    search: searchParams.get("search") || undefined,
    branch: (searchParams.get("branch") as Branch) || undefined,
    responsibility: (searchParams.get("responsibility") as Responsibility) || undefined,
    generation: searchParams.get("generation") ? Number(searchParams.get("generation")) : undefined,
    activeGeneration: searchParams.get("activeGeneration")
      ? Number(searchParams.get("activeGeneration"))
      : undefined,
    ordering: searchParams.get("ordering") || undefined,
  };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : PAGE_SIZE;

  const { data: users, isLoading } = useUsers({
    search: filters.search,
    branch: filters.branch,
    responsibility: filters.responsibility,
    generation: filters.generation,
    active_generation: filters.activeGeneration,
    ordering: filters.ordering,
    page,
    page_size: pageSize,
  });

  const { data: generations } = useGenerations();

  const handleFilterChange = useCallback(
    (newFilters: MembersFilterValues) => {
      const params = new URLSearchParams();

      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.branch) params.set("branch", newFilters.branch);
      if (newFilters.responsibility) params.set("responsibility", newFilters.responsibility);
      if (newFilters.generation) params.set("generation", String(newFilters.generation));
      if (newFilters.activeGeneration)
        params.set("activeGeneration", String(newFilters.activeGeneration));
      if (newFilters.ordering) params.set("ordering", newFilters.ordering);
      params.set("page", "1");
      params.set("pageSize", String(pageSize));

      setSearchParams(params);
    },
    [setSearchParams, pageSize]
  );

  const handlePageChange = useCallback(
    (newPage: number, newPageSize: number) => {
      searchParams.set("page", String(newPage));
      searchParams.set("pageSize", String(newPageSize));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleExportExcel = async () => {
    if (!users) return;

    setIsExporting(true);
    try {
      const totalCount = users.count;
      const totalPages = Math.ceil(totalCount / EXPORT_PAGE_SIZE);
      const allUsers: UsersListUser[] = [];

      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const params: Record<string, string | number> = {
          page: currentPage,
          page_size: EXPORT_PAGE_SIZE,
        };

        if (filters.search) params.search = filters.search;
        if (filters.branch) params.branch = filters.branch;
        if (filters.responsibility) params.responsibility = filters.responsibility;
        if (filters.generation) params.generation = filters.generation;
        if (filters.activeGeneration) params.active_generation = filters.activeGeneration;
        if (filters.ordering) params.ordering = filters.ordering;

        const response = await clientAxios.get<CommonPagedResponse<UsersListUser>>(
          API_ROUTES.users.root(),
          { params }
        );
        allUsers.push(...response.data.results);
      }

      exportMembersToExcel(allUsers, filters);
      api.success({ message: `${allUsers.length}명의 회원 정보를 다운로드했습니다.` });
    } catch (error) {
      console.error("엑셀 다운로드 오류:", error);
      api.error({ message: "다운로드 중 오류가 발생했습니다." });
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="p-2 md:p-4">
      <Card bodyStyle={{ padding: "12px 16px" }}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Typography.Title level={5} className="mb-0">
              회원 관리
            </Typography.Title>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExportExcel}
              loading={isExporting}
              disabled={!users || users.count === 0}
              size="small"
            />
          </div>
          <MembersFilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            generations={generations}
          />
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          ) : users ? (
            <>
              <MembersTableSection users={users.results} />
              <MembersPaginationSection
                page={page}
                pageSize={pageSize}
                total={users.count}
                onPageChange={handlePageChange}
              />
            </>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

const ManageMembersMainWithAuth = withAuth(ManageMembersMain, true);

export default ManageMembersMainWithAuth;
