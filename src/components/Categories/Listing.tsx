import React from "react";
import { Table, Spin, Alert } from "antd";
import { useCategoryList } from "../../hooks/categories/useCategoryList";

// Define the columns for the Ant Design Table
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: "PRIVATE" | "PUBLIC") => <span>{type}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) => <span>{status ? "Active" : "Inactive"}</span>,
  },
  {
    title: "Order Number",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
];

const Listing: React.FC = () => {
  // Use the custom hook to fetch categories
  const { list, isLoading } = useCategoryList({page:1,perPage:10});

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!list) {
    return <Alert message="No categories found" type="warning" />;
  }

  // Transform the data for the Ant Design Table
  const dataSource = list.categories.map((category) => ({
    key: category.id, // Assuming each category has a unique 'id'
    id: category.id,
    name: category.name,
    type: category.type,
    status: category.status,
    orderNumber: category.orderNumber,
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="key" // Use 'key' as the unique identifier for each row
    />
  );
};

export default Listing;
