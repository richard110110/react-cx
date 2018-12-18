/*global google */
import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Script from 'react-load-script'

import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateInput from '../../../app/common/form/DateInput'
import moment from 'moment';
import PlaceInput from '../../../app/common/form/PlaceInput';

const notify = () => toast("Wow so easy !")

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};



const actions = {
  createEvent,
  updateEvent
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({

  title: isRequired({ message: "Please provide a title" } ) ,
  
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired('date')
});


class EventForm extends Component {
  state = {
      cityLatLng: {},
      venueLatLng: {},
      scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });


  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(lating => {
          this.setState({
            cityLatLng: lating
          })
      })
      .then(()=>{
        this.props.change('city', selectedCity)
      })
  };

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
          this.setState({
            venueLatLng: latlng
          })
      })
      .then(()=>{
        this.props.change('venue', selectedVenue)
      })
  };

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };

      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }

    

    
  };

  onInputChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  };





  render() {

    const {invalid, submitting, pristine} = this.props;

    return (
      <Grid>
         <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9lM1FW4ClzpFADWGeJhyjTS2Ym0e6RxY&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />

            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                multiple={true}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                row={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{types: ['(cities)']}}
                placeholder="Event City"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && 
              <Field
                name="venue"
                type="text"
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types:['establishment']
                }}
                component={PlaceInput}
                placeholder="Event Venue"
                onSelect={this.handleVenueSelect}
              />}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Event Date"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />

              <Button disabled={invalid || submitting || pristine}   positive type="submit">
                Submit
              </Button >
              <ToastContainer autoClose={2000} />

              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm", enableReinitialize: true, validate })(EventForm));
