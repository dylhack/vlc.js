[vlc.js](../README.md) › [Globals](../globals.md) › ["util/vlcrc"](_util_vlcrc_.md)

# External module: "util/vlcrc"

## Index

### Classes

* [VLCRC](../classes/_util_vlcrc_.vlcrc.md)

### Type aliases

* [ConfigLine](_util_vlcrc_.md#configline)

### Functions

* [_getPath](_util_vlcrc_.md#_getpath)
* [_readLine](_util_vlcrc_.md#_readline)
* [editVLCRC](_util_vlcrc_.md#editvlcrc)

### Object literals

* [locations](_util_vlcrc_.md#const-locations)

## Type aliases

###  ConfigLine

Ƭ **ConfigLine**: *object*

Defined in util/vlcrc.ts:21

#### Type declaration:

* **enabled**: *boolean*

* **key**: *string*

* **value**: *string | number | boolean*

## Functions

###  _getPath

▸ **_getPath**(): *string | undefined*

Defined in util/vlcrc.ts:47

**Returns:** *string | undefined*

___

###  _readLine

▸ **_readLine**(`line`: string): *[ConfigLine](_util_vlcrc_.md#configline)*

Defined in util/vlcrc.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`line` | string |

**Returns:** *[ConfigLine](_util_vlcrc_.md#configline)*

___

###  editVLCRC

▸ **editVLCRC**(`location?`: undefined | string): *[VLCRC](../classes/_util_vlcrc_.vlcrc.md)*

Defined in util/vlcrc.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`location?` | undefined &#124; string |

**Returns:** *[VLCRC](../classes/_util_vlcrc_.vlcrc.md)*

## Object literals

### `Const` locations

### ▪ **locations**: *object*

Defined in util/vlcrc.ts:9

**`link`** https://www.videolan.org/support/faq.html#Config
Last updated: September 15th, 2019

###  win32

• **win32**: *string* =  `${os.homedir()}\\AppData\\Roaming\\vlc\\vlcrc`

Defined in util/vlcrc.ts:18

▪ **macos**: *object*

Defined in util/vlcrc.ts:14

* **v8**: *string* =  `${os.homedir()}/Library/Preferences/org.videolan.vlc`

* **v9**: *string* =  `${os.homedir()}/Library/Preferences/VLC`

▪ **unix**: *object*

Defined in util/vlcrc.ts:10

* **v8**: *string* =  `${os.homedir()}/.vlc/vlcrc`

* **v9**: *string* =  `${os.homedir()}/.config/vlc/vlcrc`
