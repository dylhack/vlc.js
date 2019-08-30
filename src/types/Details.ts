/**
 * @interface Details
 * @prop {String} password
 * @prop {String} address
 * @prop {String|Number} port
 * @desc Login details
 */
export interface Details {
    password: string;
    address: string;
    port: string | number;
}
