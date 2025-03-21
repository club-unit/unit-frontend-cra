import { Select } from "antd";
import { APPLICATION_ORDER_LOOKUP_TABLE } from "src/constants/application";
import React from "react";
import { ApplicationsSortOrder } from "src/types/common";

interface Props {
  orderOption: ApplicationsSortOrder;
  setOrderOption: (option: ApplicationsSortOrder) => void;
}

function ApplicationOrderSection({ orderOption, setOrderOption }: Props) {
  return (
    <div className="flex flex-end">
      <Select
        value={orderOption}
        onChange={setOrderOption}
        popupMatchSelectWidth={false}
        className="ml-auto"
      >
        {Object.keys(APPLICATION_ORDER_LOOKUP_TABLE).map((orderOption) => {
          return (
            <Select.Option value={orderOption} key={orderOption}>
              {APPLICATION_ORDER_LOOKUP_TABLE[orderOption as ApplicationsSortOrder]}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
}

export default ApplicationOrderSection;
