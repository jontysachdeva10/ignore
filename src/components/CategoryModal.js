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
        id="mod"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <MdClose className="modal__close" onClick={() => setShowModal(false)} />
        <div className="modal__header">{name}</div>
        <div className="modal__card card" tabIndex="0">
          <div className="modal__table">
            <table className="table">
              <thead className="modal__table--heading">
                <tr>
                  <td>S.No</td>
                  <td>Category</td>
                  <td>Status</td>
                  <td>Comments</td>
                </tr>
              </thead>
              <tbody>
                {categoryList
                  .sort((a, b) => a.id.localeCompare(b.id))
                  .map((item) => {
                    return (
                      <tr key={item.id}>
                        <th>{item.id}</th>
                        <td>
                          <a
                            className="modal__link"
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
                                (item.status === "Passed".toUpperCase() &&
                                  "#cff6dd") ||
                                (item.status === "Need_Work".toUpperCase() &&
                                  "#f6eacf") ||
                                (item.status === "Failed".toUpperCase() &&
                                  "#f6cfcf"),
                              color:
                                (item.status === "Passed".toUpperCase() &&
                                  "#1fa750") ||
                                (item.status === "Need_Work".toUpperCase() &&
                                  "#a76c1f") ||
                                (item.status === "Failed".toUpperCase() &&
                                  "#dc3545"),
                              fontSize: "0.8rem",
                              fontWeight: 500,
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="table__comments">{item.comments}</td>
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
                <thead className="modal__table--heading">
                  <tr>
                    <td>S.No</td>
                    <td>Category</td>
                    <td>Met Requirement?</td>
                    <td>Score Band</td>
                    <td>Recommended</td>
                    <td>Comment</td>
                  </tr>
                </thead>
                <tbody>
                  {resultList
                    .sort((a, b) => a.id.localeCompare(b.id))
                    .filter((item) => item.category === category)
                    .map((x) => {
                      return (
                        <tr key={x.id}>
                          <th>{x.id}</th>
                          <td>{x.category}</td>
                          <td>{x.requirementIsMet === true ? "Yes" : "No"}</td>
                          <td>{x.scoreBand}</td>
                          <td>{x.recomended === true ? "Yes" : "No"}</td>
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
