import React, { useState, useEffect } from 'react'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback, Jumbotron
} from 'reactstrap';
import firebase from './config'
import './App.css';

//modified from https://github.com/alligatorio/Fancy-Form-Example
const App = () => {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(1.0)
  const [validations, setValidations] = useState({ email: false, amount: true })

  const [stats, setStats] = useState({})


  useEffect(() => {
    const statsRef = firebase.database().ref('stats')
    statsRef.on('value', (snapshot) => {
      let statsFromFirebase = snapshot.val();
      console.log(statsFromFirebase)
      setStats(statsFromFirebase)
    })

  }, [stats.totalMoney, stats.totalDonors])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && amount) {
      //console.log(`Email: ${email}`)
    

      const childName = email.replace(/[.#$@]/g, "");

      //check if existed
      firebase.database().ref(`donors/${childName}`).once("value", snapshot => {
        if (snapshot.exists()) {

          const prevAmount = (snapshot.val().amount)*1;

          firebase.database().ref(`donors/${childName}`).update({ 'amount': prevAmount + amount })

          
        } else {
          firebase.database().ref(`donors`).update({
            [childName]: {
              "email": email,
              "amount": amount
            }
          })

          firebase.database().ref('stats').child('totalDonors').transaction(function (totalDonors) {
            return ((totalDonors)*1 || 0) + 1
          })
        }
      });

      firebase.database().ref('stats').child('totalMoney').transaction(function (totalMoney) {
        return ((totalMoney)*1 || 0) + amount
      })

      setEmail('')
      setAmount(1.0)
      setValidations({ email: false, amount: true })
    }

  }

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'amount') {
      setAmount(value*1)
    }
  }

  const validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRex.test(e.target.value)) {
      setValidations({ ...validations, email: true })
    } else {
      setValidations({ ...validations, email: false })
    }
  }

  const validateAmount = (e) => {

    if (e.target.value && parseFloat(e.target.value) <= 100.0) {
      setValidations({ ...validations, amount: true })
    } else {
      setValidations({ ...validations, amount: false })
    }
  }



  return (
    <Container className="App">
      <h2>Donation Form</h2>
      <Form className="form" onSubmit={handleSubmit}>
        <Col>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="email"
              name="email"
              id="donateEmail"
              placeholder="myemail@email.com"
              value={email}
              valid={validations.email}
              invalid={!validations.email}
              onChange={(e) => {
                validateEmail(e)
                handleChange(e)
              }}
            />
            <FormFeedback valid>
              That's a tasty looking email you've got there.
            </FormFeedback>
            <FormFeedback>
              Uh oh! Looks like there is an issue with your email. Please input a correct email.
            </FormFeedback>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Amount</Label>
            <Input
              type="amount"
              name="amount"
              id="donateAmount"
              placeholder="$ for Andreen"
              value={amount}
              valid={validations.amount}
              invalid={!validations.amount}
              onChange={(e) => {
                validateAmount(e)
                handleChange(e)
              }}
            />
            <FormFeedback valid>
              That's a very kind amount for Andreen.
            </FormFeedback>
            <FormFeedback>
              Uh oh! Looks like you're missing the amount of money you wanna donate, or it's too big! 
              (we only accept bills less than 100)
            </FormFeedback>
          </FormGroup>
        </Col>
        <Button>Donate!</Button>
      </Form>
      <Jumbotron>
        <h1 className="display-3">{stats.totalMoney}$ donated!</h1>
        <p className="lead">Total of {stats.totalDonors} donors world wide.</p>
      </Jumbotron>
    </Container>
  )

}

export default App;