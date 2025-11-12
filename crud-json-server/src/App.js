import React from "react";
import Lists from "./Lists";

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

  getLists = () => {
    this.setState({ loading: true });

    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(result => {
        this.setState({
          loading: false,
          alldata: result
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const listTable = this.state.loading ? (
      <span>Loading Data... Please be patience.</span>
    ) : (
      <Lists alldata={this.state.alldata} />
    );

    return (
      <div className="container">

        {/* Title on its own line */}
        <div className="title-bar" style={{ marginBottom: "12px" }}>
          JSON Server Demo
        </div>

        {/* Button BELOW the title */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLists}
          style={{ marginBottom: "20px" }} // spacing before table
        >
          Get Lists
        </button>

        {listTable}
      </div>
    );
  }
}

export default App;
