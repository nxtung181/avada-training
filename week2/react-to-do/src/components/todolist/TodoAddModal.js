import { Modal, TextField } from '@shopify/polaris';

export default function TodoAddModal({ open, onClose, newTitle, setNewTitle, onAdd }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create todo"
      primaryAction={{
        content: 'Add',
        onAction: onAdd,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <TextField
          label="Title"
          value={newTitle}
          onChange={setNewTitle}
          autoComplete="off"
        />
      </Modal.Section>
    </Modal>
  );
}
