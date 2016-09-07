class Main extends React.Component {
  render () {
    return (
      <div>
        <div>
          <h1>Invoice App</h1>
          <h3>{this.props.user_email}</h3>
        </div>
        <div>
          <Jobs />
    
          <br />
          <TimeEntry />
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  user_email: React.PropTypes.string
}

