import React from 'react'
import { mount } from 'enzyme'

import InputError from '$shared/components/FormControl/InputError'

describe(InputError.name, () => {
    const error = (message, eligible) => mount((
        <InputError preserved message={message} eligible={eligible} />
    ))

    it('renders nothing by default', () => {
        expect(error('', false).text()).toBe('')
    })

    it('renders the message if eligible', () => {
        expect(error('message', true).text()).toBe('message')
    })
})
