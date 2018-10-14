import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class FormCreator extends Component {
  componentWillMount() {
    if (!this.props.authenticated) {
      this.props.history.push("/");
    }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.authenticated) {
      this.props.history.push("/");
    }
  }

  makePollId() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 11; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  handleSubmit(e) {
    e.preventDefault();
    const refs = this.refs;
    const pollObject = {
      text: refs.formTitle.value,
      pollId: this.makePollId(),
      answers: []
    };
    Object.keys(refs).forEach(function(key) {
      if (key === "pollOption1") {
        pollObject.answers.push({
          votes: 0,
          selected: true,
          text: refs[key].value
        });
      } else if (key !== "formTitle" && key !== "pollOption1") {
        pollObject.answers.push({
          votes: 0,
          selected: false,
          text: refs[key].value
        });
      }
    });
    const pollListing = [...this.props.polls];
    pollListing.push(pollObject);
    this.props.addPoll(pollListing);
    this.props.history.push("/");
    return;
  }

  addAnswer(e) {
    e.preventDefault();
    this.props.addPollOption();
    return;
  }

  renderAnswerFields(id, index) {
    const inputField = (
      <input
        type="text"
        id={id}
        key={index}
        ref={id}
        placeholder={`Poll Option #${index + 1}`}
      />
    );
    return inputField;
  }

  render() {
    return (
      <div className="contain">
        <form className="poll-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-field">
            <label htmlFor="form-title">What are you polling?</label>
            <input
              type="text"
              name="form-title"
              placeholder="Title Your Form"
              id="formTitle"
              ref="formTitle"
              required
            />
          </div>
          <div className="input-field">
            <label>Polling answers!</label>
            {this.props.pollForm.inputId.map(this.renderAnswerFields)}
          </div>
          <div className="input-field">
            <button
              onClick={this.addAnswer.bind(this)}
              disabled={this.props.pollForm.inputId.length >= 5}
            >
              Add Answer
            </button>
          </div>
          <div className="input-field">
            <input type="submit" value="Add Form" />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth,
    pollForm: state.pollForm,
    polls: state.polls
  };
}

export default connect(
  mapStateToProps,
  actions
)(FormCreator);
