import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const RdsTable = ({ data = [], loading }) => {
  const columns = [
    {
      field: "resourceId",
      headerName: "Resource ID",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {params.value}
          <Tooltip title="Copy">
            <IconButton
              size="small"
              onClick={() => navigator.clipboard.writeText(params.value)}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    { field: "resourceName", headerName: "Resource Name", flex: 1 },
    { field: "engine", headerName: "Engine", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            params.value === "available"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    { field: "region", headerName: "Region", flex: 1 },
  ];

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <CardContent>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data.map((row, index) => ({ ...row, id: index }))}
            columns={columns}
            loading={loading}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RdsTable;
