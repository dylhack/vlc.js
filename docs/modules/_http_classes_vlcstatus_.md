[@dylhack/vlc.js](../README.md) › [Globals](../globals.md) › ["http/classes/VLCStatus"](_http_classes_vlcstatus_.md)

# External module: "http/classes/VLCStatus"

## Index

### Enumerations

* [VLCPlaylistStatus](../enums/_http_classes_vlcstatus_.vlcplayliststatus.md)

### Classes

* [VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)

### Type aliases

* [AudioFilters](_http_classes_vlcstatus_.md#audiofilters)
* [Category](_http_classes_vlcstatus_.md#category)
* [Equalizer](_http_classes_vlcstatus_.md#equalizer)
* [Information](_http_classes_vlcstatus_.md#information)
* [Meta](_http_classes_vlcstatus_.md#meta)
* [Presets](_http_classes_vlcstatus_.md#presets)
* [Stream0](_http_classes_vlcstatus_.md#stream0)
* [VideoEffects](_http_classes_vlcstatus_.md#videoeffects)

## Type aliases

###  AudioFilters

Ƭ **AudioFilters**: *object*

Defined in http/classes/VLCStatus.ts:66

#### Type declaration:

* **filter_0**? : *undefined | string*

* **filter_1**? : *undefined | string*

* **filter_2**? : *undefined | string*

* **filter_3**? : *undefined | string*

* **filter_4**? : *undefined | string*

___

###  Category

Ƭ **Category**: *object*

Defined in http/classes/VLCStatus.ts:109

#### Type declaration:

* **Stream 0**: *[Stream0](_http_classes_vlcstatus_.md#stream0)*

* **meta**: *[Meta](_http_classes_vlcstatus_.md#meta)*

___

###  Equalizer

Ƭ **Equalizer**: *object*

Defined in http/classes/VLCStatus.ts:74

#### Type declaration:

* **bands**(): *object*

* **preamp**: *number*

* **presets**: *[Presets](_http_classes_vlcstatus_.md#presets)*

___

###  Information

Ƭ **Information**: *object*

Defined in http/classes/VLCStatus.ts:101

#### Type declaration:

* **category**: *[Category](_http_classes_vlcstatus_.md#category)*

* **chapter**: *number*

* **chapters**: *any[]*

* **title**: *number*

* **titles**: *any[]*

___

###  Meta

Ƭ **Meta**: *object*

Defined in http/classes/VLCStatus.ts:123

#### Type declaration:

* **album**? : *undefined | string*

* **artist**? : *undefined | string*

* **copyright**? : *undefined | string*

* **date**? : *undefined | string*

* **description**? : *undefined | string*

* **episodeNumber**: *number*

* **filename**? : *undefined | string*

* **genre**? : *undefined | string*

* **language**? : *undefined | string*

* **now_playing**? : *undefined | string*

* **publisher**? : *undefined | string*

* **seasonNumber**: *number*

* **title**? : *undefined | string*

* **track_number**? : *undefined | string*

* **track_total**? : *undefined | string*

* **url**? : *undefined | string*

___

###  Presets

Ƭ **Presets**: *object*

Defined in http/classes/VLCStatus.ts:80

#### Type declaration:

* **preset id="0"**? : *undefined | string*

* **preset id="1"**? : *undefined | string*

* **preset id="10"**? : *undefined | string*

* **preset id="11"**? : *undefined | string*

* **preset id="12"**? : *undefined | string*

* **preset id="13"**? : *undefined | string*

* **preset id="14"**? : *undefined | string*

* **preset id="15"**? : *undefined | string*

* **preset id="16"**? : *undefined | string*

* **preset id="17"**? : *undefined | string*

* **preset id="2"**? : *undefined | string*

* **preset id="3"**? : *undefined | string*

* **preset id="4"**? : *undefined | string*

* **preset id="5"**? : *undefined | string*

* **preset id="6"**? : *undefined | string*

* **preset id="7"**? : *undefined | string*

* **preset id="8"**? : *undefined | string*

* **preset id="9"**? : *undefined | string*

___

###  Stream0

Ƭ **Stream0**: *object*

Defined in http/classes/VLCStatus.ts:114

#### Type declaration:

* **Bitrate**: *string*

* **Bits_per_sample**: *string*

* **Channels**: *string*

* **Codec**: *string*

* **Sample_rate**: *string*

* **Type**: *string*

___

###  VideoEffects

Ƭ **VideoEffects**: *object*

Defined in http/classes/VLCStatus.ts:142

#### Type declaration:

* **brightness**: *number*

* **contrast**: *number*

* **gamma**: *number*

* **hue**: *number*

* **saturation**: *number*
