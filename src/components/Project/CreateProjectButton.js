import React from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = () => {
  return (
    <React.Fragment>
      <div className="text-center mb-0">
        <Link to={"/addProject"} className="btn btn-outline-primary font-weight-bold ml-2 ">
          <i className={"fas fa-plus-circle "}/> Create new project
        </Link>
      </div>
    </React.Fragment>
  );
};

export default CreateProjectButton;
