import * as constants from '$mp/modules/updateContractProduct/constants'

describe('updateContractProduct - constants', () => {
    it('is namespaced correctly', () => {
        Object.keys(constants).forEach((key) => {
            expect(constants[key]).toEqual(expect.stringMatching(/^marketplace\/updateContractProduct\//))
        })
    })
})
