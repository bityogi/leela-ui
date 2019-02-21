import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { map, find, filter } from 'lodash';

import store from 'store';

import RenderPriceByQuestion from './renderPriceByQuestion';

class PriceByQuestion extends Component {

    addPriceForQuestion = (questionIndex, price) => {
        console.log('addPriceForQuestion -- questionIndex: ', questionIndex);
        console.log('addPriceForQuestion -- price: ', price);
        const { pricesByQuestion } = this.props;
        const exists = find(pricesByQuestion, { questionIndex });
        if (exists) {
            console.log('A price for this question already exists. Checking if its the same.')
            if (exists.price === price) {
                console.log('Price seems to match old value. Do nothing.')
            } else {
                const newPricesByQuestion = filter(pricesByQuestion, (p) => p.questionIndex !== questionIndex);

                console.log('newPricesByQuestion: ', newPricesByQuestion);
                store.dispatch(change('event', 'pricesByQuestion', [ ...newPricesByQuestion, { questionIndex, price }]));
            }   
        } else {
            store.dispatch(change('event', 'pricesByQuestion', [ ...pricesByQuestion, { questionIndex, price }]));
        }
        
    }

    renderBoolQuestions = () => {
        const { boolQuestions, pricesByQuestion } = this.props;
        console.log('Received priceByQuestion: ', pricesByQuestion);
        return map(boolQuestions, q => {
            return (
                    <RenderPriceByQuestion
                        question={q}
                        addPriceForQuestion={this.addPriceForQuestion}
                        key={q.index}
                    />
                )
            })

    }

    render() {
        return (
            <div>
                {this.renderBoolQuestions()}
            </div>
        )
    }
}

PriceByQuestion = reduxForm({
    form: 'priceByQuestion',
})(PriceByQuestion)

const selector = formValueSelector('event')
PriceByQuestion = connect(state => {
    const pricesByQuestion = selector(state, 'pricesByQuestion');
    return {
        pricesByQuestion,
    }
})(PriceByQuestion)


export default PriceByQuestion;