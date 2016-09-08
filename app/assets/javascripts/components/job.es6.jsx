class Job extends React.Component {
  constructor() {
    super()
    this.state = {
      editable: false
    }
  }

  render () {
    var title = this.state.editable ? <input type='text' ref='title' defaultValue={this.props.job.title} />: <h3>Title: {this.props.job.title}</h3>
    var hourly_rate = this.state.editable ? <input type='text' ref='hourly_rate' defaultValue={this.props.job.hourly_rate} /> : <p> Hourly rate: {this.props.job.hourly_rate}</p>; 
    var tax_rate = this.state.editable ? <input type='text' ref='tax_rate' defaultValue={this.props.job.tax_rate} /> : <p>Tax Rate: {this.props.job.tax_rate}</p>; 

    return (
      <div>
        {title}
        {hourly_rate}
        {tax_rate}
        <button onClick={this.props.handleDelete}>Delete</button>
        <button onClick={this.handleEdit.bind(this)}> {this.state.editable ? 'Submit' : 'Edit' } </button>
      </div>
    );
  }

  handleEdit() {
    if(this.state.editable) {
      var title = this.refs.title.value;
      var hourly_rate = this.refs.hourly_rate.value;
      var tax_rate = this.refs.tax_rate.value;
      var id = this.props.job.id;
      var job = { id: id, title: title, hourly_rate: hourly_rate, tax_rate: tax_rate }
      this.props.handleUpdate(job);
    }
    this.setState({ editable: !this.state.editable })
  }
}

Job.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
};
