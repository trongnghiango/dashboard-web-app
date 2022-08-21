import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  NftRarity,
  NftRarityArgNames,
  NftRarityArgs,
} from "../../lib/modules/nft-rarity/nft-rarity.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import NftRarityActionDelete from "./nft-rarity-action-delete";
import NftRarityActionUpdate from "./nft-rarity-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import useAuth from "../../hooks/use-auth";
import { UserRole } from "../../lib/modules/user/user.model";

const NftRarityTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: NftRarity[];
  loadData?: () => void;
}) => {
  const user = useAuth();

  const adminActions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: NftRarity; loadData: () => void }) => (
        <>
          <NftRarityActionUpdate data={data} loadData={loadData} />
          <NftRarityActionDelete data={data} loadData={loadData} />
        </>
      ),
    },
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftRarity; loadData: () => void }) => (
        <>
          <NftRarityActionUpdate data={data} loadData={loadData} />
          <NftRarityActionDelete data={data} loadData={loadData} />
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
      CustomHtml: ({ data, loadData }: { data: NftRarity; loadData: () => void }) => (
        <>
          <NftRarityActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftRarity; loadData: () => void }) => (
        <>
          <NftRarityActionUpdate data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: NftRarityArgNames.name,
      argument: NftRarityArgs.name,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: NftRarityArgNames.name,
      argument: NftRarityArgs.name,
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

export default NftRarityTableList;
