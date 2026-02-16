import { Input, Select, Space } from "antd";
import { Branch, Responsibility } from "src/types/api/profile";
import { Generation } from "src/types/api/generation";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { RESPONSIBILITY_LOOKUP_TABLE } from "src/constants/responsibility";

export interface MembersFilterValues {
  search?: string;
  branch?: Branch;
  responsibility?: Responsibility;
  generation?: number;
  activeGeneration?: number;
  ordering?: string;
}

interface Props {
  filters: MembersFilterValues;
  onFilterChange: (filters: MembersFilterValues) => void;
  generations?: Generation[];
}

const ORDERING_OPTIONS = [
  { value: "profile__name", label: "이름 (오름차순)" },
  { value: "-profile__name", label: "이름 (내림차순)" },
  { value: "profile__branch", label: "지구대 (오름차순)" },
  { value: "-profile__branch", label: "지구대 (내림차순)" },
  { value: "profile__activity_term", label: "활동 기간 (오름차순)" },
  { value: "-profile__activity_term", label: "활동 기간 (내림차순)" },
  { value: "profile__joined_generation__number", label: "가입 기수 (오름차순)" },
  { value: "-profile__joined_generation__number", label: "가입 기수 (내림차순)" },
];

function MembersFilterSection({ filters, onFilterChange, generations }: Props) {
  const branchOptions = Object.entries(BRANCH_LOOKUP_TABLE).map(([key, value]) => ({
    value: key as Branch,
    label: value,
  }));

  const responsibilityOptions = Object.entries(RESPONSIBILITY_LOOKUP_TABLE).map(([key, value]) => ({
    value: key as Responsibility,
    label: value,
  }));

  const generationOptions =
    generations?.map((gen) => ({
      value: gen.number,
      label: `${gen.number}기`,
    })) ?? [];

  return (
    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
      <Input.Search
        placeholder="이름 검색"
        allowClear
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        onSearch={(value) => onFilterChange({ ...filters, search: value })}
        className="w-full md:w-40"
        size="small"
      />
      <Space wrap size="small">
        <Select
          value={filters.branch}
          onChange={(value) => onFilterChange({ ...filters, branch: value })}
          options={branchOptions}
          className="w-24"
          placeholder="지구대"
          allowClear
          size="small"
        />
        <Select
          value={filters.responsibility}
          onChange={(value) => onFilterChange({ ...filters, responsibility: value })}
          options={responsibilityOptions}
          className="w-28"
          placeholder="직책"
          allowClear
          size="small"
        />
        <Select
          value={filters.generation}
          onChange={(value) => onFilterChange({ ...filters, generation: value })}
          options={generationOptions}
          className="w-28"
          placeholder="가입 기수"
          allowClear
          size="small"
        />
        <Select
          value={filters.activeGeneration}
          onChange={(value) => onFilterChange({ ...filters, activeGeneration: value })}
          options={generationOptions}
          className="w-28"
          placeholder="활동 기수"
          allowClear
          size="small"
        />
        <Select
          value={filters.ordering}
          onChange={(value) => onFilterChange({ ...filters, ordering: value })}
          options={ORDERING_OPTIONS}
          className="w-40"
          placeholder="정렬"
          allowClear
          size="small"
        />
      </Space>
    </div>
  );
}

export default MembersFilterSection;
