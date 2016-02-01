import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import { createTopic, clearSuccessMessage } from '../reducers/create';

import Container from '../components/Container';
import Alert from '../components/Alert';
import AddTopicForm from '../components/AddTopicForm';

function mapStateToProps(state) {
  return {
    create: state.create,
    showSuccess: state.create.get('showSuccess')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClearSuccess: () => dispatch(clearSuccessMessage()),
    onSubmitTopic: (val) => dispatch(createTopic(val)),
  };
}

const Topics = ({ create, onClearSuccess, onSubmitTopic, showSuccess }) => {
  return (
    <Container>
      <Alert isVisible={ showSuccess } status="success">
        Topic created successfully.
      </Alert>

      <AddTopicForm
        onSubmit={ onSubmitTopic }
        message={ create.get('message') }
        isPending={ create.get('pending') }
        hasError={ create.get('hasError') } />
    </Container>
  );
};

Topics.defaultProps = {};

Topics.propTypes = {
  create: PropTypes.instanceOf(Map).isRequired,
  onSubmitTopic: PropTypes.func.isRequired,
  showSuccess: PropTypes.bool.isRequired,
  onClearSuccess: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Topics);
