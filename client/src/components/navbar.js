import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  MenuItem,
  Container,
  Typography,
  Toolbar,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, logout } from "./../actions/authAction";

const themeColorArr = ["white","black", "green", "yellow", "red", "blue"];

const Navbar = () => {
  const [newThemeColor, setNewThemeColor] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser, themeColor } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if(themeColor){
      setNewThemeColor(themeColor);
    }
  }, []);

  const handleChange = (event) => {
    setNewThemeColor(event.target.value);
    let themePreferenece = {
      id: loggedInUser._id,
      color: event.target.value,
    };
    setTimeout(() => {
      dispatch(setTheme(themePreferenece))
        .then((response) => {
          if (response.status === "success") {
            console.log("Website theme saved successfully");
          }
        })
        .catch(() => {
          console.log("Something is wrong, Please try again");
        });
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onLogout = () => {
    dispatch(logout()).then((response) => {
      if(response.status==="success") {
        console.log("you logged out");
        navigate("/", { replace: true });
      }
    })
  }

  return (
    <AppBar position="sticky" color="default" >
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Sapiens Assignment
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={newThemeColor}
                label="Color"
                onChange={handleChange}
              >
                {themeColorArr.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item.toUpperCase()}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" onClick={()=>onLogout()}>Logout</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
