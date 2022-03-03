import React, { useState } from "react";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { MdClose } from "react-icons/md";
import Modal from "react-modal/lib/components/Modal";

Modal.setAppElement("#root");

const CategoryModal = ({
  name,
  categoryList,
  resultList,
  showModal,
  setShowModal,
}) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");

  const renderCategory = (category) => {
    setShow(true);
    setCategory(category);
  };

  return (
    <div>
      <Modal
        id="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <MdClose className="modal__close" onClick={() => setShowModal(false)} />
        <div className="modal__header">{name}</div>
        <div className="modal__card card">
          <div className="modal__table">
            <table className="table table-hover">
              <thead className="modal__table--heading">
                <tr>
                  <th>&nbsp;</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.sort((a,b) => a.id.localeCompare(b.id)).map((item) => {
                  return (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>
                        <a
                          className="table__link"
                          href="#"
                          onClick={() => renderCategory(item.category)}
                        >
                          {item.category}
                        </a>
                      </td>
                      <td>
                        <span
                          className="table__data--status"
                          style={{
                            background:
                              (item.status === "Passed" && "#cff6dd") ||
                              (item.status === "Need Work" && "#f6eacf") ||
                              (item.status === "Failed" && "#f6cfcf"),
                            color:
                              (item.status === "Passed" && "#1fa750") ||
                              (item.status === "Need Work" && "#a76c1f") ||
                              (item.status === "Failed" && "#dc3545"),
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.comments}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {show && (
          <div className="category__list">
            <div className="category__card card">
              <table className="table table-hovered">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Category</th>
                    <th>Met Requirement?</th>
                    <th>Score Band</th>
                    <th>Recommended</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {resultList
                    .filter((item) => item.category === category)
                    .map((x) => {
                      return (
                        <tr key={x.id}>
                          <th>{x.id}</th>
                          <td>{x.category}</td>
                          <td>{x.requirementIsMet === true ? "True" : "False"}</td>
                          <td>{x.scoreBand}</td>
                          <td>{x.recomended  === true ? "True" : "False"}</td>
                          <td>{x.comment}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CategoryModal;
