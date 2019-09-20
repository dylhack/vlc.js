[vlc.js](../README.md) › [Globals](../globals.md) › ["http/Requester"](_http_requester_.md)

# External module: "http/Requester"

## Index

### Enumerations

* [VLCCommand](../enums/_http_requester_.vlccommand.md)

### Type aliases

* [VLCCredentials](_http_requester_.md#vlccredentials)

### Functions

* [_request](_http_requester_.md#private-_request)
* [command](_http_requester_.md#command)
* [getPlaylist](_http_requester_.md#getplaylist)
* [getStatus](_http_requester_.md#getstatus)

## Type aliases

###  VLCCredentials

Ƭ **VLCCredentials**: *object*

Defined in http/Requester.ts:22

**`interface`** VLCCredentials

**`property`** {String} address

**`property`** {String} password

**`property`** {String|Number} port

**`description`** This is standard login credentials for accessing VLCs' HTTP endpoint.

#### Type declaration:

* **address**: *string*

* **password**: *string*

* **port**: *number*

## Functions

### `Private` _request

▸ **_request**(`address`: URL, `details`: [VLCCredentials](_http_requester_.md#vlccredentials)): *Promise‹[VLCRequest](../classes/_http_classes_vlcrequest_.vlcrequest.md)›*

Defined in http/Requester.ts:124

**Parameters:**

Name | Type |
------ | ------ |
`address` | URL |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) |

**Returns:** *Promise‹[VLCRequest](../classes/_http_classes_vlcrequest_.vlcrequest.md)›*

___

###  command

▸ **command**(`details`: [VLCCredentials](_http_requester_.md#vlccredentials), `vlcCommand`: [VLCCommand](../enums/_http_requester_.vlccommand.md), `query`: string[] | undefined): *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*

Defined in http/Requester.ts:79

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) | - |
`vlcCommand` | [VLCCommand](../enums/_http_requester_.vlccommand.md) | - |
`query` | string[] &#124; undefined |  undefined |

**Returns:** *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  getPlaylist

▸ **getPlaylist**(`details`: [VLCCredentials](_http_requester_.md#vlccredentials)): *Promise‹[VLCPlaylist](../classes/_http_classes_vlcplaylist_.vlcplaylist.md)›*

Defined in http/Requester.ts:110

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) |

**Returns:** *Promise‹[VLCPlaylist](../classes/_http_classes_vlcplaylist_.vlcplaylist.md)›*

___

###  getStatus

▸ **getStatus**(`details`: [VLCCredentials](_http_requester_.md#vlccredentials)): *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*

Defined in http/Requester.ts:98

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) |

**Returns:** *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*
