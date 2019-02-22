import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { map, find, filter } from 'lodash';

import store from 'store';

import RenderPriceBySession from './renderPriceBySession';

class PriceBySession extends Component {

    addPriceForSession = (sessionIndex, price) => {
        const { pricesBySession } = this.props;
        const exists = find(pricesBySession, { sessionIndex });
        if (exists) {
            if (exists.price !== price) {
                const newPricesBySession = filter(pricesBySession, (p) => p.sessionIndex !== sessionIndex);
                store.dispatch(change('event', 'pricesBySession', [ ...newPricesBySession, { sessionIndex, price }]));
            } 
        } else {
            store.dispatch(change('event', 'pricesBySession', [ ...pricesBySession, { sessionIndex, price }]));
        }
    }

    renderSessions = () => {
        const { sessions, pricesBySession } = this.props;
        return map(sessions, s => {
            const exists = find(pricesBySession, { sessionIndex : s.index });
            
            let initialValues = {};
            if (exists) {
                initialValues.price = exists.price 
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
    const pricesBySession = selector(state, 'pricesBySession');
    return {
        pricesBySession,
    }
})(PriceBySession)


export default PriceBySession;