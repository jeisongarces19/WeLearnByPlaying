import React from 'react';


class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}




class CambioEstados extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], text: '' 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      


        <div >
          <TodoList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
            
            <input id="Texto"
              onChange={this.handleChange}
              value={this.state.text}>
            </input>

            <button>Agregar palabra</button>
          </form>
        </div>

    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}



export default CambioEstados;