import utils from '/src/utils/index.js';
const toBytes20 = utils.address.toBytes20;

describe('Address utils', function() {
    it('toBytes20 will convert bech32 address to base16', function() {
        expect(
            utils.address.toBytes20('zil1h2s5e3t07cc4dhff54yagedzw4944g0q7el7e4')).to.equal('0xbAA14cc56FF63156dD29a549d465a2754B5Aa1E0');
    });

    it('toBytes20 will return address if address is already bytes20', function() {
        expect(toBytes20('0xbAA14cc56FF63156dD29a549d465a2754B5Aa1E0'))
        .to.equal('0xbAA14cc56FF63156dD29a549d465a2754B5Aa1E0');
    });

    it('toBytes20 will fail if address is invalid', function() {
        expect(() => toBytes20('0xbAA14cc56FF63156dD299d465a2754B5Aa1E0'))
        .to.throw('Not a base 16');
    });
});
