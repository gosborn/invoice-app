class Job extends React.Component {
  render () {
    return (
      <div>
        <div>Title: {this.props.job.title}</div>
        <div>Hourly Rate: {this.props.job.hourly_rate}</div>
        <div>Tax Rate: {this.props.job.tax_rate}</div>
      </div>
    );
  }
}

Job.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
};
