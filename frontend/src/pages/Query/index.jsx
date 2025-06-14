import { useEffect, useState } from 'react';
import { Table, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { request } from '@/request';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';

const { Option } = Select;

export default function QueryPage() {
  const entity = 'queries';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translate = useLanguage();

  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await request.list({ entity });
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    dispatch(erp.currentAction({ actionType: 'create' }));
    navigate(`/${entity}/create`);
  };

  const filteredData = statusFilter
    ? data.filter((item) => item.status === statusFilter)
    : data;

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: ['customer', 'name'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Resolution',
      dataIndex: 'resolution',
      render: (value) =>
        value?.length > 30 ? `${value.substring(0, 30)}...` : value,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Select
          placeholder="Filter by status"
          onChange={setStatusFilter}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="Open">Open</Option>
          <Option value="InProgress">InProgress</Option>
          <Option value="Closed">Closed</Option>
        </Select>

        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Query
        </Button>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
}
