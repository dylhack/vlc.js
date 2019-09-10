**[vlc.js](../README.md)**

[Globals](../globals.md) › [&quot;structures/VLCRequest&quot;](../modules/_structures_vlcrequest_.md) › [VLCRequest](_structures_vlcrequest_.vlcrequest.md)

# Class: VLCRequest

**`class`** VLCRequest

**`description`** This class stores all the data about a completed request with VLCs' HTTP server.

## Hierarchy

* **VLCRequest**

## Index

### Constructors

* [constructor](_structures_vlcrequest_.vlcrequest.md#constructor)

### Properties

* [data](_structures_vlcrequest_.vlcrequest.md#data)
* [request](_structures_vlcrequest_.vlcrequest.md#request)
* [response](_structures_vlcrequest_.vlcrequest.md#response)

## Constructors

###  constructor

\+ **new VLCRequest**(`req`: ClientRequest, `res`: IncomingMessage, `data`: Buffer): *[VLCRequest](_structures_vlcrequest_.vlcrequest.md)*

Defined in structures/VLCRequest.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`req` | ClientRequest |
`res` | IncomingMessage |
`data` | Buffer |

**Returns:** *[VLCRequest](_structures_vlcrequest_.vlcrequest.md)*

## Properties

###  data

• **data**: *Buffer*

Defined in structures/VLCRequest.ts:10

___

###  request

• **request**: *ClientRequest*

Defined in structures/VLCRequest.ts:9

___

###  response

• **response**: *IncomingMessage*

Defined in structures/VLCRequest.ts:8