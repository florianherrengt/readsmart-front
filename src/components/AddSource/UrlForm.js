// @flow
import React from 'react';
import { FormGroup, InputGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import isUrl from 'is-url';

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

export type UrlFormProps = {
    value: string,
    isLoading: boolean,
    onChange: Function,
    isValid?: boolean,
};

export class UrlForm extends React.Component {
    state: { value: string };
    constructor(props: UrlFormProps) {
        super(props);
        this.state = {
            value: props.value,
        };
    }
    _isValid() {
        let { value } = this.state;
        if (value && value.slice(0, 7) !== 'http://') {
            value = 'http://' + value;
        }
        return typeof this.props.isValid !== 'undefined' ? this.props.isValid : isUrl(value);
    }
    _getValidationState(): 'error' | 'success' | null {
        if (!this.state.value || this.props.isLoading) {
            return null;
        }
        return this._isValid() ? 'success' : 'error';
    }
    _handleChange = (event: SyntheticInputEvent) => {
        this.setState({ value: event.target.value }, () => {
            this._isValid() && this.props.onChange(this.state.value);
        });
    };
    render() {
        const formControlProps = {
            type: 'text',
            value: this.state.value,
            placeholder: 'Url from Reddit, Medium, Hackernews or RSS... (more sources coming soon)',
            onChange: this._handleChange,
        };
        return (
            <div>
                <form>
                    <FormGroup controlId="formBasicText" validationState={this._getValidationState()}>
                        {!this.props.isLoading
                            ? <ReadyForm
                                  formControlProps={formControlProps}
                                  isValid={this._getValidationState() === 'success'}
                              />
                            : <LoadingForm formControlProps={formControlProps} />}
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
