import * as React from "react";
import Box from "@mui/material/Box";
import {
  ChonkyActions,
  FileBrowser as FileBrowser,
  FileContextMenu,
  FileHelper,
  FileList,
  FileNavbar,
} from "chonky";
import getProjectFiles from "../../apis/getProjectFiles";
import downloadFile from "../../apis/downloadFile";
import { Base64 } from "js-base64";
import { ThemeProvider } from "@material-ui/core/";

function ProjectFileBrowser(props) {
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
        }
      },
      [setCurrentFolderId]
    );
  };

  const fileActions = [ChonkyActions.DownloadFiles];
  const [currentFolderId, setCurrentFolderId] = React.useState("");
  const [fileMap, setFileMap] = React.useState({});
  const files = useFiles(currentFolderId, fileMap);
  const folderChain = useFolderChain(currentFolderId, fileMap);
  const handleFileAction = useFileActionHandler(setCurrentFolderId);

  React.useEffect(() => {
    getProjectFiles(props.project_id).then((res) => {
      setFileMap(res.data.file_map);
      if (!currentFolderId || currentFolderId === "")
        setCurrentFolderId(res.data.root_folder_id);
      else if (!res.data.fileMap[currentFolderId])
        setCurrentFolderId(res.data.root_folder_id);
    });
  }, []);

  return (
    // The ThemeProvider is to fix jss collision between mui and chonky.
    // Its gonna give error but atleast doesnt mess up with the styling
    <ThemeProvider>
      <Box sx={{ height: { xs: "100px", md: "200px" }, width: "100%", mt: 1 }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <FileBrowser
              files={files}
              folderChain={folderChain}
              onFileAction={handleFileAction}
              defaultFileViewActionId={ChonkyActions.EnableListView.id}
              disableDragAndDrop={true}
              fileActions={fileActions}
            >
              <FileNavbar />
              <FileList />
              <FileContextMenu />
            </FileBrowser>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ProjectFileBrowser;
