import React from 'react';
import {
    FormGroup,
    InputGroup,
    FormControl,
    Button,
    HelpBlock
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const LoadingForm = ({ formControlProps }) => (
    <InputGroup>
        <FormControl {...formControlProps} />
        <InputGroup.Addon>
            <FontAwesome name="circle-o-notch" spin />
        </InputGroup.Addon>
    </InputGroup>
);

const ReadyForm = ({ formControlProps, isValid }) =>
    (!isValid
        ? <FormControl {...formControlProps} />
        : <InputGroup>
              <FormControl {...formControlProps} />
              <InputGroup.Button>
                  <Button bsStyle="success">Save</Button>
              </InputGroup.Button>
          </InputGroup>);

export class UrlForm extends React.Component {
    constructor(
        props: {
            value: string,
            isLoading: boolean
        }
    ) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    _isValid() {
        if (!this.state.value || this.props.isLoading) {
            return;
        }
        var a = document.createElement('a');
        a.href = this.state.value;
        return a.host && a.host === window.location.host;
    }
    _getValidationState(): 'error' | 'success' {
        if (!this.state.value || this.props.isLoading) {
            return;
        }
        return this._isValid() ? 'error' : 'success';
    }
    _handleChange = (event: Event) => {
        this.setState({ value: event.target.value });
    };
    render() {
        const formControlProps = {
            type: 'text',
            value: this.state.value,
            placeholder: 'What do you want to subscribe to?',
            onChange: this._handleChange
        };
        return (
            <div>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this._getValidationState()}
                    >
                        {!this.props.isLoading
                            ? <ReadyForm
                                  formControlProps={formControlProps}
                                  isValid={
                                      this._getValidationState() === 'success'
                                  }
                              />
                            : <LoadingForm
                                  formControlProps={formControlProps}
                              />}
                        <div className="text-center">
                            {this._isValid() &&
                                <HelpBlock>
                                    No sources found for this link
                                </HelpBlock>}
                        </div>
                    </FormGroup>
                </form>
            </div>
        );
    }
}
