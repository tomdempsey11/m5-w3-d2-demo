import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateList from "./UpdateList";
import DeleteList from "./DeleteList";

function Lists(props) {
  let listrows = [];

  // Use index so the # column shows 1, 2, 3...
  props.alldata.forEach((element, index) => {
    listrows.push(
      <tr key={element.id}>
        {/* Display row number, not database id */}
        <td>{index + 1}</td>

        <td>{element.title}</td>
        <td>{element.author}</td>

        {/* UPDATE BUTTON */}
        <td>
          <UpdateList
            itemId={element.id}
            singledata={props.singledata}
            handleChange={props.handleChange}
            getSingle={props.getSingle}
            updateList={props.updateList}
          />
        </td>

        {/* DELETE BUTTON */}
        <td>
          <DeleteList
            itemId={element.id}
            title={element.title}
            author={element.author}
            deleteList={props.deleteList}
          />
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{listrows}</tbody>
    </table>
  );
}

export default Lists;
