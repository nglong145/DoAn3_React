import React from "react";
import "../Breadcrumb/breadcrumb.css";
import { FaCaretRight } from "react-icons/fa";

function Breadcrumb({ page, paths }) {
  return (
    <>
      <section className="breadcrumb-section">
        <div className="path">
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <a href={path.url}>{path.name}</a>
              {index < paths.length - 1 && <FaCaretRight className="icon" />}
              {/* Kiểm tra xem có phải phần tử cuối cùng không, nếu không phải thì render icon ra */}
            </React.Fragment>
          ))}
        </div>
        <div className="pageTitle">
          <h1>{page}</h1>
        </div>
      </section>
    </>
  );
}

export default Breadcrumb;
