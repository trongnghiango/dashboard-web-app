import React from "react";
import {
  BaseModelArgNames,
  BaseModelArgs,
} from "../../lib/models/base-model.model";
import {
  Category,
  CategoryArgNames,
  CategoryArgs,
} from "../../lib/modules/category/category.model";
import {
  ColumnData,
  ColumnTypes,
  DisplayMode,
  ViewModes,
} from "../../lib/models/page.model";
import CategoryActionDelete from "./category-action-delete";
import CategoryActionUpdate from "./category-action-update";
import TableView from "../../components-shared/table-view";
import ListView from "../../components-shared/list-view";

const columnData: ColumnData[] = [
  {
    name: CategoryArgNames.name,
    argument: CategoryArgs.name,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CategoryArgNames.slug,
    argument: CategoryArgs.slug,
    display: DisplayMode.TABLE_LISTVIEW,
    type: ColumnTypes.string,
  },
  {
    name: CategoryArgNames.description,
    argument: CategoryArgs.description,
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
      data: Category;
      loadData: () => void;
    }) => (
      <>
        <CategoryActionUpdate data={data} loadData={loadData} />
        <CategoryActionDelete data={data} loadData={loadData} />
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
      data: Category;
      loadData: () => void;
    }) => (
      <>
        <CategoryActionUpdate data={data} loadData={loadData}  />
        <CategoryActionDelete data={data} loadData={loadData}  />
      </>
    ),
  },
];

const CategoryTableList = ({
  viewMode,
  data,
  loadData,
}: {
  viewMode: ViewModes;
  data: Category[];
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

export default CategoryTableList;
