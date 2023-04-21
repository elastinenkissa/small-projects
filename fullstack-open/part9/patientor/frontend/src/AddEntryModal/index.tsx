import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddEntrytForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = (props: Props) => (
  <Dialog fullWidth={true} open={props.modalOpen} onClose={() => props.onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {props.error && <Alert severity="error">{`Error: ${props.error}`}</Alert>}
      <AddEntrytForm onSubmit={props.onSubmit} onCancel={props.onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;