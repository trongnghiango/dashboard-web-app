import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import { Support, SupportArgNames, SupportArgs } from "../../lib/modules/support/support.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import SupportActionDelete from "./support-action-delete";
import SupportActionUpdate from "./support-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import useAuth from "../../hooks/use-auth";
import { UserRole } from "../../lib/modules/user/user.model";

const SupportTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Support[];
  loadData?: () => void;
}) => {
  const user = useAuth();
  const adminActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: Support; loadData: () => void }) => (
        <>
          <SupportActionUpdate data={data} loadData={loadData} />
          <SupportActionDelete data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: Support; loadData: () => void }) => (
        <>
          <SupportActionUpdate data={data} loadData={loadData} />
          <SupportActionDelete data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const editorActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: Support; loadData: () => void }) => (
        <>
          <SupportActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: Support; loadData: () => void }) => (
        <>
          <SupportActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: SupportArgNames.transactionHash,
      argument: SupportArgs.transactionHash,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: SupportArgNames.amountAther,
      argument: SupportArgs.amountAther,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: SupportArgNames.nftId,
      argument: SupportArgs.nftId,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: SupportArgNames.type,
      argument: SupportArgs.type,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: SupportArgNames.content,
      argument: SupportArgs.content,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },

    {
      name: SupportArgNames.customer,
      argument: SupportArgs.customerId,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.custom,
      CustomHtml: ({ data }: { data: Support }) => {
        return <div className="overflow-hidden">{data.customer?.address.substring(0, 30)}</div>;
      },
    },

    {
      name: SupportArgNames.status,
      argument: SupportArgs.status,
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
    ...(user?.role === UserRole.ADMIN ? adminActions : editorActions),
  ];

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

export default SupportTableList;
