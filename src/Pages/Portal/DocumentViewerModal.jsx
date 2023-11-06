import React from "react";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import { Box } from "@mui/material";
// import { API_URL } from "../../config";
import storage from "../../utils/storage";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function DocumentViewerModal(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const docs = [
    {
      fileName: props.fileName,
      uri: require("../../assets/files/qualimapReport.pdf"),
    },
  ];

  const handleClose = () => {
    setOpen(false);
    props.docViewModalOpenSetter(false);
  };

  const headers = {
    Authorization: `Token ${storage.getToken()}`,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "1px solid #000",
              borderRadius: "10px",
              p: 4,
              width: "80%",
              height: "80%",
            }}
          >
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              requestHeaders={headers}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
