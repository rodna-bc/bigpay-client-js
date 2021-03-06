import { omitNil } from '../../../common/utils';

/**
 * @param {Object} [data={}]
 * @param {Object} data.billingAddress
 * @param {CreditCard} data.creditCard
 * @param {boolean} data.defaultInstrument
 * @param {string} data.providerName
 * @return {Object}
 */
export function mapToInstrumentPayload(data = {}) {
    const {
        providerName,
        defaultInstrument: default_instrument,
    } = data;

    const provider = omitNil({ name: providerName });

    return omitNil({
        provider,
        credit_card: mapToCreditCard(data),
        billing_address: mapToAddress(data),
        default_instrument,
    });
}

/**
 * @param {Object} data
 * @param {string} data.authToken
 * @return {Object}
 */
export function mapToHeaders({ authToken: Authorization } = {}) {
    return omitNil({
        Authorization,
    });
}

/**
 * @param {AddressData} data
 * @return {Object}
 */
function mapToAddress({ billingAddress = {} }) {
    const state = mapToState(billingAddress.provinceCode, billingAddress.province);

    return omitNil({
        address_line_1: billingAddress.addressLine1,
        address_line_2: billingAddress.addressLine2,
        city: billingAddress.city,
        company: billingAddress.company,
        country_code: billingAddress.countryCode,
        email: billingAddress.email,
        first_name: billingAddress.firstName,
        last_name: billingAddress.lastName,
        phone: billingAddress.phone,
        postal_code: billingAddress.postCode,
        state,
    });
}

/**
 * @param {string} code
 * @param {string} name
 * @return {Object}
 */
function mapToState(code, name) {
    return omitNil({
        code,
        name,
    });
}

/**
 * @param {Object} data
 * @param {CreditCard} data.creditCard
 * @return {Object}
 */
function mapToCreditCard({ creditCard = {} }) {
    const threeDSecure = omitNil(creditCard.threeDSecure);

    return omitNil({
        cardholder_name: creditCard.cardholderName,
        number: creditCard.number,
        month: creditCard.month,
        year: creditCard.year,
        verification_code: creditCard.verificationCode,
        issue_month: creditCard.issueMonth,
        issue_year: creditCard.issueYear,
        issue_number: creditCard.issueNumber,
        track_data: creditCard.trackData,
        is_manual_entry: creditCard.isManualEntry,
        icc_data: creditCard.iccData,
        fallback_reason: creditCard.fallbackReason,
        is_contactless: creditCard.isContactless,
        encrypted_pin_cryptogram: creditCard.encryptedPinCryptogram,
        encrypted_pin_ksn: creditCard.encryptedPinKsn,
        three_d_secure: threeDSecure,
    });
}
