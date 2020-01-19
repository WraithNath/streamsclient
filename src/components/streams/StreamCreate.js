import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";

import {createStream} from "../../actions";

class StreamCreate extends React.Component {
    render = () => {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" label="Title" component={this.renderInput}/>
                <Field name="description" label="Description" component={this.renderInput}/>
                <button className="ui button primary">Start Steaming</button>
            </form>
        );
    };

    renderInput = fieldProps => {
        const className = `field ${fieldProps.meta.touched && fieldProps.meta.error && 'error'}`;

        return (
            <div className={className}>
                <label>{fieldProps.label}</label>
                <input {...fieldProps.input} autoComplete="off" />
                {fieldProps.meta.touched && fieldProps.meta.error && <div className="ui error message">{fieldProps.meta.error}</div>}
            </div>
        );
    };

    onSubmit = formProps => {
        this.props.createStream(formProps);
    };
}

const validate = formValues => {
    const errors = {};

    if(!formValues.title || formValues.title === '')
        errors.title = 'Please enter a title.';

    if (!formValues.description)
        errors.description = 'Please enter a description.';

    return errors;
};

const wrappedForm =  reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null,{createStream})(wrappedForm);