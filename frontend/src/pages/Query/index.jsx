import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function Query() {
  const translate = useLanguage();
  const entity = 'queries';

  const searchConfig = {
    displayLabels: ['description'],
    searchFields: 'description',
    outputValue: '_id',
  };

  const deleteModalLabels = ['description'];

  const Labels = {
    PANEL_TITLE: translate('Query'),
    DATATABLE_TITLE: translate('Query List'),
    ADD_NEW_ENTITY: translate('Add new query'),
    ENTITY_NAME: translate('Query'),
  };

  // ✅ Table columns for query module
const dataTableColumns = [
  {
    title: 'Customer Name',
    dataIndex: ['customer', 'name'],
    render: (_, record) => (record.customer?.name ? record.customer.name : 'N/A'),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    render: (value) => value || '—',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value) => value || '—',
  },
  {
    title: 'Resolution',
    dataIndex: 'resolution',
    render: (value) =>
      value?.length > 30 ? `${value.substring(0, 30)}...` : value || '—',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    render: (value) =>
      value ? new Date(value).toLocaleDateString() : '—',
  },
];


  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
    dataTableColumns, // ✅ Add this line to enable table rendering
  };

  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} isUpdateForm />}
      config={config}
    />
  );
}
