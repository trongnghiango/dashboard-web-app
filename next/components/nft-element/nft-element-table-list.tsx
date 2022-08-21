import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  NftElement,
  NftElementArgNames,
  NftElementArgs,
} from "../../lib/modules/nft-element/nft-element.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import NftElementActionDelete from "./nft-element-action-delete";
import NftElementActionUpdate from "./nft-element-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import useAuth from "../../hooks/use-auth";
import { UserRole } from "../../lib/modules/user/user.model";

const NftElementTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: NftElement[];
  loadData?: () => void;
}) => {
  const user = useAuth();

  const adminActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: NftElement; loadData: () => void }) => (
        <>
          <NftElementActionUpdate data={data} loadData={loadData} />
          <NftElementActionDelete data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftElement; loadData: () => void }) => (
        <>
          <NftElementActionUpdate data={data} loadData={loadData} />
          <NftElementActionDelete data={data} loadData={loadData} />
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
      CustomHtml: ({ data, loadData }: { data: NftElement; loadData: () => void }) => (
        <>
          <NftElementActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftElement; loadData: () => void }) => (
        <>
          <NftElementActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: NftElementArgNames.name,
      argument: NftElementArgs.name,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: NftElementArgNames.color,
      argument: NftElementArgs.color,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: NftElementArgNames.description,
      argument: NftElementArgs.description,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: NftElementArgNames.image,
      argument: NftElementArgs.image,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.image,
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

export default NftElementTableList;
