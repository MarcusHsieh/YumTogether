import React from "react";
import "./style.css";
import { 
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export default function StartupScreen() {
  const navigate = redirect();
  
  return (
    <div className="startup-screen">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <img className="yumcat" alt="Yumcat" src="https://c.animaapp.com/zOWCZenY/img/yumcat-1-1@2x.png" />
          <img className="group" alt="Group" src="https://c.animaapp.com/zOWCZenY/img/group-1@2x.png" />
          <div className="text-wrapper">YumTogether</div>
          <form>
          <button 
            className="button"
            onClick={() => redirect("root")}
          >
            <div className="div">Let’s get started</div>
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
