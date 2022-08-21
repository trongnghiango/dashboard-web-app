import React from "react";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";
import {
  TypeEvent,
  TypeEventArgNames,
  TypeEventArgs,
} from "../../lib/modules/type-event/type-event.model";
import { ColumnData, ColumnTypes, DisplayMode, ViewModes } from "../../lib/models/page.model";
import TypeEventActionDelete from "./type-event-action-delete";
import TypeEventActionUpdate from "./type-event-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: TypeEventArgNames.name,
    argument: TypeEventArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: TypeEventArgNames.percentFirst,
    argument: TypeEventArgs.percentFirst,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: TypeEvent }) => {
      return (
        <div className="flex justify-start items-end bg-blue-600 px-2 rounded-full text-white">
          {data.percentFirst} <span className="text-xs ml-1">%</span>
        </div>
      );
    },
  },
  {
    name: TypeEventArgNames.percentClaim,
    argument: TypeEventArgs.percentClaim,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: TypeEvent }) => {
      return (
        <div className="flex justify-start items-end bg-blue-600 px-2 rounded-full text-white">
          {data.percentClaim} <span className="text-xs ml-1">%</span>
        </div>
      );
    },
  },
  {
    name: TypeEventArgNames.ratioUSD,
    argument: TypeEventArgs.ratioUSD,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: TypeEvent }) => {
      return (
        <div className="flex justify-start items-end bg-blue-600 px-2 rounded-full text-white">
          {data.ratioUSD} <span className="text-xs ml-1">USD</span>
        </div>
      );
    },
  },
  {
    name: TypeEventArgNames.periodCliff,
    argument: TypeEventArgs.periodCliff,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.custom,
    CustomHtml: ({ data }: { data: TypeEvent }) => {
      return (
        <div className="flex justify-start items-end bg-blue-600 px-2 rounded-full text-white">
          {data.periodCliff} <span className="text-xs ml-1">Days</span>
        </div>
      );
    },
  },
  {
    name: TypeEventArgNames.startDate,
    argument: TypeEventArgs.startDate,
    type: ColumnTypes.datetime,
    display: DisplayMode.TABLE_LISTVIEW,
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
    CustomHtml: ({ data, loadData }: { data: TypeEvent; loadData: () => void }) => (
      <>
        <TypeEventActionUpdate data={data} loadData={loadData} />
        <TypeEventActionDelete data={data} loadData={loadData} />
      </>
    ),
  },

  {
    name: "",
    type: ColumnTypes.custom,
    hideHeader: true,
    display: DisplayMode.LISTVIEW,
    isListViewFooter: true,
    CustomHtml: ({ data, loadData }: { data: TypeEvent; loadData: () => void }) => (
      <>
        <TypeEventActionUpdate data={data} loadData={loadData} />
        <TypeEventActionDelete data={data} loadData={loadData} />
      </>
    ),
  },
];

const TypeEventTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: TypeEvent[];
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

export default TypeEventTableList;
