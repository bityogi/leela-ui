import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { map, find, filter } from 'lodash';

import store from 'store';

import RenderPriceByQuestion from './renderPriceByQuestion';

class PriceByQuestion extends Component {

    addPriceForQuestion = (questionIndex, price) => {
        const { pricesByQuestion } = this.props;
        const exists = find(pricesByQuestion, { questionIndex });
        if (exists) {
            if (exists.price !== price) {
                const newPricesByQuestion = filter(pricesByQuestion, (p) => p.questionIndex !== questionIndex);
                store.dispatch(change('event', 'pricesByQuestion', [ ...newPricesByQuestion, { questionIndex, price }]));
            } 
        } else {
            store.dispatch(change('event', 'pricesByQuestion', [ ...pricesByQuestion, { questionIndex, price }]));
        }
    }

    renderBoolQuestions = () => {
        const { boolQuestions, pricesByQuestion } = this.props;
        
        return map(boolQuestions, q => {
            const exists = find(pricesByQuestion, { questionIndex : q.index });
            
            let initialValues = {};
            if (exists) {
                initialValues.price = exists.price 
            }

            return (
                    <RenderPriceByQuestion
                        form={`priceByQuestionFor${q.index}`}
                        question={q}
                        addPriceForQuestion={this.addPriceForQuestion}
                        key={q.index}
                        initialValues={initialValues}
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