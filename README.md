#Invoice App

This app utilizes Rails and React (specifically the [react-rails gem](https://github.com/reactjs/react-rails)) to store work history and create invoices for users.

##Domain Details

Each User has:
  - 0 or more jobs with attributes of:
    - Title
    - Hourly Rate
    - Tax Rate

Each job has:
  - 0 or more TimeEntries with attributes of:
    - Time spent (in minutes)
    - Date of entry
    - Summary of work completed

The app produces invoices for each user, which contain the data of one or more TimeEntries, but scoped to one job.
  - Job
  - Date Range
  - Time entries in range
  - $ subtotal (hourly_rate * total_minutes/60)
  - $ tax (subtotal * tax_rate)
  - $ total

##Running the app

Navigate to the directory this project has been downloaded to.

Run pending migrations and seed the database by running `rake db:setup` in the command line.

Via the command line run `rails c -p 3000` and visit `localhost:3000` in a web browser.

###Authentication

The app uses [Devise](https://github.com/plataformatec/devise) for user authentication. To login without creating a new user, use the credentials `user: user@user.com pw: test1234`.

###Code linting

This project uses [Rubocop](https://github.com/bbatsov/rubocop) to check the style of the code. Run by typing `rubocop` in the directory of the project.

###Testing

This project uses rspec for test cases. Run by typing `rspec` to recursively run all test suites.

To examine test coverage, run `COVERAGE=true rspec` to utilize [simplecov](https://github.com/colszowka/simplecov), which generates a coverage report.