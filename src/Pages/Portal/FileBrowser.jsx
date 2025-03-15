import * as React from "react";
import Box from "@mui/material/Box";
import {
  ChonkyActions,
  FileBrowser as ChonkyFileBrowser,
  ChonkyIconName,
  defineFileAction,
  FileContextMenu,
  FileHelper,
  FileList,
  FileNavbar,
} from "chonky";
import { Base64 } from "js-base64";
import downloadFile from "../../apis/downloadFile";

function isVcfFile(file) {
  return file.name.endsWith(".vcf") || file.name.endsWith(".vcf.gz");
}

function FileBrowser(props) {
  const openInDocViewer = defineFileAction({
    id: "open-in-doc-viewer",
    button: {
      name: "Open in Document Viewer",
      toolbar: true,
      contextMenu: true,
      icon: ChonkyIconName.pdf,
    },
    fileFilter: (file) => !FileHelper.isDirectory(file),
    requiresSelection: true,
    hotkeys: ["enter"],
  });

  const uplaodToFranklin = defineFileAction({
    id: "upload-to-franklin",
    button: {
      name: "Upload to Franklin as a New Case",
      toolbar: true,
      contextMenu: true,
      icon: ChonkyIconName.upload,
    },
    // Select only files with .vcf and vcf.gz extensions
    fileFilter: (file) => isVcfFile(file),
    requiresSelection: true,
  });

  const useFiles = (currentFolderId, fileMap) => {
    return React.useMemo(() => {
      if (!fileMap || !currentFolderId || !fileMap[currentFolderId]) return [];

      const currentFolder = fileMap[currentFolderId];
      const files = currentFolder.childrenIds
        ? currentFolder.childrenIds.map((fileId) => fileMap[fileId] ?? null)
        : [];
      return files;
    }, [currentFolderId, fileMap]);
  };

  const useFolderChain = (currentFolderId, fileMap) => {
    return React.useMemo(() => {
      if (!fileMap || !currentFolderId || !fileMap[currentFolderId]) return [];

      const currentFolder = fileMap[currentFolderId];
      const folderChain = [currentFolder];

      let parentId = currentFolder.parentId;
      while (parentId) {
        const parentFile = fileMap[parentId];
        if (parentFile) {
          folderChain.unshift(parentFile);
          parentId = parentFile.parentId;
        } else {
          parentId = null;
        }
      }

      return folderChain;
    }, [currentFolderId, fileMap]);
  };

  const useFileActionHandler = (setCurrentFolderId) => {
    return React.useCallback(
      (data) => {
        if (data.id === ChonkyActions.OpenFiles.id) {
          const { targetFile, files } = data.payload;
          const fileToOpen = targetFile || files[0];
          if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
            setCurrentFolderId(fileToOpen.id);
            return;
          }
        } else if (data.id === ChonkyActions.DownloadFiles.id) {
          const files = data.state.selectedFiles;
          for (let i = 0; i < files.length; i++) {
            const pathEncoded = Base64.encode(files[i].path);
            downloadFile(pathEncoded, files[i].name);
          }
        } else if (data.id === openInDocViewer.id) {
          const files = data.state.selectedFiles;
          for (let i = 0; i < files.length; i++) {
            props.modalFileNameSetter(files[i].name);
            const pathEncoded = Base64.encode(files[i].path);
            props.docViewUriSetter(pathEncoded);
            props.docViewModalOpenSetter(true);
          }
        } else if (data.id === uplaodToFranklin.id) {
          const files = data.state.selectedFiles;
          for (let i = 0; i < files.length; i++) {
            const pathEncoded = Base64.encode(files[i].path);
            props.uploadToFranklinModalOpenSetter(true);
            props.uploadToFranklinUriSetter(pathEncoded);
          }
        }
      },
      [setCurrentFolderId]
    );
  };

  const fileActions = [
    ChonkyActions.DownloadFiles,
    openInDocViewer,
    uplaodToFranklin,
  ];
  const disabledFileActions = [
    ChonkyActions.OpenSelection.id,
    ChonkyActions.SelectAllFiles.id,
    ChonkyActions.ClearSelection.id,
  ];
  const [currentFolderId, setCurrentFolderId] = React.useState("");
  const [fileMap, setFileMap] = React.useState({});
  const files = useFiles(currentFolderId, fileMap);
  const folderChain = useFolderChain(currentFolderId, fileMap);
  const handleFileAction = useFileActionHandler(setCurrentFolderId);

  React.useEffect(() => {
    setFileMap(props.fileMap);
    if (!currentFolderId || currentFolderId === "")
      setCurrentFolderId(props.rootFolderId);
  }, [props]);

  return (
    // The ThemeProvider is to fix jss collision between mui and chonky.
    // Its gonna give error but atleast doesnt mess up with the styling
    <Box sx={{ height: { xs: "100px", md: "250px" }, width: "100%", mt: 1 }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <ChonkyFileBrowser
            files={files}
            folderChain={folderChain}
            onFileAction={handleFileAction}
            defaultFileViewActionId={ChonkyActions.EnableListView.id}
            disableDragAndDrop={true}
            fileActions={fileActions}
            disableDefaultFileActions={disabledFileActions}
          >
            <FileNavbar />
            <FileList />
            <FileContextMenu />
          </ChonkyFileBrowser>
        </Box>
      </Box>
    </Box>
  );
}

export default FileBrowser;
