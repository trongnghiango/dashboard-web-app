import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import { NftType, NftTypeArgNames, NftTypeArgs } from "../../lib/modules/nft-type/nft-type.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import NftTypeActionDelete from "./nft-type-action-delete";
import NftTypeActionUpdate from "./nft-type-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import { UserRole } from "../../lib/modules/user/user.model";
import useAuth from "../../hooks/use-auth";

const NftTypeTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: NftType[];
  loadData?: () => void;
}) => {
  const user = useAuth();

  const adminActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: NftType; loadData: () => void }) => (
        <>
          <NftTypeActionUpdate data={data} loadData={loadData} />
          <NftTypeActionDelete data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftType; loadData: () => void }) => (
        <>
          <NftTypeActionUpdate data={data} loadData={loadData} />
          <NftTypeActionDelete data={data} loadData={loadData} />
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
      CustomHtml: ({ data, loadData }: { data: NftType; loadData: () => void }) => (
        <>
          <NftTypeActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftType; loadData: () => void }) => (
        <>
          <NftTypeActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: NftTypeArgNames.name,
      argument: NftTypeArgs.name,
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

export default NftTypeTableList;
