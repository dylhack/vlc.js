/**
 * @interface Details
 * @prop {String} username
 * @prop {String} password
 * @prop {String} address
 * @prop {String|Number} port
 * @desc Login details
 */
export interface Details {
    username: string;
    password: string;
    address: string;
    port: string | number;
}
