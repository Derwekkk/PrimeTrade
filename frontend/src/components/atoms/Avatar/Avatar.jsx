import { Avatar as MuiAvatar } from "@mui/material";

const Avatar = ({ name, src, size = 40, ...props }) => {
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <MuiAvatar src={src} sx={{ width: size, height: size }} {...props}>
      {!src && getInitials(name)}
    </MuiAvatar>
  );
};

export default Avatar;
