class Job extends React.Component {
  render () {
    return (
      <div>
        <div>Title: {this.props.title}</div>
        <div>Hourly Rate: {this.props.hourlyRate}</div>
        <div>Tax Rate: {this.props.taxRate}</div>
      </div>
    );
  }
}

Job.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
};
