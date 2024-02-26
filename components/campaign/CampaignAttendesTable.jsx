import * as React from 'react';
import { DataTable } from 'react-native-paper';

const CampaignAttendesTable = ({ campaign }) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
    ...campaign.joinedNgos,
    ...campaign.joinedUsers,
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Email</DataTable.Title>
        {/* <DataTable.Title>Verified</DataTable.Title> */}
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.name || item.fullName}</DataTable.Cell>
          <DataTable.Cell>{item.email}</DataTable.Cell>
          {/* <DataTable.Cell>{'item.fat'}</DataTable.Cell> */}
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default CampaignAttendesTable;
