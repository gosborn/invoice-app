class TimeEntry extends React.Component {
  constructor() {
    super()
    this.state = {
      editable: false,
      time_entries: []
    }
  }

  render () {

    var time_spent = this.state.editable ? <input type='number' ref='time_spent' defaultValue={this.props.time_spent} />: <p>{this.props.time_spent}</p>
    var date = this.state.editable ? <input type='date' ref='date' defaultValue={this.props.date} /> : <p>{this.props.date}</p>; 
    var summary = this.state.editable ? <input type='text' ref='summary' defaultValue={this.props.summary} /> : <p>{this.props.summary}</p>; 
    
    return (
      <tr>
          <td>{date}</td>
          <td>{time_spent}</td>
          <td>{summary}</td>
          <td>
          <div className="btn-group btn-group-sm" role="group" aria-label="...">
            <button className="btn btn-default" onClick={this.handleEdit.bind(this)}> {this.state.editable ? 'Submit' : 'Edit' } </button>
            <button className="btn btn-danger" onClick={this.props.handleDelete}>Delete</button>
            </div>
          </td>
      </tr>
    );
  }

  handleEdit() {
    if(this.state.editable) {
      var time_spent = this.refs.time_spent.value || 0;
      var date = this.refs.date.value || '2000-01-01';
      var summary = this.refs.summary.value || 'N/A';
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
