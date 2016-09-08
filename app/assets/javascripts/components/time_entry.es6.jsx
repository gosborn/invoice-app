class TimeEntry extends React.Component {
  constructor() {
    super()
    this.state = {
      editable: false,
      time_entries: []
    }
  }

  render () {

    var time_spent = this.state.editable ? <input type='text' ref='time_spent' defaultValue={this.props.time_spent} />: <h3>time_spent: {this.props.time_spent}</h3>
    var date = this.state.editable ? <input type='text' ref='date' defaultValue={this.props.date} /> : <p> Date: {this.props.date}</p>; 
    var summary = this.state.editable ? <input type='text' ref='summary' defaultValue={this.props.summary} /> : <p>Summary: {this.props.summary}</p>; 
    
    return (
      <div>
        <div>{time_spent}</div>
        <div>{date}</div>
        <div>{summary}</div>
        <button onClick={this.props.handleDelete}>Delete</button>
        <button onClick={this.handleEdit.bind(this)}> {this.state.editable ? 'Submit' : 'Edit' } </button>
      </div>
    );
  }

  handleEdit() {
    if(this.state.editable) {
      var time_spent = this.refs.time_spent.value;
      var date = this.refs.date.value;
      var summary = this.refs.summary.value;
      var id = this.props.id;
      var time_entry = { id: id, time_spent: time_spent, date: date, summary: summary }
      this.props.handleUpdate(time_entry);
    }
    this.setState({ editable: !this.state.editable })
  }

}

TimeEntry.propTypes = {
  time_spent: React.PropTypes.number,
  date: React.PropTypes.string,
  summary: React.PropTypes.string
};
