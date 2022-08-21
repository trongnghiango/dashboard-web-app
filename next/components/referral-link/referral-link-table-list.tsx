import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  ReferralLink,
  ReferralLinkArgNames,
  ReferralLinkArgs,
} from "../../lib/modules/referral-link/referral-link.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import ReferralLinkActionDelete from "./referral-link-action-delete";
import ReferralLinkActionUpdate from "./referral-link-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: ReferralLinkArgNames.name,
    argument: ReferralLinkArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: BaseModelArgNames.createdAt,
    argument: BaseModelArgs.createdAt,
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: BaseModelArgNames.updatedAt,
    argument: BaseModelArgs.updatedAt,
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
  },
  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE,
    CustomHtml: ({
      data,
      loadData,
    }: {
      data: ReferralLink;
      loadData: () => void;
    }) => (
      <>
        <ReferralLinkActionUpdate data={data} loadData={loadData} />
        <ReferralLinkActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({
      data,
      loadData,
    }: {
      data: ReferralLink;
      loadData: () => void;
    }) => (
      <>
        <ReferralLinkActionUpdate data={data} loadData={loadData}  />
        <ReferralLinkActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const ReferralLinkTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: ReferralLink[];
  loadData?: () => void;
}) => {
  return (
    <>
      {viewMode === ViewModes.TABLE && (
        <TableView columnData={columnData} data={data} loadData={loadData} />
      )}
      {viewMode === ViewModes.LIST && (
        <ListView columnData={columnData} data={data} loadData={loadData} />
      )}
    </>
  );
};

export default ReferralLinkTableList;
