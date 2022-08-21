import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  Provider,
  ProviderArgNames,
  ProviderArgs,
} from "../../lib/modules/provider/provider.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import ProviderActionDelete from "./provider-action-delete";
import ProviderActionUpdate from "./provider-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: ProviderArgNames.name,
    argument: ProviderArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ProviderArgNames.contract,
    argument: ProviderArgs.contract,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ProviderArgNames.serverUrl,
    argument: ProviderArgs.serverUrl,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: ProviderArgNames.isRunning,
    argument: ProviderArgs.isRunning,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.boolean,
  },
  {
    name: ProviderArgNames.restartTime,
    argument: ProviderArgs.restartTime,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.datetime,
  },
  {
    name: ProviderArgNames.restartCount,
    argument: ProviderArgs.restartCount,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
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
      data: Provider;
      loadData: () => void;
    }) => (
      <>
        <ProviderActionUpdate data={data} loadData={loadData} />
        <ProviderActionDelete data={data} loadData={loadData} />
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
      data: Provider;
      loadData: () => void;
    }) => (
      <>
        <ProviderActionUpdate data={data} loadData={loadData}  />
        <ProviderActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const ProviderTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Provider[];
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

export default ProviderTableList;
