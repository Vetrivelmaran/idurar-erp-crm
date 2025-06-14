export const fields = {
  customer: {
    type: 'async',
    entity: 'client',
    displayLabels: ['name'],
    outputValue: '_id',
    label: 'Customer',
    required: true,
  },
  description: {
    type: 'textarea',
    label: 'Description',
    required: true,
  },
  status: {
    type: 'select',
    label: 'Status',
    required: true,
    options: [
      { label: 'Open', value: 'Open' },
      { label: 'InProgress', value: 'InProgress' },
      { label: 'Closed', value: 'Closed' },
    ],
  },
  resolution: {
    type: 'textarea',
    label: 'Resolution',
  },
};
