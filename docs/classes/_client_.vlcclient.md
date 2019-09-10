**[vlc.js](../README.md)**

[Globals](../globals.md) › [&quot;Client&quot;](../modules/_client_.md) › [VLCClient](_client_.vlcclient.md)

# Class: VLCClient

**`class`** VLCClient

**`description`** Promise-oriented VLC HTTP endpoint Client.

## Hierarchy

* **VLCClient**

## Index

### Constructors

* [constructor](_client_.vlcclient.md#constructor)

### Properties

* [details](_client_.vlcclient.md#private-details)

### Methods

* [add](_client_.vlcclient.md#add)
* [command](_client_.vlcclient.md#command)
* [empty](_client_.vlcclient.md#empty)
* [fullscreen](_client_.vlcclient.md#fullscreen)
* [getPlaylist](_client_.vlcclient.md#getplaylist)
* [getStatus](_client_.vlcclient.md#getstatus)
* [loop](_client_.vlcclient.md#loop)
* [next](_client_.vlcclient.md#next)
* [pause](_client_.vlcclient.md#pause)
* [play](_client_.vlcclient.md#play)
* [previous](_client_.vlcclient.md#previous)
* [random](_client_.vlcclient.md#random)
* [remove](_client_.vlcclient.md#remove)
* [repeat](_client_.vlcclient.md#repeat)
* [volume](_client_.vlcclient.md#volume)

## Constructors

###  constructor

\+ **new VLCClient**(`details`: [VLCCredentials](../interfaces/_requester_.vlccredentials.md)): *[VLCClient](_client_.vlcclient.md)*

Defined in Client.ts:10

**`constructor`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`details` | [VLCCredentials](../interfaces/_requester_.vlccredentials.md) |   |

**Returns:** *[VLCClient](_client_.vlcclient.md)*

## Properties

### `Private` details

• **details**: *[VLCCredentials](../interfaces/_requester_.vlccredentials.md)*

Defined in Client.ts:10

## Methods

###  add

▸ **add**(`mrl`: string, `play`: boolean | undefined): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:41

**`description`** Add song based on MRL (media resource locator)

**`link`** https://wiki.videolan.org/Media_resource_locator/

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`mrl` | string | - | media resource locator |
`play` | boolean &#124; undefined |  undefined | Play the added media |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  command

▸ **command**(`vlcCommand`: [VLCCommand](../enums/_requester_.vlccommand.md), `query`: string[] | undefined): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:158

**`description`** Execute a VLC HTTP endpoint command

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`vlcCommand` | [VLCCommand](../enums/_requester_.vlccommand.md) | - | - |
`query` | string[] &#124; undefined |  undefined |   |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  empty

▸ **empty**(): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:49

**`description`** Clear playlist

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  fullscreen

▸ **fullscreen**(`isFullscreen`: boolean): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:57

**`description`** Toggle fullscreen (pretty useless)

**Parameters:**

Name | Type |
------ | ------ |
`isFullscreen` | boolean |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  getPlaylist

▸ **getPlaylist**(): *Promise‹[VLCPlaylist](_structures_vlcplaylist_.vlcplaylist.md)›*

Defined in Client.ts:30

**Returns:** *Promise‹[VLCPlaylist](_structures_vlcplaylist_.vlcplaylist.md)›*

___

###  getStatus

▸ **getStatus**(): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:23

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  loop

▸ **loop**(`isLoop`: boolean): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:68

**`description`** Loop playlist

**Parameters:**

Name | Type |
------ | ------ |
`isLoop` | boolean |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  next

▸ **next**(): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:79

**`description`** Play next song

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  pause

▸ **pause**(`isPaused`: true): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:87

**`description`** Pause current song

**Parameters:**

Name | Type |
------ | ------ |
`isPaused` | true |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  play

▸ **play**(`id`: string): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:101

**`description`** Play song based on ID If no ID is provided it'll play current song (restart / unpause)

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  previous

▸ **previous**(): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:109

**`description`** Play previous song

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  random

▸ **random**(`isRandom`: boolean): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:137

**`description`** Randomize the playlist

**Parameters:**

Name | Type |
------ | ------ |
`isRandom` | boolean |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  remove

▸ **remove**(`id`: string): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:118

**`description`** Remove song based on ID. If an ID isn't provided it'll remove current song

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  repeat

▸ **repeat**(`isRepeat`: boolean): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:126

**`description`** Repeat the current song

**Parameters:**

Name | Type |
------ | ------ |
`isRepeat` | boolean |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

___

###  volume

▸ **volume**(`value`: number | string): *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*

Defined in Client.ts:149

**`description`** Set volume

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; string |

**Returns:** *Promise‹[VLCStatus](_structures_vlcstatus_.vlcstatus.md)›*