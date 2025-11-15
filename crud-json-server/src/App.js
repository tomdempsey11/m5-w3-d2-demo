import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        id: "",
        title: "",
        author: ""
      }
    };
  }

  // GET all items
  getLists = () => {
    this.setState({ loading: true });

    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          loading: false,
          alldata: result
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  // Handles changes in all form inputs (create/update)
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      singledata: {
        ...this.state.singledata,
        [name]: value
      }
    });
  };

  // CREATE new item (POST)
  // Important: we only send title + author so JSON Server auto-generates the id
  createList = () => {
    const { title, author } = this.state.singledata;
    const newItem = { title, author };

    fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.json())
      .then(() => {
        // clear form state and refresh list
        this.setState({
          singledata: { id: "", title: "", author: "" }
        });
        this.getLists();
      });
  };

  // GET single item for update
  getSingle = (id) => {
    this.setState({
      singledata: {
        id: "Loading...",
        title: "Loading...",
        author: "Loading..."
      }
    });

    fetch(`http://localhost:8000/posts/${id}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          singledata: result
        });
      });
  };

  // UPDATE existing item (PUT)
  updateList = (id) => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
      .then((res) => res.json())
      .then(() => this.getLists());
  };

  // DELETE item
  deleteList = (id) => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE"
    }).then(() => this.getLists());
  };

  render() {
    const listTable = this.state.loading ? (
      <span>Loading Data... Please be patience.</span>
    ) : (
      <Lists
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        handleChange={this.handleChange}
        getSingle={this.getSingle}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );

    return (
      <div className="container">
        {/* Title on its own line */}
        <div className="title-bar" style={{ marginBottom: "12px" }}>
          JSON Server Demo
        </div>

        {/* Create button (opens modal) */}
        <div style={{ marginBottom: "12px" }}>
          <CreateList
            alldata={this.state.alldata}
            handleChange={this.handleChange}
            createList={this.createList}
          />
        </div>

        {/* Button to load the list from server */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLists}
          style={{ marginBottom: "20px" }}
        >
          Get Lists
        </button>

        {listTable}
      </div>
    );
  }
}

export default App;
