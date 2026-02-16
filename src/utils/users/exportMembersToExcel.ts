import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { UsersListUser } from "src/types/api/user";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { RESPONSIBILITY_LOOKUP_TABLE } from "src/constants/responsibility";
import { RANK_LOOKUP_TABLE } from "src/constants/rank";
import { SEX_LOOKUP_TABLE } from "src/constants/user";
import { MembersFilterValues } from "src/components/pages/management/members/MembersFilterSection";

export function exportMembersToExcel(data: UsersListUser[], filters: MembersFilterValues) {
  if (!data || data.length === 0) {
    return;
  }

  const headers = [
    "이름",
    "성별",
    "연나이",
    "지구대",
    "직책",
    "등급",
    "가입 기수",
    "활동 학기",
    "연락처",
    "생년월일",
    "상태",
  ];

  const dataRows = data.map((user) => [
    user.profile.name,
    SEX_LOOKUP_TABLE[user.profile.sex] || user.profile.sex,
    user.profile.yearAge,
    BRANCH_LOOKUP_TABLE[user.profile.branch],
    RESPONSIBILITY_LOOKUP_TABLE[user.profile.responsibility],
    RANK_LOOKUP_TABLE[user.profile.rank],
    user.profile.joinedGeneration?.number ? `${user.profile.joinedGeneration.number}기` : "-",
    user.profile.activityTerm ?? "-",
    user.profile.phoneNumber ?? "-",
    user.profile.birthDate ?? "-",
    user.profile.isLeaved ? "탈퇴" : "가입중",
  ]);

  const sheetData = [headers, ...dataRows];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  const colWidths = [
    { wch: 10 }, // 이름
    { wch: 5 }, // 성별
    { wch: 6 }, // 연나이
    { wch: 8 }, // 지구대
    { wch: 10 }, // 직책
    { wch: 8 }, // 등급
    { wch: 8 }, // 가입 기수
    { wch: 10 }, // 활동 학기
    { wch: 14 }, // 연락처
    { wch: 12 }, // 생년월일
    { wch: 8 }, // 상태
  ];

  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "회원목록");

  // 파일명 생성
  const filterParts: string[] = [];
  if (filters.branch) filterParts.push(BRANCH_LOOKUP_TABLE[filters.branch]);
  if (filters.responsibility) filterParts.push(RESPONSIBILITY_LOOKUP_TABLE[filters.responsibility]);
  if (filters.generation) filterParts.push(`${filters.generation}기가입`);
  if (filters.activeGeneration) filterParts.push(`${filters.activeGeneration}기활동`);
  if (filters.search) filterParts.push(filters.search);

  const filterText = filterParts.length > 0 ? `_${filterParts.join("_")}` : "";
  const timestamp = dayjs().format("YYMMDD_HHmm");
  const filename = `회원목록${filterText}_${timestamp}.xlsx`;

  XLSX.writeFile(wb, filename);
}
