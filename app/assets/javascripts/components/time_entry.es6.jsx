class TimeEntry extends React.Component {
  render () {
    return (
      <div>
        <div>Time: {this.props.time}</div>
        <div>Date: {this.props.date}</div>
        <div>Summary: {this.props.summary}</div>
      </div>
    );
  }
}

TimeEntry.propTypes = {
  time: React.PropTypes.number,
  date: React.PropTypes.string,
  summary: React.PropTypes.string
};
