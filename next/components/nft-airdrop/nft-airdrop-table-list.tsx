import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  NftAirdrop,
  NftAirdropArgNames,
  NftAirdropArgs,
} from "../../lib/modules/nft-airdrop/nft-airdrop.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import NftAirdropActionDelete from "./nft-airdrop-action-delete";
import NftAirdropActionUpdate from "./nft-airdrop-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";
import useAuth from "../../hooks/use-auth";
import { UserRole } from "../../lib/modules/user/user.model";

const NftAirdropTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: NftAirdrop[];
  loadData?: () => void;
}) => {
  const user = useAuth();

  const actions = [
    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.TABLE,
      CustomHtml: ({ data, loadData }: { data: NftAirdrop; loadData: () => void }) => (
        <>
          <NftAirdropActionUpdate data={data} loadData={loadData} />
          <NftAirdropActionDelete data={data} loadData={loadData} />
        </>
      ),
    },

    {
      name: "",
      type: ColumnTypes.custom,
      hideHeader: true,
      display: DisplayMode.LISTVIEW,
      isListViewFooter: true,
      CustomHtml: ({ data, loadData }: { data: NftAirdrop; loadData: () => void }) => (
        <>
          <NftAirdropActionUpdate data={data} loadData={loadData} />
          <NftAirdropActionDelete data={data} loadData={loadData} />
        </>
      ),
    },
  ];

  const columnData: ColumnData[] = [
    {
      name: NftAirdropArgNames.name,
      argument: NftAirdropArgs.name,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: NftAirdropArgNames.mediaUrl,
      argument: NftAirdropArgs.mediaUrl,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.image,
    },
    {
      name: NftAirdropArgNames.price,
      argument: NftAirdropArgs.price,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.string,
    },
    {
      name: NftAirdropArgNames.seedElementBonus,
      argument: NftAirdropArgs.seedElementBonus,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.range,
    },
    {
      name: NftAirdropArgNames.seedHPBonus,
      argument: NftAirdropArgs.seedHPBonus,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.range,
    },
    {
      name: NftAirdropArgNames.seedLevel,
      argument: NftAirdropArgs.seedLevel,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.range,
    },
    {
      name: NftAirdropArgNames.seedSkillBonus,
      argument: NftAirdropArgs.seedSkillBonus,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.range,
    },
    {
      name: NftAirdropArgNames.seedExp,
      argument: NftAirdropArgs.seedExp,
      display: DisplayMode.TABLE_LISTVIEW,
      type: ColumnTypes.range,
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
    ...(user?.role === UserRole.ADMIN ? actions : []),
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

export default NftAirdropTableList;
