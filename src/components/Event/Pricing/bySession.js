import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { map, forEach } from 'lodash';

import store from 'store';

import RenderPriceBySession from './renderPriceBySession';

class PriceBySession extends Component {

    addPriceForSession = (sessionIndex, price) => {
        const { sessions } = this.props;
        forEach(sessions, (s) => {
            if (s.index === sessionIndex) {
                s.sessionPrice = { amount: price };
            }
        });
        store.dispatch(change('event', 'sessions', sessions));

        
    }

    renderSessions = () => {
        const { sessions } = this.props;
        return map(sessions, s => {
            const exists = s.sessionPrice;
            
            let initialValues = {};
            if (exists) {
                initialValues.price = exists.amount 
            }

            return (
                    <RenderPriceBySession
                        form={`priceFor${s.index}`}
                        session={s}
                        addPriceForSession={this.addPriceForSession}
                        key={s.index}
                        initialValues={initialValues}
                    />
                )
            })

    }

    render() {
        return (
            <div>
                {this.renderSessions()}
            </div>
        )
    }
}

PriceBySession = reduxForm({
    form: 'priceBySession',
})(PriceBySession)

const selector = formValueSelector('event')
PriceBySession = connect(state => {
    const sessions = selector(state, 'sessions');
    return {
        sessions,
    }
})(PriceBySession)


export default PriceBySession;