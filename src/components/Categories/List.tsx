import React, { useEffect } from "react";
import { Divider, List as AntList, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCategories } from "../../hooks";
import { ICategory, ICategoryParams } from "../../types";
export const List: React.FC = () => {
  const params: ICategoryParams = {
    page: 1,
    perPage: 10,
  };

  const { categories, fetchNextPage, hasNextPage, isCategoriesLoading } =
    useCategories(params);

  const loadMoreData = () => {
    if (isCategoriesLoading || !hasNextPage) {
      return;
    }
    fetchNextPage();
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={categories.length}
        next={loadMoreData}
        hasMore={!!hasNextPage}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <AntList
          dataSource={categories}
          renderItem={(item: ICategory) => (
            <AntList.Item key={item.name}>
              <AntList.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={`Type: ${item.type}, Status: ${
                  item.status ? "Active" : "Inactive"
                }, Order: ${item.order}`}
              />
            </AntList.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
