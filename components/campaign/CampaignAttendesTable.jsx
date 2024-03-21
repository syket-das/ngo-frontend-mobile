import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useCampaignStore } from '../../store/campaignStore';

const CampaignAttendesTable = ({ campaign }) => {
  const { forceLeaveUserFromCampaign, forceLeaveNgoFromCampaign } =
    useCampaignStore((state) => state);

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

        <DataTable.Title
          style={{
            maxWidth: 50,
          }}
        >
          Actions
        </DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.name || item.fullName}</DataTable.Cell>
          <DataTable.Cell>{item.email} </DataTable.Cell>
          <DataTable.Cell
            style={{
              maxWidth: 50,
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                if (item.role === 'NGO') {
                  await forceLeaveNgoFromCampaign(item.id, campaign.id);
                }
                if (item.role === 'USER') {
                  await forceLeaveUserFromCampaign(item.id, campaign.id);
                }
              }}
            >
              <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
          </DataTable.Cell>
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
