import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  NftHabitant,
  NftHabitantArgNames,
  NftHabitantArgs,
} from "../../lib/modules/nft-habitant/nft-habitant.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import NftHabitantActionDelete from "./nft-habitant-action-delete";
import NftHabitantActionUpdate from "./nft-habitant-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import useAuth from "../../hooks/use-auth";
import { UserRole } from "../../lib/modules/user/user.model";

const NftHabitantTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: NftHabitant[];
  loadData?: () => void;
}) => {
  const user = useAuth();

  const adminActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: NftHabitant; loadData: () => void }) => (
        <>
          <NftHabitantActionUpdate data={data} loadData={loadData} />
          <NftHabitantActionDelete data={data} loadData={loadData} />
        </>
      ),
    },
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftHabitant; loadData: () => void }) => (
        <>
          <NftHabitantActionUpdate data={data} loadData={loadData} />
          <NftHabitantActionDelete data={data} loadData={loadData} />
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
      CustomHtml: ({ data, loadData }: { data: NftHabitant; loadData: () => void }) => (
        <>
          <NftHabitantActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftHabitant; loadData: () => void }) => (
        <>
          <NftHabitantActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: NftHabitantArgNames.name,
      argument: NftHabitantArgs.name,
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

export default NftHabitantTableList;
