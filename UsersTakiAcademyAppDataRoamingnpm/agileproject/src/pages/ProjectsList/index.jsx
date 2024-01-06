import React, { useState } from "react";
import "./_index.scss";
import { Pagination, Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a onClick={() => console.log(text.id)}>{text.name}</a>,
  },
  {
    title: "Key",
    dataIndex: "key",
    key: "key",
  },

  {
    title: "Lead",
    dataIndex: "lead",
    key: "lead",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "Landing Page") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.lead}</a> */}
        <a>Settings</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: { name: "Project 1", id: 1 },
    lead: "Jon",
    tags: ["mobile", "dev"],
  },
  {
    key: "2",
    name: { name: "Project 2", id: 2 },
    lead: "Jon",
    tags: ["Landing Page"],
  },
  {
    key: "3",
    name: { name: "Project 3", id: 3 },
    lead: "Jon",
    tags: ["Team-managed software"],
  },
  {
    key: "4",
    name: { name: "Project 4", id: 4 },
    lead: "Jon",
    tags: ["mobile", "dev"],
  },
  {
    key: "5",
    name: { name: "Project 5", id: 5 },
    lead: "Jon",
    tags: ["Landing Page"],
  },
  {
    key: "6",
    name: { name: "Project 6", id: 6 },
    lead: "Jon",
    tags: ["Team-managed software"],
  },
  {
    key: "7",
    name: { name: "Project 7", id: 7 },
    lead: "Jon",
    tags: ["mobile", "dev"],
  },
  {
    key: "8",
    name: { name: "Project 8", id: 8 },
    lead: "Jon",
    tags: ["Landing Page"],
  },
  {
    key: "9",
    name: { name: "Project 9", id: 9 },
    lead: "Jon",
    tags: ["Team-managed software"],
  },
];

const ProjectsList = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  return (
    <div className="projects-list-page">
      <div className="project-page-title">Projects</div>
      <div className="project-page-list">
        <Table
          columns={columns}
          dataSource={data}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default ProjectsList;
