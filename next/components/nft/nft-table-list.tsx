import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import { Nft, NftArgNames, NftArgs } from "../../lib/modules/nft/nft.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import NftActionDelete from "./nft-action-delete";
import NftActionUpdate from "./nft-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: NftArgNames.name,
    argument: NftArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.nftId,
    argument: NftArgs.nftId,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.nickName,
    argument: NftArgs.nickName,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.smartContract,
    argument: NftArgs.smartContract,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.transactionHash,
    argument: NftArgs.transactionHash,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: NftArgNames.nftMintedStatus,
    argument: NftArgs.nftMintedStatus,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: "Media",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => (
      <img width={50} src={data.nftInfo.mediaUrl} alt="img" />
    ),
  },
  {
    name: "Category",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => (
      <>{data.nftInfo.nftCategory.name}</>
    ),
  },
  {
    name: "Element",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => (
      <>{data.nftInfo.nftElement.name}</>
    ),
  },
  {
    name: "Habitant",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => (
      <>{data.nftInfo.nftHabitant.name}</>
    ),
  },
  {
    name: "Rarity",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => (
      <>{data.nftInfo.nftRarity.name}</>
    ),
  },
  {
    name: "Type",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => (
      <>{data.nftInfo.nftType.name}</>
    ),
  },
  {
    name: "Gender",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.TABLE_LISTVIEW,
    CustomHtml: ({ data }: { data: Nft }) => (
      <>{data.nftInfo.gender}</>
    ),
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
  // {
  //   name: "",
  //   type: ColumnTypes.custom,
  //   hideHeader: true,
  //   display: DisplayMode.TABLE,
  //   CustomHtml: ({ data, loadData }: { data: Nft; loadData: () => void }) => (
  //     <>
  //       <NftActionUpdate data={data} loadData={loadData} />
  //       <NftActionDelete data={data} loadData={loadData} />
  //     </>
  //   ),
  // },

  // {
  //   name: "",
  //   type: ColumnTypes.custom,
  //   hideHeader: true,
  //   display: DisplayMode.LISTVIEW,
  //   isListViewFooter: true,
  //   CustomHtml: ({ data, loadData }: { data: Nft; loadData: () => void }) => (
  //     <>
  //       <NftActionUpdate data={data} loadData={loadData} />
  //       <NftActionDelete data={data} loadData={loadData} />
  //     </>
  //   ),
  // },
];

const NftTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Nft[];
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

export default NftTableList;
