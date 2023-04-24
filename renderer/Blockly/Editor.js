import Hduino from './Hduino';
import Emitter from '../Utils/emitter';
import Blockly from 'blockly';
import { store } from '../features/store';
import { setDialog } from '../features/dialogSlice';
import { updateProject } from '../features/projectsSlice';
import { getProject, getProjectID } from '../features/projectsSlice';

var blockly = Blockly;

const state = () => {
   return store.getState();
}

class Editor {

   constructor() {
      Emitter.removeAllListeners();
      this.workspace_code = '';
      this.Variables = [];
      this.project = {}
   }

   async init() {
      this.hduino = new Hduino();
      this.project = getProject(state())
      await this.hduino.initialize();
      this.toolboxInit();
      this.onWorkspaceChange();
      this.setPromptDialog();
      this.loadBoard()
      this.loadVars()
      this.loadXML();

      Hduino.workspace.setScale(0.9)

      const categories = Hduino.workspace.toolbox_.getToolboxItems()
      categories.forEach(category => {
         if (category.isCollapsible()) {
            category.setExpanded(false);
         }
      });
   }

   loadVars() {
      if (this.project && this.project.xml) {
         let vars = this.project.xml.variables;
         if (vars) {
            let myvars = vars.map(obj => obj.name);
            blockly.Arduino.Boards.updateVars(Hduino.workspace, myvars);
         }
      }
   }

   loadXML() {
      if (this.project && this.project.xml) {
         Blockly.serialization.workspaces.load(this.project.xml, Hduino.workspace)
      }
   }

   loadBoard() {
      let compilerFlag = this.project.compilerFlag
      let pattern = /(?:^|\b)avr:(\w+)(?=$|\b)/;
      let board = compilerFlag.match(pattern)[1];
      Blockly.Arduino.Boards.changeBoard(Hduino.workspace, board);
   }

   getProject() {
      this.project = getProject(state())
   }

   setPromptDialog() {
      Blockly.dialog.setPrompt(async (message, defaultValue, callback) => {
         store.dispatch(setDialog({
            title: message,
            type: 'addVariable'
         }))
         let resp = await this.dialogResponse();
         if (resp != '') {
            callback(resp);
            blockly.Arduino.Boards.updateVars(Hduino.workspace)
         }
      });
   }

   async dialogResponse() {
      return new Promise((resolve) => {
         const clear = store.subscribe(() => {
            const { show, data } = store.getState().dialog;
            if (!show) {
               resolve(data)
               clear()
            }
         })
      });
   }

   onWorkspaceChange() {
      Emitter.on('WORK_CHANGE', (ev) => {
         if (ev.type !== "click" && ev.type !== "selected") {
            this.autoAddBlocks(ev)
            this.xml = Blockly.serialization.workspaces.save(Hduino.workspace)
            this.workspace_code = this.hduino.getWorkspaceCodeArd();
            this.saveLocaly();
         }
      });
   }

   autoAddBlocks(ev) {
      if (ev.type === 'create' && ev.xml.tagName == 'block') {
         const blockType = ev.xml.getAttribute('type')

         if (blockType === 'Ultrasonic_read' && !this.hduino.blockExist('Ultrasonic')) {
            this.hduino.addBlock('Ultrasonic')
         }

         if (blockType === 'motor_servo_write' && !this.hduino.blockExist('motor_servo_init')) {
            this.hduino.addBlock('motor_servo_init')
         }

      }
   }

   saveLocaly() {
      store.dispatch(updateProject({
         id: getProjectID(state()),
         code: this.workspace_code,
         xml: this.xml
      }))
   }

   toolboxInit() {
      Hduino.workspace.registerToolboxCategoryCallback('Variables', () => {
         var xmlList = [];
         var button = document.createElement('button');
         button.setAttribute('text', 'Create variable...');
         button.setAttribute('callbackKey', 'CREATE_VARIABLE');
         Hduino.workspace.registerButtonCallback('CREATE_VARIABLE', function (button) {
            Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace());
         });
         xmlList.push(button);
         this.Variables = Hduino.workspace.getAllVariableNames();

         blockly.Arduino.Boards.updateVars(Hduino.workspace)

         if (this.Variables.length > 0) {
            //==================================================//
            if (Blockly.Blocks['variables_set']) {
               var block = document.createElement('block');
               block.setAttribute('type', 'variables_set');
               if (Blockly.Blocks['variables_set_type']) {
                  block.setAttribute('gap', '8');
               } else {
                  block.setAttribute('gap', '24');
               }
               var field = document.createElement('field');
               field.setAttribute('name', 'VAR');
               field.innerText = this.Variables[0];
               block.appendChild(field);

               var value = document.createElement('value');
               value.setAttribute('name', 'VALUE');
               block.appendChild(value);

               var shadowBlock = document.createElement('shadow');
               shadowBlock.setAttribute('type', 'math_number');
               value.appendChild(shadowBlock);

               var numberField = document.createElement('field');
               numberField.setAttribute('name', 'NUM');
               numberField.innerText = '0';
               shadowBlock.appendChild(numberField);

               xmlList.push(block);
            }
            //==================================================//
            if (Blockly.Blocks['math_change']) {
               var block = document.createElement('block');
               block.setAttribute('type', 'math_change');

               if (Blockly.Blocks['variables_get']) {
                  block.setAttribute('gap', '20');
               }
               var value = document.createElement('value');
               value.setAttribute('name', 'DELTA');
               block.appendChild(value);

               var field = document.createElement('field');
               field.setAttribute('name', 'VAR');
               field.innerText = this.Variables[0];
               block.appendChild(field);

               var shadowBlock = document.createElement('shadow');
               shadowBlock.setAttribute('type', 'math_number');
               value.appendChild(shadowBlock);

               var numberField = document.createElement('field');
               numberField.setAttribute('name', 'NUM');
               numberField.innerText = '1';
               shadowBlock.appendChild(numberField);

               xmlList.push(block);
            }
            //==================================================//
            if (Blockly.Blocks['variables_const']) {
               var block = document.createElement('block');
               block.setAttribute('type', 'variables_const');
               if (Blockly.Blocks['variables_set_type']) {
                  block.setAttribute('gap', '8');
               } else {
                  block.setAttribute('gap', '24');
               }
               var field = document.createElement('field');
               field.setAttribute('name', 'VAR');
               field.innerText = this.Variables[0];
               block.appendChild(field);
               xmlList.push(block);
            }
            //==================================================//
            if (Blockly.Blocks['variables_set_init']) {
               var block = document.createElement('block');
               block.setAttribute('type', 'variables_set_init');
               if (Blockly.Blocks['variables_set_init']) {
                  block.setAttribute('gap', '8');
               } else {
                  block.setAttribute('gap', '24');
               }

               var field = document.createElement('field');
               field.setAttribute('name', 'VAR');
               field.innerText = this.Variables[0];
               block.appendChild(field);

               var value = document.createElement('value');
               value.setAttribute('name', 'VALUE');
               block.appendChild(value);

               var shadowBlock = document.createElement('shadow');
               shadowBlock.setAttribute('type', 'math_number');
               value.appendChild(shadowBlock);

               var numberField = document.createElement('field');
               numberField.setAttribute('name', 'NUM');
               numberField.innerText = '1';
               shadowBlock.appendChild(numberField);

               xmlList.push(block);
            }
            //==================================================//
            if (Blockly.Blocks['variables_set_type']) {
               var block = document.createElement('block');
               block.setAttribute('type', 'variables_set_type');
               if (Blockly.Blocks['math_change']) {
                  block.setAttribute('gap', '8');
               } else {
                  block.setAttribute('gap', '24');
               }
               xmlList.push(block);
            }
            //==================================================//
            for (var i = 0; i < this.Variables.length; i++) {
               if (Blockly.Blocks['variables_get']) {
                  var block = document.createElement('block');
                  block.setAttribute('type', 'variables_get');
                  if (Blockly.Blocks['variables_set']) {
                     block.setAttribute('gap', '8');
                  }
                  var field = document.createElement('field');
                  field.setAttribute('name', 'VAR');
                  field.innerText = this.Variables[i];
                  block.appendChild(field);
                  xmlList.push(block);
               }
            }
         }

         return xmlList;
      })
   }
}

export default Editor

