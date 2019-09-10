**[vlc.js](../README.md)**

[Globals](../globals.md) › [&quot;Requester&quot;](_requester_.md)

# External module: "Requester"

## Index

### Enumerations

* [VLCCommand](../enums/_requester_.vlccommand.md)

### Interfaces

* [VLCCredentials](../interfaces/_requester_.vlccredentials.md)

### Functions

* [_request](_requester_.md#private-_request)
* [command](_requester_.md#command)
* [getPlaylist](_requester_.md#getplaylist)
* [getStatus](_requester_.md#getstatus)

## Functions

### `Private` _request

▸ **_request**(`address`: URL, `details`: [VLCCredentials](../interfaces/_requester_.vlccredentials.md)): *Promise‹[VLCRequest](../classes/_structures_vlcrequest_.vlcrequest.md)›*

Defined in Requester.ts:120

**Parameters:**

Name | Type |
------ | ------ |
`address` | URL |
`details` | [VLCCredentials](../interfaces/_requester_.vlccredentials.md) |

**Returns:** *Promise‹[VLCRequest](../classes/_structures_vlcrequest_.vlcrequest.md)›*

___

###  command

▸ **command**(`details`: [VLCCredentials](../interfaces/_requester_.vlccredentials.md), `vlcCommand`: [VLCCommand](../enums/_requester_.vlccommand.md), `query`: string[] | undefined): *Promise‹[VLCStatus](../classes/_structures_vlcstatus_.vlcstatus.md)›*

Defined in Requester.ts:79

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`details` | [VLCCredentials](../interfaces/_requester_.vlccredentials.md) | - |
`vlcCommand` | [VLCCommand](../enums/_requester_.vlccommand.md) | - |
`query` | string[] &#124; undefined |  undefined |

**Returns:** *Promise‹[VLCStatus](../classes/_structures_vlcstatus_.vlcstatus.md)›*

___

###  getPlaylist

▸ **getPlaylist**(`details`: [VLCCredentials](../interfaces/_requester_.vlccredentials.md)): *Promise‹[VLCPlaylist](../classes/_structures_vlcplaylist_.vlcplaylist.md)›*

Defined in Requester.ts:108

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](../interfaces/_requester_.vlccredentials.md) |

**Returns:** *Promise‹[VLCPlaylist](../classes/_structures_vlcplaylist_.vlcplaylist.md)›*

___

###  getStatus

▸ **getStatus**(`details`: [VLCCredentials](../interfaces/_requester_.vlccredentials.md)): *Promise‹[VLCStatus](../classes/_structures_vlcstatus_.vlcstatus.md)›*

Defined in Requester.ts:98

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](../interfaces/_requester_.vlccredentials.md) |

**Returns:** *Promise‹[VLCStatus](../classes/_structures_vlcstatus_.vlcstatus.md)›*