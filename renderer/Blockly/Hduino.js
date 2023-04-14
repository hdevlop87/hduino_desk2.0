import Blockly from 'blockly';
import locale from 'blockly/msg/en';
import Toolbox from './toolbox'
import './Lang/en';
import './Blocks/index'

import './ArduinoUtils/generator_arduino'
import './ArduinoUtils/generator_ard_python'
import Emitter from '../Utils/emitter'

Blockly.setLocale(locale);
var trash = `data:image/png;base64,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`

var blockly = Blockly;

class Hduino {


    constructor() {
        this.blocklyDiv = document.getElementById('blocklyDiv')
        this.workspacePreferences = {
            toolbox: Toolbox(),
            media: './',
            locale: 'en',
            targetDivId: 'hduinoblocks',
            collapse: true,
            comments: true,
            css: true,
            disable: false,
            horizontalLayout: false,
            maxBlocks: Infinity,
            maxInstances: {},
            oneBasedIndex: false,
            readOnly: false,
            rtl: false,
            toolboxPosition: 'start',
            trashcan: false,
            maxTrashcanContents: 0,
            renderer: 'zelos',
            rendererOverrides: {
                DUMMY_INPUT_MIN_HEIGHT: 12,
                DUMMY_INPUT_SHADOW_MIN_HEIGHT: 12,
                EMPTY_INLINE_INPUT_HEIGHT: 35,
                FIELD_BORDER_RECT_COLOUR: 'var(--tinkerblocks-color-foreground)',
                FIELD_DROPDOWN_COLOURED_DIV: false,
                FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW: false,
                FIELD_TEXT_FONTFAMILY: 'IBM Plex Sans',
                INSERTION_MARKER_OPACITY: .4,
                REPLACEMENT_GLOW_COLOUR: 'var(--tinkerblocks-color-foreground)',
                SELECTED_GLOW_COLOUR: 'var(--tinkerblocks-color-foreground)',
                SELECTED_GLOW_SIZE: .2
            }
        }
        this.Arduino = blockly.Arduino
    }

    async initialize() {
        await this.injectBlockly();
        this.insertDomElements()
        Hduino.workspace.addChangeListener((e) => this.workspaceChange(e))
    }

    async injectBlockly() {
        return new Promise(async resolve => {
            Hduino.workspace = Blockly.inject(
                this.blocklyDiv,
                this.workspacePreferences
            )
            if (Hduino.workspace) {
                resolve('injected')
            }
        })
    }

    workspace() {
        return Hduino.workspace
    }
    //==========================================================================//
    getWorkspaceXml = () => {
        let workspaceDom = Blockly.Xml.workspaceToDom(this.workspace(), true)
        return Blockly.Xml.domToText(workspaceDom)
    }
    getWorkspaceJson = () => {
        let workspaceJson = JSON.stringify(this.getWorkspaceXml())
        return workspaceJson
    }
    //==========================================================================//
    getAllBlocks = () => {
        if (this.workspace()) {
            return this.workspace().getAllBlocks()
        }
    }

    getStartBlock = () => {
        if (this.getAllBlocks()) {
            let startBlock = this.getAllBlocks().find(
                (block) => block.type === 'base_begin'
            )
            return startBlock
        } else return null
    }

    getEmptyWorkspaceXml() {
        return '<xml><block type=\"' + 'base_begin\"></block></xml>'
    }

    clearWorkspace() {
        const workspaceXml = this.getEmptyWorkspaceXml()
        const workspaceDom = Blockly.Xml.textToDom(workspaceXml)
        Blockly.Xml.clearWorkspaceAndLoadFromXml(workspaceDom, Hduino.workspace);
        Hduino.zoom(0)
    }

    insertDomElements() {
        const deletionIcon = document.createElement('div')
        const deletionIconInner = document.createElement('img')
        deletionIcon.className = 'blocklyDeletionIcon'
        deletionIconInner.src = trash
        deletionIcon.appendChild(deletionIconInner)
        this.blocklyDiv.insertAdjacentElement('beforeend', deletionIcon)
    }

    getWorkspaceCodeArd = () => {
        return this.Arduino.workspaceToCode(Hduino.workspace)
    }

    workspaceChange(event) {
        if (event.type != 'drag') {
            Emitter.emit('WORK_CHANGE', event);
        }
    }

    static zoom(value) {
        if (value != 0) {
            Hduino.workspace.zoomCenter(value)
        }
        else {
            let startBlock = Hduino.getStartBlock()

            if (startBlock) {
                Hduino.workspace.centerOnBlock(startBlock.id)
            }
            else {
                Hduino.workspace.zoomToFit()
            }
        }
    }

    static undo() {
        Hduino.workspace.undo()
    }

    static redo() {
        Hduino.workspace.undo(true)
    }

    static getAllBlocks() {
        if (Hduino.workspace) {
            return Hduino.workspace.getAllBlocks()
        }
    }

    static getStartBlock() {
        if (Hduino.getAllBlocks()) {
            let startBlock = Hduino.getAllBlocks().find(
                (block) => block.type === 'base_begin'
            )
            return startBlock
        } else return null
    }

    static deleteAllBlocks() {
        Hduino.workspace.clear()
    }

    addBlock(newBlockType) {
        const newBlock = this.workspace().newBlock(newBlockType);
        newBlock.initSvg();
        newBlock.render();
        newBlock.moveBy(100, 100);
    }

    blockExist(newBlockType) {
        const existingBlocks = Hduino.workspace.getBlocksByType(newBlockType, false);
        return existingBlocks.length !== 0
    }
}

export default Hduino