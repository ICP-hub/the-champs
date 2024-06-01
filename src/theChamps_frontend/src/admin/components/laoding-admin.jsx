import { Grid } from "react-loader-spinner";

const AdminLoader = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: 400, maxHeight: 400 }}
    >
      <Grid
        visible={true}
        height="150"
        width="150"
        color="#EF4444"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default AdminLoader;
