import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
function SideBar() {
  return (
    <div className="flex mt-3 flex-col ml-8">
      <div className="mb-11">
        <a href="https://calendar.google.com/calendar">
          <img
            className="h-6 w-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png"
            alt="calender-logo"
          />
        </a>
      </div>
      <div className="mb-11">
        <a href="https://keep.google.com">
          <img
            className="h-6 w-6"
            src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png"
            alt="keep-logo"
          />
        </a>
      </div>
      <div className="mb-11">
        <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.tasks&hl=en&gl=US">
          <img
            className="h-6 w-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Tasks_2021.svg/1200px-Google_Tasks_2021.svg.png"
            alt="tasks-logo"
          />
        </a>
      </div>
      <div className="mb-11">
        <a href="https://contacts.google.com/">
          <img
            className="h-6 w-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png"
            alt="contacts-logo"
          />
        </a>
      </div>
      <div className="mb-11">
        <a href="https://www.google.com/maps">
          <img
            className="h-6 w-6"
            src="https://cdn-icons-png.flaticon.com/512/355/355980.png"
            alt="maps-logo"
          />
        </a>
      </div>
      <div className="mb-11">
        <AddOutlinedIcon />
      </div>
      <div>
        <ArrowForwardIosOutlinedIcon fontSize="small" />
      </div>
    </div>
  );
}

export default SideBar;
