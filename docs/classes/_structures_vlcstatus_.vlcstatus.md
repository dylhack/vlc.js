**[vlc.js](../README.md)**

[Globals](../globals.md) › [&quot;structures/VLCStatus&quot;](../modules/_structures_vlcstatus_.md) › [VLCStatus](_structures_vlcstatus_.vlcstatus.md)

# Class: VLCStatus

**`class`** VLCStatus

**`description`** Current status about VLC.

## Hierarchy

* **VLCStatus**

## Index

### Constructors

* [constructor](_structures_vlcstatus_.vlcstatus.md#constructor)

### Properties

* [apiversion](_structures_vlcstatus_.vlcstatus.md#apiversion)
* [audiodelay](_structures_vlcstatus_.vlcstatus.md#audiodelay)
* [audiofilters](_structures_vlcstatus_.vlcstatus.md#audiofilters)
* [currentplid](_structures_vlcstatus_.vlcstatus.md#currentplid)
* [equalizer](_structures_vlcstatus_.vlcstatus.md#equalizer)
* [fullscreen](_structures_vlcstatus_.vlcstatus.md#fullscreen)
* [information](_structures_vlcstatus_.vlcstatus.md#information)
* [length](_structures_vlcstatus_.vlcstatus.md#length)
* [loop](_structures_vlcstatus_.vlcstatus.md#loop)
* [position](_structures_vlcstatus_.vlcstatus.md#position)
* [random](_structures_vlcstatus_.vlcstatus.md#random)
* [rate](_structures_vlcstatus_.vlcstatus.md#rate)
* [repeat](_structures_vlcstatus_.vlcstatus.md#repeat)
* [state](_structures_vlcstatus_.vlcstatus.md#state)
* [stats](_structures_vlcstatus_.vlcstatus.md#stats)
* [subtitledelay](_structures_vlcstatus_.vlcstatus.md#subtitledelay)
* [time](_structures_vlcstatus_.vlcstatus.md#time)
* [version](_structures_vlcstatus_.vlcstatus.md#version)
* [videoeffects](_structures_vlcstatus_.vlcstatus.md#videoeffects)
* [volume](_structures_vlcstatus_.vlcstatus.md#volume)

## Constructors

###  constructor

\+ **new VLCStatus**(`vlcRequest`: [VLCRequest](_structures_vlcrequest_.vlcrequest.md)): *[VLCStatus](_structures_vlcstatus_.vlcstatus.md)*

Defined in structures/VLCStatus.ts:27

**`constructor`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vlcRequest` | [VLCRequest](_structures_vlcrequest_.vlcrequest.md) |   |

**Returns:** *[VLCStatus](_structures_vlcstatus_.vlcstatus.md)*

## Properties

###  apiversion

• **apiversion**: *number*

Defined in structures/VLCStatus.ts:11

___

###  audiodelay

• **audiodelay**: *number*

Defined in structures/VLCStatus.ts:10

___

###  audiofilters

• **audiofilters**: *[AudioFilters](../interfaces/_structures_vlcstatus_.audiofilters.md)*

Defined in structures/VLCStatus.ts:17

___

###  currentplid

• **currentplid**: *number*

Defined in structures/VLCStatus.ts:12

___

###  equalizer

• **equalizer**: *[Equalizer](../interfaces/_structures_vlcstatus_.equalizer.md)[]*

Defined in structures/VLCStatus.ts:27

___

###  fullscreen

• **fullscreen**: *boolean*

Defined in structures/VLCStatus.ts:8

___

###  information

• **information**: *[Information](../interfaces/_structures_vlcstatus_.information.md) | undefined*

Defined in structures/VLCStatus.ts:24

___

###  length

• **length**: *number*

Defined in structures/VLCStatus.ts:15

___

###  loop

• **loop**: *boolean*

Defined in structures/VLCStatus.ts:21

___

###  position

• **position**: *number*

Defined in structures/VLCStatus.ts:23

___

###  random

• **random**: *boolean*

Defined in structures/VLCStatus.ts:16

___

###  rate

• **rate**: *number*

Defined in structures/VLCStatus.ts:18

___

###  repeat

• **repeat**: *boolean*

Defined in structures/VLCStatus.ts:25

___

###  state

• **state**: *[VLCPlaylistStatus](../enums/_structures_vlcstatus_.vlcplayliststatus.md)*

Defined in structures/VLCStatus.ts:20

___

###  stats

• **stats**: *object | undefined*

Defined in structures/VLCStatus.ts:9

___

###  subtitledelay

• **subtitledelay**: *number*

Defined in structures/VLCStatus.ts:26

___

###  time

• **time**: *number*

Defined in structures/VLCStatus.ts:13

___

###  version

• **version**: *string*

Defined in structures/VLCStatus.ts:22

___

###  videoeffects

• **videoeffects**: *[VideoEffects](../interfaces/_structures_vlcstatus_.videoeffects.md)*

Defined in structures/VLCStatus.ts:19

___

###  volume

• **volume**: *number*

Defined in structures/VLCStatus.ts:14