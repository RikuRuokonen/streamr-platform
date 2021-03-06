import * as constants from '$mp/modules/purchaseDialog/constants'

describe('purchaseDialog - constants', () => {
    it('is namespaced correctly', () => {
        Object.keys(constants).forEach((key) => {
            expect(constants[key]).toEqual(expect.stringMatching(/^marketplace\/purchaseDialog\//))
        })
    })
})
