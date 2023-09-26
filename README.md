# Support Ticket App Frontend

### Project Description

> This is a a frontend application that allows team members create support tickets.

### Getting Started

```
  cd frontend && npm install && npm run start
```

and it starts on port 3000
http://localhost:3000/

### Testing the app

Run `npm run test`

### Formatting the app files with prettier

Run `npm run format`

### Building the app

Run `npm run build`

## Features

1. Team members can create ticket
2. Team members can edit ticket status
3. Team members can generate random ticket.

## Technologies

1: Material UI, styled components: Design Framework for the app <br/>
2: Redux Toolkit, React-redux: For state management and link to react <br/>
3: Axios: For making api calls <br/>
4: Moment: For date manipulation used across the app <br/>
5: Notistack: For alerting the user when an action happens. <br/>
6: React-Calender: Calender UI to pick deadline. <br/>
7: Yup and hookform/resolvers: To validate input fields. <br/>
8: Jest, react-testing library: For testing
9: Faker: For generating random client name, issue etc.

<br/>

### Using Docker.

To spin up both apps locally, just go into the root of the main project and run a

```
docker-compose build
```

and

```
docker-compose up
```

When all works well view the apps on these links.
make sure ports 3000 and 4000 are free on your local machine.

Frontend : http://localhost:3000/

Backend: http://localhost:4000/
