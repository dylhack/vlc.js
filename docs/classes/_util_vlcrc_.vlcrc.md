[vlc.js](../README.md) › [Globals](../globals.md) › ["util/vlcrc"](../modules/_util_vlcrc_.md) › [VLCRC](_util_vlcrc_.vlcrc.md)

# Class: VLCRC

## Hierarchy

* **VLCRC**

## Index

### Constructors

* [constructor](_util_vlcrc_.vlcrc.md#constructor)

### Properties

* [_map](_util_vlcrc_.vlcrc.md#private-_map)
* [_original](_util_vlcrc_.vlcrc.md#private-_original)

### Methods

* [disable](_util_vlcrc_.vlcrc.md#disable)
* [enable](_util_vlcrc_.vlcrc.md#enable)
* [export](_util_vlcrc_.vlcrc.md#export)
* [get](_util_vlcrc_.vlcrc.md#get)
* [set](_util_vlcrc_.vlcrc.md#set)

## Constructors

###  constructor

\+ **new VLCRC**(`data`: Buffer): *[VLCRC](_util_vlcrc_.vlcrc.md)*

Defined in util/vlcrc.ts:80

**Parameters:**

Name | Type |
------ | ------ |
`data` | Buffer |

**Returns:** *[VLCRC](_util_vlcrc_.vlcrc.md)*

## Properties

### `Private` _map

• **_map**: *Map‹string, [ConfigLine](../modules/_util_vlcrc_.md#configline)›*

Defined in util/vlcrc.ts:79

___

### `Private` _original

• **_original**: *Buffer*

Defined in util/vlcrc.ts:80

## Methods

###  disable

▸ **disable**(`key`: string): *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*

Defined in util/vlcrc.ts:106

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*

___

###  enable

▸ **enable**(`key`: string): *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*

Defined in util/vlcrc.ts:115

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*

___

###  export

▸ **export**(): *Buffer*

Defined in util/vlcrc.ts:124

**Returns:** *Buffer*

___

###  get

▸ **get**(`key`: string): *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*

Defined in util/vlcrc.ts:93

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*

___

###  set

▸ **set**(`key`: string, `value`: boolean | number | string): *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*

Defined in util/vlcrc.ts:97

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | boolean &#124; number &#124; string |

**Returns:** *[ConfigLine](../modules/_util_vlcrc_.md#configline) | undefined*
